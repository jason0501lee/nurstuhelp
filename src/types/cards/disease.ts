import type { BaseCard } from '../card';

/**
 * A single nursing priority. The "main character" of a DiseaseCard —
 * treatment content is intentionally summarized into a single block
 * and disclaimed; nursing-side actionable content gets this structure.
 */
export interface DiseasePriorityItem {
  priority: 'critical' | 'high' | 'normal';
  /** The nursing action / observation point itself. */
  point: string;
  /** Optional teaching note explaining the rationale. */
  rationale?: string;
}

export interface DiseaseCard extends BaseCard {
  type: 'disease';
  icd10?: string[];
  /** ≤ 60 chars, shown on the card front. */
  oneLinerDefinition: string;
  /** ≤ 200 chars. */
  pathophysiologyBrief: string;
  typicalPresentation: string[];
  keyInvestigations: string[];
  /**
   * Treatment "concept" only. Must carry the disease-card disclaimer
   * (DISC-D6) and never read as a treatment recommendation.
   */
  treatmentOverview: string;
  /** The differentiating section — list, prioritised. */
  nursingPriorities: DiseasePriorityItem[];
  complications: string[];
  patientEducationIds?: string[];
  relatedDrugIds?: string[];
}
