import type { BaseCard } from '../card';
import type { CautionItem } from '../safety';

export type SOPCompetencyLevel = 'basic' | 'intermediate' | 'advanced';

export interface SOPEquipment {
  name: string;
  /** Optional spec/size note. */
  spec?: string;
  optional?: boolean;
}

export interface SOPStep {
  index: number;
  /** ≤ 120 chars. */
  text: string;
  /** Teaching-layer rationale; collapsed by default. */
  why?: string;
  warning?: CautionItem;
  /** Asset id (image / video) — referenced from media assets in v2. */
  visual?: string;
}

export interface SOPVariant {
  /** e.g. "兒童版", "經 PICC". */
  label: string;
  /** Steps that differ from the main flow. */
  diff: SOPStep[];
}

export interface SOPCard extends BaseCard {
  type: 'sop';
  procedureName: string;
  competencyLevel: SOPCompetencyLevel;
  estimatedDuration?: string;
  equipment: SOPEquipment[];
  preProcedure: SOPStep[];
  procedureSteps: SOPStep[];
  postProcedure: SOPStep[];
  documentationPoints: string[];
  commonErrors: string[];
  variants?: SOPVariant[];
  /** Mandatory note. UI renders persistently. */
  institutionalNote: string;
}
