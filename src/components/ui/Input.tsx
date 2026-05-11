import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, invalid, leadingIcon, trailingIcon, ...rest },
  ref,
) {
  const hasIcon = !!(leadingIcon || trailingIcon);
  if (!hasIcon) {
    return (
      <input
        ref={ref}
        className={cn(
          'w-full h-11 px-3 rounded-btn bg-surface border text-base placeholder:text-text-muted/70',
          invalid
            ? 'border-critical focus:outline-critical'
            : 'border-border focus:outline-primary',
          className,
        )}
        aria-invalid={invalid || undefined}
        {...rest}
      />
    );
  }
  return (
    <div
      className={cn(
        'flex items-center w-full h-11 rounded-btn bg-surface border px-2',
        invalid ? 'border-critical' : 'border-border',
        className,
      )}
    >
      {leadingIcon && <span className="px-1 text-text-muted">{leadingIcon}</span>}
      <input
        ref={ref}
        aria-invalid={invalid || undefined}
        className="flex-1 bg-transparent outline-none px-1 text-base placeholder:text-text-muted/70"
        {...rest}
      />
      {trailingIcon && (
        <span className="px-1 text-text-muted">{trailingIcon}</span>
      )}
    </div>
  );
});
