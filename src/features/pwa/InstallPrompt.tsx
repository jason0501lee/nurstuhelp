import { useEffect, useState } from 'react';
import { Download, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';

/**
 * Vendor-typed beforeinstallprompt event. Chrome / Edge / Samsung
 * Internet fire this; Safari does not (iOS users are guided via the
 * share-sheet "Add to Home Screen" — see the inline iOS hint).
 */
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const DISMISSED_KEY = 'nurstuhelp:install-dismissed-at';
const DISMISS_COOLDOWN_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

function isRecentlyDismissed(): boolean {
  try {
    const raw = window.localStorage.getItem(DISMISSED_KEY);
    if (!raw) return false;
    const ts = Number.parseInt(raw, 10);
    if (!Number.isFinite(ts)) return false;
    return Date.now() - ts < DISMISS_COOLDOWN_MS;
  } catch {
    return false;
  }
}

function markDismissed() {
  try {
    window.localStorage.setItem(DISMISSED_KEY, Date.now().toString());
  } catch {
    /* ignore */
  }
}

/**
 * Compact install affordance. Hides itself when the app is already
 * installed (display-mode: standalone) or when the user recently
 * dismissed the prompt.
 */
export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia?.('(display-mode: standalone)').matches) return;
    if (isRecentlyDismissed()) return;

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setVisible(true);
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  if (!visible) return null;

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    try {
      await deferredPrompt.prompt();
      const result = await deferredPrompt.userChoice;
      if (result.outcome === 'dismissed') markDismissed();
    } finally {
      setVisible(false);
      setDeferredPrompt(null);
    }
  };

  const handleDismiss = () => {
    markDismissed();
    setVisible(false);
  };

  return (
    <section
      role="region"
      aria-label="安裝到主畫面"
      className="rounded-card border border-primary/30 bg-primary/5 p-3 flex items-start gap-3"
    >
      <Download className="size-5 text-primary mt-0.5" aria-hidden />
      <div className="flex-1">
        <p className="font-medium text-text">安裝到主畫面</p>
        <p className="text-sm text-text-muted mt-0.5">
          將 NurStuHelp 加到桌面 / 主畫面，下次打開更快且支援離線。
        </p>
        <div className="flex gap-2 mt-2">
          <Button size="sm" variant="primary" onClick={handleInstall}>
            安裝
          </Button>
          <Button size="sm" variant="ghost" onClick={handleDismiss}>
            稍後
          </Button>
        </div>
      </div>
      <button
        type="button"
        onClick={handleDismiss}
        aria-label="關閉"
        className="inline -mr-1 -mt-1 p-2 text-text-muted hover:text-text rounded-btn"
      >
        <X className="size-4" />
      </button>
    </section>
  );
}
