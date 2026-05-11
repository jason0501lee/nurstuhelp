import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import type { BodySection } from '@/types/safety';
import { cn } from '@/lib/cn';
import { BulletList } from './sections/BulletList';
import { KVTable } from './sections/KVTable';
import { OrderedSteps } from './sections/OrderedSteps';
import { ParagraphSection } from './sections/ParagraphSection';
import { ComparisonTable } from './sections/ComparisonTable';

interface BodySectionRendererProps {
  section: BodySection;
}

function renderBody(section: BodySection) {
  switch (section.layout) {
    case 'bullet':
      return <BulletList items={section.content} />;
    case 'kv_table':
      return <KVTable rows={section.content} />;
    case 'ordered_steps':
      return <OrderedSteps steps={section.content} />;
    case 'paragraph':
      return <ParagraphSection text={section.content} />;
    case 'comparison':
      return <ComparisonTable columns={section.content} />;
    default: {
      // Exhaustiveness guard — adding a new layout in the type forces
      // a compile error here until the renderer is updated.
      const _exhaustive: never = section;
      void _exhaustive;
      return null;
    }
  }
}

/**
 * Dispatches a single body section to the matching layout renderer.
 * Honours `collapsedByDefault` — students can tap to expand long
 * sections without forcing a scroll.
 */
export function BodySectionRenderer({ section }: BodySectionRendererProps) {
  const [open, setOpen] = useState(!section.collapsedByDefault);

  return (
    <section className="rounded-card border border-border bg-surface overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={`body-${section.key}`}
        className={cn(
          'inline w-full flex items-center justify-between gap-2 px-4 py-3 text-left hover:bg-bg',
        )}
      >
        <h2 className="font-semibold text-text">{section.label}</h2>
        {open ? (
          <ChevronUp className="size-5 text-text-muted" aria-hidden />
        ) : (
          <ChevronDown className="size-5 text-text-muted" aria-hidden />
        )}
      </button>
      {open && (
        <div id={`body-${section.key}`} className="px-4 pb-4">
          {renderBody(section)}
        </div>
      )}
    </section>
  );
}

interface BodySectionsProps {
  sections: readonly BodySection[];
  /** Filter by displayHint; default shows everything except `hidden`. */
  show?: 'front' | 'expanded' | 'all';
}

export function BodySections({ sections, show = 'all' }: BodySectionsProps) {
  const filtered = sections.filter((s) => {
    if (s.displayHint === 'hidden') return false;
    if (show === 'front') return s.displayHint === 'front';
    return true;
  });
  if (filtered.length === 0) return null;
  return (
    <div className="space-y-2">
      {filtered.map((s) => (
        <BodySectionRenderer key={s.key} section={s} />
      ))}
    </div>
  );
}
