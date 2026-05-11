import type { ISBARTemplateCard } from '@/types/cards/isbar';

/**
 * Seed ISBAR templates.
 *
 * privacyRules is a first-class field — the runtime enforces no-PII
 * validation per FR-T06 + SB-7. Output template uses {{key}} tokens
 * substituted at render time.
 */
export const ISBAR_TEMPLATES: ISBARTemplateCard[] = [
  {
    id: 'isbar-001',
    type: 'isbar',
    slug: 'deterioration-report',
    locale: 'zh-TW',
    title: 'ISBAR — 病情變化通報',
    subtitle: 'Deterioration scenario',
    aliases: ['ISBAR 通報', '病情變化', 'deterioration'],
    shortSummary: '當病人出現病情變化（生命徵象異常、意識變化等）時，組織通報內容的 ISBAR 模板。',
    targetUser: ['nursing_student'],
    clinicalSetting: ['ward', 'icu', 'er'],
    priority: 'high',
    tags: ['ISBAR', '溝通', '病情變化'],
    categories: ['溝通/ISBAR'],
    caution: [
      {
        level: 'critical',
        message: '請勿輸入可辨識病人資料（姓名、病歷號、身分證、聯絡方式）。離開實習單位前請確認清空。',
      },
    ],
    bodySections: [
      {
        key: 'pitfalls',
        label: '常見陷阱',
        layout: 'bullet',
        collapsedByDefault: false,
        displayHint: 'expanded',
        content: [
          '只說「病人不舒服」不夠 — 用具體數值。',
          '請先呼叫支援 / 通報，再開始填表整理。',
          '不要在自由欄位輸入可辨識病人資料。',
        ],
      },
    ],
    quickActions: [{ type: 'copy_text', label: '複製通報文字塊' }],
    references: [
      {
        citation: '一般 ISBAR 教學素材（範例條目）',
        sourceType: 'institutional_sop',
        sourceLang: 'zh-TW',
      },
    ],
    review: {
      version: '1.0.0',
      authoredBy: ['seed'],
      reviewedBy: [],
      nextReviewDue: '2027-01-01',
      approvalScopes: ['safety_disclaimer', 'language'],
    },
    status: 'published',
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-04-01T00:00:00Z',
    searchKeywords: ['ISBAR', '交班', '通報', 'handover'],

    scenario: 'deterioration',
    fieldsSchema: {
      I_identify: [
        {
          key: 'reporter_role',
          label: '報告者角色',
          type: 'text',
          required: true,
          hint: '例：實習護生 / 病房 N1',
          validators: ['no_pii', 'max_length_120'],
        },
        {
          key: 'ward',
          label: '單位 / 床號',
          type: 'text',
          required: true,
          hint: '例：3A 病房 / 床號',
          validators: ['no_pii', 'max_length_120'],
        },
      ],
      S_situation: [
        {
          key: 'situation',
          label: '目前狀況',
          type: 'multiline',
          required: true,
          hint: '一句話描述目前發生什麼事',
          validators: ['no_pii', 'max_length_500'],
        },
        {
          key: 'vital_signs',
          label: '目前生命徵象',
          type: 'text',
          required: false,
          hint: 'BP / HR / RR / Temp / SpO2',
          validators: ['no_pii', 'max_length_120'],
        },
      ],
      B_background: [
        {
          key: 'background',
          label: '病情背景 / 主診斷',
          type: 'multiline',
          required: false,
          hint: '簡述主診斷與相關背景；勿輸入可辨識資料',
          validators: ['no_pii', 'max_length_500'],
        },
        {
          key: 'allergy',
          label: '已知過敏',
          type: 'text',
          required: false,
          validators: ['no_pii', 'max_length_120'],
        },
      ],
      A_assessment: [
        {
          key: 'assessment',
          label: '我的評估',
          type: 'multiline',
          required: true,
          hint: '你「覺得」可能是什麼問題？方向式語言',
          validators: ['no_pii', 'max_length_500'],
        },
      ],
      R_recommendation: [
        {
          key: 'recommendation',
          label: '建議方向 / 需要的協助',
          type: 'multiline',
          required: true,
          hint: '例：希望您過來看 / 是否考慮抽 BCP / 是否考慮 NPO',
          validators: ['no_pii', 'max_length_500'],
        },
      ],
    },
    exampleFilled: {
      values: {
        reporter_role: '實習護生（指導者：林護理師）',
        ward: '3A / 床 12',
        situation: '病人近 30 分鐘 BP 由 130/80 降至 92/55，主訴頭暈伴隨冒冷汗。',
        vital_signs: 'BP 92/55, HR 112, RR 22, SpO2 95% on RA, Temp 36.8°C',
        background: '50 多歲男性，主診斷 CHF；今晨給予 Furosemide 40 mg PO。',
        allergy: 'NKDA',
        assessment: '可能與利尿後容量不足 / 姿勢性低血壓相關，意識清楚但虛弱。',
        recommendation: '已平躺、抬腳；請問是否考慮 IV 補液與重抽電解質？',
      },
      renderedOutput:
        'I: 實習護生（指導者：林護理師），3A / 床 12\nS: 病人近 30 分鐘 BP 由 130/80 降至 92/55，主訴頭暈伴隨冒冷汗。生命徵象：BP 92/55, HR 112, RR 22, SpO2 95% on RA, Temp 36.8°C\nB: 50 多歲男性，主診斷 CHF；今晨給予 Furosemide 40 mg PO。已知過敏：NKDA\nA: 可能與利尿後容量不足 / 姿勢性低血壓相關，意識清楚但虛弱。\nR: 已平躺、抬腳；請問是否考慮 IV 補液與重抽電解質？',
    },
    outputTemplate:
      'I: {{reporter_role}}，{{ward}}\nS: {{situation}}{{#vital_signs}}\n生命徵象：{{vital_signs}}{{/vital_signs}}\nB: {{background}}{{#allergy}}\n已知過敏：{{allergy}}{{/allergy}}\nA: {{assessment}}\nR: {{recommendation}}',
    pitfalls: [
      '不要在自由欄位輸入病人姓名、病歷號、身分證、電話。',
      '請先呼叫支援 / 通報，再開始填表整理。',
      '避免使用「立即…」「應該…」等絕對指令；建議方向式語言。',
    ],
    privacyRules: {
      blockPii: true,
      blockedFields: ['situation', 'background', 'assessment', 'recommendation'],
      autoClearAfter: 'session_end',
    },
  },
];
