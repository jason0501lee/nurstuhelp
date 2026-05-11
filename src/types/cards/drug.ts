import type { BaseCard } from '../card';

export type DrugRoute =
  | 'po'
  | 'iv'
  | 'im'
  | 'sc'
  | 'topical'
  | 'inhaled'
  | 'pr'
  | 'sl';

/**
 * Reference dose information for CROSS-CHECK against the physician's
 * order. Per safety governance §6.D, this is text-only and never
 * exposed as a "recommended dose" for a specific patient.
 */
export interface DoseReference {
  /** Population label, e.g. "成人", "兒童", "腎功能不全". */
  population: string;
  route: DrugRoute;
  /** Free text such as "0.5–1 mg/kg q6h"; not parsed as numbers. */
  rangeText: string;
  /** Standard suffix reminding caller to defer to the active order. */
  note: string;
  /** Index into BaseCard.references for traceability. */
  sourceRefIdx: number;
}

export interface DrugAdverseEffects {
  common: string[];
  /** Rendered with `caution.level=critical` styling by default. */
  serious: string[];
}

export interface MonitorItem {
  /** What to monitor, e.g. "血壓", "K+", "INR". */
  parameter: string;
  /** Condition under which closer monitoring is warranted. */
  trigger: string;
  /** Direction-only language. */
  actionHint: string;
}

export interface PharmacokineticsBrief {
  onset?: string;
  peak?: string;
  duration?: string;
}

export interface DrugCard extends BaseCard {
  type: 'drug';
  genericName: string;
  brandNames: string[];
  atcCode?: string;
  drugClass: string[];
  /** High-alert medication flag — drives banner + LASA prominence. */
  highAlert: boolean;
  /** Look-Alike-Sound-Alike warnings (name confusables). */
  lasaWarnings?: string[];
  indications: string[];
  contraindications: string[];
  routes: DrugRoute[];
  doseReference: DoseReference[];
  onsetPeakDuration?: PharmacokineticsBrief;
  adverseEffects: DrugAdverseEffects;
  monitoring: MonitorItem[];
  nursingConsiderations: string[];
  patientEducationIds?: string[];
  /**
   * Informational list of common interactions. NOT a decision-support
   * interaction checker — see governance §6 red lines.
   */
  interactionsBrief?: string[];
  storage?: string;
  /** Visual identification text (e.g. "白色長橢圓錠"). */
  appearance?: string;
}
