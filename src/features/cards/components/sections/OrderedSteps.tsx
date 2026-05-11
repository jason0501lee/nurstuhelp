import { AlertTriangle } from 'lucide-react';
import type { StepItem } from '@/types/safety';

interface OrderedStepsProps {
  steps: readonly StepItem[];
}

export function OrderedSteps({ steps }: OrderedStepsProps) {
  return (
    <ol className="space-y-3">
      {steps.map((s) => (
        <li key={s.index} className="flex gap-3">
          <span
            className="shrink-0 size-7 rounded-full bg-bg text-text-muted text-sm font-semibold inline-flex items-center justify-center"
            aria-hidden
          >
            {s.index}
          </span>
          <div className="flex-1 text-sm leading-snug">
            <p className="font-medium text-text">{s.text}</p>
            {s.why && (
              <p className="text-text-muted text-sm mt-1">{s.why}</p>
            )}
            {s.warning && (
              <p className="mt-2 flex items-start gap-1.5 text-warn text-xs">
                <AlertTriangle className="size-4 shrink-0 mt-0.5" aria-hidden />
                <span>{s.warning.message}</span>
              </p>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}
