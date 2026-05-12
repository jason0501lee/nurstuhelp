import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { CardListItem } from '@/features/cards/components/CardListItem';
import { EmptyState } from '@/components/ui/EmptyState';
import { getCardRepository } from '@/repositories';
import type { Card } from '@/types/card';
import type { AssessmentDomain } from '@/types/cards/assessment';

const DOMAIN_TITLE: Record<AssessmentDomain, string> = {
  physical: '身體評估',
  psychological: '心理評估',
  social: '社會評估',
};

function isValidDomain(value: string | undefined): value is AssessmentDomain {
  return value === 'physical' || value === 'psychological' || value === 'social';
}

export default function AssessmentListPage() {
  const { domain } = useParams();
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    if (!isValidDomain(domain)) {
      setCards([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    void getCardRepository()
      .list({ type: 'assessment' })
      .then((result) => {
        if (cancelled) return;
        const filtered = result.filter(
          (c) => c.type === 'assessment' && c.domain === domain,
        );
        setCards(filtered);
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [domain]);

  if (!isValidDomain(domain)) {
    return (
      <EmptyState
        title="找不到此評估面向"
        description="請回到基本評估首頁重新選擇。"
        action={
          <Link to="/reference/assessment" className="text-primary">
            回到基本評估
          </Link>
        }
      />
    );
  }

  return (
    <div className="p-4 space-y-4">
      <Link
        to="/reference/assessment"
        className="inline -ml-2 inline-flex items-center gap-1 text-sm text-text-muted hover:text-text"
      >
        <ChevronLeft className="size-4" />
        <span>基本評估</span>
      </Link>

      <header className="space-y-2">
        <h1 className="text-2xl font-semibold">{DOMAIN_TITLE[domain]}</h1>
        <p className="text-sm text-text-muted">共 {cards.length} 張卡片</p>
      </header>

      {loading ? (
        <p className="text-sm text-text-muted px-1">載入中⋯</p>
      ) : cards.length === 0 ? (
        <EmptyState title="此分類尚無內容" />
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
