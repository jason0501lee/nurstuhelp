import type { Card } from '@/types/card';
import { CardListItem } from './CardListItem';

interface RelatedCardsProps {
  cards: readonly Card[];
}

/**
 * Stateless related-cards list. Parent (CardDetailPage) resolves the
 * relatedCardIds to actual Card objects and passes them in.
 */
export function RelatedCards({ cards }: RelatedCardsProps) {
  if (cards.length === 0) return null;
  return (
    <section aria-label="相關內容" className="space-y-2">
      <h2 className="text-sm font-semibold text-text-muted px-1">相關內容</h2>
      <ul className="space-y-2">
        {cards.map((c) => (
          <CardListItem key={c.id} card={c} />
        ))}
      </ul>
    </section>
  );
}
