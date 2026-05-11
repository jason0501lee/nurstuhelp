import { useMemo } from 'react';
import { SearchBar } from '@/features/search/components/SearchBar';
import { useRecentsList } from '@/features/recents/hooks/useRecentsList';
import { useFavoritesList } from '@/features/favorites/hooks/useFavoritesList';
import { useCardsByIds } from '@/features/cards/hooks/useCardsByIds';
import { DisclaimerBlock } from '@/features/safety/components/DisclaimerBlock';
import { QuickActionRow } from './home/QuickActionRow';
import { HorizontalCardScroller } from './home/HorizontalCardScroller';
import { InterceptCounter } from './home/InterceptCounter';

function Section({
  title,
  children,
  rightSlot,
}: {
  title: string;
  children: React.ReactNode;
  rightSlot?: React.ReactNode;
}) {
  return (
    <section className="space-y-2">
      <div className="flex items-center justify-between px-1">
        <h2 className="text-sm font-semibold text-text-muted">{title}</h2>
        {rightSlot}
      </div>
      {children}
    </section>
  );
}

export default function HomePage() {
  const recents = useRecentsList(8);
  const favorites = useFavoritesList();

  const recentIds = useMemo(() => recents.map((r) => r.cardId), [recents]);
  const favoriteIds = useMemo(() => favorites.slice(0, 8), [favorites]);

  const recentCards = useCardsByIds(recentIds);
  const favoriteCards = useCardsByIds(favoriteIds);

  return (
    <div className="p-4 space-y-5">
      <SearchBar />
      <QuickActionRow />

      <Section title="今日捷徑">
        <HorizontalCardScroller
          cards={recentCards}
          emptyHint="開啟過的卡片會出現在這裡，幫你下一次更快回到。"
        />
      </Section>

      <Section title="我的收藏">
        <HorizontalCardScroller
          cards={favoriteCards}
          emptyHint="點卡片右上的 ☆ 加入收藏，方便快速取用。"
          moreTo="/favorites"
        />
      </Section>

      <InterceptCounter />

      <DisclaimerBlock kind="DISC-APP-FOOTER" className="mt-2" />
    </div>
  );
}
