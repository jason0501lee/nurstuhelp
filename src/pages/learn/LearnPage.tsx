import { Link } from 'react-router-dom';
import { ChevronRight, ShieldCheck, BookOpen, Mail } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { SafetyBanner } from '@/features/safety/components/SafetyBanner';
import { BUNDLE_VERSION } from '@/data/bundle';

export default function LearnPage() {
  return (
    <div className="p-4 space-y-4">
      <header className="space-y-1">
        <p className="text-xs uppercase tracking-wider text-text-muted">學習</p>
        <h1 className="text-2xl font-semibold">關於與安全聲明</h1>
      </header>

      <Card>
        <div className="flex items-start gap-2">
          <BookOpen className="size-5 text-primary mt-0.5" aria-hidden />
          <div>
            <h2 className="font-semibold">關於 NurStuHelp</h2>
            <p className="text-sm text-text-muted mt-1 leading-relaxed">
              專為護理學生臨床實習階段設計的學習與工作輔助工具。
              將最常用的查詢、計算、量表、檢核流程整合在一個離線可用的口袋介面中。
            </p>
          </div>
        </div>
      </Card>

      <SafetyBanner kind="DISC-APP-ONBOARDING" />

      <Card>
        <div className="flex items-start gap-2">
          <ShieldCheck className="size-5 text-success mt-0.5" aria-hidden />
          <div className="flex-1">
            <h2 className="font-semibold">內容版本</h2>
            <dl className="mt-2 text-sm space-y-1">
              <div className="flex justify-between">
                <dt className="text-text-muted">版本</dt>
                <dd className="font-mono">v{BUNDLE_VERSION.version}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-text-muted">內容更新日</dt>
                <dd className="font-mono">{BUNDLE_VERSION.updatedAt}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-text-muted">卡片數量</dt>
                <dd className="font-mono">{BUNDLE_VERSION.cardCount}</dd>
              </div>
            </dl>
          </div>
        </div>
      </Card>

      <Card>
        <h2 className="font-semibold">內容回饋</h2>
        <p className="text-sm text-text-muted mt-1">
          若您發現內容錯誤、過期、措辭過強或缺漏，歡迎回報。
          回報內容請勿包含病人資訊。
        </p>
        <div className="mt-3">
          <a
            href="mailto:feedback@example.invalid"
            className="inline-flex items-center gap-2 text-primary text-sm font-medium"
          >
            <Mail className="size-4" />
            寄送回饋
          </a>
        </div>
      </Card>

      <Link
        to="/settings"
        className="flex items-center justify-between rounded-card border border-border bg-surface p-4 hover:bg-bg"
      >
        <span className="font-medium">設定</span>
        <ChevronRight className="size-4 text-text-muted" aria-hidden />
      </Link>
    </div>
  );
}
