import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
  leading?: ReactNode;
}

/**
 * Tappable, chip-style affordance for quick actions and filters.
 * Always has a min tap target via the base button styles.
 */
export const Chip = forwardRef<HTMLButtonElement, ChipProps>(function Chip(
  { selected, leading, className, children, ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      type="button"
      aria-pressed={selected}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-3 h-10 text-sm border transition',
        selected
          ? 'bg-primary text-primary-fg border-primary'
          : 'bg-surface text-text border-border hover:bg-bg',
        className,
      )}
      {...rest}
    >
      {leading}
      <span className="truncate">{children}</span>
    </button>
  );
});
