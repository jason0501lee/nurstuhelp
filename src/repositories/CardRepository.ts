/**
 * Data-access contract for content cards.
 *
 * The whole app talks to cards through this interface. Today the
 * implementation is `LocalCardRepository`, which reads from the
 * compiled-in mock bundle. Later we can swap in a SupabaseRepository
 * or a CMSRepository without changes to pages / features.
 */
import type {
  AgeScope,
  CardStatus,
  ClinicalSetting,
  Priority,
} from '@/types/dictionaries';
import type { Card, CardType } from '@/types/card';

export interface CardFilter {
  type?: CardType | CardType[];
  clinicalSetting?: ClinicalSetting;
  ageScope?: AgeScope;
  priority?: Priority;
  tag?: string;
  category?: string;
  /** Defaults to ['published', 'needs_update'] when omitted. */
  status?: CardStatus | CardStatus[];
}

export interface SearchHit {
  card: Card;
  /** Lower is better; 0 means perfect. Mirrors Fuse.js convention. */
  score: number;
  /** Matched field key, where available (e.g. "title", "aliases"). */
  matchedKey?: string;
}

export interface SearchOpts {
  limit?: number;
  filter?: CardFilter;
}

export interface BundleVersion {
  /** SemVer. */
  version: string;
  /** ISO date. */
  updatedAt: string;
  cardCount: number;
}

export interface CardRepository {
  list(filter?: CardFilter): Promise<Card[]>;
  getById(id: string): Promise<Card | null>;
  getBySlug(type: CardType, slug: string): Promise<Card | null>;
  search(query: string, opts?: SearchOpts): Promise<SearchHit[]>;
  bundleVersion(): Promise<BundleVersion>;
}
