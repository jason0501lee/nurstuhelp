import type { BaseCard } from '../card';

export type VitalSignParameter =
  | 'temperature'
  | 'hr'
  | 'rr'
  | 'sbp'
  | 'dbp'
  | 'map'
  | 'spo2'
  | 'capillary_refill'
  | 'blood_glucose'
  | 'pain';

export interface AgeBand {
  /** Label shown in UI, e.g. "新生兒 (0–28 天)". */
  ageLabel: string;
  /** Inclusive lower bound, in days. */
  ageMinDays: number;
  /** Inclusive upper bound, in days. Use `Number.POSITIVE_INFINITY` for open-ended adult. */
  ageMaxDays: number;
  normalMin?: number;
  normalMax?: number;
  awakeOnly?: boolean;
  notes?: string;
}

export interface ContextModifier {
  /** Context that shifts the range (e.g. "發燒", "運動後", "孕期"). */
  context: string;
  /** Direction-only description, never an absolute imperative. */
  adjustment: string;
}

export interface VitalSignCriticalValues {
  low?: number;
  high?: number;
  /**
   * Free-text note that MUST defer to "依各單位通報規範與帶教老師指示".
   * Never phrase as "立即通報".
   */
  note: string;
}

export interface VitalSignCard extends BaseCard {
  type: 'vital_sign';
  parameter: VitalSignParameter;
  /** Display unit, e.g. "°C", "bpm", "mmHg". */
  unit: string;
  byAgeTable: AgeBand[];
  contextModifiers?: ContextModifier[];
  criticalValues?: VitalSignCriticalValues;
  measurementTips?: string[];
}
