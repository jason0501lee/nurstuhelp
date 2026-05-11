/**
 * Device-local user state: favorites, recents, intercepts.
 *
 * Strictly local — there is no account in MVP and no automatic sync.
 * Intercept entries MUST be PII-free; the editorial / UI layer is
 * responsible for sanitising before calling logIntercept.
 */
import type {
  InterceptContext,
  InterceptEntry,
  RecentEntry,
} from '@/types/userState';

export interface UserStateRepository {
  /* ----- favorites ----- */
  getFavorites(): Promise<string[]>;
  isFavorited(cardId: string): Promise<boolean>;
  toggleFavorite(cardId: string): Promise<boolean>;

  /* ----- recents ----- */
  getRecents(limit?: number): Promise<RecentEntry[]>;
  /** Records that the user opened a card; updates timestamp + count. */
  trackOpen(cardId: string): Promise<void>;

  /* ----- intercepts ----- */
  getIntercepts(): Promise<InterceptEntry[]>;
  logIntercept(entry: {
    context: InterceptContext;
    note?: string;
  }): Promise<InterceptEntry>;

  /* ----- maintenance ----- */
  clearAll(): Promise<void>;
}
