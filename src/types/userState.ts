/**
 * User-scoped state that lives device-locally (no account in MVP).
 *
 * Strictly device-local; never shipped to any backend without an
 * explicit, separately-managed sync feature. See FR-F09 / FR-F11.
 */

export interface UserCardState {
  cardId: string;
  favorited: boolean;
  /** ISO datetime when first favorited. */
  favoritedAt?: string;
  /** ISO datetime of last open. */
  lastOpenedAt: string;
  openCount: number;
}

export interface RecentEntry {
  cardId: string;
  /** ISO datetime. */
  openedAt: string;
  openCount: number;
}

/**
 * Per spec, intercept entries must NOT contain PII. They are stored
 * for in-session reassurance (e.g. "本班完成 三讀六對 ×3") and the
 * student's own retrospective, not for clinical audit.
 */
export type InterceptContext =
  | 'medcheck_complete'
  | 'medcheck_abort'
  | 'manual';

export interface InterceptEntry {
  id: string;
  /** ISO datetime. */
  occurredAt: string;
  context: InterceptContext;
  /** Sanitized free text; PII-blocked at input. */
  note?: string;
}
