import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/cn';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'ghost'
  | 'critical'
  | 'success';

export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  /** Slot for an icon rendered before the label. */
  leadingIcon?: ReactNode;
  /** Slot for an icon rendered after the label. */
  trailingIcon?: ReactNode;
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    'bg-primary text-primary-fg hover:bg-primary-hover active:bg-primary-hover',
  secondary:
    'bg-surface text-text border border-border hover:bg-bg',
  ghost: 'bg-transparent text-text hover:bg-bg',
  critical:
    'bg-critical text-white hover:opacity-90 active:opacity-90',
  success: 'bg-success text-white hover:opacity-90 active:opacity-90',
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: 'h-10 px-3 text-sm rounded-btn',
  md: 'h-11 px-4 text-base rounded-btn',
  lg: 'h-12 px-5 text-base rounded-btn',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'primary',
    size = 'md',
    fullWidth,
    leadingIcon,
    trailingIcon,
    className,
    disabled,
    children,
    type,
    ...rest
  },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type ?? 'button'}
      className={cn(
        'inline-flex items-center justify-center gap-2 font-medium transition select-none',
        'disabled:opacity-50 disabled:pointer-events-none',
        VARIANT_CLASSES[variant],
        SIZE_CLASSES[size],
        fullWidth && 'w-full',
        className,
      )}
      disabled={disabled}
      {...rest}
    >
      {leadingIcon && <span className="shrink-0">{leadingIcon}</span>}
      <span className="truncate">{children}</span>
      {trailingIcon && <span className="shrink-0">{trailingIcon}</span>}
    </button>
  );
});
