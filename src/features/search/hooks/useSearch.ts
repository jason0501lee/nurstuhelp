import { useEffect, useMemo, useState } from 'react';
import { getCardRepository } from '@/repositories';
import type { SearchHit, SearchOpts } from '@/repositories';

interface UseSearchResult {
  hits: SearchHit[];
  loading: boolean;
}

/**
 * Debounced search hook. Returns hits ranked by the repository's
 * Fuse.js engine. Empty query → empty result, no loading flash.
 */
export function useSearch(query: string, opts?: SearchOpts): UseSearchResult {
  const [hits, setHits] = useState<SearchHit[]>([]);
  const [loading, setLoading] = useState(false);

  const optsKey = useMemo(() => JSON.stringify(opts ?? {}), [opts]);

  useEffect(() => {
    const q = query.trim();
    if (!q) {
      setHits([]);
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);
    const timer = window.setTimeout(() => {
      void getCardRepository()
        .search(q, opts)
        .then((result) => {
          if (cancelled) return;
          setHits(result);
          setLoading(false);
        });
    }, 200);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, optsKey]);

  return { hits, loading };
}
