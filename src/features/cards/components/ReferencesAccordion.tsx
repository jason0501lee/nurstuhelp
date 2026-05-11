import { useState } from 'react';
import { ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import type { Reference } from '@/types/safety';
import { SOURCE_TYPE_LABELS } from '@/data/dictionaries';

interface ReferencesAccordionProps {
  references: readonly Reference[];
}

export function ReferencesAccordion({ references }: ReferencesAccordionProps) {
  const [open, setOpen] = useState(false);
  if (references.length === 0) return null;

  return (
    <section className="rounded-card border border-border bg-surface overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="inline w-full flex items-center justify-between gap-2 px-4 py-3 text-left hover:bg-bg"
      >
        <h2 className="text-sm font-semibold text-text">
          資料來源（{references.length}）
        </h2>
        {open ? (
          <ChevronUp className="size-5 text-text-muted" aria-hidden />
        ) : (
          <ChevronDown className="size-5 text-text-muted" aria-hidden />
        )}
      </button>
      {open && (
        <ol className="divide-y divide-border text-sm">
          {references.map((ref, i) => (
            <li key={i} className="px-4 py-3 flex flex-col gap-1">
              <p className="leading-snug">{ref.citation}</p>
              <div className="flex flex-wrap items-center gap-2 text-xs text-text-muted">
                <span>{SOURCE_TYPE_LABELS[ref.sourceType]}</span>
                {ref.accessedAt && <span>· {ref.accessedAt}</span>}
                {ref.url && (
                  <a
                    href={ref.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline -my-1 inline-flex items-center gap-1 text-info hover:underline"
                  >
                    來源連結
                    <ExternalLink className="size-3" aria-hidden />
                  </a>
                )}
              </div>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
