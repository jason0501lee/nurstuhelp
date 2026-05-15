import { Card } from '@/components/ui/Card';
import type { SOPCard, SOPStep } from '@/types/cards/sop';
import { CautionList } from '../CautionList';

interface SOPBodyProps {
  card: SOPCard;
}

function StepList({ steps }: { steps: SOPStep[] }) {
  if (steps.length === 0) return null;
  return (
    <ol className="mt-2 space-y-3 list-decimal list-outside ml-5 text-sm">
      {steps.map((s) => (
        <li key={s.index}>
          <p>{s.text}</p>
          {s.why && (
            <p className="text-xs text-text-muted mt-1">理由：{s.why}</p>
          )}
          {s.warning && (
            <div className="mt-1">
              <CautionList cautions={[s.warning]} />
            </div>
          )}
        </li>
      ))}
    </ol>
  );
}

export function SOPBody({ card }: SOPBodyProps) {
  return (
    <div className="space-y-4">
      <Card>
        <p className="text-xs uppercase tracking-wider text-text-muted">
          {card.procedureName}
        </p>
        <h2 className="font-semibold mt-1">
          能力分級：{
            card.competencyLevel === 'basic'
              ? '基礎'
              : card.competencyLevel === 'intermediate'
                ? '中階'
                : '進階'
          }
        </h2>
        {card.estimatedDuration && (
          <p className="text-sm text-text-muted mt-1">
            預估時間：{card.estimatedDuration}
          </p>
        )}
      </Card>

      {card.equipment.length > 0 && (
        <Card>
          <h2 className="font-semibold">備物</h2>
          <ul className="mt-2 list-disc list-inside text-sm space-y-1">
            {card.equipment.map((e, i) => (
              <li key={i}>
                {e.name}
                {e.spec && (
                  <span className="text-text-muted">（{e.spec}）</span>
                )}
                {e.optional && (
                  <span className="text-text-muted text-xs ml-1">(選用)</span>
                )}
              </li>
            ))}
          </ul>
        </Card>
      )}

      <Card>
        <h2 className="font-semibold">做之前</h2>
        <StepList steps={card.preProcedure} />
      </Card>

      <Card>
        <h2 className="font-semibold">做的時候</h2>
        <StepList steps={card.procedureSteps} />
      </Card>

      <Card>
        <h2 className="font-semibold">做之後</h2>
        <StepList steps={card.postProcedure} />
      </Card>

      {card.commonErrors.length > 0 && (
        <Card className="border-warn/30">
          <h2 className="font-semibold text-warn">雷區（常見錯誤）</h2>
          <ul className="mt-2 list-disc list-inside text-sm space-y-1">
            {card.commonErrors.map((e, i) => (
              <li key={i}>{e}</li>
            ))}
          </ul>
        </Card>
      )}

      {card.documentationPoints.length > 0 && (
        <Card>
          <h2 className="font-semibold">紀錄要點</h2>
          <ul className="mt-2 list-disc list-inside text-sm space-y-1">
            {card.documentationPoints.map((d, i) => (
              <li key={i}>{d}</li>
            ))}
          </ul>
        </Card>
      )}

      <Card className="border-primary/30">
        <p className="text-xs uppercase tracking-wider text-primary">
          單位提醒
        </p>
        <p className="text-sm mt-1 leading-relaxed">{card.institutionalNote}</p>
      </Card>
    </div>
  );
}
