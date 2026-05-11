import { Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';

/**
 * Step 1 minimal onboarding stub.
 * Real DISC-D1 consent + persistence wired in Step 6.
 */
export default function OnboardingPage() {
  return (
    <main className="min-h-dvh bg-bg flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-app rounded-card border border-border bg-surface p-6 space-y-5">
        <div className="flex items-center gap-2 text-primary">
          <ShieldCheck className="size-5" aria-hidden />
          <p className="text-xs uppercase tracking-wider">
            Step 6 · 待完成
          </p>
        </div>
        <h1 className="text-2xl font-semibold">歡迎使用 NurStuHelp</h1>
        <p className="text-sm text-text-muted leading-relaxed">
          本 App 為護理學生臨床實習階段使用的學習與工作輔助工具，
          內容為一般護理知識、流程提醒與工具，
          <strong className="text-text">不構成診斷、處方或臨床建議</strong>。
          完整 DISC-D1 同意流程將於 Step 6 接入。
        </p>
        <Link
          to="/"
          className="block text-center bg-primary text-primary-fg rounded-btn px-4 py-3 font-medium hover:bg-primary-hover"
        >
          我了解，進入 App
        </Link>
      </div>
    </main>
  );
}
