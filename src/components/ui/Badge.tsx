import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/cn';

export type BadgeTone =
  | 'neutral'
  | 'primary'
  | 'info'
  | 'warn'
  | 'critical'
  | 'success';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
  /** Soft (filled with -soft bg) vs solid. */
  soft?: boolean;
  /** Optional leading icon. */
  leading?: ReactNode;
}

const TONE_SOFT: Record<BadgeTone, string> = {
  neutral: 'bg-bg text-text border border-border',
  primary: 'bg-primary/10 text-primary',
  info: 'bg-info-soft text-info',
  warn: 'bg-warn-soft text-warn',
  critical: 'bg-critical-soft text-critical',
  success: 'bg-success-soft text-success',
};

const TONE_SOLID: Record<BadgeTone, string> = {
  neutral: 'bg-text/10 text-text',
  primary: 'bg-primary text-primary-fg',
  info: 'bg-info text-white',
  warn: 'bg-warn text-white',
  critical: 'bg-critical text-white',
  success: 'bg-success text-white',
};

export function Badge({
  tone = 'neutral',
  soft = true,
  leading,
  className,
  children,
  ...rest
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium align-middle',
        soft ? TONE_SOFT[tone] : TONE_SOLID[tone],
        className,
      )}
      {...rest}
    >
      {leading}
      {children}
    </span>
  );
}
