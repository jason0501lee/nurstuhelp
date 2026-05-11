import { Star } from 'lucide-react';
import { cn } from '@/lib/cn';
import { useFavorite } from '../hooks/useFavorite';

interface FavoriteButtonProps {
  cardId: string;
  /** Visual size — `md` for card headers, `sm` for list items. */
  size?: 'sm' | 'md';
  className?: string;
}

export function FavoriteButton({
  cardId,
  size = 'md',
  className,
}: FavoriteButtonProps) {
  const { isFavorited, toggle } = useFavorite(cardId);
  const dim = size === 'md' ? 'size-5' : 'size-4';

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        void toggle();
      }}
      aria-pressed={isFavorited}
      aria-label={isFavorited ? '取消收藏' : '加入收藏'}
      className={cn(
        'inline p-2 rounded-btn transition',
        isFavorited
          ? 'text-warn hover:bg-warn-soft'
          : 'text-text-muted hover:text-text hover:bg-bg',
        className,
      )}
    >
      <Star
        className={dim}
        strokeWidth={1.75}
        fill={isFavorited ? 'currentColor' : 'none'}
      />
    </button>
  );
}
