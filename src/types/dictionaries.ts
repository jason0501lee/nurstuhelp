/**
 * Controlled vocabularies for the content layer.
 *
 * These are pure types; the runtime label maps live in
 * `src/data/dictionaries.ts`. When persisting to Supabase / CMS the
 * data layer is expected to translate camelCase ⇄ snake_case at the
 * serialization boundary.
 */

export type Locale = 'zh-TW' | 'en';

export type TargetUser = 'nursing_student' | 'preceptor' | 'faculty';

export type ClinicalSetting =
  | 'ward'
  | 'icu'
  | 'er'
  | 'or'
  | 'opd'
  | 'ltc'
  | 'pediatric'
  | 'obstetric'
  | 'community'
  | 'home';

export type AgeScope =
  | 'neonate'
  | 'infant'
  | 'child'
  | 'adolescent'
  | 'adult'
  | 'elderly'
  | 'pregnant'
  | 'lactating';

export type Priority = 'critical' | 'high' | 'normal' | 'low';

export type CardStatus =
  | 'draft'
  | 'in_review'
  | 'published'
  | 'archived'
  | 'needs_update';

export type CautionLevel = 'info' | 'warning' | 'critical';

export type CautionScope =
  | 'general'
  | 'pediatric'
  | 'renal'
  | 'hepatic'
  | 'pregnancy'
  | 'geriatric';

export type SourceType =
  | 'guideline'
  | 'textbook'
  | 'journal'
  | 'institutional_sop'
  | 'drug_database'
  | 'expert_opinion';

export type ReviewerRole =
  | 'rn'
  | 'aprn'
  | 'md'
  | 'pharmd'
  | 'faculty'
  | 'editor';

export type ApprovalScope =
  | 'clinical_accuracy'
  | 'language'
  | 'safety_disclaimer'
  | 'localization';
