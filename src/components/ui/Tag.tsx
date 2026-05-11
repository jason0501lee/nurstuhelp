import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  /** Subtle inline label, primarily for keywords inside dense text. */
}

export function Tag({ className, children, ...rest }: TagProps) {
  return (
    <span
      className={cn(
        'inline-block rounded-md bg-bg text-text-muted text-xs px-1.5 py-0.5 border border-border',
        className,
      )}
      {...rest}
    >
      {children}
    </span>
  );
}
