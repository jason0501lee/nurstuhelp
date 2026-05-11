import type { Card } from '@/types/card';
import { CardListItem } from '@/features/cards/components/CardListItem';

const TYPE_LABEL: Record<Card['type'], string> = {
  vital_sign: '生命徵象',
  drug: '藥物',
  disease: '疾病',
  health_edu: '衛教',
  sop: 'SOP',
  isbar: 'ISBAR',
  med_safety: '安全核對',
};

interface ResultGroupProps {
  type: Card['type'];
  cards: readonly Card[];
}

export function ResultGroup({ type, cards }: ResultGroupProps) {
  if (cards.length === 0) return null;
  return (
    <section aria-label={`${TYPE_LABEL[type]} 結果`} className="space-y-2">
      <h2 className="text-sm font-semibold text-text-muted px-1">
        {TYPE_LABEL[type]}（{cards.length}）
      </h2>
      <ul className="space-y-2">
        {cards.map((c) => (
          <CardListItem key={c.id} card={c} />
        ))}
      </ul>
    </section>
  );
}
