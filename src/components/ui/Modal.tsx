import { useEffect, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { cn } from '@/lib/cn';

interface ModalProps {
  open: boolean;
  /** Required when `dismissible` is true. */
  onClose?: () => void;
  title: string;
  description?: string;
  children: ReactNode;
  /**
   * Default true. Safety modals (SB-4 start, SB-5 abort) MUST set this
   * to false so ESC and backdrop click cannot bypass the gate.
   */
  dismissible?: boolean;
  /** Whether to render the corner close icon. Defaults to `dismissible`. */
  showClose?: boolean;
  /** Footer buttons row. */
  footer?: ReactNode;
  /** Tone styles applied around the dialog frame. */
  tone?: 'neutral' | 'critical' | 'warn';
  className?: string;
}

const TONE_RING: Record<NonNullable<ModalProps['tone']>, string> = {
  neutral: '',
  critical: 'ring-2 ring-critical',
  warn: 'ring-2 ring-warn',
};

/**
 * Bottom-sheet on mobile, centered card on ≥ sm. No animation by
 * design — calm clinical UI prefers an instant appearance.
 */
export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  dismissible = true,
  showClose,
  footer,
  tone = 'neutral',
  className,
}: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open || !dismissible) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose?.();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, dismissible, onClose]);

  if (!open) return null;
  const closeVisible = showClose ?? dismissible;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
      role="presentation"
    >
      <div
        className="absolute inset-0 bg-black/40"
        aria-hidden
        onClick={dismissible ? onClose : undefined}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby={description ? 'modal-desc' : undefined}
        className={cn(
          'relative z-10 w-full max-w-app bg-surface shadow-xl',
          'rounded-t-card sm:rounded-card',
          TONE_RING[tone],
          className,
        )}
      >
        <header className="p-4 flex items-start justify-between gap-3 border-b border-border">
          <div className="flex-1">
            <h2 id="modal-title" className="text-lg font-semibold leading-snug">
              {title}
            </h2>
            {description && (
              <p
                id="modal-desc"
                className="text-sm text-text-muted leading-snug mt-1"
              >
                {description}
              </p>
            )}
          </div>
          {closeVisible && onClose && (
            <button
              type="button"
              onClick={onClose}
              aria-label="關閉"
              className="inline -mr-2 p-2 text-text-muted hover:text-text rounded-btn"
            >
              <X className="size-5" />
            </button>
          )}
        </header>
        <div className="p-4 max-h-[70dvh] overflow-y-auto">{children}</div>
        {footer && (
          <footer className="p-4 border-t border-border bg-bg/40 rounded-b-card">
            {footer}
          </footer>
        )}
      </div>
    </div>,
    document.body,
  );
}
