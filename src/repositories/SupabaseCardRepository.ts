/**
 * SupabaseCardRepository
 *
 * Strategy: stale-while-revalidate. On every read, return the cached
 * snapshot from IndexedDB immediately, then kick off a background
 * fetch from Supabase. The next page mount sees the fresh data.
 *
 * When offline, fall through to the cache. When the cache is empty
 * and Supabase is unreachable, surface an empty list — the
 * LocalCardRepository fallback is selected at the factory layer
 * (env vars unset) rather than per-request.
 */
import { supabase } from '@/lib/supabase';
import { kvGet, kvSet } from '@/lib/persistence';
import type { Card, CardType } from '@/types/card';
import { isCardListable } from '@/types/card';
import { runSearch } from '@/features/search/searchEngine';
import type {
  BundleVersion,
  CardFilter,
  CardRepository,
  SearchHit,
  SearchOpts,
} from './CardRepository';

const CACHE_KEY = 'v1:supabase:cards';
const CACHE_TS_KEY = 'v1:supabase:cards:fetched_at';

/** When the cache is older than this, prefer to refetch synchronously. */
const STALE_AFTER_MS = 24 * 60 * 60 * 1000; // 24h

interface CardsRow {
  id: string;
  type: CardType;
  slug: string;
  status: Card['status'];
  data: Card;
}

function statusMatches(card: Card, filter: CardFilter | undefined): boolean {
  if (!filter?.status) return isCardListable(card);
  const wanted = Array.isArray(filter.status) ? filter.status : [filter.status];
  return wanted.includes(card.status);
}

function typeMatches(card: Card, filter: CardFilter | undefined): boolean {
  if (!filter?.type) return true;
  const wanted = Array.isArray(filter.type) ? filter.type : [filter.type];
  return wanted.includes(card.type);
}

function applyFilter(cards: Card[], filter?: CardFilter): Card[] {
  return cards.filter((c) => {
    if (!statusMatches(c, filter)) return false;
    if (!typeMatches(c, filter)) return false;
    if (filter?.clinicalSetting && !c.clinicalSetting.includes(filter.clinicalSetting)) {
      return false;
    }
    if (filter?.ageScope && !(c.ageScope?.includes(filter.ageScope))) {
      return false;
    }
    if (filter?.priority && c.priority !== filter.priority) return false;
    if (filter?.tag && !c.tags.includes(filter.tag)) return false;
    if (filter?.category && !c.categories.includes(filter.category)) return false;
    return true;
  });
}

export class SupabaseCardRepository implements CardRepository {
  /** In-process snapshot, populated on first read or background refresh. */
  private memCache: Card[] | null = null;
  /** Promise dedupe — multiple concurrent reads share one network call. */
  private inFlight: Promise<Card[]> | null = null;
  /** Lazy hydration from IndexedDB. */
  private hydrationPromise: Promise<Card[] | null> | null = null;

  constructor() {
    if (!supabase) {
      throw new Error(
        'SupabaseCardRepository requires VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.',
      );
    }
  }

  /** Return whatever we have, fastest path first. Schedules a background refresh. */
  private async getAllCards(): Promise<Card[]> {
    if (this.memCache) {
      void this.maybeRefreshInBackground();
      return this.memCache;
    }
    // Cache hydration from IndexedDB.
    const cached = await this.hydrateFromCache();
    if (cached?.length) {
      this.memCache = cached;
      void this.maybeRefreshInBackground();
      return cached;
    }
    // Cold cache — block on the network fetch.
    return this.fetchFromNetwork();
  }

  private async hydrateFromCache(): Promise<Card[] | null> {
    if (!this.hydrationPromise) {
      this.hydrationPromise = kvGet<Card[]>(CACHE_KEY).then(
        (val) => val ?? null,
      );
    }
    return this.hydrationPromise;
  }

  private async maybeRefreshInBackground(): Promise<void> {
    const ts = (await kvGet<number>(CACHE_TS_KEY)) ?? 0;
    if (Date.now() - ts < STALE_AFTER_MS) return;
    try {
      await this.fetchFromNetwork();
    } catch {
      /* offline / network error — keep serving cache */
    }
  }

  private async fetchFromNetwork(): Promise<Card[]> {
    if (this.inFlight) return this.inFlight;
    this.inFlight = (async () => {
      const { data, error } = await supabase!
        .from('cards')
        .select('id, type, slug, status, data')
        .in('status', ['published', 'needs_update']);
      if (error) {
        // If we already have a snapshot, surface that.
        if (this.memCache) return this.memCache;
        throw error;
      }
      const cards: Card[] = (data as CardsRow[] | null ?? []).map((r) => r.data);
      this.memCache = cards;
      await kvSet(CACHE_KEY, cards);
      await kvSet(CACHE_TS_KEY, Date.now());
      return cards;
    })().finally(() => {
      this.inFlight = null;
    });
    return this.inFlight;
  }

  // ----------------- CardRepository surface -----------------

  async list(filter?: CardFilter): Promise<Card[]> {
    const all = await this.getAllCards();
    return applyFilter(all, filter);
  }

  async getById(id: string): Promise<Card | null> {
    const all = await this.getAllCards();
    return all.find((c) => c.id === id) ?? null;
  }

  async getBySlug(type: CardType, slug: string): Promise<Card | null> {
    const all = await this.getAllCards();
    return all.find((c) => c.type === type && c.slug === slug) ?? null;
  }

  async search(query: string, opts?: SearchOpts): Promise<SearchHit[]> {
    const all = await this.getAllCards();
    return runSearch(all, query, opts);
  }

  async bundleVersion(): Promise<BundleVersion> {
    const all = await this.getAllCards();
    const ts = (await kvGet<number>(CACHE_TS_KEY)) ?? Date.now();
    return {
      version: 'supabase',
      updatedAt: new Date(ts).toISOString().slice(0, 10),
      cardCount: all.length,
    };
  }

  /** Force-fetch from network (used by Settings → Refresh). */
  async refresh(): Promise<void> {
    this.memCache = null;
    this.hydrationPromise = null;
    await this.fetchFromNetwork();
  }
}
