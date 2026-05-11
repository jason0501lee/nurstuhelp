import type { ComparisonColumn } from '@/types/safety';

interface ComparisonTableProps {
  columns: readonly ComparisonColumn[];
}

/**
 * Side-by-side comparison. On mobile widths the columns stack into
 * two cards; the visual difference between left/right is kept via
 * subtle column heading colours rather than icons.
 */
export function ComparisonTable({ columns }: ComparisonTableProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
      {columns.map((col, i) => (
        <section
          key={i}
          className="rounded-card border border-border bg-surface p-3"
        >
          <h3 className="text-sm font-semibold text-primary mb-1.5">
            {col.label}
          </h3>
          <ul className="list-disc list-inside space-y-1 text-sm leading-snug">
            {col.bullets.map((b, j) => (
              <li key={j}>{b}</li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
