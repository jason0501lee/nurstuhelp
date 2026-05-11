import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Checkbox } from '@/components/ui/Checkbox';
import type { CheckStep } from '@/types/cards/medSafety';
import type { MedCheckStepPhase } from '../hooks/useMedCheckSession';

const PHASE_LABEL: Record<MedCheckStepPhase, string> = {
  pre: '準備期',
  bedside: '床邊核對',
  post: '給藥後紀錄',
};

interface MedCheckStepCardProps {
  step: CheckStep;
  phase: MedCheckStepPhase;
  globalIndex: number;
  total: number;
  onNext: () => void;
}

export function MedCheckStepCard({
  step,
  phase,
  globalIndex,
  total,
  onNext,
}: MedCheckStepCardProps) {
  const [confirmed, setConfirmed] = useState(false);

  // Reset on step change.
  useEffect(() => {
    setConfirmed(false);
  }, [step.index]);

  const canAdvance = !step.mustConfirm || confirmed;

  return (
    <Card className="space-y-3">
      <p className="text-xs uppercase tracking-wider text-text-muted">
        {PHASE_LABEL[phase]} · 步驟 {globalIndex + 1} / {total}
      </p>
      <h2 className="text-lg font-semibold leading-snug">{step.text}</h2>
      {step.guidance && (
        <p className="text-sm text-text-muted leading-snug">{step.guidance}</p>
      )}

      {step.mustConfirm && (
        <Checkbox
          label="我已完成此步驟，且結果與處方一致。"
          checked={confirmed}
          onChange={(e) => setConfirmed(e.target.checked)}
        />
      )}

      <div className="flex justify-end">
        <Button
          variant="primary"
          disabled={!canAdvance}
          onClick={onNext}
        >
          {globalIndex + 1 === total ? '完成' : '下一步'}
        </Button>
      </div>
    </Card>
  );
}
