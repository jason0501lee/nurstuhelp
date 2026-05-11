import { forwardRef, type TextareaHTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea({ className, invalid, rows = 3, ...rest }, ref) {
    return (
      <textarea
        ref={ref}
        rows={rows}
        aria-invalid={invalid || undefined}
        className={cn(
          'w-full p-3 rounded-btn bg-surface border text-base resize-y placeholder:text-text-muted/70',
          invalid
            ? 'border-critical focus:outline-critical'
            : 'border-border focus:outline-primary',
          className,
        )}
        {...rest}
      />
    );
  },
);
