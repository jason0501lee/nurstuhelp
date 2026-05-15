import type { SOPCard } from '@/types/cards/sop';

/**
 * 護理技術 SOP 卡（打針 / 導尿 / 換點滴 / CPR）。
 *
 * 結構：preProcedure → procedureSteps → postProcedure → commonErrors。
 * 詳細對照表、變體（如 IM/IV/SC 比較、年齡別 CPR 參數）放 bodySections。
 *
 * 安全聲明：所有內容為**護理教學參考**，臨床操作仍以醫囑、單位 SOP、
 * 帶教老師指導為準。任何一步有疑慮，停止並通報。
 */

const COMMON = {
  type: 'sop' as const,
  locale: 'zh-TW' as const,
  targetUser: ['nursing_student' as const],
  clinicalSetting: [
    'ward' as const,
    'icu' as const,
    'er' as const,
    'opd' as const,
  ],
  status: 'published' as const,
  createdAt: '2026-05-14T00:00:00Z',
  updatedAt: '2026-05-14T00:00:00Z',
  review: {
    version: '1.0.0',
    authoredBy: ['seed'],
    reviewedBy: [],
    nextReviewDue: '2027-05-14',
    approvalScopes: [
      'clinical_accuracy' as const,
      'safety_disclaimer' as const,
      'language' as const,
    ],
  },
  quickActions: [],
  institutionalNote:
    '本卡為護理教學參考。臨床操作以醫囑與單位 SOP 為準，操作前須有合格人員監督。',
};

export const TECHNIQUE_CARDS: SOPCard[] = [
  {
    ...COMMON,
    id: 'sop-injection',
    slug: 'injection',
    title: '打針（IM / IV / SC）',
    subtitle: '肌肉、靜脈、皮下注射對照',
    aliases: ['打針', '注射', 'IM', 'IV', 'SC', 'injection'],
    shortSummary:
      '肌肉、靜脈、皮下三種注射的角度、針具、部位、單次最大量與反抽要點對照；含 Z-track、scoop method、胰島素特殊處理。',
    priority: 'high',
    tags: ['技術', '注射', '給藥', 'sop'],
    categories: ['技術/注射'],
    procedureName: '注射技術',
    competencyLevel: 'basic',
    estimatedDuration: '5–15 分鐘',
    caution: [
      {
        level: 'critical',
        message:
          '抽藥 → 換新針 → 三讀五對 → 打針，缺一不可。任一不確定立刻停止並請教帶教老師。',
      },
      {
        level: 'warning',
        message:
          'WHO/CDC 已不建議常規反抽，僅 dorsogluteal IM 仍反抽 5–10 秒；胰島素與 SC 不反抽、不揉。',
      },
    ],
    redFlags: [
      {
        trigger: '打針後病人出現喘、皮疹、面色蒼白或血壓下降',
        actionHint: '立刻停止注射、平躺、保持氣道，按急救鈴並通報。考慮 anaphylaxis。',
      },
      {
        trigger: '注射部位出現劇痛、發紅、腫脹或感覺異常',
        actionHint: '停止注射、評估是否傷及神經或血管外滲，通報帶教老師。',
      },
    ],
    equipment: [
      { name: '藥物（已核對處方）' },
      { name: '注射器', spec: 'IM 3–5 mL / IV 依劑量 / SC 1 mL' },
      { name: '針頭', spec: 'IM 21–23G × 1–1.5″；IV 22–24G；SC 25–27G × 5/8″' },
      { name: '酒精棉片' },
      { name: '無菌手套' },
      { name: 'Sharps box（針頭丟棄盒）' },
      { name: '過濾針（抽 ampule 用）', optional: true },
    ],
    preProcedure: [
      { index: 1, text: '核對處方：三讀五對（病人、藥名、劑量、時間、途徑）。', why: '給藥安全第一關，每次都要做。' },
      { index: 2, text: '查過敏史；自我介紹並核對病人手圈。' },
      { index: 3, text: '手部衛生 → 戴手套。' },
      { index: 4, text: '抽藥：玻璃 ampule 用過濾針，抽完換新針再打。', why: '避免膠塞 / 玻璃微粒被注入。' },
    ],
    procedureSteps: [
      { index: 1, text: '消毒注射部位，由內而外環形擦拭，待乾。' },
      { index: 2, text: '依注射類型選對角度與深度（詳見下方對照表）。' },
      { index: 3, text: 'IM 用 Z-track：側拉皮膚 → 進針 → 注射 → 等 10 秒 → 拔針 → 放手。', why: '避免藥物回滲表皮、造成色素沉著或刺激。' },
      {
        index: 4,
        text: 'IV 反抽見回血才推；推注速度依藥物指示（如 KCl、furosemide 有最大速率）。',
        warning: { level: 'critical', message: 'IV 推太快可能耳毒 / 心律不整，先查藥典再推。' },
      },
      { index: 5, text: 'SC 不反抽、不揉；胰島素打完停 10 秒再拔針，避免漏液。' },
    ],
    postProcedure: [
      { index: 1, text: '拔針後乾棉球輕壓 1–2 分鐘（抗凝者 5 分鐘），不要揉。' },
      { index: 2, text: '針頭用單手 scoop method 套蓋，丟入 sharps box，絕對不雙手 recap。' },
      { index: 3, text: '觀察病人 5–15 分鐘，注意過敏或注射部位反應。' },
    ],
    documentationPoints: [
      '注射時間、藥名、劑量、途徑',
      '注射部位（左 / 右、解剖位置）',
      '病人反應與耐受度',
      '若有不良反應，詳述發生時間與處置',
    ],
    commonErrors: [
      'IM 三角肌打太低 → 傷橈神經（地標：肩峰下 2.5–5 cm）',
      'IM 沒做 Z-track → 藥回滲、刺激皮膚',
      'IV 推太快（KCl、Vancomycin、Mg 等不能快推）',
      '胰島素打完立刻拔針 → 漏液、劑量不準',
      'recap 針頭用雙手 → 針扎風險，違反感控',
      '常規反抽所有部位 → 已不建議（WHO/CDC）',
    ],
    bodySections: [
      {
        key: 'comparison',
        label: '三種注射對照表',
        layout: 'comparison',
        collapsedByDefault: false,
        displayHint: 'front',
        content: [
          { label: 'IM 肌肉注射', bullets: ['角度：90°', '針：21–23G × 1–1.5″', '部位：腹臀肌、三角肌；嬰幼兒股外側肌', '單次量：三角肌 ≤1 mL、腹臀肌 ≤3 mL', '反抽：僅 dorsogluteal 5–10 秒', '技術：Z-track'] },
          { label: 'IV 靜脈注射', bullets: ['角度：15–30°', '針：22–24G', '部位：手背、前臂頭靜脈、貴要靜脈', '單次量：依醫囑', '反抽：見回血才推', '速率：先查藥典最大速率'] },
          { label: 'SC 皮下注射', bullets: ['角度：45°（瘦）/ 90°（胖捏起）', '針：25–27G × 5/8″', '部位：上臂後外側、腹部、大腿', '單次量：≤1.5 mL', '反抽：不反抽（胰島素、heparin）', '拔針：胰島素停 10 秒再拔'] },
        ],
      },
      {
        key: 'tips',
        label: '手抖怎麼辦',
        layout: 'bullet',
        collapsedByDefault: true,
        displayHint: 'expanded',
        content: ['深呼吸，把打針側手肘靠在床緣形成支點。', '數 1-2-3 一氣進針，慢進反而更痛。', '新手手抖是正常反應，越做越穩。'],
      },
    ],
    references: [
      { citation: 'NCBI StatPearls — Intramuscular Injection', sourceType: 'guideline', url: 'https://www.ncbi.nlm.nih.gov/books/NBK556121/', sourceLang: 'en' },
      { citation: 'WHO Best Practices for Injections and Related Procedures', sourceType: 'guideline', sourceLang: 'en' },
    ],
    searchKeywords: ['打針', '注射', 'IM', 'IV', 'SC', 'injection', 'Z-track'],
  },
  {
    ...COMMON,
    id: 'sop-foley-catheter',
    slug: 'foley-catheter',
    title: '導尿（Foley Catheter）',
    subtitle: '無菌技術 + CAUTI 預防',
    aliases: ['導尿', 'Foley', 'catheter', '尿管'],
    shortSummary: '導尿無菌技術全流程：適應症評估、消毒順序、置入深度、balloon 注水時機、CAUTI bundle。',
    priority: 'high',
    tags: ['技術', '導尿', '無菌', 'CAUTI', 'sop'],
    categories: ['技術/導尿'],
    procedureName: 'Foley 導尿',
    competencyLevel: 'intermediate',
    estimatedDuration: '15–25 分鐘',
    caution: [
      { level: 'critical', message: '沒適應症不要放（CAUTI bundle 第一條）；每天評估「今天還需不需要這條管」，可拔就拔。' },
      { level: 'warning', message: 'balloon 必須見尿後再多進 2.5 cm 才打；用無菌水不能用 NS（會結晶塞閥）。' },
    ],
    redFlags: [
      { trigger: '男病人置入後未復位包皮', actionHint: '立刻復位，避免嵌頓性包莖（急症），通報帶教老師。' },
      { trigger: '抽 balloon 時水抽不出來，導管拔不出', actionHint: '不要硬拉。通知學姊或醫師，可能要用導絲解卡。' },
      { trigger: '置入過程出現劇痛、出血', actionHint: '停止操作、回報，懷疑尿道損傷。' },
    ],
    equipment: [
      { name: '導尿包（含治療巾、棉球、鑷子）' },
      { name: 'Foley 導管', spec: '女 14Fr / 男 16Fr 常用' },
      { name: '10 mL 注射器 + 無菌水' },
      { name: '潤滑劑', spec: '男性可用 lidocaine gel 5–10 mL' },
      { name: '無菌手套兩副' },
      { name: '集尿袋' },
    ],
    preProcedure: [
      { index: 1, text: '確認醫囑與適應症（尿滯留、嚴格 I/O、術中、薦尾褥瘡需控尿）。', warning: { level: 'warning', message: '無適應症不放。是 CAUTI bundle 第一條。' } },
      { index: 2, text: '解釋、拉屏風保護隱私。' },
      { index: 3, text: '備物，檢查有效期與完整性。' },
      { index: 4, text: '手部衛生 → 鋪治療巾。' },
    ],
    procedureSteps: [
      { index: 1, text: '戴乾淨手套清潔會陰 → 脫手套 → 再次手部衛生。' },
      { index: 2, text: '打開導尿包建立無菌區 → 戴第二副無菌手套。' },
      { index: 3, text: '消毒：女由上到下、由內到外（尿道口→小陰唇→大陰唇），一棉一擦不回擦；男龜頭尿道口→螺旋向下，先翻包皮。' },
      { index: 4, text: '導管尖端充分潤滑（男性可注 lidocaine gel 入尿道等 2 分鐘）。' },
      { index: 5, text: '置入：女 5–7.5 cm、男 17–22.5 cm，見尿後再多進 2.5 cm。', warning: { level: 'critical', message: '沒見尿就打 balloon 可能傷尿道（特別是男性），一定要見尿。' } },
      { index: 6, text: '無菌水 10 mL 打入 balloon；輕拉至有阻力。' },
      { index: 7, text: '固定導管：女→大腿內側；男→下腹部或大腿。' },
    ],
    postProcedure: [
      { index: 1, text: '集尿袋掛低於膀胱、不碰地，管路避免扭折拉扯。' },
      { index: 2, text: '男病人記得復位包皮。' },
      { index: 3, text: '記錄留置時間、尿量、尿色性狀、Fr 大小。' },
    ],
    documentationPoints: [
      '置入時間、操作者、是否一次成功',
      'Foley 規格（Fr）、balloon 注水量',
      '首次尿量、尿色性狀',
      '病人耐受度與不適反應',
      '預計拔管時機 / 每日評估結果',
    ],
    commonErrors: [
      '沒見尿就打 balloon → 男性尿道損傷出血',
      '集尿袋舉高過膀胱搬病人 → 尿液回流 → CAUTI（轉運前先排空）',
      '每天用優碘洗尿道口 → 抗菌劑傷黏膜（CDC：肥皂+清水即可）',
      '男病人未復位包皮 → 嵌頓性包莖',
      '無菌技術破壞（手套碰非無菌區）→ 重新更換',
      '不必要的長期留置 → CAUTI 風險倍增',
    ],
    bodySections: [
      {
        key: 'cauti_bundle',
        label: 'CAUTI Bundle 重點',
        layout: 'bullet',
        collapsedByDefault: false,
        displayHint: 'expanded',
        content: ['只在有適應症時放置', '每日評估能否拔管，可拔就拔', '嚴格無菌技術置入', '密閉引流系統，避免拆接', '集尿袋低於膀胱、不碰地', '尿道口清潔用肥皂+清水，不用抗菌劑'],
      },
    ],
    references: [
      { citation: 'CDC STRIVE — Indwelling Urinary Catheter Insertion and Maintenance', sourceType: 'guideline', url: 'https://www.cdc.gov/infection-control/media/pdfs/Strive-CAUTI104-508.pdf', sourceLang: 'en' },
    ],
    searchKeywords: ['導尿', 'Foley', 'catheter', '尿管', 'CAUTI'],
  },
  {
    ...COMMON,
    id: 'sop-iv-fluid-change',
    slug: 'iv-fluid-change',
    title: '換點滴（IV Fluid / Tubing）',
    subtitle: '溶液袋更換、滴速計算、管路更換',
    aliases: ['換點滴', '點滴', 'IV fluid', 'tubing', '滴速'],
    shortSummary: '換點滴袋與管路 SOP，含滴系數對照表、micro/macro drip 換算、IV catheter 更換時機（CDC 指引）。',
    priority: 'high',
    tags: ['技術', '點滴', '輸液', 'sop'],
    categories: ['技術/輸液'],
    procedureName: 'IV 輸液與管路更換',
    competencyLevel: 'basic',
    estimatedDuration: '5–10 分鐘',
    caution: [
      { level: 'critical', message: 'KCl、Vancomycin、Mg 等絕對不能快推/快滴；有 pump 就用 pump。' },
      { level: 'warning', message: '管路內大量空氣：關 clamp、病人左側臥+頭低位、通知醫師。小氣泡 <0.5 mL/kg 一般無臨床意義。' },
    ],
    redFlags: [
      { trigger: '穿刺處冰涼、腫脹、回血逆流', actionHint: '懷疑漏針/外滲，停止輸液、評估範圍、通報並重新置入。' },
      { trigger: 'IV 推注後病人臉紅、出疹（Vancomycin 紅人症候群）', actionHint: '減慢速度或停止，通報醫師。' },
    ],
    equipment: [
      { name: '點滴袋（已核對處方）' },
      { name: 'IV tubing set' },
      { name: '酒精棉片' },
      { name: '無菌手套' },
      { name: 'IV pump', optional: true },
    ],
    preProcedure: [
      { index: 1, text: '三讀五對：病人、藥液（名/濃度/量）、添加物、滴速、時間。' },
      { index: 2, text: '檢查點滴袋：清澈無沉澱、無漏液、效期內、標籤完整（病人姓名、藥名、配製時間）。' },
      { index: 3, text: '手部衛生 → 戴手套。' },
    ],
    procedureSteps: [
      { index: 1, text: '【換袋】關閉滾輪夾 → 拔舊袋穿刺針 → 斜 45° 插入新袋穿刺孔（不要碰到針）。' },
      { index: 2, text: '【換袋】滴室擠到 1/2 滿 → 打開滾輪夾，調回原訂滴速。' },
      { index: 3, text: '【換套管】依管路類型更換時機（見下方）。' },
      { index: 4, text: '滴速計算：gtt/min = (總量 mL × 滴系數) ÷ 時間 min。', why: 'Micro drip 60 mgtt/mL：醫囑 mL/hr 直接 = micro drip gtt/min（60÷60=1）。' },
    ],
    postProcedure: [
      { index: 1, text: '確認滴速正確、無回血、穿刺處無腫脹。' },
      { index: 2, text: '摸穿刺處有沒有冰涼/腫脹（漏針徵兆）。' },
      { index: 3, text: '記錄時間、藥液名稱、剩餘量、滴速、不良反應。' },
    ],
    documentationPoints: [
      '換袋/換管時間',
      '剩餘量、新袋容量',
      '滴速與調整原因',
      '穿刺處外觀（有無紅腫熱痛）',
      '是否使用 pump',
    ],
    commonErrors: [
      'KCl/Vancomycin/Mg 快滴 → 心律不整或紅人症候群',
      '同條管路打不相容藥 → 沉澱阻塞（先查 Y-site compatibility）',
      '回血逆流 → 先檢查袋子高度（距穿刺處 ≥60 cm）',
      '換袋三讀五對省略 → 張冠李戴',
      '空氣大量進入未即時處理',
      '漏針沒及時發現 → 組織損傷',
    ],
    bodySections: [
      {
        key: 'drip_factor',
        label: '滴系數對照',
        layout: 'kv_table',
        collapsedByDefault: false,
        displayHint: 'front',
        content: [
          { key: '大滴 macro', value: '15 或 20 gtt/mL', note: '一般成人' },
          { key: '小滴 micro', value: '60 mgtt/mL', note: '兒科、流速 <20 mL/hr、需精準' },
        ],
      },
      {
        key: 'tubing_change',
        label: '管路更換時機（CDC）',
        layout: 'bullet',
        collapsedByDefault: false,
        displayHint: 'expanded',
        content: ['周邊靜脈一般輸液管路：72–96 小時更換', '血品、脂質乳劑：用完即換或 24 小時內', '周邊留置針本身：依臨床表徵更換（紅腫熱痛/滲漏才換），非例行 72 hr', '實際以醫院 SOP 為準'],
      },
      {
        key: 'drip_mnemonic',
        label: '滴速口訣',
        layout: 'paragraph',
        collapsedByDefault: true,
        displayHint: 'expanded',
        content: '醫囑 mL/hr 直接 = micro drip 的 gtt/min。所以 60 mL/hr → 60 mgtt/min → 約 1 秒 1 滴。',
      },
    ],
    references: [
      { citation: 'CDC Intravascular Catheter-Related Infections — Summary of Recommendations', sourceType: 'guideline', url: 'https://www.cdc.gov/infection-control/hcp/intravascular-catheter-related-infections/summary-recommendations.html', sourceLang: 'en' },
      { citation: '台灣本土研究：96 小時與 72 小時更換周邊靜脈留置針的效應探討', sourceType: 'journal', url: 'https://www.airitilibrary.com/Article/Detail/20729235-201409-201409010013-201409010013-190-198', sourceLang: 'zh-TW' },
    ],
    searchKeywords: ['換點滴', '點滴', 'IV fluid', 'tubing', '滴速', 'micro drip', 'macro drip'],
  },
  {
    ...COMMON,
    id: 'sop-cpr',
    slug: 'cpr',
    title: 'CPR（AHA 2025）',
    subtitle: '成人/兒童/嬰兒高品質 CPR',
    aliases: ['CPR', '心肺復甦', 'AHA', 'BLS'],
    shortSummary: 'AHA 2025 高品質 CPR 重點：壓胸位置、深度、速度、回彈、壓胸:通氣比；含 AED 使用與 ROSC 後照護。',
    priority: 'critical',
    tags: ['技術', 'CPR', '急救', 'BLS', 'sop'],
    categories: ['技術/急救'],
    ageScope: ['neonate', 'infant', 'child', 'adolescent', 'adult', 'elderly'],
    procedureName: 'CPR（心肺復甦）',
    competencyLevel: 'basic',
    estimatedDuration: '持續至 ROSC 或交接',
    caution: [
      { level: 'critical', message: '無反應 + 無正常呼吸（含 gasping）= 心跳停止 → 立刻 CPR。檢查脈搏 ≤10 秒。' },
      { level: 'critical', message: '高品質 CPR 五要素：對位、夠深、夠快、完全回彈、中斷 <10 秒。' },
      { level: 'warning', message: '電擊後不要重新評估脈搏，立刻接續壓胸；2 分鐘後再評估。' },
    ],
    redFlags: [
      { trigger: 'AED 建議電擊', actionHint: '大喊「離開！」確認無人接觸，按電擊鈕，立刻續壓。' },
      { trigger: 'ROSC（恢復自主循環）', actionHint: '維持 MAP ≥65、體溫管理 32–37.5°C 至少 36 小時、12-lead ECG。' },
    ],
    equipment: [
      { name: 'AED / 去顫器' },
      { name: 'BVM（甦醒球）+ 氧氣' },
      { name: '硬板（如有）' },
      { name: '急救車 / 藥物' },
    ],
    preProcedure: [
      { index: 1, text: '環境安全（自己、病人、旁人）。' },
      { index: 2, text: '拍肩呼喊「先生/小姐！你怎麼了？」+ 看胸部 5–10 秒。' },
      { index: 3, text: '無反應、無呼吸或僅 gasping → 大喊求救 / 按急救鈴 / code blue → 叫人拿 AED。' },
      { index: 4, text: '檢查脈搏 ≤10 秒（頸動脈，嬰兒肱動脈）。無脈搏立刻 CPR。' },
    ],
    procedureSteps: [
      { index: 1, text: '壓胸位置：成人/兒童胸骨下半段、兩乳頭連線中點；嬰兒兩乳頭連線正下方。' },
      { index: 2, text: '壓胸深度：成人 ≥5 cm 不超過 6 cm；兒童/嬰兒胸廓前後徑約 1/3（兒童 ~5 cm、嬰兒 ~4 cm）。' },
      { index: 3, text: '壓胸速度：100–120 次/分；每次按壓讓胸廓完全回彈，不可倚靠。' },
      { index: 4, text: '壓胸:通氣比：成人 30:2；兒童/嬰兒單人 30:2、雙人 15:2。' },
      { index: 5, text: '通氣每次 1 秒、看到胸部起伏就停，避免過度通氣。' },
      { index: 6, text: 'AED 到立刻接：貼片右上胸 + 左下側胸 → 分析時不要碰 → 建議電擊則執行 → 立刻續壓。' },
      { index: 7, text: '每 2 分鐘或 5 個循環換手，避免疲勞影響深度。' },
    ],
    postProcedure: [
      { index: 1, text: 'ROSC 後維持 MAP ≥65 mmHg；通氣頻率 10 次/分（每 6 秒一次）。' },
      { index: 2, text: '體溫管理 32–37.5°C 至少 36 小時（AHA 2025）。' },
      { index: 3, text: '立即 12-lead ECG；考慮頭至骨盆 CT 找原因。' },
      { index: 4, text: '向倖存者與家屬提供結構化情緒評估與支持。' },
    ],
    documentationPoints: [
      '發現時間、初始節律',
      '開始 CPR 時間、第一次電擊時間',
      '使用藥物（劑量、時間）',
      'ROSC 時間或宣告時間',
      '參與人員與角色',
    ],
    commonErrors: [
      '壓太淺（最常見）→ 手肘打直、用體重壓',
      '壓太快（>120/分）→ 回彈不足、血流下降',
      '沒讓胸廓完全回彈 / 倚靠在胸上 → 心臟回不了血',
      '過度通氣 → 胸內壓升高、靜脈回流下降',
      '電擊後重新摸脈搏 → 立刻續壓，2 分鐘後再評',
      '女病人脫衣遲疑 → 移開胸罩位置即可，不必脫除',
    ],
    bodySections: [
      {
        key: 'age_compare',
        label: '成人 / 兒童 / 嬰兒對照',
        layout: 'comparison',
        collapsedByDefault: false,
        displayHint: 'front',
        content: [
          { label: '成人（≥青春期）', bullets: ['深度：≥5 cm 不超過 6 cm', '速度：100–120/分', '比例：30:2', '壓法：兩手掌根重疊', '脈搏：頸動脈'] },
          { label: '兒童（1 歲–青春期）', bullets: ['深度：胸廓 1/3（~5 cm）', '速度：100–120/分', '比例：單人 30:2、雙人 15:2', '壓法：單手或雙手掌根', '脈搏：頸動脈'] },
          { label: '嬰兒（<1 歲）', bullets: ['深度：胸廓 1/3（~4 cm）', '速度：100–120/分', '比例：單人 30:2、雙人 15:2', '壓法：兩指（單人）/ 雙拇指環抱（雙人）', '脈搏：肱動脈'] },
        ],
      },
      {
        key: 'rosc_care',
        label: 'ROSC 後照護重點',
        layout: 'bullet',
        collapsedByDefault: true,
        displayHint: 'expanded',
        content: ['MAP ≥65 mmHg', '體溫管理 32–37.5°C 至少 36 小時', '通氣 10 次/分（每 6 秒）', '12-lead ECG + 頭至骨盆 CT 找原因', '家屬與倖存者心理支持'],
      },
    ],
    references: [
      { citation: 'AHA 2025 ECC Guidelines 重點摘要（繁中）', sourceType: 'guideline', url: 'https://cpr.heart.org/-/media/CPR-Files/2025-documents-for-cpr-heart-edits-posting/Resuscitation-Science/JN1568_ZHTW_Hghlghts_2025ECCGuidelinesFinal_251021.pdf', sourceLang: 'zh-TW' },
    ],
    searchKeywords: ['CPR', '心肺復甦', 'BLS', 'AHA', 'AED', '急救'],
  },
];
