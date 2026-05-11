/**
 * Fuse.js-backed search ranking.
 *
 * The engine no longer owns the card list — it accepts whatever
 * snapshot the calling Repository hands in. This lets both
 * LocalCardRepository (bundled BUNDLE_CARDS) and
 * SupabaseCardRepository (network or IndexedDB cache) share the same
 * weighted ranking model.
 *
 * Index is memoised on the card array reference so repeated searches
 * over the same snapshot do not rebuild Fuse.
 */
import Fuse, { type IFuseOptions } from 'fuse.js';
import type { Card } from '@/types/card';
import { isCardListable } from '@/types/card';
import type { SearchHit, SearchOpts } from '@/repositories/CardRepository';

interface SearchableCard {
  id: string;
  card: Card;
  title: string;
  subtitle?: string;
  aliases: string[];
  shortSummary: string;
  tags: string[];
  categories: string[];
  searchKeywords: string[];
  bodyText: string;
  genericName?: string;
  brandNames?: string[];
  procedureName?: string;
  topic?: string;
}

function bodyTextOf(card: Card): string {
  const out: string[] = [];
  for (const s of card.bodySections) {
    switch (s.layout) {
      case 'bullet':
        out.push(...s.content);
        break;
      case 'kv_table':
        for (const row of s.content) out.push(row.key, row.value, row.note ?? '');
        break;
      case 'ordered_steps':
        out.push(...s.content.map((st) => st.text));
        break;
      case 'paragraph':
        out.push(s.content);
        break;
      case 'comparison':
        for (const col of s.content) {
          out.push(col.label, ...col.bullets);
        }
        break;
    }
  }
  return out.filter(Boolean).join(' ');
}

function toSearchable(card: Card): SearchableCard {
  const base: SearchableCard = {
    id: card.id,
    card,
    title: card.title,
    subtitle: card.subtitle,
    aliases: card.aliases,
    shortSummary: card.shortSummary,
    tags: card.tags,
    categories: card.categories,
    searchKeywords: card.searchKeywords ?? [],
    bodyText: bodyTextOf(card),
  };
  switch (card.type) {
    case 'drug':
      base.genericName = card.genericName;
      base.brandNames = card.brandNames;
      break;
    case 'health_edu':
      base.topic = card.topic;
      break;
    case 'sop':
      base.procedureName = card.procedureName;
      break;
    default:
      break;
  }
  return base;
}

const FUSE_OPTIONS: IFuseOptions<SearchableCard> = {
  threshold: 0.4,
  ignoreLocation: true,
  includeScore: true,
  includeMatches: true,
  minMatchCharLength: 1,
  keys: [
    { name: 'title', weight: 5 },
    { name: 'aliases', weight: 5 },
    { name: 'genericName', weight: 5 },
    { name: 'brandNames', weight: 5 },
    { name: 'procedureName', weight: 5 },
    { name: 'topic', weight: 5 },
    { name: 'searchKeywords', weight: 4 },
    { name: 'subtitle', weight: 4 },
    { name: 'shortSummary', weight: 3 },
    { name: 'tags', weight: 3 },
    { name: 'categories', weight: 2 },
    { name: 'bodyText', weight: 2 },
  ],
};

interface FuseCacheEntry {
  cardsRef: readonly Card[];
  fuse: Fuse<SearchableCard>;
  searchables: SearchableCard[];
}

let fuseCache: FuseCacheEntry | null = null;

function getFuseFor(cards: readonly Card[]): FuseCacheEntry {
  if (fuseCache && fuseCache.cardsRef === cards) return fuseCache;
  const filtered = cards.filter(isCardListable);
  const searchables = filtered.map(toSearchable);
  fuseCache = {
    cardsRef: cards,
    fuse: new Fuse(searchables, FUSE_OPTIONS),
    searchables,
  };
  return fuseCache;
}

/** Force the next call to rebuild the index — used after Settings → Refresh. */
export function rebuildSearchIndex(): void {
  fuseCache = null;
}

export function runSearch(
  cards: readonly Card[],
  query: string,
  opts?: SearchOpts,
): SearchHit[] {
  const q = query.trim();
  if (!q) return [];

  const { fuse } = getFuseFor(cards);
  const results = fuse.search(q);

  const filter = opts?.filter;
  const filtered = filter
    ? results.filter((r) => {
        const card = r.item.card;
        if (filter.type) {
          const wanted = Array.isArray(filter.type) ? filter.type : [filter.type];
          if (!wanted.includes(card.type)) return false;
        }
        if (filter.clinicalSetting && !card.clinicalSetting.includes(filter.clinicalSetting)) {
          return false;
        }
        if (filter.ageScope && !(card.ageScope?.includes(filter.ageScope))) {
          return false;
        }
        if (filter.priority && card.priority !== filter.priority) return false;
        if (filter.tag && !card.tags.includes(filter.tag)) return false;
        if (filter.category && !card.categories.includes(filter.category)) return false;
        return true;
      })
    : results;

  const limit = opts?.limit;
  const sliced = typeof limit === 'number' ? filtered.slice(0, limit) : filtered;
  return sliced.map((r) => ({
    card: r.item.card,
    score: r.score ?? 1,
    matchedKey: r.matches?.[0]?.key,
  }));
}
