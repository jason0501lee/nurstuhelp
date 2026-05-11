import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import type { Card } from '@/types/card';
import { FavoriteButton } from '@/features/favorites/components/FavoriteButton';
import { PriorityBadge } from './PriorityBadge';

const TYPE_PATH: Record<Card['type'], string> = {
  vital_sign: '/reference/vital-signs',
  drug: '/reference/drugs',
  disease: '/reference/diseases',
  health_edu: '/reference/health-edu',
  sop: '/reference/sop',
  isbar: '/tools/isbar',
  med_safety: '/tools/medcheck',
};

interface CardListItemProps {
  card: Card;
  /** Override the navigation target (e.g. search jumping into detail). */
  to?: string;
}

/**
 * Compact tappable row used by reference lists, search results,
 * favorites, and recents. The whole row is the link; the favorite
 * button uses stopPropagation so it stays a separate action.
 */
export function CardListItem({ card, to }: CardListItemProps) {
  const path = to ?? `${TYPE_PATH[card.type]}/${card.slug}`;
  return (
    <li className="bg-surface rounded-card border border-border">
      <Link
        to={path}
        className="flex items-center gap-3 p-4 group"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <PriorityBadge priority={card.priority} />
            {card.type === 'drug' && card.highAlert && (
              <span className="inline text-xs font-medium text-critical">
                高警訊
              </span>
            )}
          </div>
          <h3 className="font-medium text-base leading-tight group-hover:text-primary truncate">
            {card.title}
          </h3>
          {card.shortSummary && (
            <p className="text-sm text-text-muted mt-1 line-clamp-2">
              {card.shortSummary}
            </p>
          )}
        </div>
        <FavoriteButton cardId={card.id} size="sm" />
        <ChevronRight className="size-5 text-text-muted shrink-0" aria-hidden />
      </Link>
    </li>
  );
}
