import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: ReactNode;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center py-10 px-4 gap-3',
        className,
      )}
    >
      {icon && (
        <div className="text-text-muted" aria-hidden>
          {icon}
        </div>
      )}
      <h2 className="text-base font-semibold">{title}</h2>
      {description && (
        <p className="text-sm text-text-muted max-w-sm">{description}</p>
      )}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
