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
  domain: 'psychological',
  locale: 'zh-TW',
  targetUser: ['nursing_student'],
  clinicalSetting: ['ward', 'opd', 'er', 'community'],
  priority: 'high',
  tags: ['assessment', '心理評估'],
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

export const PSYCHOLOGICAL_ASSESSMENT_CARDS: AssessmentCard[] = [
  {
    ...COMMON,
    id: 'assess-psych-mood',
    slug: 'mood-emotion',
    title: '情緒狀態評估',
    subtitle: '焦慮、憂鬱、無助、情緒穩定度',
    aliases: ['情緒評估', 'mood', '焦慮', '憂鬱'],
    shortSummary: '觀察與會談並用：表情、語調、肢體 + 開放式問句；情緒劇烈波動或低落要連帶評估自傷風險。',
    categories: ['基本評估/心理/情緒'],
    caution: [
      { level: 'warning', message: '情緒明顯低落 / 無望 / 提及死念 → 進一步做自傷風險評估。' },
    ],
    bodySections: [],
    references: [{ citation: '一般護理基礎教科書（範例條目）', sourceType: 'textbook', sourceLang: 'zh-TW' }],
    searchKeywords: ['情緒', 'mood', '焦慮', '憂鬱', '害怕'],
    focus: 'mood',
    evaluationItems: [
      '主訴情緒（焦慮、憂鬱、害怕、生氣、無助）',
      '情緒穩定度與波動',
      '對疾病 / 住院的感受',
    ],
    observationPoints: [
      '表情緊張、哭泣、退縮',
      '煩躁、情緒波動大',
      '對醫療人員迴避或敵意',
      '言語提及「沒希望」「累了」',
    ],
    sampleQuestions: [
      '「你現在心情如何？」',
      '「最擔心的是什麼？」',
      '「最近這幾天，會不會常覺得心情低落、提不起勁？」',
    ],
    documentationTemplate: '情緒 [穩定/焦慮/低落]，主訴 [描述]，[配合度/合作度]。',
  },

  {
    ...COMMON,
    id: 'assess-psych-cognition',
    slug: 'cognition',
    title: '認知功能評估',
    subtitle: '意識、定向感、記憶、注意力、判斷',
    aliases: ['認知評估', 'cognition', '定向感', 'MMSE'],
    shortSummary: '快速評估意識、定向（人/時/地）、記憶、注意力、理解判斷；老人或意識變化要區辨 delirium / dementia / depression。',
    categories: ['基本評估/心理/認知'],
    priority: 'critical',
    caution: [
      { level: 'warning', message: '新發認知改變（小時–天）多為譫妄（delirium）— 找原因（感染、缺氧、電解質、用藥）。' },
    ],
    redFlags: [
      { trigger: '突發意識混亂、注意力波動、日夜顛倒', actionHint: '考慮譫妄，依規範回報並查找誘因。' },
    ],
    bodySections: [],
    references: [{ citation: '一般護理基礎教科書（範例條目）', sourceType: 'textbook', sourceLang: 'zh-TW' }],
    searchKeywords: ['認知', '定向感', 'MMSE', '譫妄', 'delirium'],
    focus: 'cognition',
    evaluationItems: [
      '意識清醒度',
      '定向感（人、時、地）',
      '近期 / 長期記憶',
      '注意力 / 集中力',
      '理解力與判斷力',
    ],
    observationPoints: [
      '答非所問、注意力差',
      '日夜顛倒、晚上躁動（sundowning）',
      '反覆問同樣問題',
      '不認得家人',
    ],
    sampleQuestions: [
      '「請問你叫什麼名字？現在是幾月幾號？這裡是哪裡？」',
      '「我剛剛說了三個東西：蘋果、桌子、雨傘，等下我會再問。」（5 分鐘後回問）',
      '深度評估可用 MMSE / MoCA。',
    ],
    documentationTemplate: '意識 [清醒/嗜睡]，定向 [人/時/地 OK / 異常]，記憶 [描述]，注意力 [描述]。',
  },

  {
    ...COMMON,
    id: 'assess-psych-thought',
    slug: 'thought-perception',
    title: '思考內容與知覺評估',
    subtitle: '幻覺、妄想、思考邏輯',
    aliases: ['思考評估', '幻覺', '妄想', 'thought perception'],
    shortSummary: '觀察思考流暢度、內容是否合理、有無被害 / 誇大妄想、是否聽到別人聽不到的聲音；以中性、不評價方式詢問。',
    categories: ['基本評估/心理/思考與知覺'],
    caution: [
      { level: 'info', message: '不要直接駁斥妄想內容，先用「我了解你的感受」建立關係，再評估安全與治療配合度。' },
    ],
    redFlags: [
      { trigger: '被命令式幻聽要求自傷 / 傷人', actionHint: '依單位精神急症規範立即回報並確保病人與他人安全。' },
    ],
    bodySections: [],
    references: [{ citation: '一般護理基礎教科書（範例條目）', sourceType: 'textbook', sourceLang: 'zh-TW' }],
    searchKeywords: ['思考', '幻覺', '妄想', 'hallucination', 'delusion'],
    focus: 'thought_perception',
    evaluationItems: [
      '思考流暢度（聯想鬆散、思考奔逸、思考遲緩）',
      '思考內容（妄想、強迫思考、自殺意念）',
      '知覺（幻覺：聽、視、觸、嗅、味）',
      '錯覺',
    ],
    observationPoints: [
      '自言自語、答非所問',
      '對著沒人的方向講話 / 反應（幻聽）',
      '被害、誇大、關係妄想內容',
      '無法配合治療或社交',
    ],
    sampleQuestions: [
      '「你會不會有時候聽到別人聽不到的聲音？」',
      '「會不會覺得有人在跟蹤你 / 想害你？」',
      '「最近有沒有不尋常的想法或感受？」',
    ],
    documentationTemplate: '思考 [合邏輯/離題/鬆散]，幻覺 [無/聽/視] [描述]，妄想 [無/被害/誇大] [描述]。',
  },

  {
    ...COMMON,
    id: 'assess-psych-stress',
    slug: 'stress-coping',
    title: '壓力與因應評估',
    subtitle: '壓力源、因應方式、家屬支持',
    aliases: ['壓力評估', 'stress coping', '因應'],
    shortSummary: '了解病人面對疾病的壓力源、慣用因應策略、可用的支持系統；過度否認 / 逃避會影響治療配合度。',
    categories: ['基本評估/心理/壓力因應'],
    bodySections: [],
    references: [{ citation: '一般護理基礎教科書（範例條目）', sourceType: 'textbook', sourceLang: 'zh-TW' }],
    caution: [
      { level: 'info', message: '無效因應（否認、逃避、依賴）需要團隊介入（社工、心理師、宗教關懷）。' },
    ],
    searchKeywords: ['壓力', '因應', 'coping', 'stress'],
    focus: 'stress_coping',
    evaluationItems: [
      '近期壓力源（疾病、經濟、家庭、工作）',
      '面對疾病的反應（接受、否認、憤怒、討價還價、憂鬱）',
      '慣用因應方式（問題解決、社交支持、宗教、運動、物質使用）',
      '支持系統的可用性',
    ],
    observationPoints: [
      '過度擔心、無法配合治療',
      '逃避討論病情',
      '依賴他人決策',
      '使用酒精 / 藥物 / 暴食緩解情緒',
    ],
    sampleQuestions: [
      '「遇到壓力時你通常怎麼處理？」',
      '「這次生病對你最大的影響是什麼？」',
      '「除了家人，還有誰可以幫忙？」',
    ],
    documentationTemplate: '壓力源 [描述]，因應 [描述]，支持系統 [描述]。',
  },

  {
    ...COMMON,
    id: 'assess-psych-suicide-risk',
    slug: 'suicide-risk',
    title: '自傷 / 自殺風險評估',
    subtitle: '直接問、不繞圈',
    aliases: ['自殺風險', 'suicide risk', '自傷', '自殺意念'],
    shortSummary: '直接、不評價地詢問自殺意念、計畫、手段、時間表；任何 yes 都不可帶過，依單位規範立即回報並啟動安全照顧。',
    categories: ['基本評估/心理/自傷風險'],
    priority: 'critical',
    caution: [
      { level: 'critical', message: '⚠️ 詢問自殺不會「給病人想法」— 沉默才會。請用平靜、不評價的語氣直接問。' },
    ],
    redFlags: [
      { trigger: '主訴 / 暗示「不想活」「想結束」', actionHint: '依單位自殺風險規範立即回報，啟動安全照顧（移除危險物、陪同、頻次觀察）。' },
      { trigger: '已有明確計畫 / 手段 / 時間表', actionHint: '視為急性高風險，依規範立即處置並通報。' },
    ],
    bodySections: [
      {
        key: 'ask_directly',
        label: '直接詢問的問句',
        layout: 'bullet',
        collapsedByDefault: false,
        displayHint: 'front',
        content: [
          '「最近有沒有想過不想活？」',
          '「有沒有想過要傷害自己？」',
          '「有沒有想過要怎麼做？」',
          '「有沒有準備好任何東西？」',
          '「打算什麼時候做？」',
        ],
      },
    ],
    references: [{ citation: '院內自殺風險評估指引（範例條目）', sourceType: 'institutional_sop', sourceLang: 'zh-TW' }],
    searchKeywords: ['自殺', '自傷', 'suicide', 'self harm', '自殺意念'],
    focus: 'suicide_risk',
    evaluationItems: [
      '自殺意念（passive：「不想活」/ active：「想結束」）',
      '計畫具體性（方法、地點、時間）',
      '手段可近性（藥物、武器、高處）',
      '過去自殺嘗試史',
      '保護因子（家人、信仰、目標）',
      '物質使用 / 戒斷',
    ],
    observationPoints: [
      '突然送禮 / 道別、整理遺物',
      '長期低落後「突然平靜」可能是已決定',
      '社交退縮、拒絕治療',
      '提及死亡相關話題',
    ],
    sampleQuestions: [
      '「最近這幾天，會不會覺得活著沒有意義？」',
      '「有沒有想過傷害自己或結束生命？」',
      '「過去有沒有試過？」',
    ],
    documentationTemplate: '自殺意念 [無/被動/主動]，計畫 [無/有 描述]，手段 [可近/不可近]，過去嘗試 [有/無]，已啟動 [安全照顧措施]。',
  },

  {
    ...COMMON,
    id: 'assess-psych-sleep',
    slug: 'sleep',
    title: '睡眠評估',
    subtitle: '入睡、維持、品質',
    aliases: ['睡眠評估', 'sleep assessment', '失眠'],
    shortSummary: '入睡時間、睡眠中斷、總睡眠、白天嗜睡與精神；失眠常合併焦慮 / 憂鬱 / 疼痛 / 環境因素。',
    categories: ['基本評估/心理/睡眠'],
    bodySections: [],
    references: [{ citation: '一般護理基礎教科書（範例條目）', sourceType: 'textbook', sourceLang: 'zh-TW' }],
    caution: [
      { level: 'info', message: '住院環境造成的失眠（噪音、燈光、巡視）優先用非藥物處置（環境調整、衛教）。' },
    ],
    searchKeywords: ['睡眠', '失眠', 'sleep', 'insomnia'],
    focus: 'sleep',
    evaluationItems: [
      '入睡時間（onset latency）',
      '中途醒來次數與時間',
      '總睡眠時數',
      '睡眠品質、白天嗜睡',
      '住院前後差異',
      '助眠藥物使用',
    ],
    observationPoints: [
      '夜間頻繁起床',
      '日夜顛倒（譫妄）',
      '白天嗜睡',
      '抱怨疲倦、無精神',
    ],
    sampleQuestions: [
      '「平常幾點睡？多久能睡著？」',
      '「半夜會醒嗎？醒幾次？」',
      '「睡多久？早上起來精神如何？」',
    ],
    documentationTemplate: '入睡 [X 分鐘]，夜醒 [X 次]，總睡眠 [X 小時]，品質 [好/普通/差]，[助眠藥使用]。',
  },
];
