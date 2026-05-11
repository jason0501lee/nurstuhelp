import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { SafetyBanner } from '@/features/safety/components/SafetyBanner';

interface MedCheckAbortScreenProps {
  reason: string;
  onReset: () => void;
}

/**
 * SB-5 surface. Tells the student to stop and notify, and offers no
 * shortcut to keep going — the only paths are "回到首頁" or "重新開始"
 * (which restarts the flow from the SB-4 gate).
 */
export function MedCheckAbortScreen({
  reason,
  onReset,
}: MedCheckAbortScreenProps) {
  return (
    <div className="space-y-4">
      <SafetyBanner kind="SB-5" />

      <Card className="border-critical/30">
        <h2 className="text-sm font-semibold text-critical">您選了</h2>
        <p className="mt-1 text-text leading-snug">{reason}</p>
      </Card>

      <Card>
        <h2 className="text-sm font-semibold">接下來</h2>
        <ol className="mt-2 list-decimal list-inside text-sm space-y-1">
          <li>停止給藥。</li>
          <li>通報您的帶教老師 / 護理人員，依單位規範跟進。</li>
          <li>不要自行修改處方或紀錄。</li>
        </ol>
        <p className="text-xs text-text-muted mt-3">
          本次中止已記錄為攔截事件（不含病人資料）。
        </p>
      </Card>

      <div className="flex gap-2 justify-end">
        <Button variant="secondary" onClick={onReset}>
          重新開始
        </Button>
        <Link
          to="/"
          className="inline-flex items-center px-4 h-11 rounded-btn bg-primary text-primary-fg font-medium"
        >
          回到首頁
        </Link>
      </div>
    </div>
  );
}
