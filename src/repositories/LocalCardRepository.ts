/**
 * In-memory CardRepository backed by the compiled-in mock bundle.
 *
 * Search here is intentionally naive (lowercased contains across the
 * indexable fields). Step 9 swaps the search() body for a Fuse.js
 * weighted index; the public surface stays identical.
 */
import {
  BUNDLE_CARDS,
  BUNDLE_VERSION,
} from '@/data/bundle';
import type { Card, CardType } from '@/types/card';
import { isCardListable } from '@/types/card';
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

function buildIndexHaystack(card: Card): { key: string; text: string }[] {
  const list: { key: string; text: string }[] = [
    { key: 'title', text: card.title.toLowerCase() },
    { key: 'aliases', text: card.aliases.join(' ').toLowerCase() },
    { key: 'shortSummary', text: card.shortSummary.toLowerCase() },
    { key: 'tags', text: card.tags.join(' ').toLowerCase() },
    { key: 'categories', text: card.categories.join(' ').toLowerCase() },
  ];
  if (card.subtitle) {
    list.push({ key: 'subtitle', text: card.subtitle.toLowerCase() });
  }
  if (card.searchKeywords?.length) {
    list.push({
      key: 'searchKeywords',
      text: card.searchKeywords.join(' ').toLowerCase(),
    });
  }
  // Type-specific boosts: generic/brand names, procedure names, topic, etc.
  switch (card.type) {
    case 'drug':
      list.push({
        key: 'genericName',
        text: card.genericName.toLowerCase(),
      });
      list.push({
        key: 'brandNames',
        text: card.brandNames.join(' ').toLowerCase(),
      });
      break;
    case 'health_edu':
      list.push({ key: 'topic', text: card.topic.toLowerCase() });
      break;
    case 'sop':
      list.push({
        key: 'procedureName',
        text: card.procedureName.toLowerCase(),
      });
      break;
    default:
      break;
  }
  return list;
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
    const q = query.trim().toLowerCase();
    if (!q) return [];

    const candidates = await this.list(opts?.filter);
    const hits: SearchHit[] = [];
    for (const card of candidates) {
      const fields = buildIndexHaystack(card);
      let bestKey: string | undefined;
      let bestScore = Infinity;
      for (const { key, text } of fields) {
        const idx = text.indexOf(q);
        if (idx === -1) continue;
        // Lower is better. Earlier match + shorter field == better score.
        const score = idx / Math.max(text.length, 1);
        if (score < bestScore) {
          bestScore = score;
          bestKey = key;
        }
      }
      if (bestKey) {
        hits.push({ card, score: bestScore, matchedKey: bestKey });
      }
    }

    hits.sort((a, b) => a.score - b.score);
    return typeof opts?.limit === 'number' ? hits.slice(0, opts.limit) : hits;
  }

  async bundleVersion(): Promise<BundleVersion> {
    return BUNDLE_VERSION;
  }
}
