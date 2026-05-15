import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronLeft, Search } from 'lucide-react';
import { CardListItem } from '@/features/cards/components/CardListItem';
import { EmptyState } from '@/components/ui/EmptyState';
import { getCardRepository } from '@/repositories';
import type { Card, CardType } from '@/types/card';

const SLUG_TO_TYPE: Record<string, CardType> = {
  'vital-signs': 'vital_sign',
  drugs: 'drug',
  diseases: 'disease',
  'health-edu': 'health_edu',
  sop: 'sop',
};

const TYPE_TITLE: Record<CardType, string> = {
  vital_sign: '生命徵象',
  assessment: '基本評估',
  drug: '藥物',
  disease: '疾病',
  health_edu: '衛教',
  sop: '護理技術',
  isbar: 'ISBAR',
  med_safety: '安全核對',
};

export default function CardListPage() {
  const { typeSlug } = useParams();
  const cardType = typeSlug ? SLUG_TO_TYPE[typeSlug] : undefined;
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    if (!cardType) {
      setCards([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    void getCardRepository()
      .list({ type: cardType })
      .then((result) => {
        if (cancelled) return;
        setCards(result);
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [cardType]);

  if (!cardType) {
    return (
      <EmptyState
        title="找不到此分類"
        description="請回到快查首頁重新選擇。"
        action={
          <Link
            to="/reference"
            className="inline text-primary underline-offset-2 hover:underline"
          >
            回到快查
          </Link>
        }
      />
    );
  }

  return (
    <div className="p-4 space-y-4">
      <header className="space-y-2">
        <Link
          to="/reference"
          className="inline -ml-2 inline-flex items-center gap-1 text-sm text-text-muted hover:text-text"
        >
          <ChevronLeft className="size-4" />
          <span>快查</span>
        </Link>
        <h1 className="text-2xl font-semibold">{TYPE_TITLE[cardType]}</h1>
        <p className="text-sm text-text-muted">
          共 {cards.length} 張卡片
        </p>
      </header>

      {loading ? (
        <p className="text-sm text-text-muted px-1">載入中⋯</p>
      ) : cards.length === 0 ? (
        <EmptyState
          icon={<Search className="size-8" />}
          title="此分類尚無內容"
          description="後續步驟會擴充內容卡片。"
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
