/**
 * Single registry for every Disclaimer (DISC-*) and Safety Banner (SB-*)
 * the app surfaces. Content authors can only reference a key — they
 * cannot rewrite the body — so the safety language stays consistent
 * across screens.
 *
 * Source of truth: Safety Governance §5 (Disclaimers) and §6 (Banners).
 */
import type { CautionLevel } from '@/types/dictionaries';

export type DiscKey =
  | 'DISC-APP-ONBOARDING'
  | 'DISC-APP-FOOTER'
  | 'DISC-CARD-BASE'
  | 'DISC-DRUG'
  | 'DISC-VITAL'
  | 'DISC-DISEASE'
  | 'DISC-EDU'
  | 'DISC-ISBAR-PII'
  | 'DISC-CALC-RESULT'
  | 'DISC-MEDCHECK'
  | 'DISC-EMERGENCY';

export type SafetyBannerKey =
  | 'SB-1'
  | 'SB-2'
  | 'SB-3'
  | 'SB-4'
  | 'SB-5'
  | 'SB-6'
  | 'SB-7'
  | 'SB-8'
  | 'SB-9'
  | 'SB-10';

export interface SafetyText {
  /** Drives banner/disclaimer styling. */
  level: CautionLevel;
  title: string;
  /** Body content; arrays render as bullets. */
  body: string | string[];
  /** Optional short ribbon variant (used in small banners). */
  ribbon?: string;
}

export const DISCLAIMERS: Record<DiscKey, SafetyText> = {
  'DISC-APP-ONBOARDING': {
    level: 'warning',
    title: '歡迎使用 NurStuHelp',
    body: [
      '本 App 是給護理學生在臨床實習階段使用的學習與工作輔助工具，內容為一般護理知識、流程提醒與工具，不構成診斷、處方或臨床建議。',
      '請以最新醫囑與所在單位 SOP 為準。',
      '任何臨床決策請與帶教老師、護理人員或醫師確認。',
      '遇緊急狀況請立即呼叫支援，不要先翻 App。',
    ],
  },
  'DISC-APP-FOOTER': {
    level: 'info',
    title: '使用提醒',
    body: '本 App 為學習輔助工具，內容僅供參考，不取代醫囑、單位 SOP 與帶教老師指示。',
    ribbon: '學習用 · 不取代醫囑',
  },
  'DISC-CARD-BASE': {
    level: 'info',
    title: '本卡學習用',
    body: '本卡內容為一般護理學習資料。請以實際醫囑、院內 SOP 與帶教老師指示為最終依據。',
  },
  'DISC-DRUG': {
    level: 'critical',
    title: '給藥資訊僅供學習與雙重核對',
    body: [
      '劑量、頻次、稀釋方式請以最新醫囑為準，本資料不可作為自主給藥依據。',
      '高警訊藥品請依單位規範執行雙人核對。',
    ],
  },
  'DISC-VITAL': {
    level: 'info',
    title: '正常值因情境而異',
    body: '正常值與危急值範圍因年齡、臨床情境與單位規範而異。是否符合「異常」與通報時機，請依您所在單位之通報規範與帶教老師指示。',
  },
  'DISC-DISEASE': {
    level: 'warning',
    title: '本卡為學習用一般知識',
    body: '不可作為個別病人之診斷或治療依據。治療段為一般概念說明，請以主治醫師判斷與最新醫囑為準。',
  },
  'DISC-EDU': {
    level: 'warning',
    title: '衛教前請與團隊確認',
    body: '進行衛教前，請先與帶教老師或醫療團隊確認本案的個別差異與醫囑。若病人或家屬有疑問、或顯示理解錯誤，請回報團隊處理。',
  },
  'DISC-ISBAR-PII': {
    level: 'critical',
    title: '請勿輸入可辨識病人資料',
    body: [
      '禁止輸入：姓名、病歷號、身分證、聯絡方式、可定位的時間 / 地點。',
      'App 不上傳病人資料；離開實習單位前請確認清空。',
    ],
  },
  'DISC-CALC-RESULT': {
    level: 'warning',
    title: '計算結果為核對用參考',
    body: '請與處方對照後執行。若結果與處方差異顯著或超出常用範圍，請暫停並向護理人員 / 教師確認。',
  },
  'DISC-MEDCHECK': {
    level: 'critical',
    title: '輔助再核對，非法定核對',
    body: '本核對流程為輔助再核對，不取代法定三讀六對。最終給藥責任仍在您與監督您的護理人員。任一步驟有疑慮即停止並通報。',
  },
  'DISC-EMERGENCY': {
    level: 'critical',
    title: '第一步永遠是「呼叫支援」',
    body: '本 checklist 為流程方向提示，不可作為自主處置指南。',
  },
};

export const SAFETY_BANNERS: Record<SafetyBannerKey, SafetyText> = {
  'SB-1': {
    level: 'critical',
    title: '學習用｜給藥以最新醫囑為準',
    body: [
      '劑量資料不可作為給藥依據。',
      '高警訊藥品請執行雙人核對。',
      '有疑慮即停下，問學姐 / 教師。',
    ],
  },
  'SB-2': {
    level: 'critical',
    title: '核對用結果｜請與處方對照',
    body: [
      '若結果與處方差異 ≥ 10% 或超出常用範圍，不要直接給藥。',
      '先請教護理人員 / 帶教老師確認。',
    ],
  },
  'SB-3': {
    level: 'warning',
    title: '是否通報依單位規範',
    body: [
      '本頁顯示之危急值與量表分數為一般參考。',
      '是否符合「異常」與通報時機請依：您所在單位的通報規範、您的帶教老師判斷。',
      '本 App 不會也不應替您做這個決定。',
    ],
  },
  'SB-4': {
    level: 'critical',
    title: '開始給藥核對前，請確認',
    body: [
      '我已對照本班最新醫囑。',
      '我已準備好病人辨識資訊（依單位規範）。',
      '我了解本流程不取代法定三讀六對。',
    ],
  },
  'SB-5': {
    level: 'critical',
    title: '停止並通報',
    body: [
      '您勾選了「對不上」。',
      '① 停止給藥',
      '② 通報您的帶教老師 / 護理人員',
      '③ 不要修改任何處方或紀錄',
    ],
  },
  'SB-6': {
    level: 'critical',
    title: '第一步：呼叫支援',
    body: [
      '在繼續查看流程之前，您是否已通報？',
      '此 checklist 為方向提示，不取代現場護理人員 / 醫師判斷。',
    ],
  },
  'SB-7': {
    level: 'critical',
    title: '請勿輸入可辨識病人資料',
    body: [
      '系統偵測到您可能輸入了：身分證 / 病歷號 / 完整姓名。',
      '請改用代稱（例：床號 + 性別 + 年齡層）。',
      '離開單位前請確認清空。',
    ],
  },
  'SB-8': {
    level: 'warning',
    title: '學習用｜個別病人以醫囑為準',
    body: '本卡含「治療概念」段落，僅作為學習用一般知識，不可用於個別病人之診斷或治療判斷。',
  },
  'SB-9': {
    level: 'warning',
    title: '對病人衛教前的提醒',
    body: [
      '我已確認本案的個別差異（飲食限制、過敏、病情）。',
      '我已與帶教老師或團隊確認可進行衛教。',
      '我了解病人提問若超出衛教範圍，要回報團隊。',
    ],
  },
  'SB-10': {
    level: 'info',
    title: '本卡內容已超過審稿週期',
    body: '顯示內容可能未反映最新指引，請優先依院內 SOP 與最新醫囑。',
  },
};

