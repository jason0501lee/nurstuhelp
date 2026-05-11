import type { DrugCard } from '@/types/cards/drug';

/**
 * Seed drug cards.
 *
 * Per safety governance §6.D, dose_reference entries are text-only
 * and carry the standard "以醫囑為準" suffix. High-alert flag drives
 * the red banner on the card front.
 */
export const DRUG_CARDS: DrugCard[] = [
  {
    id: 'drug-001',
    type: 'drug',
    slug: 'furosemide',
    locale: 'zh-TW',
    title: 'Furosemide',
    subtitle: '常見利尿劑 / 高警訊藥品',
    aliases: ['Lasix', '腎益康', 'furosemide', 'lasix', '呋塞米'],
    shortSummary: '迴路型利尿劑，常用於水腫與高血壓；屬高警訊藥品，給藥前須核對劑量、低鉀風險與血壓變化。',
    targetUser: ['nursing_student'],
    clinicalSetting: ['ward', 'icu', 'er', 'opd'],
    priority: 'high',
    tags: ['利尿劑', 'high-alert', 'cardiovascular'],
    categories: ['藥物/心血管/利尿劑'],
    caution: [
      {
        level: 'critical',
        scope: 'general',
        message: '本卡為學習與雙重核對用，劑量、頻次、稀釋方式以最新醫囑為準。',
      },
      {
        level: 'warning',
        scope: 'renal',
        message: '腎功能不全者作用與副作用差異大，與團隊確認個別劑量調整。',
      },
    ],
    redFlags: [
      {
        trigger: '收縮壓 < 90 mmHg 或近期出現姿勢性低血壓',
        actionHint: '考慮暫停下一劑並通知護理人員 / 醫師，依單位規範處置。',
      },
      {
        trigger: 'K+ < 3.0 mmol/L 或出現肌肉無力 / 心律不整',
        actionHint: '考慮暫停給藥並回報團隊，依單位低鉀血症規範跟進。',
      },
    ],
    bodySections: [
      {
        key: 'indications',
        label: '常見適應症',
        layout: 'bullet',
        collapsedByDefault: false,
        displayHint: 'front',
        content: [
          '充血性心衰竭引起之水腫',
          '肝硬化、腎病症候群相關水腫',
          '高血壓（作為合併治療之一）',
        ],
      },
      {
        key: 'nursing_focus',
        label: '護理觀察重點',
        layout: 'bullet',
        collapsedByDefault: false,
        displayHint: 'front',
        content: [
          '監測血壓、心跳、姿勢性血壓變化。',
          '記錄 IO，注意脫水徵象（口乾、尿量減少、皮膚張力下降）。',
          '監測 K+、Na+、Mg2+、Cr / BUN。',
          '長期使用注意聽力變化（耳毒性，尤其快速 IV push）。',
        ],
      },
      {
        key: 'patient_edu',
        label: '衛教重點',
        layout: 'bullet',
        collapsedByDefault: true,
        displayHint: 'expanded',
        content: [
          '建議白天服用避免夜間頻尿。',
          '勿自行停藥；起立時動作放慢以免頭暈跌倒。',
          '香蕉、深綠色蔬菜等含鉀食物可諮詢營養師。',
        ],
      },
    ],
    quickActions: [
      { type: 'open_calculator', label: '劑量計算機' },
    ],
    references: [
      {
        citation: '常用藥物資料庫（範例條目）',
        sourceType: 'drug_database',
        sourceLang: 'zh-TW',
      },
    ],
    review: {
      version: '1.0.0',
      authoredBy: ['seed'],
      reviewedBy: [],
      nextReviewDue: '2026-12-01',
      approvalScopes: ['clinical_accuracy', 'safety_disclaimer'],
    },
    status: 'published',
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-04-01T00:00:00Z',
    searchKeywords: ['lasix', 'furosemide', '利尿劑', '腎益康'],

    genericName: 'Furosemide',
    brandNames: ['Lasix', '腎益康'],
    drugClass: ['Loop diuretic'],
    highAlert: true,
    lasaWarnings: ['Torsemide', 'Fluoxetine'],
    indications: ['水腫', '高血壓', '充血性心衰竭'],
    contraindications: ['無尿症', '對 sulfonamide 嚴重過敏史', '嚴重電解質不平衡'],
    routes: ['po', 'iv', 'im'],
    doseReference: [
      {
        population: '成人 — 水腫',
        route: 'po',
        rangeText: '20–80 mg 每日 1 次起始；依反應調整。',
        note: '僅供雙重核對；劑量以最新醫囑為準。',
        sourceRefIdx: 0,
      },
      {
        population: '成人 — 急性肺水腫',
        route: 'iv',
        rangeText: '40 mg 緩慢 IV，必要時於 1–2 小時後追加。',
        note: '僅供雙重核對；劑量以最新醫囑為準。',
        sourceRefIdx: 0,
      },
    ],
    onsetPeakDuration: {
      onset: 'PO 30–60 分鐘；IV 5 分鐘',
      peak: 'PO 1–2 小時；IV 30 分鐘',
      duration: 'PO 6–8 小時；IV 2 小時',
    },
    adverseEffects: {
      common: ['頻尿', '低鉀血症', '姿勢性低血壓', '頭暈'],
      serious: ['嚴重電解質不平衡', '聽力受損（快速 IV push 風險）', '急性腎損傷'],
    },
    monitoring: [
      {
        parameter: '血壓 / 心跳',
        trigger: '給藥前後及姿勢改變時',
        actionHint: '若收縮壓顯著下降，考慮回報團隊並暫停下一劑。',
      },
      {
        parameter: 'K+, Na+, Cr',
        trigger: '長期 / 大劑量使用',
        actionHint: '依單位規範頻次抽血，異常值依規範回報。',
      },
      {
        parameter: 'IO',
        trigger: '住院期間每班次',
        actionHint: '紀錄並比較趨勢，明顯脫水時與團隊討論。',
      },
    ],
    nursingConsiderations: [
      'IV push 速率不可過快（避免耳毒性）。',
      '與 digoxin 合併時注意低鉀引發毒性風險。',
      '高警訊藥品 — 依單位規範考慮雙人核對。',
    ],
    interactionsBrief: [
      'Digoxin：低鉀時毒性風險升高（觀察性，不作交互作用判定）。',
      'NSAIDs：可能降低利尿效果。',
      'Aminoglycosides：合併使用增加耳毒性與腎毒性風險。',
    ],
    storage: '室溫保存，避光。',
    appearance: '常見口服劑型為白色圓錠；注射劑為無色澄清溶液。',
  },

  {
    id: 'drug-002',
    type: 'drug',
    slug: 'acetaminophen',
    locale: 'zh-TW',
    title: 'Acetaminophen',
    subtitle: '常見退燒 / 止痛',
    aliases: ['Paracetamol', '普拿疼', 'Panadol', '乙醯胺酚', 'acetaminophen', 'paracetamol'],
    shortSummary: '常用解熱鎮痛劑；劑量上限與肝功能風險為主要安全焦點。',
    targetUser: ['nursing_student'],
    clinicalSetting: ['ward', 'er', 'opd', 'pediatric', 'home'],
    priority: 'high',
    tags: ['解熱鎮痛', 'pediatric'],
    categories: ['藥物/解熱鎮痛'],
    caution: [
      {
        level: 'critical',
        message: '本卡為學習與雙重核對用；劑量、頻次以最新醫囑為準。注意 24 小時總劑量上限與肝功能風險。',
      },
      {
        level: 'warning',
        scope: 'hepatic',
        message: '肝功能不全者劑量需個別調整，與團隊確認。',
      },
    ],
    redFlags: [
      {
        trigger: '24 小時內已使用其他含 acetaminophen 成分藥品',
        actionHint: '考慮回報並重新評估總劑量，依單位規範跟進。',
      },
    ],
    bodySections: [
      {
        key: 'indications',
        label: '常見適應症',
        layout: 'bullet',
        collapsedByDefault: false,
        displayHint: 'front',
        content: ['輕至中度疼痛', '發燒'],
      },
      {
        key: 'nursing_focus',
        label: '護理觀察重點',
        layout: 'bullet',
        collapsedByDefault: false,
        displayHint: 'front',
        content: [
          '觀察退燒成效（用藥後 30–60 分鐘）。',
          '監測 24 小時總劑量，注意複方藥品中是否含相同成分。',
          '長期 / 大量使用者注意 ALT/AST。',
        ],
      },
    ],
    quickActions: [],
    references: [
      {
        citation: '常用藥物資料庫（範例條目）',
        sourceType: 'drug_database',
        sourceLang: 'zh-TW',
      },
    ],
    review: {
      version: '1.0.0',
      authoredBy: ['seed'],
      reviewedBy: [],
      nextReviewDue: '2026-12-01',
      approvalScopes: ['clinical_accuracy', 'safety_disclaimer'],
    },
    status: 'published',
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-04-01T00:00:00Z',
    searchKeywords: ['普拿疼', 'acetaminophen', 'paracetamol', '退燒'],

    genericName: 'Acetaminophen',
    brandNames: ['Panadol', '普拿疼'],
    drugClass: ['解熱鎮痛劑'],
    highAlert: false,
    indications: ['輕至中度疼痛', '發燒'],
    contraindications: ['對成分過敏', '嚴重肝功能不全'],
    routes: ['po', 'pr', 'iv'],
    doseReference: [
      {
        population: '成人',
        route: 'po',
        rangeText: '500–1000 mg 每 4–6 小時，24h 總劑量不超過 4 g（多數指引建議 ≤ 3 g 較安全）。',
        note: '僅供雙重核對；劑量以最新醫囑為準。',
        sourceRefIdx: 0,
      },
      {
        population: '兒童',
        route: 'po',
        rangeText: '10–15 mg/kg 每 4–6 小時，24h 不超過 5 劑。',
        note: '兒科劑量請與處方對照。',
        sourceRefIdx: 0,
      },
    ],
    onsetPeakDuration: { onset: '30 分鐘', peak: '1 小時', duration: '4–6 小時' },
    adverseEffects: {
      common: ['一般耐受性佳'],
      serious: ['過量導致肝毒性', '少見過敏反應'],
    },
    monitoring: [
      {
        parameter: '24 小時總劑量',
        trigger: '使用複方藥品或多次給藥時',
        actionHint: '與處方核對總劑量，避免無意中超量。',
      },
      {
        parameter: 'ALT / AST',
        trigger: '長期 / 大量使用',
        actionHint: '依單位規範頻次抽血。',
      },
    ],
    nursingConsiderations: [
      '提醒病人勿同時自行使用含相同成分之感冒藥。',
      '空腹或飯後皆可服用。',
    ],
    interactionsBrief: [
      'Warfarin：長期使用可能增加 INR。',
      '酒精：增加肝毒性風險。',
    ],
    appearance: '錠劑、糖漿、栓劑、IV 注射等多種劑型。',
  },
];
