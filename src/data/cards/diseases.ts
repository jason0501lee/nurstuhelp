import type { DiseaseCard } from '@/types/cards/disease';

/**
 * Seed disease cards.
 *
 * Per safety governance §6.B: treatmentOverview is intentionally a
 * conceptual paragraph with the DISC-D6 disclaimer rendered above;
 * the main character of the card is nursingPriorities.
 */
export const DISEASE_CARDS: DiseaseCard[] = [
  {
    id: 'dis-001',
    type: 'disease',
    slug: 'hypertension',
    locale: 'zh-TW',
    title: '高血壓 (Hypertension)',
    subtitle: '原發性 / 續發性',
    aliases: ['HTN', 'high blood pressure', '高血壓', 'hypertension'],
    shortSummary: '長期收縮壓 ≥ 130 mmHg 或舒張壓 ≥ 80 mmHg（依各國指引）所形成的慢性疾病；多數無症狀。',
    targetUser: ['nursing_student'],
    clinicalSetting: ['ward', 'opd', 'community', 'home'],
    ageScope: ['adult', 'elderly', 'pregnant'],
    priority: 'high',
    tags: ['cardiovascular', '常見疾病'],
    categories: ['疾病/心血管/高血壓'],
    caution: [
      {
        level: 'warning',
        message: '本卡為學習用一般知識，不可作為個別病人之診斷或治療依據。個別治療與用藥以主治醫師判斷與最新醫囑為準。',
      },
    ],
    bodySections: [
      {
        key: 'risk_factors',
        label: '常見危險因子',
        layout: 'bullet',
        collapsedByDefault: false,
        displayHint: 'expanded',
        content: [
          '家族病史、年齡、高鈉飲食、肥胖。',
          '吸菸、酗酒、缺乏運動、長期壓力。',
          '慢性腎臟病、糖尿病、睡眠呼吸中止症。',
        ],
      },
      {
        key: 'symptoms',
        label: '可能表現',
        layout: 'bullet',
        collapsedByDefault: false,
        displayHint: 'expanded',
        content: [
          '多數無明顯症狀（「沉默殺手」）。',
          '頭痛、頭暈、後頸僵硬、視力模糊（可能伴隨血壓急升）。',
          '出現胸痛、呼吸困難、意識變化 → 考慮高血壓危象，依規範緊急回報。',
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
    searchKeywords: ['HTN', '高血壓', 'hypertension'],

    icd10: ['I10'],
    oneLinerDefinition: '長期動脈血壓升高的慢性疾病，多數無症狀但長期累積心血管事件風險。',
    pathophysiologyBrief: '心輸出量與週邊血管阻力上升導致動脈壓持續升高；可分為原發性（無單一病因）與續發性（特定病因如腎血管、內分泌）。',
    typicalPresentation: ['多數無症狀', '偶有頭痛、頭暈、視力模糊', '高血壓危象時出現胸痛、呼吸困難、意識變化'],
    keyInvestigations: [
      '多次門診血壓量測（不同時段）',
      '居家血壓監測 (HBPM)',
      '基本血液生化（電解質、Cr、血糖、血脂）',
      '尿液檢查（蛋白尿）、心電圖、必要時超音波',
    ],
    treatmentOverview:
      '治療概念包括生活型態介入（低鈉飲食、規律運動、體重控制、戒菸限酒）與藥物治療（依個別狀況考慮 ACEi、ARB、CCB、Diuretics、β-blockers 等類別）。本段為學習概念，個別處方以主治醫師判斷為準。',
    nursingPriorities: [
      {
        priority: 'critical',
        point: '監測血壓趨勢與用藥反應',
        rationale: '單一測值不足以下結論；以多次趨勢與用藥前後比較更具臨床意義。',
      },
      {
        priority: 'high',
        point: '評估姿勢性低血壓與跌倒風險',
        rationale: '尤其老年與起始 / 加量降壓藥階段。',
      },
      {
        priority: 'high',
        point: '生活型態衛教（飲食、運動、睡眠、戒菸）',
      },
      {
        priority: 'normal',
        point: '用藥順從性追蹤與副作用觀察',
      },
    ],
    complications: ['冠心症', '心衰竭', '腦血管事件', '慢性腎臟病', '視網膜病變'],
    patientEducationIds: ['edu-001'],
    relatedDrugIds: ['drug-001'],
  },
];
