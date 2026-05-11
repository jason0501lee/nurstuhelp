/**
 * In-memory CardRepository backed by the compiled-in mock bundle.
 *
 * Search is delegated to features/search/searchEngine (Fuse.js), so
 * every consumer — pages, the home search bar — uses the same
 * weighted ranking model.
 */
import {
  BUNDLE_CARDS,
  BUNDLE_VERSION,
} from '@/data/bundle';
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

const DEFAULT_VISIBLE_STATUSES = new Set<Card['status']>([
  'published',
  'needs_update',
]);

function statusMatches(card: Card, filter: CardFilter | undefined): boolean {
  if (!filter?.status) return DEFAULT_VISIBLE_STATUSES.has(card.status);
  const wanted = Array.isArray(filter.status) ? filter.status : [filter.status];
  return wanted.includes(card.status);
}

function typeMatches(card: Card, filter: CardFilter | undefined): boolean {
  if (!filter?.type) return true;
  const wanted = Array.isArray(filter.type) ? filter.type : [filter.type];
  return wanted.includes(card.type);
}

function settingMatches(card: Card, filter: CardFilter | undefined): boolean {
  if (!filter?.clinicalSetting) return true;
  return card.clinicalSetting.includes(filter.clinicalSetting);
}

function ageMatches(card: Card, filter: CardFilter | undefined): boolean {
  if (!filter?.ageScope) return true;
  return card.ageScope?.includes(filter.ageScope) ?? false;
}

function priorityMatches(card: Card, filter: CardFilter | undefined): boolean {
  if (!filter?.priority) return true;
  return card.priority === filter.priority;
}

function tagMatches(card: Card, filter: CardFilter | undefined): boolean {
  if (!filter?.tag) return true;
  return card.tags.includes(filter.tag);
}

function categoryMatches(card: Card, filter: CardFilter | undefined): boolean {
  if (!filter?.category) return true;
  return card.categories.includes(filter.category);
}

function matchesFilter(card: Card, filter?: CardFilter): boolean {
  return (
    statusMatches(card, filter) &&
    typeMatches(card, filter) &&
    settingMatches(card, filter) &&
    ageMatches(card, filter) &&
    priorityMatches(card, filter) &&
    tagMatches(card, filter) &&
    categoryMatches(card, filter)
  );
}

export class LocalCardRepository implements CardRepository {
  async list(filter?: CardFilter): Promise<Card[]> {
    return BUNDLE_CARDS.filter((c) => matchesFilter(c, filter)).filter(
      isCardListable,
    );
  }

  async getById(id: string): Promise<Card | null> {
    return BUNDLE_CARDS.find((c) => c.id === id) ?? null;
  }

  async getBySlug(type: CardType, slug: string): Promise<Card | null> {
    return (
      BUNDLE_CARDS.find((c) => c.type === type && c.slug === slug) ?? null
    );
  }

  async search(query: string, opts?: SearchOpts): Promise<SearchHit[]> {
    // Snapshot filtered by status only; the engine handles the rest of the filter set.
    const cards = BUNDLE_CARDS.filter(isCardListable);
    return runSearch(cards, query, opts);
  }

  async bundleVersion(): Promise<BundleVersion> {
    return BUNDLE_VERSION;
  }
}
