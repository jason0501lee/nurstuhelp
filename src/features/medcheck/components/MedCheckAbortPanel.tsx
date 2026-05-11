import { ChevronRight, Octagon } from 'lucide-react';
import type { RedFlag } from '@/types/safety';

interface MedCheckAbortPanelProps {
  abortConditions: readonly RedFlag[];
  onAbort: (reason: string) => void;
}

/**
 * Always-visible panel under the active step listing the card-defined
 * abort conditions. Tapping any condition jumps the session to SB-5.
 */
export function MedCheckAbortPanel({
  abortConditions,
  onAbort,
}: MedCheckAbortPanelProps) {
  return (
    <section
      aria-label="中止條件"
      className="rounded-card border border-critical/30 bg-critical-soft/50 p-3"
    >
      <h2 className="flex items-center gap-2 text-sm font-semibold text-critical">
        <Octagon className="size-4" aria-hidden />
        如果發生下列任一情況，請停下並通報
      </h2>
      <ul className="mt-2 space-y-1.5">
        {abortConditions.map((rf, i) => (
          <li key={i}>
            <button
              type="button"
              onClick={() => onAbort(rf.trigger)}
              className="w-full flex items-center justify-between gap-2 rounded-btn bg-surface border border-critical/30 px-3 py-2 text-left hover:bg-critical-soft active:bg-critical-soft"
            >
              <span className="text-sm text-text leading-snug flex-1">
                {rf.trigger}
              </span>
              <ChevronRight className="size-4 text-critical shrink-0" aria-hidden />
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
