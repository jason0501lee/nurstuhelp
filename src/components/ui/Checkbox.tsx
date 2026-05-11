import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/cn';

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: ReactNode;
  description?: ReactNode;
}

/**
 * Accessible labelled checkbox. The actual checkbox is the real
 * `<input>` (semantics for screen readers, form submission, focus
 * ring); the visual square is decorative.
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox(
    { label, description, className, checked, disabled, ...rest },
    ref,
  ) {
    return (
      <label
        className={cn(
          'flex items-start gap-3 py-2 cursor-pointer select-none',
          disabled && 'opacity-50 cursor-not-allowed',
          className,
        )}
      >
        <span className="relative inline-block mt-0.5 shrink-0">
          <input
            ref={ref}
            type="checkbox"
            checked={checked}
            disabled={disabled}
            className="peer sr-only"
            {...rest}
          />
          <span
            aria-hidden
            className={cn(
              'size-5 rounded border flex items-center justify-center transition',
              checked
                ? 'bg-primary border-primary text-primary-fg'
                : 'bg-surface border-border peer-hover:border-text-muted',
            )}
          >
            {checked && <Check className="size-4" strokeWidth={3} />}
          </span>
        </span>
        <span className="flex-1 -mt-0.5">
          <span className="block text-base leading-snug">{label}</span>
          {description && (
            <span className="block text-sm text-text-muted leading-snug mt-0.5">
              {description}
            </span>
          )}
        </span>
      </label>
    );
  },
);
