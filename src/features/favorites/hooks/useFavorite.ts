import { useCallback, useEffect, useState } from 'react';
import {
  getFavoritesSet,
  subscribeFavorites,
  toggleFavorite as toggleFavoriteInStore,
} from '../store';

interface UseFavoriteResult {
  isFavorited: boolean;
  toggle: () => Promise<boolean>;
}

/**
 * Subscribe to favorite state for a single card. Multiple components
 * (CardHeader, CardListItem, HomePage favorite scroller) can all use
 * this and stay in sync via the favorites store.
 */
export function useFavorite(cardId: string): UseFavoriteResult {
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    let cancelled = false;
    void getFavoritesSet().then((set) => {
      if (!cancelled) setIsFavorited(set.has(cardId));
    });
    const unsub = subscribeFavorites((set) => {
      setIsFavorited(set.has(cardId));
    });
    return () => {
      cancelled = true;
      unsub();
    };
  }, [cardId]);

  const toggle = useCallback(() => toggleFavoriteInStore(cardId), [cardId]);

  return { isFavorited, toggle };
}
