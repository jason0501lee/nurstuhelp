import { AlertOctagon } from 'lucide-react';
import type { RedFlag } from '@/types/safety';
import { Card } from '@/components/ui/Card';

interface RedFlagListProps {
  redFlags: readonly RedFlag[];
}

/**
 * Renders the "看到這些立刻停下" red flags. Distinct visual from
 * caution so students learn to recognise them. Every actionHint uses
 * direction-only language (validated at authoring time).
 */
export function RedFlagList({ redFlags }: RedFlagListProps) {
  if (redFlags.length === 0) return null;
  return (
    <Card className="border-critical/30 bg-critical-soft/40">
      <h2 className="flex items-center gap-2 text-sm font-semibold text-critical">
        <AlertOctagon className="size-4" aria-hidden />
        看到下列情況請停下
      </h2>
      <ul className="mt-2 space-y-2 text-sm">
        {redFlags.map((rf, i) => (
          <li key={i} className="leading-snug">
            <p className="font-medium text-text">{rf.trigger}</p>
            <p className="text-text-muted">→ {rf.actionHint}</p>
          </li>
        ))}
      </ul>
    </Card>
  );
}
