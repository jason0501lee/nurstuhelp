/**
 * PII regex set used by the ISBAR flow and any future free-text
 * surface. Patterns are intentionally conservative — we'd rather
 * over-warn than let a national ID slip through.
 *
 * Scope: zh-TW common identifiers. Extended over time.
 */

export interface PiiPattern {
  name: string;
  /** Human-facing label shown in SB-7. */
  label: string;
  re: RegExp;
}

export const PII_PATTERNS: PiiPattern[] = [
  {
    name: 'tw_national_id',
    label: '身分證字號',
    re: /\b[A-Z][12]\d{8}\b/g,
  },
  {
    name: 'mobile',
    label: '手機號碼',
    re: /\b09\d{2}[- ]?\d{3}[- ]?\d{3}\b/g,
  },
  {
    name: 'landline',
    label: '市話',
    re: /\b0\d{1,3}[-\s]?\d{6,8}\b/g,
  },
  {
    name: 'mrn_like',
    label: '可能為病歷號',
    re: /\b\d{9,11}\b/g,
  },
  {
    name: 'email',
    label: 'Email',
    re: /[\w.+-]+@[\w-]+\.[\w.-]+/g,
  },
  {
    name: 'tw_full_name',
    label: '可能為完整中文姓名（請改用代稱）',
    // Three or four contiguous CJK characters preceded by 姓名/病人 cue
    // OR sitting between explicit identifier words. Kept loose; the
    // intent is to warn, not auto-redact.
    re: /(?:姓名|病人|患者)[：:\s]*([一-鿿]{2,4})/g,
  },
];

export interface PiiHit {
  patternName: string;
  label: string;
  match: string;
}

export function detectPii(text: string): PiiHit[] {
  if (!text) return [];
  const hits: PiiHit[] = [];
  for (const p of PII_PATTERNS) {
    // Iterate; reset lastIndex because /g regexes carry state.
    p.re.lastIndex = 0;
    let m: RegExpExecArray | null;
    while ((m = p.re.exec(text)) !== null) {
      hits.push({ patternName: p.name, label: p.label, match: m[0] });
    }
  }
  return hits;
}

export function hasPii(text: string): boolean {
  return detectPii(text).length > 0;
}
