import { Badge } from '@/components/ui/Badge';
import type { Card } from '@/types/card';
import { FavoriteButton } from '@/features/favorites/components/FavoriteButton';
import { PriorityBadge } from './PriorityBadge';

interface CardHeaderProps {
  card: Card;
}

/**
 * Reusable header for the CardDetailPage. Shows title, optional
 * subtitle, aliases, priority badge, and the favorite toggle.
 * Type-specific badges (high-alert, scenario, check type) are layered
 * on by the CardDetailPage to keep this component generic.
 */
export function CardHeader({ card }: CardHeaderProps) {
  return (
    <header className="space-y-2">
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <h1 className="text-xl font-semibold leading-tight">{card.title}</h1>
          {card.subtitle && (
            <p className="text-sm text-text-muted mt-0.5">{card.subtitle}</p>
          )}
        </div>
        <FavoriteButton cardId={card.id} />
      </div>

      <div className="flex flex-wrap items-center gap-1.5">
        <PriorityBadge priority={card.priority} />
        {card.type === 'drug' && card.highAlert && (
          <Badge tone="critical" soft={false}>
            高警訊藥品
          </Badge>
        )}
        {card.status === 'needs_update' && (
          <Badge tone="info">內容待更新</Badge>
        )}
        {card.tags.slice(0, 3).map((t) => (
          <Badge key={t} tone="neutral">
            {t}
          </Badge>
        ))}
      </div>

      {card.aliases.length > 0 && (
        <p className="text-xs text-text-muted">
          別名：{card.aliases.join('、')}
        </p>
      )}
    </header>
  );
}
