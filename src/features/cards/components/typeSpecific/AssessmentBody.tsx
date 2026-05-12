import { Card } from '@/components/ui/Card';
import type { AssessmentCard } from '@/types/cards/assessment';

interface AssessmentBodyProps {
  card: AssessmentCard;
}

const DOMAIN_LABEL: Record<AssessmentCard['domain'], string> = {
  physical: '身體評估',
  psychological: '心理評估',
  social: '社會評估',
};

export function AssessmentBody({ card }: AssessmentBodyProps) {
  return (
    <div className="space-y-4">
      <Card>
        <p className="text-xs uppercase tracking-wider text-text-muted">
          {DOMAIN_LABEL[card.domain]}
        </p>
        <h2 className="font-semibold mt-1">評估重點（{card.focus}）</h2>
      </Card>

      <Card>
        <h2 className="font-semibold">常見評估內容</h2>
        <ul className="mt-2 list-disc list-inside text-sm space-y-1">
          {card.evaluationItems.map((it, i) => (
            <li key={i}>{it}</li>
          ))}
        </ul>
      </Card>

      <Card>
        <h2 className="font-semibold">臨床觀察重點</h2>
        <ul className="mt-2 list-disc list-inside text-sm space-y-1">
          {card.observationPoints.map((it, i) => (
            <li key={i}>{it}</li>
          ))}
        </ul>
      </Card>

      <Card>
        <h2 className="font-semibold">常見提問與紀錄方式</h2>
        <ul className="mt-2 list-disc list-inside text-sm space-y-1">
          {card.sampleQuestions.map((it, i) => (
            <li key={i}>{it}</li>
          ))}
        </ul>
      </Card>

      {card.documentationTemplate && (
        <Card className="border-primary/30">
          <h2 className="font-semibold text-primary">書寫範例</h2>
          <p className="text-sm mt-2 leading-relaxed font-mono bg-bg rounded-btn p-3 border border-border">
            {card.documentationTemplate}
          </p>
        </Card>
      )}
    </div>
  );
}
