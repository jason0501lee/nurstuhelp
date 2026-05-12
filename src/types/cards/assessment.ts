import type { BaseCard } from '../card';

/**
 * 護理基本評估卡 — 涵蓋身體、心理、社會三大面向。
 *
 * 生命徵象（vital_sign type）獨立成另一張型別，因為它的結構（依年齡帶、
 * 單位、危急值）與其他評估很不一樣。
 */
export type AssessmentDomain = 'physical' | 'psychological' | 'social';

export interface AssessmentCard extends BaseCard {
  type: 'assessment';

  /** 評估面向。 */
  domain: AssessmentDomain;

  /** 系統 / 主題（neuro, respiratory, mood, family, etc.）。 */
  focus: string;

  /** 常見評估內容（要看什麼）。 */
  evaluationItems: string[];

  /** 臨床觀察重點（看到什麼需要警覺）。 */
  observationPoints: string[];

  /** 常見提問或紀錄方式（怎麼問、怎麼寫）。 */
  sampleQuestions: string[];

  /** 可直接套用的書寫句型（補在卡片底部）。 */
  documentationTemplate?: string;

  /** 連結到的量表卡 slug（GCS, Braden, Morse, PQRST 等，未來擴充）。 */
  relatedScaleSlugs?: string[];
}
