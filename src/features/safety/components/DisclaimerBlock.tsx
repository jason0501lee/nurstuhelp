import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { DISCLAIMERS, type DiscKey } from '../copy';
import { cn } from '@/lib/cn';

interface DisclaimerBlockProps {
  kind: DiscKey;
  /** When true, the body is collapsed by default (only header is shown). */
  collapsible?: boolean;
  defaultOpen?: boolean;
  className?: string;
}

/**
 * Lightweight version of the safety surface for inline / footer use.
 * Renders the registered disclaimer with a calmer visual than
 * SafetyBanner — meant for the bottom of a card or the footer of a
 * page where the message is reinforcing context, not blocking action.
 */
export function DisclaimerBlock({
  kind,
  collapsible = false,
  defaultOpen = true,
  className,
}: DisclaimerBlockProps) {
  const [open, setOpen] = useState(defaultOpen);
  const content = DISCLAIMERS[kind];
  const bodyLines = Array.isArray(content.body) ? content.body : [content.body];

  return (
    <section
      aria-label={content.title}
      className={cn(
        'rounded-card border border-border bg-bg/60 px-3 py-2 text-sm text-text-muted',
        className,
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <p className="font-medium text-text">{content.title}</p>
        {collapsible && (
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label={open ? '收起' : '展開'}
            className="inline -mr-2 p-2 rounded-btn hover:bg-bg"
          >
            {open ? (
              <ChevronUp className="size-4" />
            ) : (
              <ChevronDown className="size-4" />
            )}
          </button>
        )}
      </div>
      {open &&
        (bodyLines.length === 1 ? (
          <p className="mt-1 leading-snug">{bodyLines[0]}</p>
        ) : (
          <ul className="mt-1 list-disc list-inside leading-snug space-y-0.5">
            {bodyLines.map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ul>
        ))}
    </section>
  );
}
