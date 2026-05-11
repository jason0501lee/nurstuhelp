import { useMemo } from 'react';
import { ShieldCheck } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { useIntercepts } from '@/features/intercepts/hooks/useIntercepts';

function isToday(iso: string, now: Date = new Date()): boolean {
  const d = new Date(iso);
  return (
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate()
  );
}

/**
 * Today's intercept tally — driven by the in-memory intercept store.
 * Shows nothing if the user has not yet completed a MedCheck (no
 * empty-state celebration to keep clinical UI low-key).
 */
export function InterceptCounter() {
  const list = useIntercepts();
  const todayCompleted = useMemo(
    () =>
      list.filter(
        (e) => e.context === 'medcheck_complete' && isToday(e.occurredAt),
      ).length,
    [list],
  );

  if (todayCompleted === 0) {
    return null;
  }

  return (
    <Card className="bg-success-soft border-success/30">
      <div className="flex items-start gap-2">
        <ShieldCheck className="size-5 text-success mt-0.5" aria-hidden />
        <div className="text-sm">
          <p className="font-medium text-success">本日攔截紀錄</p>
          <p className="text-text-muted">
            完成 三讀六對 × {todayCompleted}（不含病人資料）
          </p>
        </div>
      </div>
    </Card>
  );
}
