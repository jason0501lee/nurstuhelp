import { Check, Circle, X } from 'lucide-react';
import { cn } from '@/lib/cn';

export type StepStatus = 'complete' | 'current' | 'pending' | 'aborted';

export interface StepperItem {
  index: number;
  label: string;
  status: StepStatus;
}

interface StepperProps {
  items: StepperItem[];
  /** Compact horizontal mode (default vertical). */
  horizontal?: boolean;
  className?: string;
}

/**
 * Visual progress indicator used by the MedCheck flow. Read-only —
 * step navigation is owned by the surrounding flow controller.
 */
export function Stepper({ items, horizontal, className }: StepperProps) {
  return (
    <ol
      role="list"
      className={cn(
        horizontal ? 'flex gap-2 overflow-x-auto' : 'space-y-2',
        className,
      )}
    >
      {items.map((it) => (
        <li
          key={it.index}
          className={cn(
            'flex items-center gap-3 rounded-btn px-3 py-2 border',
            it.status === 'current' && 'border-primary bg-primary/5',
            it.status === 'complete' && 'border-success/40 bg-success-soft/40',
            it.status === 'aborted' && 'border-critical/40 bg-critical-soft/40',
            it.status === 'pending' && 'border-border bg-surface',
          )}
          aria-current={it.status === 'current' ? 'step' : undefined}
        >
          <span
            aria-hidden
            className={cn(
              'shrink-0 size-7 rounded-full inline-flex items-center justify-center text-sm font-semibold',
              it.status === 'complete' && 'bg-success text-white',
              it.status === 'current' && 'bg-primary text-primary-fg',
              it.status === 'aborted' && 'bg-critical text-white',
              it.status === 'pending' && 'bg-bg text-text-muted',
            )}
          >
            {it.status === 'complete' ? (
              <Check className="size-4" strokeWidth={3} />
            ) : it.status === 'aborted' ? (
              <X className="size-4" strokeWidth={3} />
            ) : it.status === 'current' ? (
              <span>{it.index}</span>
            ) : (
              <Circle className="size-3" />
            )}
          </span>
          <span
            className={cn(
              'text-sm leading-snug',
              it.status === 'pending' && 'text-text-muted',
            )}
          >
            {it.label}
          </span>
        </li>
      ))}
    </ol>
  );
}
