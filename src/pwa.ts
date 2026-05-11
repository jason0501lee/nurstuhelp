import { registerSW } from 'virtual:pwa-register';

/**
 * Registers the service worker.
 * Step 1 uses autoUpdate; UI for update prompt is added in Step 15.
 */
export function registerPWA(): void {
  if (typeof window === 'undefined') return;

  registerSW({
    immediate: true,
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
