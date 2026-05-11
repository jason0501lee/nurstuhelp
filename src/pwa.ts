import { registerSW } from 'virtual:pwa-register';

/**
 * Registers the service worker. Uses autoUpdate, so on every refresh
 * we check for a new content bundle and pull it in. When a fresh
 * worker is waiting we surface a low-key confirmation so the student
 * doesn't lose their place — they can finish what they're doing and
 * choose when to reload.
 */
export function registerPWA(): void {
  if (typeof window === 'undefined') return;

  const updateSW = registerSW({
    immediate: true,
    onNeedRefresh() {
      // Defer to the next user-initiated action — never auto-reload
      // mid-flow. A simple confirm() keeps the install path zero-cost
      // for MVP. Step 16 (post-MVP) can swap in a real toast.
      const accept = window.confirm(
        'NurStuHelp 有新版內容可用，是否立即更新？',
      );
      if (accept) void updateSW(true);
    },
    onOfflineReady() {
      if (import.meta.env.DEV) {
        // eslint-disable-next-line no-console
        console.info('[PWA] ready for offline use');
      }
    },
    onRegistered(registration) {
      if (import.meta.env.DEV) {
        // eslint-disable-next-line no-console
        console.info('[PWA] service worker registered', registration?.scope);
      }
    },
    onRegisterError(error) {
      // eslint-disable-next-line no-console
      console.warn('[PWA] service worker registration failed', error);
    },
  });
}
