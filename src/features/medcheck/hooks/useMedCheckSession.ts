import { useEffect, useMemo, useReducer } from 'react';
import type { CheckStep, MedCheckCard } from '@/types/cards/medSafety';
import { logIntercept } from '@/features/intercepts/store';

export type MedCheckPhase = 'gate' | 'running' | 'abort' | 'complete';
export type MedCheckStepPhase = 'pre' | 'bedside' | 'post';

interface IndexedStep {
  step: CheckStep;
  phase: MedCheckStepPhase;
  globalIndex: number;
}

type SessionState =
  | { phase: 'gate' }
  | { phase: 'running'; index: number }
  | { phase: 'abort'; reason: string }
  | { phase: 'complete' };

type Action =
  | { type: 'start' }
  | { type: 'next'; totalSteps: number }
  | { type: 'abort'; reason: string }
  | { type: 'reset' };

function reducer(state: SessionState, action: Action): SessionState {
  switch (action.type) {
    case 'start':
      return { phase: 'running', index: 0 };
    case 'next': {
      if (state.phase !== 'running') return state;
      const nextIdx = state.index + 1;
      if (nextIdx >= action.totalSteps) return { phase: 'complete' };
      return { phase: 'running', index: nextIdx };
    }
    case 'abort':
      return { phase: 'abort', reason: action.reason };
    case 'reset':
      return { phase: 'gate' };
    default:
      return state;
  }
}

interface UseMedCheckSessionResult {
  phase: MedCheckPhase;
  index: number;
  total: number;
  current: IndexedStep | null;
  steps: IndexedStep[];
  abortReason?: string;
  start: () => void;
  next: () => void;
  abort: (reason: string) => void;
  reset: () => void;
}

/**
 * State machine for the MedCheck (三讀六對) flow.
 *
 * Phases:
 *   gate      → SB-4 ConfirmGate is open. Default starting phase.
 *   running   → walking the indexed steps (pre / bedside / post).
 *   abort     → SB-5 surface; intercept logged with `medcheck_abort`.
 *   complete  → success surface; intercept logged with `medcheck_complete`.
 *
 * The intercept reason on abort comes from a known card-defined
 * abortCondition string (no free text), so the log stays PII-free.
 */
export function useMedCheckSession(card: MedCheckCard): UseMedCheckSessionResult {
  const steps = useMemo<IndexedStep[]>(() => {
    const out: IndexedStep[] = [];
    let g = 0;
    for (const s of card.preCheckSteps) out.push({ step: s, phase: 'pre', globalIndex: g++ });
    for (const s of card.bedsideSteps) out.push({ step: s, phase: 'bedside', globalIndex: g++ });
    for (const s of card.postAdminSteps) out.push({ step: s, phase: 'post', globalIndex: g++ });
    return out;
  }, [card]);

  const [state, dispatch] = useReducer(reducer, { phase: 'gate' } as SessionState);

  useEffect(() => {
    if (state.phase === 'complete') {
      void logIntercept({ context: 'medcheck_complete' });
    } else if (state.phase === 'abort') {
      void logIntercept({ context: 'medcheck_abort', note: state.reason });
    }
  }, [state.phase, state]);

  const result: UseMedCheckSessionResult = {
    phase: state.phase,
    index: state.phase === 'running' ? state.index : 0,
    total: steps.length,
    current: state.phase === 'running' ? (steps[state.index] ?? null) : null,
    steps,
    abortReason: state.phase === 'abort' ? state.reason : undefined,
    start: () => dispatch({ type: 'start' }),
    next: () => dispatch({ type: 'next', totalSteps: steps.length }),
    abort: (reason: string) => dispatch({ type: 'abort', reason }),
    reset: () => dispatch({ type: 'reset' }),
  };

  return result;
}
