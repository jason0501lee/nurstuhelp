import { AlertOctagon } from 'lucide-react';
import type { PiiHit } from '@/lib/piiPatterns';

interface PiiInlineWarningProps {
  hits: readonly PiiHit[];
}

/**
 * Inline (per-field) PII warning. The SB-7 banner at the page top is
 * the source-of-truth surface — this one is the localised hint that
 * tells the student WHICH field needs cleanup.
 */
export function PiiInlineWarning({ hits }: PiiInlineWarningProps) {
  if (hits.length === 0) return null;
  const labels = Array.from(new Set(hits.map((h) => h.label)));
  return (
    <p className="mt-1 flex items-start gap-1.5 text-xs text-critical leading-snug">
      <AlertOctagon className="size-4 shrink-0 mt-0.5" aria-hidden />
      <span>
        偵測到可能的可辨識資料：{labels.join('、')}。請改用代稱（例：床號 + 性別 + 年齡層）。
      </span>
    </p>
  );
}
