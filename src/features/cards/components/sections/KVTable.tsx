import type { KVRow } from '@/types/safety';

interface KVTableProps {
  rows: readonly KVRow[];
}

export function KVTable({ rows }: KVTableProps) {
  return (
    <dl className="divide-y divide-border rounded-card border border-border bg-surface">
      {rows.map((row, i) => (
        <div key={i} className="grid grid-cols-3 gap-3 px-3 py-2 text-sm">
          <dt className="font-medium text-text col-span-1">{row.key}</dt>
          <dd className="text-text-muted col-span-2 leading-snug">
            {row.value}
            {row.note && (
              <span className="block text-xs text-text-muted/80 mt-0.5">
                {row.note}
              </span>
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
}
