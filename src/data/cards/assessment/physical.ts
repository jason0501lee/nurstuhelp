import type { AssessmentCard } from '@/types/cards/assessment';

/**
 * 身體評估卡片（9 張） — 護理實習常用系統性評估。
 *
 * 不包含生命徵象（保留為獨立 vital_sign type），但在 UI 上同列在
 * 「基本評估」分類下。
 */

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
  domain: 'physical',
  locale: 'zh-TW',
  targetUser: ['nursing_student'],
  clinicalSetting: ['ward', 'icu', 'er', 'opd'],
  priority: 'high',
  tags: ['assessment', '身體評估'],
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

export const PHYSICAL_ASSESSMENT_CARDS: AssessmentCard[] = [
  {
    ...COMMON,
    id: 'assess-physical-general',
    slug: 'general-appearance',
    title: '一般外觀與意識',
    subtitle: '看到病人第一眼的整體評估',
    aliases: ['一般外觀', 'general appearance', '意識評估'],
    shortSummary: '進房第一眼最快建立整體印象的評估：意識、姿勢、活動力、外觀整潔、痛苦表情、營養狀態。',
    categories: ['基本評估/身體/一般外觀'],
    caution: [
      { level: 'info', message: '一般外觀是整體性印象，異常時用後續系統評估找原因。' },
    ],
    bodySections: [],
    references: [{ citation: '一般護理基礎教科書（範例條目）', sourceType: 'textbook', sourceLang: 'zh-TW' }],
    searchKeywords: ['一般外觀', '意識', 'general appearance'],
    focus: 'general',
    evaluationItems: ['意識狀態', '姿勢與活動力', '外觀整潔', '痛苦表情', '營養狀態與體型'],
    observationPoints: [
      '急性病容、虛弱、嗜睡、躁動',
      '蒼白、發紺、黃疸',
      '脫水徵象（口唇乾、眼眶凹陷）',
      '冒冷汗、表情痛苦',
    ],
    sampleQuestions: [
      '紀錄：病人外觀、精神、合作度、活動耐受度。',
      '可作為 SBAR 的 S（Situation）開頭描述。',
    ],
    documentationTemplate: '病人 [意識狀態]，[精神/外觀]，[合作度/活動耐受度]。',
  },

  {
    ...COMMON,
    id: 'assess-physical-pain',
    slug: 'pain-assessment',
    title: '疼痛評估（PQRST）',
    subtitle: '結構化疼痛問診',
    aliases: ['疼痛評估', 'pain assessment', 'PQRST', '疼痛量表'],
    shortSummary: '用 PQRST 結構化問疼痛：誘發因素、性質、放射、強度、時間。配合疼痛量表（NRS、Wong-Baker、FLACC）量化。',
    categories: ['基本評估/身體/疼痛'],
    priority: 'critical',
    caution: [
      { level: 'warning', message: '兒童 / 失智 / 意識改變者用客觀量表（FLACC、PAINAD）；不可只看「會不會說痛」。' },
    ],
    bodySections: [
      {
        key: 'pqrst',
        label: 'PQRST 問診架構',
        layout: 'kv_table',
        collapsedByDefault: false,
        displayHint: 'front',
        content: [
          { key: 'P — Provoke / Palliate', value: '誘發 / 緩解因素：什麼動作或情境會痛？什麼可以緩解？' },
          { key: 'Q — Quality', value: '性質：刺痛、悶痛、灼熱、絞痛、撕裂感？' },
          { key: 'R — Region / Radiation', value: '部位 / 放射：在哪裡？會不會傳到其他地方？' },
          { key: 'S — Severity', value: '強度：NRS 0–10 分？' },
          { key: 'T — Timing', value: '時間：什麼時候開始？持續多久？間歇還是持續？' },
        ],
      },
    ],
    references: [{ citation: '一般護理基礎教科書（範例條目）', sourceType: 'textbook', sourceLang: 'zh-TW' }],
    searchKeywords: ['疼痛', 'PQRST', '疼痛量表', 'NRS', 'FLACC'],
    focus: 'pain',
    evaluationItems: [
      '部位、性質、強度、持續時間',
      '誘發 / 緩解因素',
      '是否影響活動、睡眠、情緒',
      '伴隨症狀（噁心、冒汗、心跳）',
    ],
    observationPoints: [
      '皺眉、呻吟、保護姿勢',
      '不敢動、活動受限',
      '生命徵象變化（HR/BP 升高）',
      '兒童哭鬧、退縮、拒絕觸碰',
    ],
    sampleQuestions: [
      '「請從 0–10 分形容你現在的痛，0 是不痛，10 是最痛？」',
      '「什麼時候開始？做什麼動作會更痛？」',
      '「痛會不會跑到其他地方？」',
    ],
    documentationTemplate:
      '病人主訴 [部位] 疼痛，性質 [刺/悶/絞/灼熱]，NRS [X]/10，[持續/間歇] [X 小時/天]，[誘發 / 緩解因素]，[伴隨症狀]。',
  },

  {
    ...COMMON,
    id: 'assess-physical-neuro',
    slug: 'neurological',
    title: '神經系統評估',
    subtitle: 'GCS、瞳孔、肌力、感覺、語言、吞嚥',
    aliases: ['神經評估', 'GCS', 'AVPU', 'neuro assessment'],
    shortSummary: '從意識（GCS/AVPU）、瞳孔、肢體肌力、感覺、語言、吞嚥串成完整神經評估；意識變化是最敏感的早期警訊。',
    categories: ['基本評估/身體/神經'],
    priority: 'critical',
    caution: [
      { level: 'warning', message: '意識改變、單側無力、瞳孔不等大都是急性神經異常的紅旗。' },
    ],
    redFlags: [
      { trigger: 'GCS 突降 ≥ 2 分 / 突發單側無力 / 瞳孔大小不等', actionHint: '依單位規範立即通報，啟動 stroke / 急性神經惡化流程。' },
    ],
    bodySections: [
      {
        key: 'gcs',
        label: 'GCS 速查',
        layout: 'kv_table',
        collapsedByDefault: false,
        displayHint: 'front',
        content: [
          { key: 'E 睜眼 (4)', value: '4 自動 / 3 呼喚 / 2 疼痛 / 1 無反應' },
          { key: 'V 語言 (5)', value: '5 對答清楚 / 4 混亂 / 3 不適當字 / 2 發出聲音 / 1 無' },
          { key: 'M 動作 (6)', value: '6 依指令 / 5 定位疼痛 / 4 縮回 / 3 異常屈曲 / 2 異常伸展 / 1 無' },
        ],
      },
    ],
    references: [{ citation: '一般護理基礎教科書（範例條目）', sourceType: 'textbook', sourceLang: 'zh-TW' }],
    searchKeywords: ['GCS', '神經', 'AVPU', '瞳孔', '肌力'],
    focus: 'neuro',
    evaluationItems: [
      '意識程度（GCS 或 AVPU）',
      '瞳孔大小、對光反應、左右是否對等',
      '四肢肌力（0–5 級）',
      '感覺、語言、吞嚥能力',
      '步態與平衡',
    ],
    observationPoints: [
      '嗜睡、意識改變、躁動',
      '單側無力或感覺異常',
      '構音不清、吞嚥困難（嗆咳）',
      '步態不穩、跌倒風險',
    ],
    sampleQuestions: [
      '紀錄：GCS = E__V__M__（總分 __）',
      '「現在是幾月幾號？這裡是哪裡？我是誰？」（定向感）',
      '請對方雙手握你的食指比較兩側握力。',
    ],
    documentationTemplate: '意識 [清醒/嗜睡/混亂]，GCS [X]/15，瞳孔 [左右 mm] 對光 [+/-]，四肢肌力 [描述]，吞嚥 [正常/嗆咳]。',
    relatedScaleSlugs: ['glasgow-coma-scale'],
  },

  {
    ...COMMON,
    id: 'assess-physical-respiratory',
    slug: 'respiratory',
    title: '呼吸系統評估',
    subtitle: '呼吸型態、聽診、痰液、SpO2',
    aliases: ['呼吸評估', 'respiratory assessment', '呼吸音'],
    shortSummary: '呼吸次數、型態、聽診、咳嗽、痰液與 SpO2 一起判讀；費力呼吸 + 凹陷呼吸 + SpO2 下降是急性惡化警訊。',
    categories: ['基本評估/身體/呼吸'],
    priority: 'critical',
    redFlags: [
      { trigger: '呼吸困難 + 凹陷呼吸 + SpO2 持續下降', actionHint: '依規範立即通報，保持呼吸道、給氧、必要時呼叫支援。' },
    ],
    bodySections: [],
    references: [{ citation: '一般護理基礎教科書（範例條目）', sourceType: 'textbook', sourceLang: 'zh-TW' }],
    caution: [
      { level: 'info', message: '聽診從前胸到後背、由上往下、左右對稱比較。' },
    ],
    searchKeywords: ['呼吸', 'respiratory', '呼吸音', '痰', 'SpO2'],
    focus: 'respiratory',
    evaluationItems: [
      '呼吸次數、深淺、規律',
      '呼吸型態（端坐呼吸、Kussmaul、Cheyne-Stokes）',
      '是否使用輔助肌、鼻翼搧動、胸骨上凹陷',
      '聽診呼吸音（清音 / wheezing / crackles / rhonchi / 減弱）',
      '咳嗽 / 痰量、痰色、痰性質',
      'SpO2、需氧量、是否需氧氣',
    ],
    observationPoints: [
      '喘、端坐呼吸',
      '兒童肋間凹陷、鼻翼搧動',
      '異常呼吸音（喘鳴、囉音）',
      '痰多 / 痰色改變（黃綠膿痰）',
      '發紺、SpO2 < 92%（一般參考）',
    ],
    sampleQuestions: [
      '「呼吸會不會喘？有沒有咳嗽？什麼時候咳？」',
      '「平躺會不會喘？要墊幾個枕頭？」',
      '聽診紀錄：兩側 [前胸/後背] [上/中/下] 呼吸音 [清/減弱/wheezing/crackles]。',
    ],
    documentationTemplate: 'RR [X]/min，[規律/不規律]，[平順/費力]，SpO2 [X]% on [RA/O2 X L/min nasal]，呼吸音 [描述]，痰 [量/色/性質]。',
  },

  {
    ...COMMON,
    id: 'assess-physical-cardiovascular',
    slug: 'cardiovascular',
    title: '心血管系統評估',
    subtitle: '心音、脈搏、灌流、水腫',
    aliases: ['心血管評估', 'cardiovascular assessment', '末梢循環'],
    shortSummary: '心音、脈搏強弱與規律、末梢循環、毛細血管回填、水腫、發紺；末梢冰冷+CRT > 3 秒 → 灌流不佳。',
    categories: ['基本評估/身體/心血管'],
    priority: 'critical',
    caution: [
      { level: 'info', message: '雙側對比；不對稱常代表局部病灶（DVT、動脈阻塞）。' },
    ],
    bodySections: [],
    references: [{ citation: '一般護理基礎教科書（範例條目）', sourceType: 'textbook', sourceLang: 'zh-TW' }],
    searchKeywords: ['心血管', 'cardiovascular', '心音', '脈搏', '水腫', 'CRT'],
    focus: 'cardiovascular',
    evaluationItems: [
      '心跳率、節律',
      '脈搏強弱、雙側對稱性',
      '末梢溫度、顏色、Capillary refill time (CRT)',
      '頸靜脈擴張、水腫位置與分級',
      '胸痛 / 心悸 / 暈眩主訴',
    ],
    observationPoints: [
      '心律不整（不規則、漏拍）',
      '脈搏微弱、CRT > 3 秒',
      '末梢冰冷、發紺',
      '下肢水腫（凹陷性、雙側）',
      '頸靜脈擴張（右心衰竭）',
    ],
    sampleQuestions: [
      '「會不會胸悶、胸痛、心悸、頭暈？」',
      '「腳會不會腫？什麼時候開始？」',
      '紀錄：HR [X] / [規律/不規律]，BP [X/X]，CRT [< 2 / 3 / > 3 秒]，末梢 [溫暖/冰冷]，水腫 [0–4+]。',
    ],
    documentationTemplate: 'HR [X]/min [規律/不規律]，BP [X/X]，CRT [秒]，末梢 [描述]，水腫 [部位+分級]。',
  },

  {
    ...COMMON,
    id: 'assess-physical-gi',
    slug: 'gi-elimination',
    title: '腸胃與排泄評估',
    subtitle: '腸音、腹部、進食、排便、排尿',
    aliases: ['腸胃評估', 'GI assessment', '排泄評估', '腸音', 'IO'],
    shortSummary: '腸音、腹部視診觸診、噁心嘔吐、食慾、排便、排尿一起評估；黑便、血便、突發劇烈腹痛是紅旗。',
    categories: ['基本評估/身體/腸胃排泄'],
    redFlags: [
      { trigger: '解黑便 / 血便 / 突發劇烈腹痛伴板狀腹', actionHint: '依規範立即回報並 NPO。' },
    ],
    bodySections: [],
    references: [{ citation: '一般護理基礎教科書（範例條目）', sourceType: 'textbook', sourceLang: 'zh-TW' }],
    caution: [
      { level: 'info', message: '腹部評估順序：視診 → 聽診（先聽再壓）→ 叩診 → 觸診。觸診放最後避免改變腸音。' },
    ],
    searchKeywords: ['腸胃', 'GI', '排泄', '腸音', '腹脹', 'IO', '排便'],
    focus: 'gi_elimination',
    evaluationItems: [
      '腸音（四象限）',
      '腹部視診、觸診（軟 / 硬、壓痛、反彈痛）',
      '食慾、噁心嘔吐',
      '排便情形（頻次、性狀、顏色）',
      '排尿次數、尿量、顏色、疼痛',
      '是否留置 NG tube / Foley',
      '24 小時 I/O',
    ],
    observationPoints: [
      '腹脹、板狀腹、反彈痛',
      '便秘、腹瀉、黑便（GI 出血）',
      '少尿（< 30 mL/hr）、無尿、血尿',
      '管路是否通暢、引流性質',
    ],
    sampleQuestions: [
      '「最近食慾如何？有沒有噁心嘔吐？」',
      '「上次排便是什麼時候？性狀如何？」',
      '「小便量正常嗎？顏色？解尿會不會痛？」',
    ],
    documentationTemplate: '腸音 [活躍/正常/減弱/消失]，腹 [軟/硬/壓痛位置]，食慾 [好/差/NPO]，排便 [今日 X 次/性狀]，尿 [量+顏色]，24h I/O [+/- X mL]。',
  },

  {
    ...COMMON,
    id: 'assess-physical-skin',
    slug: 'skin-wound',
    title: '皮膚與傷口評估',
    subtitle: '完整性、壓傷風險、傷口分級',
    aliases: ['皮膚評估', '傷口評估', 'skin wound', 'Braden'],
    shortSummary: '皮膚顏色、溫度、濕度、彈性、完整性，加 Braden 壓傷風險；傷口紀錄要包含位置、大小、深度、滲液、周邊皮膚。',
    categories: ['基本評估/身體/皮膚與傷口'],
    caution: [
      { level: 'info', message: '臥床、營養不良、失禁、感覺障礙是壓傷高危組合。每班翻身、檢查骨突處。' },
    ],
    bodySections: [],
    references: [{ citation: '一般護理基礎教科書（範例條目）', sourceType: 'textbook', sourceLang: 'zh-TW' }],
    searchKeywords: ['皮膚', '傷口', 'skin', 'wound', 'Braden', '壓傷', '褥瘡'],
    focus: 'skin_wound',
    evaluationItems: [
      '皮膚顏色、溫度、濕度、彈性',
      '完整性（破皮、紅腫、瘀斑、黃疸、發紺）',
      'Braden 壓傷風險評分',
      '傷口位置、大小（長 × 寬 × 深 cm）',
      '傷口床（granulation / slough / eschar 比例）',
      '滲液量、性質、氣味',
      '周邊皮膚（紅腫、浸潤、結痂）',
    ],
    observationPoints: [
      '壓紅未褪、破皮、潰瘍（Stage I–IV）',
      '滲液增加 / 變膿、有臭味（感染）',
      '周邊紅腫熱痛',
      '黃疸、發紺、瘀斑分布',
    ],
    sampleQuestions: [
      '「皮膚有沒有破皮、發癢、紅腫？」',
      'Braden ≤ 18 → 高風險，依規範啟動預防措施。',
      '傷口紀錄：「[部位] [長×寬×深 cm] [Stage X]，[granulation X%]，滲液 [量/色]，周邊 [描述]。」',
    ],
    documentationTemplate: '皮膚 [顏色/溫濕/彈性]，[破皮/壓紅 部位+程度]，Braden [X 分]，傷口 [部位+大小+階段+滲液+周邊]。',
    relatedScaleSlugs: ['braden-scale'],
  },

  {
    ...COMMON,
    id: 'assess-physical-mobility',
    slug: 'mobility-adl',
    title: '肌肉骨骼與 ADL 評估',
    subtitle: '關節、肌力、自我照顧能力',
    aliases: ['活動評估', 'ADL', '肌力', 'mobility'],
    shortSummary: '關節活動範圍、肌力、步行能力、輔具使用、ADL（吃、洗、穿、如廁、移位）；跌倒風險評估搭配 Morse。',
    categories: ['基本評估/身體/肌肉骨骼活動'],
    bodySections: [],
    references: [{ citation: '一般護理基礎教科書（範例條目）', sourceType: 'textbook', sourceLang: 'zh-TW' }],
    caution: [
      { level: 'info', message: 'ADL 是出院規劃的關鍵 — 完全依賴者需安排家屬照顧 / 居家服務。' },
    ],
    searchKeywords: ['ADL', '活動', '肌力', 'mobility', '輔具'],
    focus: 'mobility_adl',
    evaluationItems: [
      '關節活動範圍（ROM）',
      '四肢肌力（0–5 級）',
      '步行能力、平衡',
      '輔具使用（拐杖、助行器、輪椅）',
      'ADL 六項：進食、洗澡、更衣、如廁、移位、大小便控制',
      '跌倒風險（Morse Fall Risk）',
    ],
    observationPoints: [
      '單側無力、關節僵硬',
      '步態不穩、需扶持',
      'ADL 部分 / 完全依賴',
      '近期跌倒史',
    ],
    sampleQuestions: [
      '「能不能自己下床走？走得穩嗎？需不需要扶？」',
      '「吃飯、洗澡、上廁所，自己可以嗎？」',
      'Morse 評分高 → 啟動防跌措施（床欄、呼叫鈴、夜燈、防滑鞋）。',
    ],
    documentationTemplate: '肌力 [上下肢分級]，步行 [自行/扶持/輪椅]，ADL [獨立/部分/完全依賴]，Morse [X 分]。',
    relatedScaleSlugs: ['morse-fall-scale'],
  },

  {
    ...COMMON,
    id: 'assess-physical-safety',
    slug: 'fall-safety',
    title: '跌倒與安全風險評估',
    subtitle: '跌倒、壓傷、感染、嗆咳、急性惡化',
    aliases: ['安全評估', '跌倒', 'Morse Fall', 'safety risk'],
    shortSummary: '系統性辨識跌倒、壓傷、感染、嗆咳、急性惡化風險；高齡、虛弱、意識不清、多重管路是常見組合。',
    categories: ['基本評估/身體/安全'],
    priority: 'critical',
    bodySections: [
      {
        key: 'morse_scale',
        label: 'Morse Fall Scale 重點',
        layout: 'bullet',
        collapsedByDefault: false,
        displayHint: 'expanded',
        content: [
          '跌倒史（過去 3 個月內）— 25 分',
          '次要診斷 — 15 分',
          '使用助行 / 扶傢俱 — 15–30 分',
          'IV 管路 — 20 分',
          '步態 — 0–20 分',
          '心智狀態（高估自己能力）— 15 分',
          '一般 ≥ 45 為高風險，依各院標準。',
        ],
      },
    ],
    references: [{ citation: '一般護理基礎教科書（範例條目）', sourceType: 'textbook', sourceLang: 'zh-TW' }],
    caution: [
      { level: 'warning', message: '高風險病人務必執行防跌四要件：環境（床欄、夜燈、呼叫鈴）、衣著（防滑鞋）、行為（陪同、按鈴）、用藥（鎮靜後不單獨）。' },
    ],
    searchKeywords: ['跌倒', 'Morse', '安全', '壓傷', '嗆咳', '感染風險'],
    focus: 'safety_risk',
    evaluationItems: [
      'Morse Fall Scale 跌倒風險',
      'Braden 壓傷風險',
      '吞嚥嗆咳風險',
      '感染風險（侵入性管路、免疫力）',
      '急性惡化早期警訊（EWS）',
    ],
    observationPoints: [
      '高齡、虛弱、意識不清',
      '步態不穩、姿勢性低血壓',
      '多重管路（IV、Foley、NG、引流）',
      '吞嚥困難 / 嗆咳病史',
    ],
    sampleQuestions: [
      '「過去三個月有跌倒過嗎？」',
      '「會不會頭暈、想睡、看不清楚？」',
      '入院 / 每班 / 病情變化時重新評估。',
    ],
    documentationTemplate: 'Morse [X 分] [低/中/高 風險]，已執行 [床欄/呼叫鈴/陪同/防滑鞋/夜燈]。',
    relatedScaleSlugs: ['morse-fall-scale'],
  },
];
