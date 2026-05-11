import type { MedCheckCard } from '@/types/cards/medSafety';

/**
 * Seed medication-safety checklist.
 *
 * abortConditions are first-class — if any condition matches, the
 * MedCheck flow jumps to SB-5 abort state and asks the student to
 * stop & notify. The flow is auxiliary; never legal substitute for
 * unit double-check policy.
 */
export const MED_CHECK_CARDS: MedCheckCard[] = [
  {
    id: 'med-001',
    type: 'med_safety',
    slug: 'three-reads-six-rights',
    locale: 'zh-TW',
    title: '給藥三讀六對',
    subtitle: 'MVP 安全爆點 — 給藥前 30 秒輔助核對',
    aliases: ['三讀六對', '給藥核對', 'medication check', '六大對'],
    shortSummary: '給藥前的輔助再核對流程，輔助臨床的「三讀六對」原則；本流程不取代法定核對與單位規範。',
    targetUser: ['nursing_student'],
    clinicalSetting: ['ward', 'icu', 'er', 'pediatric'],
    priority: 'critical',
    tags: ['安全', '給藥', 'MedCheck'],
    categories: ['安全/給藥核對'],
    caution: [
      {
        level: 'critical',
        message: '本核對流程為輔助再核對，不取代法定三讀六對。最終給藥責任仍在您與監督您的護理人員。任一步驟有疑慮即停止並通報。',
      },
    ],
    redFlags: [
      {
        trigger: '病人辨識資訊與藥袋對不上',
        actionHint: '停止給藥，向護理人員 / 帶教老師回報並依單位規範處理。',
      },
      {
        trigger: '藥物與最新醫囑（劑量 / 頻次 / 途徑）對不上',
        actionHint: '停止給藥，先核對處方來源，必要時聯繫開立醫師。',
      },
      {
        trigger: '病人對該藥物有已知過敏史或近期發生新副作用',
        actionHint: '停止給藥，回報並依單位過敏處置規範跟進。',
      },
    ],
    bodySections: [
      {
        key: 'flow_note',
        label: '使用方式',
        layout: 'paragraph',
        collapsedByDefault: false,
        displayHint: 'expanded',
        content:
          '本流程分為「準備期 → 床邊核對 → 給藥後紀錄」三段，每段以勾選方式完成。若任一步驟對不上，App 會引導至「停止並通報」頁面，並記錄一次本班的攔截事件（不含病人資料）。',
      },
    ],
    quickActions: [{ type: 'open_checklist', label: '開始三讀六對' }],
    references: [
      {
        citation: '一般護理基礎教科書 — 給藥安全（範例條目）',
        sourceType: 'textbook',
        sourceLang: 'zh-TW',
      },
      {
        citation: '院內給藥 SOP（範例條目）',
        sourceType: 'institutional_sop',
        sourceLang: 'zh-TW',
      },
    ],
    review: {
      version: '1.0.0',
      authoredBy: ['seed'],
      reviewedBy: [],
      nextReviewDue: '2026-12-01',
      approvalScopes: ['clinical_accuracy', 'safety_disclaimer', 'language'],
    },
    status: 'published',
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-04-01T00:00:00Z',
    searchKeywords: ['三讀六對', '給藥核對', 'med check', '六大對'],

    checkType: '6_rights',
    appliesToRoutes: ['po', 'iv', 'im', 'sc', 'sl', 'inhaled', 'topical', 'pr'],
    requiresSecondVerifier: false,
    timeoutRequired: false,
    abortConditions: [
      {
        trigger: '病人身分與藥袋資訊不一致',
        actionHint: '停止給藥並依單位規範回報。',
      },
      {
        trigger: '藥物與最新醫囑不一致（劑量 / 頻次 / 途徑）',
        actionHint: '停止給藥並核對處方來源。',
      },
      {
        trigger: '病人對該藥物有已知過敏 / 近期新增副作用',
        actionHint: '停止給藥並依單位過敏處置規範處理。',
      },
      {
        trigger: '對任何一步有疑慮或不確定',
        actionHint: '停止流程並請教護理人員 / 帶教老師。',
      },
    ],
    preCheckSteps: [
      {
        index: 1,
        text: '查對最新醫囑（病人、藥物、劑量、途徑、頻次、時間）。',
        mustConfirm: true,
        guidance: '紙本或電子醫囑皆以「最新版本」為準。',
      },
      {
        index: 2,
        text: '查對藥袋 / 藥盒標籤（取藥時的「第一讀」）。',
        mustConfirm: true,
      },
      {
        index: 3,
        text: '檢查過敏史、最近副作用、相關生命徵象 / 檢驗值。',
        mustConfirm: true,
      },
    ],
    bedsideSteps: [
      {
        index: 4,
        text: '床邊辨識病人（依單位規範使用兩項辨識；勿只看床號）。',
        mustConfirm: true,
      },
      {
        index: 5,
        text: '再次比對藥袋（「第二讀」）：病人、藥物、劑量、途徑、頻次、時間。',
        mustConfirm: true,
      },
      {
        index: 6,
        text: '說明給藥目的並取得病人理解 / 同意。',
        mustConfirm: true,
      },
      {
        index: 7,
        text: '給藥前的最後一讀（「第三讀」）— 倒藥 / 抽藥當下再確認。',
        mustConfirm: true,
      },
    ],
    postAdminSteps: [
      {
        index: 8,
        text: '完成給藥紀錄（時間、劑量、途徑、反應）。',
        mustConfirm: true,
      },
      {
        index: 9,
        text: '依藥物與單位規範安排後續觀察（生命徵象、副作用）。',
        mustConfirm: true,
      },
    ],
    documentationRequired: [
      '給藥時間、劑量、途徑、執行者',
      '病人即時反應與必要的觀察值',
      '若有中止，記錄中止原因與通報對象',
    ],
    auditTrail: {
      logCompletion: true,
      logPii: false,
      retention: 'shift',
    },
  },
];
