import { Construction } from 'lucide-react';

interface PagePlaceholderProps {
  title: string;
  step: string;
  pendingItems?: string[];
}

/**
 * Generic placeholder used by Step 1 to verify routing.
 * Each page will be replaced with its real implementation in later steps.
 */
export function PagePlaceholder({
  title,
  step,
  pendingItems = [],
}: PagePlaceholderProps) {
  return (
    <section className="p-4 space-y-4">
      <header className="space-y-1">
        <p className="text-xs uppercase tracking-wider text-text-muted">
          {step} · placeholder
        </p>
        <h1 className="text-2xl font-semibold">{title}</h1>
      </header>

      <div className="rounded-card border border-border bg-surface p-4 flex gap-3 items-start">
        <Construction className="size-5 text-warn mt-0.5 shrink-0" aria-hidden />
        <div className="text-sm text-text-muted space-y-2">
          <p>此頁面為 Step 1 骨架佔位，將於後續步驟實作。</p>
          {pendingItems.length > 0 && (
            <ul className="list-disc list-inside space-y-0.5">
              {pendingItems.map((it) => (
                <li key={it}>{it}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
