import { useEffect } from 'react';
import { trackOpen } from '../store';

/**
 * Fire-and-forget recents tracking. Used by CardDetailPage and
 * tool/flow pages so the home "今日捷徑" stays up to date.
 *
 * Guarded against React 18 StrictMode double-effect by using a
 * stable id — repeat calls within a render cycle still produce a
 * single open count increment because the repository's update is
 * idempotent at the LRU level (one entry per card).
 */
export function useTrackOpen(cardId: string | null | undefined): void {
  useEffect(() => {
    if (!cardId) return;
    void trackOpen(cardId);
  }, [cardId]);
}
