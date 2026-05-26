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

  {
    id: 'edu-004',
    type: 'health_edu',
    slug: 'dengue-fever-education',
    locale: 'zh-TW',
    title: '登革熱衛教',
    subtitle: '居家照護、防蚊與重症警示（成人）',
    aliases: ['登革熱', '斷骨熱', 'dengue', 'dengue fever'],
    shortSummary:
      '登革熱由病媒蚊（埃及斑蚊、白線斑蚊）傳染。多為自限性疾病，但退燒期最危險，需密切觀察出血與休克前徵象；居家以休息、補水、防蚊隔離為主。',
    targetUser: ['nursing_student'],
    clinicalSetting: ['ward', 'er', 'opd', 'community', 'home'],
    ageScope: ['adult', 'elderly'],
    priority: 'high',
    tags: ['衛教', '傳染病', '病媒蚊', '夏季'],
    categories: ['衛教/傳染病/登革熱'],
    caution: [
      {
        level: 'critical',
        message:
          '退燒後 24–48 小時是進展為重症的高風險期，出現持續腹痛、反覆嘔吐、四肢冰冷、出血或意識改變請立即就醫。',
      },
      {
        level: 'warning',
        message:
          '退燒止痛只可用 acetaminophen（普拿疼）。禁用 aspirin 與 NSAIDs（如 ibuprofen、diclofenac），會增加出血風險。',
      },
      {
        level: 'warning',
        message:
          '發病前 1 天至發病後 5 天具傳染力，務必使用蚊帳並做好家中防蚊，避免病媒蚊再傳染家人或社區。',
      },
    ],
    redFlags: [
      {
        trigger: '退燒後反而更不舒服、虛弱、頭暈',
        actionHint: '可能進入重症期或血管滲漏期，立即就醫。',
      },
      {
        trigger: '持續或劇烈腹痛、肚子緊繃',
        actionHint: '懷疑血漿滲漏或內出血，立即急診。',
      },
      {
        trigger: '反覆嘔吐、無法口服進食或喝水',
        actionHint: '脫水與電解質失衡風險，立即就醫評估點滴補液。',
      },
      {
        trigger: '四肢冰冷濕黏、臉色蒼白、冒冷汗',
        actionHint: '休克前兆，立即打 119 或送急診。',
      },
      {
        trigger: '嗜睡、意識不清、煩躁、行為改變',
        actionHint: '可能腦部受影響或休克，立即送醫。',
      },
      {
        trigger: '任何出血徵象（牙齦出血、流鼻血、皮膚瘀點瘀青、解黑便、咖啡色嘔吐物、月經量大增）',
        actionHint: '懷疑出血性登革熱，立即急診評估血小板與凝血。',
      },
      {
        trigger: '4–6 小時以上未排尿，或尿色變很深',
        actionHint: '脫水或腎臟壓力，盡早就醫補液評估。',
      },
    ],
    bodySections: [
      {
        key: 'overview',
        label: '什麼是登革熱',
        layout: 'bullet',
        collapsedByDefault: false,
        displayHint: 'front',
        content: [
          '由登革病毒經病媒蚊（埃及斑蚊、白線斑蚊）叮咬傳染。',
          '潛伏期約 3–14 天，多為 4–7 天。',
          '典型症狀：突發高燒、頭痛、後眼窩痛、肌肉關節骨頭劇痛（俗稱「斷骨熱」）、噁心嘔吐、皮疹。',
          '多為自限性疾病，約 7–14 天逐漸恢復；少數會進展為重症 / 出血登革熱。',
          '目前無特效抗病毒藥，治療以支持性療法為主（補水、退燒、休息）。',
        ],
      },
      {
        key: 'home_care',
        label: '居家照護重點',
        layout: 'ordered_steps',
        collapsedByDefault: false,
        displayHint: 'front',
        content: [
          {
            index: 1,
            text: '多休息、避免熬夜與勞累，臥床休息為主，避免劇烈活動與碰撞（降低出血與跌倒風險）。',
          },
          {
            index: 2,
            text: '少量多次補充水分與電解質：開水、運動飲料、清湯。觀察並紀錄每天的喝水量與尿量。',
            why: '預防脫水與血液濃縮，協助維持循環血量。',
          },
          {
            index: 3,
            text: '飲食清淡易消化：稀飯、麵條、蔬菜水果為主，避免油膩與刺激性食物。',
          },
          {
            index: 4,
            text: '退燒止痛只能用 acetaminophen（普拿疼）。不可自行買成藥。',
            warning: {
              level: 'critical',
              message:
                '禁用 aspirin、ibuprofen、diclofenac 等 NSAIDs，會抑制血小板、增加出血風險。',
            },
          },
          {
            index: 5,
            text: '每天固定時間量體溫、紀錄尿量與症狀變化（特別是退燒後 24–48 小時最危險）。',
          },
        ],
      },
      {
        key: 'mosquito_prevention',
        label: '居家防蚊（避免再傳給家人）',
        layout: 'bullet',
        collapsedByDefault: false,
        displayHint: 'front',
        content: [
          '發病前 1 天至發病後 5 天為傳染期，睡覺與休息一定要用蚊帳。',
          '家中加裝、維護紗窗紗門，門窗無破洞。',
          '室內可搭配捕蚊燈或經核可殺蟲劑。',
          '個人防蚊液選擇政府核可成分（DEET、Picaridin）：成人 DEET ≤50%；回室內後以清水肥皂洗去塗抹部位。',
          '減少病人於戶外或蚊蟲多處停留。',
        ],
      },
      {
        key: 'community_prevention',
        label: '巡 / 倒 / 清 / 刷（孳生源清除）',
        layout: 'comparison',
        collapsedByDefault: true,
        displayHint: 'expanded',
        content: [
          {
            label: '巡',
            bullets: [
              '每週至少一次巡視家中與周邊',
              '陽台、屋頂、庭院、水塔、花盆底盤',
              '廢輪胎、舊傢俱、帆布、遮雨棚凹處是否積水',
            ],
          },
          {
            label: '倒',
            bullets: [
              '積水容器水完全倒掉',
              '花瓶、儲水桶、寵物水盆、回收瓶罐',
              '避免水放置超過 7 天',
            ],
          },
          {
            label: '清',
            bullets: [
              '清理容器內壁附著的蚊卵與污泥',
              '不再使用的容器加蓋或倒置',
            ],
          },
          {
            label: '刷',
            bullets: [
              '水溝、排水管刷洗保持通暢',
              '必要時依政府規定使用殺孑孓藥劑',
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
          '「退燒就代表好了」— 退燒後 24–48 小時反而是重症最高風險期。',
          '「發燒可以吃 ibuprofen / 普拿疼以外的止痛藥」— 禁用 aspirin / NSAIDs，會增加出血。',
          '「在家自己悶汗一下就好」— 出現警示徵象（腹痛、嘔吐、出血、意識變化）一定要急診。',
          '「只要不被叮就不會傳給家人」— 病人本身可被家中蚊子叮後再傳給家人，所以一定要蚊帳。',
        ],
      },
    ],
    quickActions: [{ type: 'copy_text', label: '複製 30 秒口語版' }],
    references: [
      {
        citation: '衛福部疾管署 — 登革熱專區',
        sourceType: 'guideline',
        url: 'https://www.cdc.gov.tw/Disease/SubIndex/WYbKe3aE7LiY5gb-eA8PBw',
        sourceLang: 'zh-TW',
      },
      {
        citation: '衛福部國健署 — 防蚊液使用建議',
        sourceType: 'guideline',
        sourceLang: 'zh-TW',
      },
    ],
    review: {
      version: '1.0.0',
      authoredBy: ['seed'],
      reviewedBy: [],
      nextReviewDue: '2027-05-26',
      approvalScopes: ['clinical_accuracy', 'safety_disclaimer', 'language'],
    },
    status: 'published',
    createdAt: '2026-05-26T00:00:00Z',
    updatedAt: '2026-05-26T00:00:00Z',
    searchKeywords: ['登革熱', '斷骨熱', 'dengue', '病媒蚊', '埃及斑蚊', '白線斑蚊', '巡倒清刷'],

    topic: '登革熱',
    targetPatient: ['adult', 'elderly', 'caregiver'],
    readingLevel: 'low',
    keyMessages: [
      '登革熱由病媒蚊傳染，多為自限性，但退燒後 24–48 小時最危險，要密切觀察。',
      '居家以休息、少量多次補水電解質、清淡飲食為主。',
      '退燒止痛只能用普拿疼（acetaminophen），禁用 aspirin / NSAIDs。',
      '發病期間務必使用蚊帳，並做好家中紗窗 / 防蚊液 / 倒積水，避免傳給家人。',
      '出現持續腹痛、反覆嘔吐、出血、四肢冰冷、意識改變 → 立刻急診。',
    ],
    explainIn30s:
      '登革熱是被斑蚊叮咬傳染的，會發高燒、頭痛、後眼窩痛、全身骨頭關節痠痛。大多可以在家照顧，重點是多休息、少量多次補水電解質、清淡飲食，退燒止痛只能用普拿疼，千萬不要吃阿斯匹靈或一般的止痛藥（NSAIDs），會增加出血風險。最危險的是退燒之後的 1–2 天，如果出現持續肚子痛、一直吐、流鼻血或牙齦出血、皮膚瘀青、手腳冰冷、嗜睡或意識怪怪的，請立刻到急診。發病期間請睡蚊帳、家裡裝好紗窗，避免被叮再傳給家人。',
    teachBackQuestions: [
      '什麼藥可以退燒止痛？什麼藥不可以？為什麼？',
      '退燒後的哪段時間最危險？要觀察哪些症狀？',
      '為什麼發病期間要睡蚊帳？',
      '什麼情況下一定要立刻到急診？',
      '每週巡查家中積水的口訣是什麼？',
    ],
    commonMisconceptions: [
      '退燒就代表好了（其實退燒後 24–48 小時最危險）',
      '吃 ibuprofen 沒關係（禁用，會增加出血）',
      '在家悶汗一下就會好（出現警示徵象要急診）',
      '不被叮就不會傳給家人（家裡的蚊子叮病人後可再傳，所以要蚊帳）',
    ],
    doAndDont: {
      do: [
        '多休息、臥床',
        '少量多次補水電解質',
        '只用普拿疼退燒止痛',
        '每天量體溫紀錄尿量',
        '睡覺用蚊帳、家中裝紗窗',
        '每週巡倒清刷積水容器',
      ],
      dont: [
        '吃 aspirin / NSAIDs（ibuprofen 等）',
        '劇烈活動或碰撞（出血風險）',
        '退燒就掉以輕心',
        '意識不清還灌水',
        '家中放積水容器超過 7 天',
      ],
    },
  },

  {
    id: 'edu-005',
    type: 'health_edu',
    slug: 'three-highs-education',
    locale: 'zh-TW',
    title: '三高衛教',
    subtitle: '高血壓 / 高血糖 / 高血脂整合性自我管理',
    aliases: ['三高', '三高管理', 'three highs', 'HTN HLD DM'],
    shortSummary:
      '三高（高血壓、高血糖、高血脂）為心血管、中風、腎病變主要危險因子，多無症狀但長期傷血管。重點：定期量測、規律服藥、三少一多飲食、每週 150 分鐘運動。',
    targetUser: ['nursing_student'],
    clinicalSetting: ['opd', 'community', 'home'],
    ageScope: ['adult', 'elderly'],
    priority: 'normal',
    tags: ['衛教', '慢性病', 'cardiovascular', 'metabolic'],
    categories: ['衛教/慢性病/三高'],
    caution: [
      {
        level: 'warning',
        message: '進行衛教前請先與帶教老師或醫療團隊確認本案個別目標數值與用藥內容。',
      },
      {
        level: 'warning',
        message:
          '三高多無症狀，「沒不舒服」不代表控制良好；切勿因感覺正常就自行停藥或減量。',
      },
    ],
    redFlags: [
      {
        trigger: '突發嚴重頭痛、視力模糊',
        actionHint: '懷疑高血壓急症或腦血管事件，立即就醫 / 急診。',
      },
      {
        trigger: '胸痛、胸悶、冒冷汗、呼吸困難',
        actionHint: '懷疑心肌梗塞，立即打 119。',
      },
      {
        trigger: '突然單側無力、口齒不清、臉部歪斜',
        actionHint: '中風徵象（FAST），立即打 119，把握黃金時間。',
      },
      {
        trigger: '空腹血糖 >300 mg/dL 或出現意識不清、深快呼吸、水果味',
        actionHint: '懷疑高血糖急症（DKA / HHS），立即就醫。',
      },
      {
        trigger: '冒冷汗、發抖、心悸、頭暈、極度飢餓（血糖 <70 mg/dL）',
        actionHint: '低血糖，立即吃 15g 含糖食物（糖果 / 果汁），15 分鐘後再量。',
      },
    ],
    bodySections: [
      {
        key: 'overview',
        label: '三高基本觀念',
        layout: 'bullet',
        collapsedByDefault: false,
        displayHint: 'front',
        content: [
          '三高 = 高血壓 + 高血糖 + 高血脂，是心血管疾病、中風、腎病變的主要危險因子。',
          '多與高油高鹽飲食、缺乏運動、肥胖、抽菸、喝酒、壓力大相關。',
          '通常沒有明顯症狀，要靠定期量血壓、驗血糖、驗血脂才能掌握。',
          '長期偏高會慢慢「侵蝕」血管，等到中風 / 心肌梗塞 / 洗腎就來不及。',
          '早期控制可大幅降低併發症風險。',
        ],
      },
      {
        key: 'diet_three_less_one_more',
        label: '飲食「三少一多」',
        layout: 'comparison',
        collapsedByDefault: false,
        displayHint: 'front',
        content: [
          {
            label: '少油',
            bullets: [
              '減少油炸、勾芡、肥肉、內臟',
              '烹調以清蒸、川燙、滷、燉為主',
              '選不飽和植物油（橄欖油、芥花油）',
            ],
          },
          {
            label: '少鹽',
            bullets: [
              '減少醃製品、加工食品、重口味醬料',
              '泡麵 / 零食常藏大量鹽分',
              '改用蔥、薑、蒜、洋蔥、胡椒等天然辛香料',
            ],
          },
          {
            label: '少糖',
            bullets: [
              '少含糖飲料、甜點、精緻點心',
              '糖尿病更嚴格控制精緻糖與份量',
              '避免宵夜',
            ],
          },
          {
            label: '多纖維',
            bullets: [
              '多吃全穀雜糧、豆類、蔬菜',
              '水果一般成人 2–4 份 / 日',
              '糖尿病病人 2–3 份 / 日，避免一次大量或打果汁',
            ],
          },
        ],
      },
      {
        key: 'exercise_weight',
        label: '運動與體重',
        layout: 'bullet',
        collapsedByDefault: false,
        displayHint: 'front',
        content: [
          '每週至少 150 分鐘中等強度有氧運動（快走、騎車、游泳）。',
          '分散到一週大多數天數執行，不要集中一天。',
          '從「做得到的小改變」開始：每天多走 10–15 分鐘、改爬樓梯、晚飯後散步。',
          '維持理想體重，減重可同時改善血壓、血脂、血糖。',
        ],
      },
      {
        key: 'three_diseases_focus',
        label: '三高分病重點',
        layout: 'comparison',
        collapsedByDefault: false,
        displayHint: 'front',
        content: [
          {
            label: '高血壓',
            bullets: [
              '定期量血壓並紀錄；量前休息 5–10 分鐘',
              '不抽菸、不喝咖啡後立即量；手臂與心臟同高',
              '低鹽、低油、多蔬果',
              '不可自行停藥（即使血壓正常）',
            ],
          },
          {
            label: '高血糖',
            bullets: [
              '了解空腹血糖 / 飯後血糖 / 糖化血色素（HbA1c）意義',
              '依醫囑自我監測並紀錄時間數值',
              '定時定量、主食全穀雜糧',
              '避免含糖飲料與宵夜',
            ],
          },
          {
            label: '高血脂',
            bullets: [
              '低飽和脂肪、低反式脂肪',
              '減少肥肉、內臟、奶油、酥皮點心',
              '多魚類、黃豆製品、不飽和植物油',
              '減重 + 規律運動 + 戒菸是關鍵',
            ],
          },
        ],
      },
      {
        key: 'lifestyle',
        label: '戒菸 / 限酒 / 作息',
        layout: 'bullet',
        collapsedByDefault: true,
        displayHint: 'expanded',
        content: [
          '戒菸並避免二手菸，能降低心血管、腦血管、腎臟疾病風險。',
          '酒精會影響血壓與血糖控制，建議避免或嚴格限制。',
          '規律作息、充足睡眠，避免熬夜。',
          '學習壓力調適：深呼吸、散步、聽音樂、與家人聊天。',
        ],
      },
      {
        key: 'medication_warning',
        label: '用藥重點',
        layout: 'bullet',
        collapsedByDefault: false,
        displayHint: 'front',
        content: [
          '依醫囑規則服藥，不自行停藥、減藥或與他人換藥。',
          '血壓 / 血糖看似正常時也要繼續服藥，是「藥在控制」不是「不需要藥」。',
          '出現頭暈、胃不適等副作用回診討論，不要自行停藥。',
          '回診時把藥帶回、或拍藥袋 / 藥單照片給醫師檢視。',
          '與家人共同參與衛教，在家落實飲食與運動。',
        ],
      },
      {
        key: 'warning_signs',
        label: '警訊症狀（立刻就醫）',
        layout: 'bullet',
        collapsedByDefault: false,
        displayHint: 'front',
        content: [
          '突然嚴重頭痛、視力模糊',
          '胸痛、胸悶、冒冷汗、呼吸困難',
          '突然單側無力、口齒不清、臉部歪斜（中風 FAST）',
          '意識不清、深快呼吸、呼吸有水果味（高血糖急症）',
          '冒冷汗、發抖、心悸、極度飢餓（低血糖 → 立刻吃糖）',
        ],
      },
      {
        key: 'misconception',
        label: '常見誤解',
        layout: 'bullet',
        collapsedByDefault: true,
        displayHint: 'expanded',
        content: [
          '「沒不舒服就沒問題」— 三高多無症狀，要靠數值追蹤。',
          '「血壓 / 血糖正常就可以停藥」— 是藥物在控制，停藥會反彈。',
          '「水果是健康的，多吃沒關係」— 糖尿病要控制份量，避免打果汁。',
          '「血脂高才需要忌口」— 血脂正常的人也要避免高油高糖。',
          '「年輕沒症狀不用管」— 提早控制可預防中年後的併發症。',
        ],
      },
    ],
    quickActions: [{ type: 'copy_text', label: '複製 30 秒口語版' }],
    references: [
      {
        citation: '衛福部國健署 — 三高防治衛教',
        sourceType: 'guideline',
        sourceLang: 'zh-TW',
      },
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
      nextReviewDue: '2027-05-26',
      approvalScopes: ['clinical_accuracy', 'language'],
    },
    status: 'published',
    createdAt: '2026-05-26T00:00:00Z',
    updatedAt: '2026-05-26T00:00:00Z',
    searchKeywords: ['三高', '高血壓', '高血糖', '高血脂', '糖尿病', '代謝症候群', '三少一多'],

    topic: '三高',
    targetPatient: ['adult', 'elderly', 'caregiver'],
    readingLevel: 'low',
    keyMessages: [
      '三高多無症狀，但長期傷血管，要靠定期量測掌握。',
      '飲食口訣：三少一多（少油、少鹽、少糖、多纖維）。',
      '每週至少 150 分鐘中等強度運動，從小改變開始。',
      '依醫囑規律服藥，數值正常也不自行停藥。',
      '出現中風、心痛、嚴重頭痛、意識變化 → 立即急診。',
    ],
    explainIn30s:
      '三高就是高血壓、高血糖、高血脂，平常沒感覺，但血管會慢慢被侵蝕，幾年後容易中風、心肌梗塞或洗腎。日常照顧記得「三少一多」：少油少鹽少糖多纖維，每週至少 150 分鐘運動，從每天多走 15 分鐘開始也可以。藥要規律吃，就算量起來正常也不要自己停，因為是藥物在幫你控制。如果出現嚴重頭痛、胸痛、突然口齒不清或單側無力、意識變化，請立刻送急診。以上是一般原則，您的醫師會依您個別狀況調整目標和用藥。',
    teachBackQuestions: [
      '飲食「三少一多」是哪四個重點？',
      '為什麼血壓 / 血糖正常時還要繼續吃藥？',
      '每週運動目標時間是多少？可以怎麼分配？',
      '出現哪些症狀需要立刻送急診？',
      '低血糖時應該先做什麼處理？',
    ],
    commonMisconceptions: [
      '沒不舒服就代表控制良好',
      '數值正常就可以停藥',
      '水果是健康的可以多吃（糖尿病要控制份量）',
      '只有血脂高才需要忌口',
      '年輕沒症狀不用管',
    ],
    doAndDont: {
      do: [
        '定期量血壓 / 血糖並紀錄',
        '三少一多飲食',
        '每週 ≥150 分鐘運動',
        '規律服藥',
        '戒菸、限酒、規律睡眠',
        '家人共同參與支持',
      ],
      dont: [
        '自行停藥或減藥',
        '油炸 / 重口味 / 加工食品',
        '含糖飲料、宵夜',
        '一次吃大量水果或喝果汁',
        '熬夜、過量飲酒',
      ],
    },
    relatedDiseaseIds: ['dis-001'],
  },
];
