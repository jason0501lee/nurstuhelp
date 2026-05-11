/**
 * Shared structures for every Card type: cautions, red flags, body
 * sections, references, review metadata, and quick actions.
 *
 * These are referenced from `card.ts` and every `cards/*.ts`. Structuring
 * caution and review as first-class fields is what lets the design
 * system enforce the safety banners and disclaimers from §safety-spec.
 */
import type {
  ApprovalScope,
  CautionLevel,
  CautionScope,
  Locale,
  ReviewerRole,
  SourceType,
} from './dictionaries';

/* ---------------- Caution & Red Flags ---------------- */

export interface CautionItem {
  level: CautionLevel;
  scope?: CautionScope;
  /** ≤ 120 chars; phrasing must obey EDITORIAL_BLOCKED_WORDS. */
  message: string;
  /** Optional condition under which the caution applies. */
  appliesWhen?: string;
}

export interface RedFlag {
  /** What to look for. */
  trigger: string;
  /** Direction-only language (e.g. "考慮…"). Never absolute imperative. */
  actionHint: string;
}

/* ---------------- Quick Actions ---------------- */

export type QuickActionType =
  | 'open_calculator'
  | 'open_checklist'
  | 'open_isbar'
  | 'copy_text'
  | 'favorite'
  | 'internal_link'
  | 'external_link';

export interface QuickAction {
  type: QuickActionType;
  label: string;
  /** When type is `internal_link`, points at another Card.id. */
  targetId?: string;
  /** Free-form param bag for the destination (e.g. prefill values). */
  params?: Record<string, unknown>;
}

/* ---------------- References ---------------- */

export interface Reference {
  citation: string;
  sourceType: SourceType;
  url?: string;
  /** ISO date string. */
  accessedAt?: string;
  sourceLang: Locale;
}

/* ---------------- Review metadata ---------------- */

export interface Reviewer {
  userId: string;
  role: ReviewerRole;
  /** ISO datetime string. */
  reviewedAt: string;
  scope: ApprovalScope;
}

export interface ChangeEntry {
  version: string;
  /** ISO date string. */
  date: string;
  summary: string;
}

export interface ReviewMeta {
  /** SemVer (e.g. "1.2.0"). */
  version: string;
  authoredBy: string[];
  reviewedBy: Reviewer[];
  approvedAt?: string;
  /** ISO date. Past due → search downranking + SB-10 banner. */
  nextReviewDue: string;
  approvalScopes: ApprovalScope[];
  changelog?: ChangeEntry[];
}

/* ---------------- Body sections (discriminated) ---------------- */

export type BodyLayout =
  | 'bullet'
  | 'kv_table'
  | 'ordered_steps'
  | 'paragraph'
  | 'comparison';

export type DisplayHint = 'front' | 'expanded' | 'expanded_only' | 'hidden';

interface BodySectionBase {
  /** Stable key for analytics and deep-linking. */
  key: string;
  label: string;
  collapsedByDefault: boolean;
  displayHint: DisplayHint;
}

export interface BulletSection extends BodySectionBase {
  layout: 'bullet';
  content: string[];
}

export interface KVRow {
  key: string;
  value: string;
  note?: string;
}

export interface KVTableSection extends BodySectionBase {
  layout: 'kv_table';
  content: KVRow[];
}

export interface StepItem {
  index: number;
  text: string;
  why?: string;
  warning?: CautionItem;
  visual?: string;
}

export interface OrderedStepsSection extends BodySectionBase {
  layout: 'ordered_steps';
  content: StepItem[];
}

export interface ParagraphSection extends BodySectionBase {
  layout: 'paragraph';
  content: string;
}

export interface ComparisonColumn {
  label: string;
  bullets: string[];
}

export interface ComparisonSection extends BodySectionBase {
  layout: 'comparison';
  content: ComparisonColumn[];
}

export type BodySection =
  | BulletSection
  | KVTableSection
  | OrderedStepsSection
  | ParagraphSection
  | ComparisonSection;
