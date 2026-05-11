import { useEffect, useState } from 'react';
import { getFavoritesSet, subscribeFavorites } from '../store';

/**
 * Observe the entire favorites set (ordered as stored in the
 * repository — i.e. most recently favorited first). Used by the
 * favorites page and the home favorites scroller.
 */
export function useFavoritesList(): readonly string[] {
  const [list, setList] = useState<readonly string[]>([]);

  useEffect(() => {
    let cancelled = false;
    void getFavoritesSet().then((set) => {
      if (!cancelled) setList(Array.from(set));
    });
    const unsub = subscribeFavorites((set) => {
      setList(Array.from(set));
    });
    return () => {
      cancelled = true;
      unsub();
    };
  }, []);

  return list;
}
