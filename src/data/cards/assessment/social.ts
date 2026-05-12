import type { AssessmentCard } from '@/types/cards/assessment';

const COMMON: Pick<
  AssessmentCard,
  | 'type'
  | 'domain'
  | 'locale'
  | 'targetUser'
  | 'clinicalSetting'
  | 'priority'
  | 'tags'
  | 'quickActions'
  | 'review'
  | 'status'
  | 'createdAt'
  | 'updatedAt'
> = {
  type: 'assessment',
  domain: 'social',
  locale: 'zh-TW',
  targetUser: ['nursing_student'],
  clinicalSetting: ['ward', 'opd', 'community', 'home', 'ltc'],
  priority: 'high',
  tags: ['assessment', '社會評估'],
  quickActions: [],
  review: {
    version: '1.0.0',
    authoredBy: ['seed'],
    reviewedBy: [],
    nextReviewDue: '2027-01-01',
    approvalScopes: ['clinical_accuracy', 'language'],
  },
  status: 'published',
  createdAt: '2026-05-11T00:00:00Z',
  updatedAt: '2026-05-11T00:00:00Z',
};

export const SOCIAL_ASSESSMENT_CARDS: AssessmentCard[] = [
  {
    ...COMMON,
    id: 'assess-social-family',
    slug: 'family-caregiver',
    title: '家庭結構與主要照顧者',
    subtitle: '同住者、決策角色、照顧者負荷',
    aliases: ['家庭評估', 'family', '主要照顧者'],
    shortSummary: '了解同住者、主要照顧者、家庭決策模式與照顧者負荷；照顧者也是「次級個案」需評估與支持。',
    categories: ['基本評估/社會/家庭'],
    caution: [
      { level: 'info', message: '照顧者負荷高（情緒崩潰、健康下降）會直接影響病人預後 — 必要時轉介社工 / 喘息服務。' },
    ],
    bodySections: [],
    references: [{ citation: '一般護理基礎教科書（範例條目）', sourceType: 'textbook', sourceLang: 'zh-TW' }],
    searchKeywords: ['家庭', '照顧者', 'family', 'caregiver'],
    focus: 'family_caregiver',
    evaluationItems: [
      '同住者組成',
      '主要照顧者是誰、與病人關係',
      '家庭決策模式（誰拍板）',
      '照顧者負荷（時間、體力、情緒）',
      '家庭關係（和諧 / 衝突）',
    ],
    observationPoints: [
      '探視頻次低、無人陪伴',
      '照顧者疲乏、情緒低落',
      '家庭成員意見不一致',
      '病人對家屬有恐懼或迴避',
    ],
    sampleQuestions: [
      '「平常跟誰住？」',
      '「主要是誰照顧你？」',
      '「家裡重要決定通常誰做？」',
    ],
    documentationTemplate: '家庭組成 [描述]，主要照顧者 [關係]，照顧負荷 [低/中/高]，家庭支持 [充足/不足]。',
  },

  {
    ...COMMON,
    id: 'assess-social-home',
    slug: 'home-environment',
    title: '居住環境評估',
    subtitle: '無障礙、安全、輔具需求',
    aliases: ['居住環境', 'home environment', '無障礙'],
    shortSummary: '住家型態、無障礙、衛生與安全、是否需輔具；高樓無電梯、樓梯、浴室濕滑是常見返家困難因素。',
    categories: ['基本評估/社會/居住環境'],
    bodySections: [],
    references: [{ citation: '一般護理基礎教科書（範例條目）', sourceType: 'textbook', sourceLang: 'zh-TW' }],
    caution: [
      { level: 'info', message: '出院前評估返家環境是否能容納醫療設備（氧氣、抽痰機、病床）與輔具。' },
    ],
    searchKeywords: ['居住', '環境', '無障礙', '輔具', 'home'],
    focus: 'home_environment',
    evaluationItems: [
      '住家型態（公寓、透天、安養機構）',
      '樓層 / 電梯',
      '無障礙設施（扶手、坡道）',
      '浴室安全（防滑、扶手）',
      '室內空間（病床、輪椅可否進出）',
      '居家衛生與環境風險',
    ],
    observationPoints: [
      '高樓無電梯',
      '浴室狹小無扶手',
      '樓梯多、無斜坡',
      '雜物多、跌倒風險',
    ],
    sampleQuestions: [
      '「家裡幾樓？有沒有電梯？」',
      '「浴室、廁所方便嗎？有扶手嗎？」',
      '「家裡有沒有空間放病床或氧氣機？」',
    ],
    documentationTemplate: '住家 [型態+樓層]，無障礙 [充足/部分/不足]，浴室 [安全/需改善]，輔具需求 [描述]。',
  },

  {
    ...COMMON,
    id: 'assess-social-support',
    slug: 'social-support',
    title: '社會支持系統',
    subtitle: '家人、朋友、鄰里、社區資源',
    aliases: ['社會支持', 'social support', '支持系統'],
    shortSummary: '家庭以外的支持：朋友、鄰里、宗教、社區資源、政府福利；孤立的長者需特別關注，可轉介社工 / 居家服務。',
    categories: ['基本評估/社會/支持系統'],
    bodySections: [],
    references: [{ citation: '一般護理基礎教科書（範例條目）', sourceType: 'textbook', sourceLang: 'zh-TW' }],
    caution: [
      { level: 'warning', message: '獨居 + 無探視 + 缺乏資源 → 出院風險高，必須啟動社工 / 長照轉介。' },
    ],
    searchKeywords: ['社會支持', '社區', '宗教', 'support'],
    focus: 'social_support',
    evaluationItems: [
      '家人 / 親友 / 鄰里支持',
      '宗教信仰與宗教團體支持',
      '社區資源（里長、社區關懷據點、教會、廟）',
      '政府 / 民間福利（長照 2.0、低收入、身障）',
      '工作場所支持',
    ],
    observationPoints: [
      '無人探視',
      '社交退縮',
      '對未來無計畫',
      '經濟困難不主動求助',
    ],
    sampleQuestions: [
      '「除了家人，有沒有人可以幫忙陪伴或接送？」',
      '「有沒有信仰或宗教團體可以支持你？」',
      '「有申請任何補助或長照服務嗎？」',
    ],
    documentationTemplate: '支持系統 [家人/朋友/宗教/社區/福利] [充足/不足]，已轉介 [社工/長照/居服]。',
  },

  {
    ...COMMON,
    id: 'assess-social-economic',
    slug: 'economic-insurance',
    title: '經濟與保險評估',
    subtitle: '就醫負擔、保險、社福資源',
    aliases: ['經濟評估', 'economic', '保險', '醫療費用'],
    shortSummary: '評估經濟壓力對治療的影響：費用負擔、藥物自費、交通費、照顧成本；困難時主動轉介社工。',
    categories: ['基本評估/社會/經濟'],
    bodySections: [],
    references: [{ citation: '一般護理基礎教科書（範例條目）', sourceType: 'textbook', sourceLang: 'zh-TW' }],
    caution: [
      { level: 'info', message: '經濟困難時病人常不主動說 — 觀察「自費藥不拿」「自行縮減劑量」是徵兆。' },
    ],
    searchKeywords: ['經濟', '保險', '費用', '社福', 'economic'],
    focus: 'economic',
    evaluationItems: [
      '健保身分（一般 / 重大傷病 / 低收 / 中低收）',
      '商業 / 醫療保險',
      '經濟支柱與收入來源',
      '醫療費用負擔能力',
      '交通與照顧成本',
    ],
    observationPoints: [
      '自費藥猶豫、不拿',
      '提前出院、跳回診',
      '家屬詢問費用',
      '無法購藥或請假',
    ],
    sampleQuestions: [
      '「目前就醫或照顧費用上會有困難嗎？」',
      '「有保險嗎？有沒有申請重大傷病卡 / 低收？」',
      '「需要社工協助申請補助嗎？」',
    ],
    documentationTemplate: '健保 [身分]，經濟 [充裕/普通/困難]，已轉介社工 [是/否]。',
  },

  {
    ...COMMON,
    id: 'assess-social-discharge',
    slug: 'discharge-planning',
    title: '出院與照護可行性評估',
    subtitle: '返家後誰照顧、能照顧多少',
    aliases: ['出院規劃', 'discharge planning', '返家'],
    shortSummary: '入院當天就要開始想出院：返家去向、照顧者能力、用藥、回診、長照需求；越早規劃越平順。',
    categories: ['基本評估/社會/出院規劃'],
    priority: 'critical',
    caution: [
      { level: 'warning', message: '無人接送 / 無法服藥 / 無法自理 → 需團隊（社工、出院準備、長照）介入；不可硬出院。' },
    ],
    bodySections: [
      {
        key: 'plan_early',
        label: '出院規劃 — 入院第一天就要問的事',
        layout: 'bullet',
        collapsedByDefault: false,
        displayHint: 'expanded',
        content: [
          '出院後預計回到哪裡（自家 / 子女家 / 機構）',
          '誰會主要照顧',
          '是否有定期回診的能力（交通、陪同）',
          '是否需要居家服務、居家護理、長照',
          '用藥、傷口、管路能不能自行處理',
        ],
      },
    ],
    references: [{ citation: '院內出院準備服務 SOP（範例條目）', sourceType: 'institutional_sop', sourceLang: 'zh-TW' }],
    searchKeywords: ['出院', 'discharge', '長照', '居家'],
    focus: 'discharge_planning',
    evaluationItems: [
      '出院去向',
      '主要照顧者能力與時間',
      '用藥管理能力',
      '飲食、傷口、管路自我照護能力',
      '回診交通與陪同',
      '居家服務 / 長照需求',
      '輔具需求',
    ],
    observationPoints: [
      '無人接送回院',
      '高齡獨居',
      '多重慢性病 + 多重用藥',
      '管路 / 傷口照護複雜',
    ],
    sampleQuestions: [
      '「出院後回哪裡？誰會照顧？」',
      '「有沒有辦法每月來回診？」',
      '「家人能幫忙換藥 / 抽痰 / 餵食嗎？」',
    ],
    documentationTemplate: '出院去向 [自家/機構/...]，主要照顧者 [描述+能力]，需求 [長照/居家/輔具/社工]。',
  },

  {
    ...COMMON,
    id: 'assess-social-vulnerability',
    slug: 'vulnerability-safety',
    title: '安全與脆弱處境評估',
    subtitle: '家暴、虐待、忽視、獨居高風險',
    aliases: ['脆弱處境', 'vulnerability', '家暴', '虐待'],
    shortSummary: '辨識家暴、虐待、忽視、獨居老人、外籍勞工等脆弱處境；發現徵兆依規範通報，本卡為提醒非處置流程。',
    categories: ['基本評估/社會/脆弱處境'],
    priority: 'critical',
    caution: [
      { level: 'critical', message: '懷疑家暴 / 虐待 / 兒少保護案件 → 依各院通報規範執行（社工、113、警政）；切勿在家屬在場時直接面質。' },
    ],
    redFlags: [
      { trigger: '受傷解釋不一致、害怕家屬在場、反覆就醫', actionHint: '依單位通報規範啟動評估與通報流程。' },
      { trigger: '長者顯著消瘦、皮膚壓傷、衛生差但同住有家屬', actionHint: '考慮 elder abuse / neglect，依規範通報。' },
    ],
    bodySections: [
      {
        key: 'screen_safely',
        label: '安全會談技巧',
        layout: 'bullet',
        collapsedByDefault: false,
        displayHint: 'expanded',
        content: [
          '單獨會談（家屬在場時不適合問）',
          '中性、不評價的語氣',
          '不直接面質、不承諾保密（必要時需通報）',
          '記錄客觀傷勢（位置、大小、顏色），不主觀判斷',
          '提供資源（113 婦幼專線、社工、警政）',
        ],
      },
    ],
    references: [{ citation: '院內家暴 / 兒少 / 老人保護通報 SOP（範例條目）', sourceType: 'institutional_sop', sourceLang: 'zh-TW' }],
    searchKeywords: ['家暴', '虐待', 'vulnerability', '113', '通報'],
    focus: 'vulnerability_safety',
    evaluationItems: [
      '受傷時間與解釋是否一致',
      '反覆就醫 / 反覆受傷史',
      '陪同者控制行為（不離身、代答）',
      '兒少 / 長者照顧疏忽徵兆',
      '人口販運、移工受虐徵兆',
      '獨居 + 失能 + 無社會支持',
    ],
    observationPoints: [
      '害怕家屬在場、與家屬說法不一',
      '不同癒合時期的傷',
      '兒童異常退縮 / 過度警覺',
      '長者體重明顯下降、衛生不佳',
      '無故未回診、藥物未領',
    ],
    sampleQuestions: [
      '（私下）「家裡有沒有人讓你感到害怕？」',
      '（私下）「有沒有人讓你受傷？」',
      '「需要我們幫你聯絡社工或安全的地方嗎？」',
    ],
    documentationTemplate: '客觀傷勢紀錄 [部位+大小+顏色]，主訴 [家屬說法 vs 病人說法]，已依單位規範通報 [社工/113/警政]。',
  },
];
