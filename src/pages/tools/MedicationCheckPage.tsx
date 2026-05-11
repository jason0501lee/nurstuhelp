import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { getCardRepository } from '@/repositories';
import type { MedCheckCard } from '@/types/cards/medSafety';
import { SafetyBanner } from '@/features/safety/components/SafetyBanner';
import { ConfirmGate } from '@/features/safety/components/ConfirmGate';
import { useMedCheckSession } from '@/features/medcheck/hooks/useMedCheckSession';
import { MedCheckStepCard } from '@/features/medcheck/components/MedCheckStepCard';
import { MedCheckAbortPanel } from '@/features/medcheck/components/MedCheckAbortPanel';
import { MedCheckAbortScreen } from '@/features/medcheck/components/MedCheckAbortScreen';
import { MedCheckCompleteScreen } from '@/features/medcheck/components/MedCheckCompleteScreen';
import { Stepper, type StepperItem } from '@/components/ui/Stepper';
import { useTrackOpen } from '@/features/recents/hooks/useTrackOpen';

const MED_CHECK_SLUG = 'three-reads-six-rights';

export default function MedicationCheckPage() {
  const [card, setCard] = useState<MedCheckCard | null>(null);

  useEffect(() => {
    let cancelled = false;
    void getCardRepository()
      .getBySlug('med_safety', MED_CHECK_SLUG)
      .then((c) => {
        if (cancelled) return;
        if (c && c.type === 'med_safety') setCard(c);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Track open only when the card resolves.
  useTrackOpen(card?.id);

  if (!card) {
    return <p className="p-4 text-sm text-text-muted">載入中⋯</p>;
  }

  return <MedCheckRunner card={card} />;
}

function phaseSummary(
  card: MedCheckCard,
  current: ReturnType<typeof useMedCheckSession>['current'],
  phase: ReturnType<typeof useMedCheckSession>['phase'],
): StepperItem[] {
  const preTotal = card.preCheckSteps.length;
  const bedsideTotal = card.bedsideSteps.length;
  const postTotal = card.postAdminSteps.length;

  function phaseStatus(
    phaseKey: 'pre' | 'bedside' | 'post',
  ): StepperItem['status'] {
    if (phase === 'abort') {
      return current?.phase === phaseKey ? 'aborted' : 'pending';
    }
    if (phase === 'complete') return 'complete';
    if (!current) return 'pending';
    const order: Array<'pre' | 'bedside' | 'post'> = ['pre', 'bedside', 'post'];
    const curIdx = order.indexOf(current.phase);
    const askIdx = order.indexOf(phaseKey);
    if (askIdx < curIdx) return 'complete';
    if (askIdx === curIdx) return 'current';
    return 'pending';
  }

  return [
    {
      index: 1,
      label: `準備期（${preTotal}）`,
      status: phaseStatus('pre'),
    },
    {
      index: 2,
      label: `床邊核對（${bedsideTotal}）`,
      status: phaseStatus('bedside'),
    },
    {
      index: 3,
      label: `紀錄與觀察（${postTotal}）`,
      status: phaseStatus('post'),
    },
  ];
}

function MedCheckRunner({ card }: { card: MedCheckCard }) {
  const session = useMedCheckSession(card);

  return (
    <div className="p-4 space-y-4">
      <Link
        to="/tools"
        className="inline -ml-2 inline-flex items-center gap-1 text-sm text-text-muted hover:text-text"
      >
        <ChevronLeft className="size-4" />
        <span>工具</span>
      </Link>

      <header className="space-y-1">
        <p className="text-xs uppercase tracking-wider text-text-muted">
          ⭐ MVP 安全爆點
        </p>
        <h1 className="text-2xl font-semibold">{card.title}</h1>
        <p className="text-sm text-text-muted">{card.shortSummary}</p>
      </header>

      <SafetyBanner kind="DISC-MEDCHECK" />

      {session.phase !== 'gate' && (
        <Stepper items={phaseSummary(card, session.current, session.phase)} horizontal />
      )}

      {session.phase === 'gate' && (
        <ConfirmGate
          open
          bannerKey="SB-4"
          confirmLabel="開始核對"
          onConfirm={session.start}
          onCancel={() => history.back()}
        />
      )}

      {session.phase === 'running' && session.current && (
        <>
          <MedCheckStepCard
            step={session.current.step}
            phase={session.current.phase}
            globalIndex={session.current.globalIndex}
            total={session.total}
            onNext={session.next}
          />
          <MedCheckAbortPanel
            abortConditions={card.abortConditions}
            onAbort={session.abort}
          />
        </>
      )}

      {session.phase === 'abort' && session.abortReason && (
        <MedCheckAbortScreen
          reason={session.abortReason}
          onReset={session.reset}
        />
      )}

      {session.phase === 'complete' && (
        <MedCheckCompleteScreen onReset={session.reset} />
      )}
    </div>
  );
}
