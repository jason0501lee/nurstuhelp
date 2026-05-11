/**
 * The single root type for every piece of content in the app.
 *
 * Design decision: one BaseCard + a discriminated union on `type`.
 * Search, favorites, recents, version control, and access control all
 * speak BaseCard. Each variant adds only its type-specific payload.
 *
 * When swapping the data source from local JSON to Supabase/CMS later,
 * only the Repository implementation needs to change — Card shape is
 * stable.
 */
import type {
  AgeScope,
  CardStatus,
  ClinicalSetting,
  Locale,
  Priority,
  TargetUser,
} from './dictionaries';
import type {
  BodySection,
  CautionItem,
  QuickAction,
  RedFlag,
  Reference,
  ReviewMeta,
} from './safety';

import type { VitalSignCard } from './cards/vitalSign';
import type { DrugCard } from './cards/drug';
import type { DiseaseCard } from './cards/disease';
import type { HealthEduCard } from './cards/healthEdu';
import type { ISBARTemplateCard } from './cards/isbar';
import type { MedCheckCard } from './cards/medSafety';
import type { SOPCard } from './cards/sop';

export type CardType =
  | 'vital_sign'
  | 'disease'
  | 'drug'
  | 'health_edu'
  | 'isbar'
  | 'med_safety'
  | 'sop';

export interface BaseCard {
  /** ULID; stable across content versions. */
  id: string;
  type: CardType;
  /** URL-safe identifier, unique within `type`. */
  slug: string;
  locale: Locale;

  /* ----- titles & summaries ----- */
  title: string;
  subtitle?: string;
  aliases: string[];
  /** ≤ 140 chars; displayed on card front. */
  shortSummary: string;
  /** ≤ 500 chars; first paragraph of the detail page. */
  longSummary?: string;

  /* ----- audience & setting ----- */
  targetUser: TargetUser[];
  clinicalSetting: ClinicalSetting[];
  ageScope?: AgeScope[];

  /* ----- ranking & tagging ----- */
  priority: Priority;
  tags: string[];
  /** Hierarchical breadcrumb-style category strings. */
  categories: string[];

  /* ----- safety (structured, first-class) ----- */
  caution: CautionItem[];
  redFlags?: RedFlag[];

  /* ----- content body ----- */
  bodySections: BodySection[];

  /* ----- actions & relations ----- */
  quickActions: QuickAction[];
  relatedCardIds?: string[];

  /* ----- sourcing & governance ----- */
  references: Reference[];
  review: ReviewMeta;

  /* ----- system fields ----- */
  status: CardStatus;
  /** ISO datetime. */
  createdAt: string;
  /** ISO datetime. */
  updatedAt: string;
  /** Hidden index field for editor-supplied synonyms / common typos. */
  searchKeywords?: string[];
}

/**
 * The single Card discriminated union — every consumer should accept
 * `Card` and narrow on `card.type` for type-specific fields.
 */
export type Card =
  | VitalSignCard
  | DiseaseCard
  | DrugCard
  | HealthEduCard
  | ISBARTemplateCard
  | MedCheckCard
  | SOPCard;

/* ---------------- Convenience filters & ergonomics ---------------- */

/** Narrow a Card by its `type` literal. */
export type CardOfType<T extends CardType> = Extract<Card, { type: T }>;

/** A `Card` is considered stale when its review window has expired. */
export function isCardStale(card: Card, now: Date = new Date()): boolean {
  const due = Date.parse(card.review.nextReviewDue);
  if (Number.isNaN(due)) return false;
  return due < now.getTime();
}

/** Whether a card should appear in search results / lists. */
export function isCardListable(card: Card): boolean {
  return card.status === 'published' || card.status === 'needs_update';
}
