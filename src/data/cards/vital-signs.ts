import type { VitalSignCard } from '@/types/cards/vitalSign';

/**
 * Seed vital-sign reference cards. Two cards in Step 3 to cover both
 * the "single universal range" case (temperature) and the "varies by
 * age" case (HR). Expanded in Step 14.
 *
 * IMPORTANT: criticalValues.note must never imply an absolute
 * imperative such as "立即通報". Phrasing defers to unit policy.
 */
export const VITAL_SIGN_CARDS: VitalSignCard[] = [
  {
    id: 'vs-001',
    type: 'vital_sign',
    slug: 'heart-rate',
    locale: 'zh-TW',
    title: '心跳率 (HR) 正常範圍',
    subtitle: 'Heart Rate',
    aliases: ['HR', '心率', '脈搏', 'heart rate', '心跳次數'],
    shortSummary: '安靜清醒狀態下心跳率參考範圍，依年齡差異呈現；危急閾值以一般參考為主，通報依單位規範。',
    targetUser: ['nursing_student'],
    clinicalSetting: ['ward', 'er', 'icu', 'pediatric', 'opd'],
    ageScope: ['neonate', 'infant', 'child', 'adolescent', 'adult', 'elderly'],
    priority: 'high',
    tags: ['生命徵象', 'cardiovascular'],
    categories: ['生命徵象/心跳'],
    caution: [
      {
        level: 'info',
        message: '正常範圍因情境（運動、發燒、孕期）而異；是否屬「異常」與通報時機請依單位規範與帶教老師指示。',
      },
    ],
    bodySections: [
      {
        key: 'context_modifiers',
        label: '常見情境修正',
        layout: 'kv_table',
        collapsedByDefault: false,
        displayHint: 'expanded',
        content: [
          { key: '發燒', value: '體溫每升 1°C，心跳可能上升約 10 bpm。' },
          { key: '運動 / 哭鬧後', value: '短暫升高至 150–180 bpm 屬常見，建議休息 5 分鐘後重測。' },
          { key: '甲狀腺功能異常', value: '甲亢偏快、甲低偏慢；以實驗室數值與臨床表現綜合判讀。' },
        ],
      },
      {
        key: 'measurement_tips',
        label: '量測小提示',
        layout: 'bullet',
        collapsedByDefault: false,
        displayHint: 'expanded',
        content: [
          '安靜清醒狀態下量測 1 分鐘最準確，避免運動後立即量測。',
          '節律不規則時務必量整 1 分鐘並描述節律型態。',
          '兒童哭鬧時不易取得真實基準，可於睡眠或安撫後再量。',
        ],
      },
    ],
    quickActions: [],
    references: [
      {
        citation: '一般護理基礎教科書（範例條目）',
        sourceType: 'textbook',
        sourceLang: 'zh-TW',
      },
    ],
    review: {
      version: '1.0.0',
      authoredBy: ['seed'],
      reviewedBy: [],
      nextReviewDue: '2027-01-01',
      approvalScopes: ['clinical_accuracy', 'language'],
    },
    status: 'published',
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-04-01T00:00:00Z',
    searchKeywords: ['HR', '心率', '脈搏', 'bpm'],

    parameter: 'hr',
    unit: 'bpm',
    byAgeTable: [
      {
        ageLabel: '新生兒 (0–28 天)',
        ageMinDays: 0,
        ageMaxDays: 28,
        normalMin: 100,
        normalMax: 160,
        awakeOnly: true,
      },
      {
        ageLabel: '嬰兒 (1 個月–1 歲)',
        ageMinDays: 29,
        ageMaxDays: 365,
        normalMin: 90,
        normalMax: 150,
      },
      {
        ageLabel: '幼兒 (1–3 歲)',
        ageMinDays: 366,
        ageMaxDays: 365 * 3,
        normalMin: 80,
        normalMax: 130,
      },
      {
        ageLabel: '兒童 (3–12 歲)',
        ageMinDays: 365 * 3 + 1,
        ageMaxDays: 365 * 12,
        normalMin: 70,
        normalMax: 110,
      },
      {
        ageLabel: '青少年 (12–18 歲)',
        ageMinDays: 365 * 12 + 1,
        ageMaxDays: 365 * 18,
        normalMin: 60,
        normalMax: 100,
      },
      {
        ageLabel: '成人 (≥18 歲)',
        ageMinDays: 365 * 18 + 1,
        ageMaxDays: 365 * 120,
        normalMin: 60,
        normalMax: 100,
      },
    ],
    criticalValues: {
      low: 50,
      high: 130,
      note: '上述為一般參考閾值；是否屬危急值及通報時機請依各單位通報規範與臨床判斷。',
    },
    measurementTips: [
      '安靜狀態下量整 1 分鐘最準確。',
      '節律不規則時必須量整 1 分鐘。',
    ],
  },

  {
    id: 'vs-002',
    type: 'vital_sign',
    slug: 'body-temperature',
    locale: 'zh-TW',
    title: '體溫正常範圍',
    subtitle: 'Body Temperature',
    aliases: ['Temp', 'BT', '體溫', 'temperature', '發燒'],
    shortSummary: '依量測部位差異呈現的成人體溫參考範圍；發燒之定義與通報依單位規範。',
    targetUser: ['nursing_student'],
    clinicalSetting: ['ward', 'er', 'icu', 'pediatric', 'opd', 'ltc'],
    ageScope: ['neonate', 'infant', 'child', 'adolescent', 'adult', 'elderly'],
    priority: 'high',
    tags: ['生命徵象', '體溫'],
    categories: ['生命徵象/體溫'],
    caution: [
      {
        level: 'info',
        message: '不同量測部位（口溫、腋溫、肛溫、耳溫、額溫）正常範圍略有差異，需依本院使用儀器之參考範圍為準。',
      },
    ],
    bodySections: [
      {
        key: 'by_route',
        label: '依量測部位參考範圍',
        layout: 'kv_table',
        collapsedByDefault: false,
        displayHint: 'front',
        content: [
          { key: '口溫 Oral', value: '36.0–37.4 °C' },
          { key: '腋溫 Axillary', value: '比口溫低約 0.5 °C' },
          { key: '肛溫 Rectal', value: '比口溫高約 0.5 °C' },
          { key: '耳溫 Tympanic', value: '接近核心體溫，需注意操作技術' },
          { key: '額溫 Temporal', value: '受環境影響大，作為初步篩檢' },
        ],
      },
      {
        key: 'tips',
        label: '量測注意事項',
        layout: 'bullet',
        collapsedByDefault: false,
        displayHint: 'expanded',
        content: [
          '剛飲熱 / 冷飲料後 15–30 分鐘內避免量口溫。',
          '腋溫需擦乾汗液並夾穩 5 分鐘以上（依儀器規範）。',
          '高熱、低體溫應交叉確認量測部位與儀器準確度。',
        ],
      },
    ],
    quickActions: [],
    references: [
      {
        citation: '一般護理基礎教科書（範例條目）',
        sourceType: 'textbook',
        sourceLang: 'zh-TW',
      },
    ],
    review: {
      version: '1.0.0',
      authoredBy: ['seed'],
      reviewedBy: [],
      nextReviewDue: '2027-01-01',
      approvalScopes: ['clinical_accuracy', 'language'],
    },
    status: 'published',
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-04-01T00:00:00Z',
    searchKeywords: ['BT', 'Temp', '發燒', 'fever', 'hyperthermia'],

    parameter: 'temperature',
    unit: '°C',
    byAgeTable: [
      {
        ageLabel: '全年齡（口溫參考）',
        ageMinDays: 0,
        ageMaxDays: 365 * 120,
        normalMin: 36.0,
        normalMax: 37.4,
      },
    ],
    criticalValues: {
      low: 35.0,
      high: 39.5,
      note: '低於 35°C 或高於 39.5°C 之處置與通報，請依各單位規範及醫療團隊判斷。',
    },
    measurementTips: [
      '同一病人請固定使用同一部位以利趨勢比較。',
      '高熱兒童加強觀察活力、囪門、皮膚溫度與意識狀態變化。',
    ],
  },
];
