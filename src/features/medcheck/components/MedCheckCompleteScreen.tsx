import { Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

interface MedCheckCompleteScreenProps {
  onReset: () => void;
}

export function MedCheckCompleteScreen({ onReset }: MedCheckCompleteScreenProps) {
  return (
    <div className="space-y-4">
      <Card className="border-success/40 bg-success-soft/50">
        <div className="flex items-start gap-2">
          <ShieldCheck className="size-5 text-success mt-0.5" aria-hidden />
          <div>
            <h2 className="text-base font-semibold text-success">完成核對</h2>
            <p className="text-sm text-text-muted mt-1">
              已完成輔助再核對。最終給藥責任仍在您與監督您的護理人員。
              本次紀錄已存入「本日攔截紀錄」（不含病人資料）。
            </p>
          </div>
        </div>
      </Card>

      <Card>
        <h2 className="text-sm font-semibold">建議下一步</h2>
        <ol className="mt-2 list-decimal list-inside text-sm space-y-1">
          <li>於護理紀錄登錄給藥時間、劑量、途徑與執行者。</li>
          <li>依藥物特性與單位規範安排觀察。</li>
          <li>觀察期間有異常 → 依單位規範回報。</li>
        </ol>
      </Card>

      <div className="flex gap-2 justify-end">
        <Button variant="secondary" onClick={onReset}>
          再做一次
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
