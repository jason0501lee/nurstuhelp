import { Link } from 'react-router-dom';
import { ChevronLeft, Star } from 'lucide-react';
import { useFavoritesList } from '@/features/favorites/hooks/useFavoritesList';
import { useCardsByIds } from '@/features/cards/hooks/useCardsByIds';
import { CardListItem } from '@/features/cards/components/CardListItem';
import { EmptyState } from '@/components/ui/EmptyState';

export default function FavoritesPage() {
  const favorites = useFavoritesList();
  const cards = useCardsByIds(favorites);

  return (
    <div className="p-4 space-y-4">
      <Link
        to="/"
        className="inline -ml-2 inline-flex items-center gap-1 text-sm text-text-muted hover:text-text"
      >
        <ChevronLeft className="size-4" />
        <span>首頁</span>
      </Link>

      <header className="space-y-1">
        <h1 className="text-2xl font-semibold">我的收藏</h1>
        <p className="text-sm text-text-muted">
          共 {cards.length} 張卡片，按最近收藏優先排序
        </p>
      </header>

      {cards.length === 0 ? (
        <EmptyState
          icon={<Star className="size-10" />}
          title="尚無收藏"
          description="於任意卡片右上角點 ☆ 即可加入收藏，方便下次快速取用。"
        />
      ) : (
        <ul className="space-y-2">
          {cards.map((c) => (
            <CardListItem key={c.id} card={c} />
          ))}
        </ul>
      )}
    </div>
  );
}
