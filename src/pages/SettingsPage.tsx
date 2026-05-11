import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Trash2, Info } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Modal } from '@/components/ui/Modal';
import { BUNDLE_VERSION } from '@/data/bundle';
import { getUserStateRepository } from '@/repositories';
import { reloadFavorites } from '@/features/favorites/store';
import { reloadRecents } from '@/features/recents/store';
import { reloadIntercepts } from '@/features/intercepts/store';
import { setOnboardingAccepted } from '@/stores/useOnboardingStore';

export default function SettingsPage() {
  const [confirmClear, setConfirmClear] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);

  const handleClearLocal = async () => {
    await getUserStateRepository().clearAll();
    await Promise.all([reloadFavorites(), reloadRecents(), reloadIntercepts()]);
    setConfirmClear(false);
  };

  const handleResetOnboarding = () => {
    setOnboardingAccepted(false);
    setConfirmReset(false);
  };

  return (
    <div className="p-4 space-y-4">
      <Link
        to="/"
        className="inline -ml-2 inline-flex items-center gap-1 text-sm text-text-muted hover:text-text"
      >
        <ChevronLeft className="size-4" />
        <span>首頁</span>
      </Link>

      <header className="space-y-1">
        <h1 className="text-2xl font-semibold">設定</h1>
      </header>

      <Card>
        <div className="flex items-start gap-2">
          <Info className="size-5 text-info mt-0.5" aria-hidden />
          <div className="flex-1">
            <h2 className="font-semibold">內容包資訊</h2>
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
        <h2 className="font-semibold">本地紀錄</h2>
        <p className="text-sm text-text-muted mt-1">
          所有資料皆儲存在裝置本地，不會上傳。包含：收藏 / 最近開啟 / 攔截紀錄。
        </p>
        <div className="mt-3">
          <Button
            variant="secondary"
            leadingIcon={<Trash2 className="size-4" />}
            onClick={() => setConfirmClear(true)}
          >
            清除所有本地紀錄
          </Button>
        </div>
      </Card>

      <Card>
        <h2 className="font-semibold">隱私與遙測</h2>
        <p className="text-sm text-text-muted mt-1">
          本 App 不會收集個人或病人資訊。MVP 不提供雲端帳號。
        </p>
        <p className="text-xs text-text-muted mt-2">
          匿名使用統計：已關閉（v2 將提供開關）。
        </p>
      </Card>

      <Card>
        <h2 className="font-semibold">使用同意</h2>
        <p className="text-sm text-text-muted mt-1">
          若想重新閱讀啟用同意，可重置 onboarding。
        </p>
        <div className="mt-3">
          <Button
            variant="ghost"
            onClick={() => setConfirmReset(true)}
          >
            重置 onboarding
          </Button>
        </div>
      </Card>

      <Modal
        open={confirmClear}
        title="清除所有本地紀錄？"
        description="包含收藏、最近開啟、攔截紀錄。此動作無法復原。"
        onClose={() => setConfirmClear(false)}
        tone="warn"
        footer={
          <div className="flex gap-2 justify-end">
            <Button variant="secondary" onClick={() => setConfirmClear(false)}>
              取消
            </Button>
            <Button variant="critical" onClick={handleClearLocal}>
              清除
            </Button>
          </div>
        }
      >
        <p className="text-sm">
          這只會清除本裝置上的個人使用紀錄。內容卡片、設定不會受影響。
        </p>
      </Modal>

      <Modal
        open={confirmReset}
        title="重置 onboarding？"
        description="下次進入 App 時會再次顯示使用同意畫面。"
        onClose={() => setConfirmReset(false)}
        footer={
          <div className="flex gap-2 justify-end">
            <Button variant="secondary" onClick={() => setConfirmReset(false)}>
              取消
            </Button>
            <Button variant="primary" onClick={handleResetOnboarding}>
              重置
            </Button>
          </div>
        }
      >
        <p className="text-sm">
          重置後，下次任何受保護頁面會跳轉到 /onboarding 重新閱讀並同意。
        </p>
      </Modal>
    </div>
  );
}
