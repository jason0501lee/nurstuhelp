import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import type { DiseaseCard } from '@/types/cards/disease';

const PRIORITY_TONE = {
  critical: 'critical',
  high: 'warn',
  normal: 'neutral',
} as const;

const PRIORITY_LABEL = {
  critical: '緊急',
  high: '高',
  normal: '一般',
} as const;

interface DiseaseBodyProps {
  card: DiseaseCard;
}

export function DiseaseBody({ card }: DiseaseBodyProps) {
  return (
    <div className="space-y-4">
      <Card>
        <h2 className="font-semibold">一句話定義</h2>
        <p className="text-sm mt-1 leading-relaxed">
          {card.oneLinerDefinition}
        </p>
        {card.icd10 && card.icd10.length > 0 && (
          <p className="text-xs text-text-muted mt-2">
            ICD-10：{card.icd10.join('、')}
          </p>
        )}
      </Card>

      <Card>
        <h2 className="font-semibold">病生理概念</h2>
        <p className="text-sm mt-1 leading-relaxed">
          {card.pathophysiologyBrief}
        </p>
      </Card>

      <Card>
        <h2 className="font-semibold">典型表現</h2>
        <ul className="mt-2 list-disc list-inside text-sm space-y-1">
          {card.typicalPresentation.map((it, i) => (
            <li key={i}>{it}</li>
          ))}
        </ul>
      </Card>

      <Card>
        <h2 className="font-semibold">常見檢查</h2>
        <ul className="mt-2 list-disc list-inside text-sm space-y-1">
          {card.keyInvestigations.map((it, i) => (
            <li key={i}>{it}</li>
          ))}
        </ul>
      </Card>

      <Card>
        <h2 className="font-semibold">治療概念（學習參考）</h2>
        <p className="text-xs text-text-muted mt-1">
          個別治療以主治醫師判斷與最新醫囑為準。
        </p>
        <p className="text-sm mt-2 leading-relaxed">{card.treatmentOverview}</p>
      </Card>

      <Card className="border-primary/30">
        <h2 className="font-semibold text-primary">護理重點 ⭐</h2>
        <ul className="mt-2 space-y-2">
          {card.nursingPriorities.map((p, i) => (
            <li key={i} className="text-sm">
              <div className="flex items-baseline gap-2">
                <Badge tone={PRIORITY_TONE[p.priority]}>
                  {PRIORITY_LABEL[p.priority]}
                </Badge>
                <span className="font-medium">{p.point}</span>
              </div>
              {p.rationale && (
                <p className="text-text-muted text-xs mt-1 ml-1">
                  {p.rationale}
                </p>
              )}
            </li>
          ))}
        </ul>
      </Card>

      {card.complications.length > 0 && (
        <Card>
          <h2 className="font-semibold">併發症</h2>
          <ul className="mt-2 list-disc list-inside text-sm space-y-1">
            {card.complications.map((it, i) => (
              <li key={i}>{it}</li>
            ))}
          </ul>
        </Card>
      )}
    </div>
  );
}
