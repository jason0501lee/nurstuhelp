import { useEffect, useState } from 'react';
import { getCardRepository } from '@/repositories';
import type { Card } from '@/types/card';

/**
 * Resolve an array of card ids to Card objects (filtering out
 * missing ones). Used by HomePage scrollers, Favorites, Recents,
 * and RelatedCards.
 *
 * Stable on identical id strings — we depend on the joined key
 * rather than reference equality, because the upstream stores emit
 * fresh array snapshots on every update.
 */
export function useCardsByIds(ids: readonly string[]): Card[] {
  const key = ids.join('|');
  const [cards, setCards] = useState<Card[]>([]);

  useEffect(() => {
    let cancelled = false;
    const repo = getCardRepository();
    void Promise.all(ids.map((id) => repo.getById(id))).then((results) => {
      if (cancelled) return;
      // Preserve input order, drop nulls.
      setCards(results.filter((c): c is Card => c !== null));
    });
    return () => {
      cancelled = true;
    };
    // We intentionally key the effect on the joined id list.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return cards;
}
