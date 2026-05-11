import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Checkbox } from '@/components/ui/Checkbox';
import { SafetyBanner } from '@/features/safety/components/SafetyBanner';
import { setOnboardingAccepted } from '@/stores/useOnboardingStore';

interface LocationState {
  from?: { pathname?: string };
}

/**
 * First-launch consent screen. The DISC-D1 wording is read from the
 * safety registry; the consent gate uses two checkpoints, both of
 * which must be ticked before "我了解" enables.
 */
export default function OnboardingPage() {
  const [understood, setUnderstood] = useState(false);
  const [referToTeam, setReferToTeam] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state as LocationState | null) ?? {};
  const targetPath = state.from?.pathname ?? '/';

  const canContinue = understood && referToTeam;

  const handleAccept = () => {
    setOnboardingAccepted(true);
    navigate(targetPath, { replace: true });
  };

  return (
    <main className="min-h-dvh bg-bg flex items-start sm:items-center justify-center px-4 py-8">
      <div className="w-full max-w-app space-y-4">
        <div className="flex items-center gap-2 text-primary">
          <ShieldCheck className="size-5" aria-hidden />
          <p className="text-xs uppercase tracking-wider">第一次使用</p>
        </div>

        <h1 className="text-2xl font-semibold">歡迎使用 NurStuHelp</h1>

        <SafetyBanner kind="DISC-APP-ONBOARDING" />

        <div className="rounded-card border border-border bg-surface p-4 space-y-1">
          <h2 className="text-sm font-semibold text-text">請確認以下兩點</h2>
          <Checkbox
            label="我了解本 App 為學習輔助，不構成診斷、處方或臨床建議。"
            checked={understood}
            onChange={(e) => setUnderstood(e.target.checked)}
          />
          <Checkbox
            label="臨床決策我會以最新醫囑、單位 SOP 及帶教老師指示為準；緊急狀況優先呼叫支援。"
            checked={referToTeam}
            onChange={(e) => setReferToTeam(e.target.checked)}
          />
        </div>

        <Button
          variant="primary"
          size="lg"
          fullWidth
          disabled={!canContinue}
          onClick={handleAccept}
        >
          我了解，進入 App
        </Button>
      </div>
    </main>
  );
}
