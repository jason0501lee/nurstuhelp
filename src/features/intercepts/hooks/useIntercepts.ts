import { useEffect, useState } from 'react';
import type { InterceptEntry } from '@/types/userState';
import { getIntercepts, subscribeIntercepts } from '../store';

/**
 * Observe the intercept log. Used by the home page counter and the
 * Settings clear-data flow.
 */
export function useIntercepts(): readonly InterceptEntry[] {
  const [list, setList] = useState<readonly InterceptEntry[]>([]);

  useEffect(() => {
    let cancelled = false;
    void getIntercepts().then((items) => {
      if (!cancelled) setList(items);
    });
    const unsub = subscribeIntercepts(setList);
    return () => {
      cancelled = true;
      unsub();
    };
  }, []);

  return list;
}
