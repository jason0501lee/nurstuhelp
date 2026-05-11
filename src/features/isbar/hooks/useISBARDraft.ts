import { useCallback, useEffect, useMemo, useState } from 'react';
import type {
  ISBARFieldSpec,
  ISBARTemplateCard,
} from '@/types/cards/isbar';
import { detectPii, type PiiHit } from '@/lib/piiPatterns';

export type ISBARSection =
  | 'I_identify'
  | 'S_situation'
  | 'B_background'
  | 'A_assessment'
  | 'R_recommendation';

export const SECTIONS: ISBARSection[] = [
  'I_identify',
  'S_situation',
  'B_background',
  'A_assessment',
  'R_recommendation',
];

export const SECTION_LABEL: Record<ISBARSection, string> = {
  I_identify: 'I — 識別 / Identify',
  S_situation: 'S — 狀況 / Situation',
  B_background: 'B — 背景 / Background',
  A_assessment: 'A — 評估 / Assessment',
  R_recommendation: 'R — 建議 / Recommendation',
};

interface UseISBARDraftResult {
  values: Record<string, string>;
  setValue: (key: string, value: string) => void;
  reset: () => void;
  piiHits: Record<string, PiiHit[]>;
  hasAnyPii: boolean;
  rendered: string;
  fieldsBySection: Record<ISBARSection, ISBARFieldSpec[]>;
}

function renderTemplate(
  template: string,
  values: Record<string, string>,
): string {
  // {{#key}}body{{/key}} — keep body when value is non-empty.
  let out = template.replace(
    /\{\{#(\w+)\}\}([\s\S]*?)\{\{\/\1\}\}/g,
    (_, key: string, body: string) => (values[key] ? body : ''),
  );
  // {{key}} → value
  out = out.replace(/\{\{(\w+)\}\}/g, (_, key: string) => values[key] ?? '');
  return out;
}

/**
 * Manages the in-memory draft for an ISBAR session.
 *
 * Auto-clear semantics: when privacyRules.autoClearAfter is
 * 'session_end' the values reset whenever this hook unmounts —
 * navigating away from the ISBAR page or refreshing the app wipes
 * the draft. No values are ever persisted.
 */
export function useISBARDraft(card: ISBARTemplateCard): UseISBARDraftResult {
  const [values, setValues] = useState<Record<string, string>>({});

  const setValue = useCallback((key: string, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  }, []);

  const reset = useCallback(() => {
    setValues({});
  }, []);

  // Privacy-driven auto-clear on unmount.
  useEffect(() => {
    const autoClear = card.privacyRules.autoClearAfter;
    return () => {
      if (autoClear === 'session_end') {
        setValues({});
      }
    };
  }, [card.privacyRules.autoClearAfter]);

  const piiHits = useMemo<Record<string, PiiHit[]>>(() => {
    const out: Record<string, PiiHit[]> = {};
    for (const [key, val] of Object.entries(values)) {
      const hits = detectPii(val);
      if (hits.length) out[key] = hits;
    }
    return out;
  }, [values]);

  const hasAnyPii = Object.keys(piiHits).length > 0;

  const rendered = useMemo(
    () => renderTemplate(card.outputTemplate, values),
    [card.outputTemplate, values],
  );

  const fieldsBySection = useMemo<Record<ISBARSection, ISBARFieldSpec[]>>(() => {
    return {
      I_identify: card.fieldsSchema.I_identify,
      S_situation: card.fieldsSchema.S_situation,
      B_background: card.fieldsSchema.B_background,
      A_assessment: card.fieldsSchema.A_assessment,
      R_recommendation: card.fieldsSchema.R_recommendation,
    };
  }, [card.fieldsSchema]);

  return {
    values,
    setValue,
    reset,
    piiHits,
    hasAnyPii,
    rendered,
    fieldsBySection,
  };
}
