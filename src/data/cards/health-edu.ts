import type { HealthEduCard } from '@/types/cards/healthEdu';

/**
 * Seed health-education cards covering the user-listed HTN / HoTN
 * education targets. explainIn30s is the spoken-style script the
 * student can read aloud after verifying it with the team.
 */
export const HEALTH_EDU_CARDS: HealthEduCard[] = [
  {
    id: 'edu-001',
    type: 'health_edu',
    slug: 'hypertension-education',
    locale: 'zh-TW',
    title: '高血壓衛教',
    subtitle: '日常自我管理重點',
    aliases: ['HTN 衛教', '高血壓教育', 'hypertension education'],
    shortSummary: '高血壓病人日常飲食、運動、用藥與居家量血壓的核心衛教重點，搭配 30 秒口語版腳本。',
    targetUser: ['nursing_student'],
    clinicalSetting: ['ward', 'opd', 'community', 'home'],
    ageScope: ['adult', 'elderly'],
    priority: 'normal',
    tags: ['衛教', 'cardiovascular'],
    categories: ['衛教/心血管/高血壓'],
    caution: [
      {
        level: 'warning',
        message: '進行衛教前請先與帶教老師或醫療團隊確認本案個別差異與醫囑內容。',
      },
    ],
    bodySections: [
      {
        key: 'do_and_dont',
        label: '建議與避免',
        layout: 'comparison',
        collapsedByDefault: false,
        displayHint: 'front',
        content: [
          {
            label: '建議',
            bullets: [
              '低鈉飲食（鹽分減量、避免醃漬與加工食品）',
              '每週至少 150 分鐘中強度有氧運動（依醫師建議）',
              '居家固定時段量血壓並紀錄',
              '規律睡眠、適度紓壓',
            ],
          },
          {
            label: '避免',
            bullets: [
              '突然停藥（包括症狀好轉時）',
              '過量咖啡因、酒精',
              '吸菸',
              '私自合併使用止痛藥（NSAIDs）',
            ],
          },
        ],
      },
      {
        key: 'misconception',
        label: '常見誤解',
        layout: 'bullet',
        collapsedByDefault: true,
        displayHint: 'expanded',
        content: [
          '「血壓正常就可以停藥」— 多數需要長期控制，停藥前須先諮詢醫師。',
          '「沒有頭痛就沒事」— 高血壓多無症狀，仍會傷害心、腦、腎。',
          '「血壓越低越好」— 過低反而會頭暈與跌倒。',
        ],
      },
    ],
    quickActions: [{ type: 'copy_text', label: '複製 30 秒口語版' }],
    references: [
      {
        citation: '一般病人衛教手冊（範例條目）',
        sourceType: 'institutional_sop',
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
    searchKeywords: ['高血壓衛教', 'HTN', '衛教', '低鈉'],

    topic: '高血壓',
    targetPatient: ['adult', 'elderly', 'caregiver'],
    readingLevel: 'low',
    keyMessages: [
      '高血壓需要長期管理，不能因為沒症狀就停藥。',
      '飲食上以「少鈉、多蔬果、控制體重」為原則。',
      '每天固定時段量血壓並紀錄，回診時帶給醫師看。',
      '出現嚴重頭痛、胸痛、視力模糊或意識變化，請盡快回院。',
    ],
    explainIn30s:
      '高血壓是長期的問題，多數時候不會有感覺，但會慢慢傷到心臟、腦、腎臟。請固定吃藥、減少鹽分、規律運動，每天量血壓並紀錄；如果出現嚴重頭痛、胸痛或意識變化，請盡快回院。以上是一般衛教重點，您的醫師會依您個別狀況調整。',
    teachBackQuestions: [
      '今天量血壓的目標時間是什麼時候？',
      '高血壓的飲食原則中，最重要的一項是？',
      '如果出現哪些症狀需要立刻回院？',
    ],
    commonMisconceptions: [
      '血壓正常就可以停藥',
      '沒症狀就代表控制得很好',
      '血壓降得越低越好',
    ],
    doAndDont: {
      do: ['低鈉飲食', '規律運動', '居家固定量血壓', '規律服藥', '規律睡眠'],
      dont: ['自行停藥', '過量咖啡因 / 酒精', '吸菸', '私自合併 NSAIDs'],
    },
    relatedDiseaseIds: ['dis-001'],
  },

  {
    id: 'edu-002',
    type: 'health_edu',
    slug: 'hypotension-education',
    locale: 'zh-TW',
    title: '低血壓衛教',
    subtitle: '預防跌倒與症狀辨識',
    aliases: ['HoTN 衛教', '低血壓教育', 'hypotension education'],
    shortSummary: '低血壓病人之症狀辨識、姿勢性低血壓預防、跌倒安全與何時回診之核心衛教。',
    targetUser: ['nursing_student'],
    clinicalSetting: ['ward', 'opd', 'community', 'home'],
    ageScope: ['adult', 'elderly'],
    priority: 'normal',
    tags: ['衛教', 'cardiovascular'],
    categories: ['衛教/心血管/低血壓'],
    caution: [
      {
        level: 'warning',
        message: '進行衛教前請先與帶教老師或醫療團隊確認本案個別差異與醫囑內容。',
      },
    ],
    bodySections: [
      {
        key: 'do_and_dont',
        label: '建議與避免',
        layout: 'comparison',
        collapsedByDefault: false,
        displayHint: 'front',
        content: [
          {
            label: '建議',
            bullets: [
              '起立前先在床邊坐 1–2 分鐘再站起',
              '充足水分攝取（依醫囑限制者除外）',
              '少量多餐避免飯後低血壓',
              '量血壓並紀錄起立前後的差異',
            ],
          },
          {
            label: '避免',
            bullets: [
              '快速從躺姿改變為站姿',
              '長時間直立 / 站立工作未休息',
              '高溫環境長時間活動',
              '突然停降壓藥（需先與醫師討論）',
            ],
          },
        ],
      },
    ],
    quickActions: [{ type: 'copy_text', label: '複製 30 秒口語版' }],
    references: [
      {
        citation: '一般病人衛教手冊（範例條目）',
        sourceType: 'institutional_sop',
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
    searchKeywords: ['低血壓衛教', 'HoTN', '姿勢性低血壓', '跌倒'],

    topic: '低血壓',
    targetPatient: ['adult', 'elderly', 'caregiver'],
    readingLevel: 'low',
    keyMessages: [
      '低血壓常在起立時造成頭暈，請慢慢改變姿勢。',
      '出現眼前發黑、嚴重頭暈、跌倒、意識不清，請盡快回院。',
      '若服用降壓藥，請與醫師討論是否需要調整。',
    ],
    explainIn30s:
      '低血壓常常在站起來的時候造成頭暈，建議起床前先在床邊坐 1–2 分鐘再慢慢站起。日常多補充水分、少量多餐，避免長時間站立或熱環境。如果出現眼前發黑、嚴重頭暈、跌倒或意識變化，請盡快回院。以上是一般衛教重點，您的醫師會依您個別狀況調整。',
    teachBackQuestions: [
      '為什麼起立前要先坐一下？',
      '出現哪些症狀需要回院？',
    ],
    doAndDont: {
      do: ['起立動作放慢', '充足水分', '少量多餐', '記錄頭暈發生時機'],
      dont: ['快速起立', '高溫環境長時間活動', '自行停藥'],
    },
  },

  {
    id: 'edu-003',
    type: 'health_edu',
    slug: 'heatstroke-care',
    locale: 'zh-TW',
    title: '中暑處理衛教',
    subtitle: '熱衰竭 / 熱中暑現場急救與預防',
    aliases: ['中暑', '熱衰竭', '熱中暑', 'heatstroke', 'heat exhaustion'],
    shortSummary:
      '熱傷害分輕重：熱痙攣 / 熱衰竭可現場降溫補水；熱中暑（體溫 >40°C、意識改變）為急症須立刻送醫。重點是盡快降溫、補水電解質、必要時打 119。',
    targetUser: ['nursing_student'],
    clinicalSetting: ['er', 'opd', 'community', 'home'],
    ageScope: ['child', 'adolescent', 'adult', 'elderly', 'pregnant'],
    priority: 'high',
    tags: ['衛教', '熱傷害', '急救', '夏季'],
    categories: ['衛教/環境傷害/中暑'],
    caution: [
      {
        level: 'critical',
        message:
          '出現意識不清、抽搐、體溫接近或超過 40°C、行為異常 → 立刻打 119，不要只在家處理。',
      },
      {
        level: 'warning',
        message:
          '降溫時避免用冰水猛灌或冰水浴，會引起血管劇烈收縮反而不利散熱。',
      },
      {
        level: 'warning',
        message:
          '意識不清、嘔吐、嗆水風險者不要再給予口服飲料，避免嗆入氣管。',
      },
    ],
    redFlags: [
      {
        trigger: '體溫 ≥40°C 且降溫效果不好',
        actionHint: '立即送醫或打 119，途中持續物理降溫。',
      },
      {
        trigger: '意識不清、抽搐、呼吸急促、胸悶胸痛',
        actionHint: '立即打 119，採復甦姿勢，等待救護車。',
      },
      {
        trigger: '小便明顯變少或顏色變很深',
        actionHint: '懷疑脫水或腎臟壓力，盡早就醫評估。',
      },
      {
        trigger: '高風險族群（老人、小孩、孕婦、慢性病）即使輕症',
        actionHint: '症狀看似不重也建議就醫評估。',
      },
    ],
    bodySections: [
      {
        key: 'severity_compare',
        label: '熱傷害嚴重度判斷',
        layout: 'comparison',
        collapsedByDefault: false,
        displayHint: 'front',
        content: [
          {
            label: '熱衰竭（輕中度）',
            bullets: [
              '大量流汗、皮膚濕冷',
              '頭暈頭痛、全身無力',
              '噁心想吐',
              '心跳加快、血壓偏低',
              '意識清楚',
            ],
          },
          {
            label: '熱中暑（最危險，急症）',
            bullets: [
              '體溫常 >40°C',
              '皮膚乾熱或出汗減少',
              '意識改變（躁動 / 昏迷 / 說話怪）',
              '抽筋、呼吸急促',
              '可能致命 → 立刻打 119',
            ],
          },
        ],
      },
      {
        key: 'first_aid_steps',
        label: '現場急救 4 步驟（清醒者）',
        layout: 'ordered_steps',
        collapsedByDefault: false,
        displayHint: 'front',
        content: [
          {
            index: 1,
            text: '離開高溫環境：移到陰涼通風處（電扇 / 冷氣），平躺、稍微抬高下肢。',
            why: '改善腦部血流、減少頭暈；移離熱源是降溫第一步。',
          },
          {
            index: 2,
            text: '鬆開或脫掉過緊、厚重衣物，幫助散熱。',
          },
          {
            index: 3,
            text: '快速降溫：濕冷毛巾擦頸部 / 腋下 / 鼠蹊（大血管處）；冰袋包毛巾後敷上述部位。可用稍涼的水淋濕配合電扇吹。',
            warning: {
              level: 'warning',
              message:
                '不可用冰水猛灌 / 冰水浴 → 血管劇烈收縮反而不散熱；冰塊不可直接接觸皮膚（凍傷）。',
            },
          },
          {
            index: 4,
            text: '補充水分電解質：意識清楚、能吞嚥者 → 少量多次喝水或運動飲料。30 分鐘症狀沒改善或惡化即送醫。',
            warning: {
              level: 'critical',
              message: '意識不清、嘔吐、嗆水風險者不要灌喝的，避免嗆入氣管。',
            },
          },
        ],
      },
      {
        key: 'call_119',
        label: '一定要送醫 / 打 119 的情況',
        layout: 'bullet',
        collapsedByDefault: false,
        displayHint: 'front',
        content: [
          '意識不清、叫不太醒、講話混亂',
          '抽筋嚴重、抽搐、癲癇樣發作',
          '體溫接近或超過 40°C，降溫無效',
          '呼吸急促、心跳非常快、胸悶胸痛',
          '小便明顯變少、顏色變很深',
          '老人 / 小孩 / 孕婦 / 慢性病（心臟、糖尿病、腎病）即使症狀輕也建議就醫',
        ],
      },
      {
        key: 'prevention',
        label: '日常預防（台灣夏天）',
        layout: 'bullet',
        collapsedByDefault: true,
        displayHint: 'expanded',
        content: [
          '減少中午前後烈日下久站 / 劇烈運動，多排休息',
          '穿輕薄、淺色、透氣的棉麻衣物；戴帽 / 撐傘',
          '一整天定時補水，不要等到很渴才喝',
          '大量流汗時補含鹽飲品（運動飲料）',
          '室內悶熱無風時也要開窗 / 電扇 / 冷氣',
          '不要在密閉車內或空間久留（特別是嬰幼兒）',
          '家人多關心老人 / 小孩有無頭暈、沒胃口、異常疲倦',
        ],
      },
      {
        key: 'misconception',
        label: '常見誤解',
        layout: 'bullet',
        collapsedByDefault: true,
        displayHint: 'expanded',
        content: [
          '「喝冰水可以快速降溫」— 過冰會血管收縮，效果反而差；溫涼水加擦拭散熱更有效。',
          '「室內不會中暑」— 悶熱無風的室內一樣會中暑，特別是密閉空間。',
          '「只要流汗就不會中暑」— 熱中暑反而是「停止出汗」的危險徵兆。',
          '「年輕健康沒事」— 高溫運動、勞動者也是高風險族群。',
        ],
      },
    ],
    quickActions: [{ type: 'copy_text', label: '複製 30 秒口語版' }],
    references: [
      {
        citation: '衛福部國健署 — 熱傷害預防與處置',
        sourceType: 'guideline',
        url: 'https://www.hpa.gov.tw',
        sourceLang: 'zh-TW',
      },
    ],
    review: {
      version: '1.0.0',
      authoredBy: ['seed'],
      reviewedBy: [],
      nextReviewDue: '2027-05-14',
      approvalScopes: ['clinical_accuracy', 'safety_disclaimer', 'language'],
    },
    status: 'published',
    createdAt: '2026-05-14T00:00:00Z',
    updatedAt: '2026-05-14T00:00:00Z',
    searchKeywords: ['中暑', '熱衰竭', '熱中暑', 'heatstroke', '熱傷害', '夏天'],

    topic: '中暑處理',
    targetPatient: ['adult', 'elderly', 'pediatric', 'caregiver', 'pregnant'],
    readingLevel: 'low',
    keyMessages: [
      '中暑分輕重：熱衰竭可現場處理；熱中暑（>40°C、意識改變）是急症，要打 119。',
      '現場急救 4 步：移離高溫 → 鬆衣散熱 → 物理降溫（頸 / 腋 / 鼠蹊大血管處）→ 意識清楚才補水電解質。',
      '不要用冰水猛灌或冰水浴；意識不清不要再餵水。',
      '老人、小孩、孕婦、慢性病患者即使症狀輕也建議就醫。',
      '預防勝於治療：避中午烈日、定時補水、室內也要通風散熱。',
    ],
    explainIn30s:
      '中暑分輕重。如果只是頭暈、想吐、大量流汗，要立刻離開太熱的地方，到陰涼處平躺、鬆衣服、用濕冷毛巾擦脖子腋下大腿根部幫助降溫，意識清楚的話少量多次喝運動飲料補充水分電解質。但如果體溫超過 40 度、意識變得不清楚、抽筋、講話怪怪的，這是熱中暑，會致命，要立刻打 119，途中持續幫忙降溫。老人小孩孕婦慢性病的人即使症狀看起來不重，也建議就醫評估。',
    teachBackQuestions: [
      '什麼情況下中暑要立刻打 119？',
      '現場降溫應該擦身體哪些部位？',
      '為什麼意識不清的人不能再給水喝？',
      '哪些人即使症狀輕也建議就醫？',
    ],
    commonMisconceptions: [
      '喝冰水可以快速降溫（過冰會血管收縮反而差）',
      '室內不會中暑（悶熱無風一樣會）',
      '有流汗就不會中暑（停止出汗反而是熱中暑徵兆）',
      '年輕健康沒事（高溫運動 / 勞動者一樣高風險）',
    ],
    doAndDont: {
      do: [
        '立刻移到陰涼處平躺',
        '濕毛巾擦頸 / 腋 / 鼠蹊',
        '意識清楚才少量多次補水（運動飲料）',
        '高溫天定時補水',
        '老人小孩多留意',
      ],
      dont: [
        '用冰水猛灌或冰水浴',
        '冰塊直接接觸皮膚',
        '意識不清還灌水（嗆入風險）',
        '中午烈日下久站 / 劇烈運動',
        '把小孩 / 寵物留在密閉車內',
      ],
    },
  },
];
