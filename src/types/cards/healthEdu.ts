import type { Locale } from '../dictionaries';
import type { BaseCard } from '../card';

export type TargetPatient =
  | 'adult'
  | 'pediatric'
  | 'elderly'
  | 'caregiver'
  | 'pregnant';

/** Reading level of the patient-facing wording, not the student's. */
export type ReadingLevel = 'low' | 'medium' | 'high';

export interface DoAndDont {
  do: string[];
  dont: string[];
}

export interface HealthEduCard extends BaseCard {
  type: 'health_edu';
  topic: string;
  targetPatient: TargetPatient[];
  readingLevel: ReadingLevel;
  /** 3–5 bullet messages, plain language. */
  keyMessages: string[];
  /** Spoken-style 30-second script the student can read aloud. */
  explainIn30s: string;
  /** Questions to verify patient understanding (teach-back). */
  teachBackQuestions: string[];
  commonMisconceptions?: string[];
  doAndDont?: DoAndDont;
  printableHandoutId?: string;
  languageVersions?: Locale[];
  relatedDiseaseIds?: string[];
  relatedDrugIds?: string[];
}
