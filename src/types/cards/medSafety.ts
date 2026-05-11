import type { BaseCard } from '../card';
import type { RedFlag } from '../safety';
import type { DrugRoute } from './drug';

export type MedCheckType =
  | '5_rights'
  | '6_rights'
  | '7_rights'
  | 'high_alert'
  | 'blood_product'
  | 'chemo'
  | 'narcotic';

export type CheckStepInput = 'scan_barcode' | 'type_value' | 'photo';

export interface CheckStep {
  index: number;
  text: string;
  /** When true, the user must explicitly confirm before advancing. */
  mustConfirm: boolean;
  inputRequired?: CheckStepInput;
  guidance?: string;
}

export interface AuditPolicy {
  /** Whether the timestamp of a successful run is logged locally. */
  logCompletion: boolean;
  /** Hard-defaults to false — see safety governance. */
  logPii: boolean;
  retention:
    | 'session'
    | 'shift'
    | '7d'
    | '30d'
    | 'user_export_only';
}

export interface MedCheckCard extends BaseCard {
  type: 'med_safety';
  checkType: MedCheckType;
  appliesToRoutes: DrugRoute[];
  requiresSecondVerifier: boolean;
  /** Whether a bedside "timeout" pause is required, like surgical timeout. */
  timeoutRequired: boolean;
  /** Any of these matching ⇒ abort and notify. */
  abortConditions: RedFlag[];
  preCheckSteps: CheckStep[];
  bedsideSteps: CheckStep[];
  postAdminSteps: CheckStep[];
  documentationRequired: string[];
  auditTrail: AuditPolicy;
}
