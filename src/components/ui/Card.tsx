import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

/**
 * Generic content container.
 *
 * Disambiguation note: this is the UI surface — the *content* Card
 * (BaseCard / DrugCard etc.) is a data type. The two never meet here.
 */
interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Removes default padding. */
  padded?: boolean;
  /** Whether to draw the border (default true). */
  bordered?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { className, padded = true, bordered = true, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn(
        'bg-surface rounded-card',
        bordered && 'border border-border',
        padded && 'p-4',
        className,
      )}
      {...rest}
    />
  );
});
