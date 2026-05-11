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
];
