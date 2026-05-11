import { useEffect, useState } from 'react';
import type { RecentEntry } from '@/types/userState';
import { getRecents, subscribeRecents } from '../store';

/**
 * Observe the recents list. Used by the home "今日捷徑" scroller
 * and the Recents page.
 */
export function useRecentsList(limit?: number): readonly RecentEntry[] {
  const [list, setList] = useState<readonly RecentEntry[]>([]);

  useEffect(() => {
    let cancelled = false;
    void getRecents(limit).then((items) => {
      if (!cancelled) setList(items);
    });
    const unsub = subscribeRecents((items) => {
      setList(typeof limit === 'number' ? items.slice(0, limit) : items);
    });
    return () => {
      cancelled = true;
      unsub();
    };
  }, [limit]);

  return list;
}
