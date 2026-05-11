import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useOnboardingAccepted } from '@/stores/useOnboardingStore';

interface OnboardingGateProps {
  children: ReactNode;
}

/**
 * Blocks the app shell behind the onboarding consent (DISC-D1). The
 * gate runs synchronously because the acceptance flag lives in
 * localStorage — IndexedDB lookups would flash the home page before
 * redirecting.
 */
export function OnboardingGate({ children }: OnboardingGateProps) {
  const accepted = useOnboardingAccepted();
  const location = useLocation();

  if (!accepted) {
    return (
      <Navigate to="/onboarding" state={{ from: location }} replace />
    );
  }
  return <>{children}</>;
}
