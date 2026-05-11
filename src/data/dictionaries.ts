/**
 * Runtime label maps for the controlled vocabularies in
 * `src/types/dictionaries.ts`. Use these whenever rendering an enum
 * to the user (e.g. filters, badges) so labels stay consistent.
 *
 * Anything that touches the screen and represents a controlled
 * vocabulary value MUST flow through one of these maps.
 */
import type {
  AgeScope,
  ApprovalScope,
  CautionLevel,
  CautionScope,
  ClinicalSetting,
  Priority,
  ReviewerRole,
  SourceType,
  TargetUser,
} from '@/types/dictionaries';

export const TARGET_USER_LABELS: Record<TargetUser, string> = {
  nursing_student: '護理學生',
  preceptor: '帶教老師',
  faculty: '學校教師',
};

export const CLINICAL_SETTING_LABELS: Record<ClinicalSetting, string> = {
  ward: '一般病房',
  icu: '加護病房',
  er: '急診',
  or: '手術室',
  opd: '門診',
  ltc: '長照',
  pediatric: '兒科',
  obstetric: '產科',
  community: '社區',
  home: '居家',
};

export const AGE_SCOPE_LABELS: Record<AgeScope, string> = {
  neonate: '新生兒',
  infant: '嬰兒',
  child: '兒童',
  adolescent: '青少年',
  adult: '成人',
  elderly: '老年',
  pregnant: '孕婦',
  lactating: '哺乳',
};

export const PRIORITY_LABELS: Record<Priority, string> = {
  critical: '緊急',
  high: '高',
  normal: '一般',
  low: '低',
};

export const CAUTION_LEVEL_LABELS: Record<CautionLevel, string> = {
  info: '提示',
  warning: '注意',
  critical: '高度警示',
};

export const CAUTION_SCOPE_LABELS: Record<CautionScope, string> = {
  general: '一般',
  pediatric: '兒童',
  renal: '腎功能不全',
  hepatic: '肝功能不全',
  pregnancy: '懷孕',
  geriatric: '老年',
};

export const SOURCE_TYPE_LABELS: Record<SourceType, string> = {
  guideline: '臨床指引',
  textbook: '教科書',
  journal: '期刊',
  institutional_sop: '院內 SOP',
  drug_database: '藥物資料庫',
  expert_opinion: '專家意見',
};

export const REVIEWER_ROLE_LABELS: Record<ReviewerRole, string> = {
  rn: 'RN 護理師',
  aprn: 'APRN 進階護理師',
  md: 'MD 醫師',
  pharmd: 'PharmD 藥師',
  faculty: '學校教師',
  editor: '內容編輯',
};

export const APPROVAL_SCOPE_LABELS: Record<ApprovalScope, string> = {
  clinical_accuracy: '臨床正確性',
  language: '語言',
  safety_disclaimer: '安全聲明',
  localization: '在地化',
};

/**
 * Words that the editorial flow must reject — guards against absolute
 * imperative phrasing per safety governance §7.B. Used by content
 * authoring tooling and surfaced in admin warnings.
 */
export const EDITORIAL_BLOCKED_WORDS: readonly string[] = [
  '立即通報',
  '立即給予',
  '應使用',
  '必須給予',
  '建議使用',
  '應通報',
  '應該',
  '一定要',
];
