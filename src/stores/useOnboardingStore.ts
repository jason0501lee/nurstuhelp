/**
 * Onboarding acceptance flag.
 *
 * Stored in localStorage (synchronous) so the OnboardingGate can
 * decide synchronously during the first render — IndexedDB would
 * flash the home page before redirecting. Bump the key version when
 * the DISC-D1 wording changes materially, forcing reacceptance.
 */
import { useSyncExternalStore } from 'react';

const KEY = 'nurstuhelp:onboarding:v1';

type Listener = () => void;
const listeners = new Set<Listener>();

function safeGet(): boolean {
  try {
    return typeof window !== 'undefined' && window.localStorage.getItem(KEY) === 'true';
  } catch {
    return false;
  }
}

function safeSet(value: boolean): void {
  try {
    if (typeof window === 'undefined') return;
    if (value) window.localStorage.setItem(KEY, 'true');
    else window.localStorage.removeItem(KEY);
  } catch {
    /* localStorage unavailable */
  }
}

function subscribe(cb: Listener): () => void {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}

export function isOnboardingAccepted(): boolean {
  return safeGet();
}

export function setOnboardingAccepted(value: boolean): void {
  safeSet(value);
  listeners.forEach((l) => l());
}

export function useOnboardingAccepted(): boolean {
  return useSyncExternalStore(subscribe, safeGet, () => false);
}
