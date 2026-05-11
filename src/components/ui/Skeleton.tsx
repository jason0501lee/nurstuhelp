import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  /** Tailwind height utility (default `h-4`). */
  h?: string;
  /** Tailwind width utility (default `w-full`). */
  w?: string;
  rounded?: boolean;
}

/**
 * Clinically calm loading placeholder — a single subtle pulse, no
 * spinners. Use sparingly; many app surfaces load synchronously.
 */
export function Skeleton({
  className,
  h = 'h-4',
  w = 'w-full',
  rounded = true,
  ...rest
}: SkeletonProps) {
  return (
    <div
      aria-hidden
      className={cn(
        'bg-bg animate-pulse',
        rounded && 'rounded',
        h,
        w,
        className,
      )}
      {...rest}
    />
  );
}
