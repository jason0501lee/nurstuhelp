import type { BaseCard } from '../card';

export type ISBARScenario =
  | 'deterioration'
  | 'handover'
  | 'phone_consult'
  | 'transfer_out'
  | 'new_admission'
  | 'critical_lab';

export type ISBARFieldType =
  | 'text'
  | 'number'
  | 'enum'
  | 'datetime'
  | 'multiline';

/** Built-in validators understood by the ISBAR runtime. */
export type ISBARValidator = 'no_pii' | 'max_length_120' | 'max_length_500';

export interface ISBARFieldSpec {
  key: string;
  label: string;
  type: ISBARFieldType;
  required: boolean;
  hint?: string;
  validators?: ISBARValidator[];
  /** For `type: 'enum'`. */
  options?: string[];
  /** Optional reference indicating where to source a prefill value. */
  prefillFrom?: string;
}

export interface ISBARFieldsSchema {
  I_identify: ISBARFieldSpec[];
  S_situation: ISBARFieldSpec[];
  B_background: ISBARFieldSpec[];
  A_assessment: ISBARFieldSpec[];
  R_recommendation: ISBARFieldSpec[];
}

export interface ISBARExampleFilled {
  values: Record<string, string | number>;
  /** Pre-rendered example output for previewing. */
  renderedOutput: string;
}

export interface ISBARPrivacyRules {
  blockPii: boolean;
  /** Field keys that are forbidden from accepting PII shaped input. */
  blockedFields: string[];
  autoClearAfter: 'session_end' | 'shift_end' | 'never';
}

export interface ISBARTemplateCard extends BaseCard {
  type: 'isbar';
  scenario: ISBARScenario;
  fieldsSchema: ISBARFieldsSchema;
  exampleFilled: ISBARExampleFilled;
  /** Mustache-like template with `{{key}}` placeholders. */
  outputTemplate: string;
  pitfalls: string[];
  /** First-class field — privacy is part of the contract. */
  privacyRules: ISBARPrivacyRules;
}
