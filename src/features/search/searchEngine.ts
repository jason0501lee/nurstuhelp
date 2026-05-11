/**
 * Fuse.js-backed search engine.
 *
 * Built once per session from BUNDLE_CARDS. The LocalCardRepository
 * delegates to this engine so all search consumers (HomePage search
 * bar, /search page, future quick-pick) share one ranking model.
 *
 * Field weights mirror FR-S05 from the spec: titles and type-specific
 * names are weighted highest, then search keywords / aliases, then
 * tags, then full-text body.
 */
import Fuse, { type IFuseOptions } from 'fuse.js';
import type { Card } from '@/types/card';
import { isCardListable } from '@/types/card';
import { BUNDLE_CARDS } from '@/data/bundle';
import type { SearchHit, SearchOpts } from '@/repositories/CardRepository';

/** Flat record optimised for Fuse — type-specific names get hoisted. */
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
  // Type-specific name boosts
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

let fuseInstance: Fuse<SearchableCard> | null = null;
let indexedSet: SearchableCard[] = [];

function getFuse(): Fuse<SearchableCard> {
  if (!fuseInstance) {
    indexedSet = BUNDLE_CARDS.filter(isCardListable).map(toSearchable);
    fuseInstance = new Fuse(indexedSet, FUSE_OPTIONS);
  }
  return fuseInstance;
}

/** Forces a rebuild — useful after content updates in Settings. */
export function rebuildSearchIndex(): void {
  fuseInstance = null;
  indexedSet = [];
}

export function runSearch(query: string, opts?: SearchOpts): SearchHit[] {
  const q = query.trim();
  if (!q) return [];

  const fuse = getFuse();
  const results = fuse.search(q);

  const filtered = results.filter((r) => {
    const filter = opts?.filter;
    if (!filter) return true;
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
    if (filter.priority && card.priority !== filter.priority) {
      return false;
    }
    if (filter.tag && !card.tags.includes(filter.tag)) {
      return false;
    }
    if (filter.category && !card.categories.includes(filter.category)) {
      return false;
    }
    return true;
  });

  const limit = opts?.limit;
  const sliced = typeof limit === 'number' ? filtered.slice(0, limit) : filtered;
  return sliced.map((r) => ({
    card: r.item.card,
    score: r.score ?? 1,
    matchedKey: r.matches?.[0]?.key,
  }));
}
