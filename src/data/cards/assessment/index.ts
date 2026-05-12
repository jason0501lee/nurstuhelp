/**
 * Aggregator for all assessment cards across the 3 domains
 * (physical / psychological / social).
 *
 * Vital sign cards stay as a separate `vital_sign` type and sit
 * alongside these under the "基本評估" UI category.
 */
import type { AssessmentCard } from '@/types/cards/assessment';
import { PHYSICAL_ASSESSMENT_CARDS } from './physical';
import { PSYCHOLOGICAL_ASSESSMENT_CARDS } from './psychological';
import { SOCIAL_ASSESSMENT_CARDS } from './social';

export const ASSESSMENT_CARDS: AssessmentCard[] = [
  ...PHYSICAL_ASSESSMENT_CARDS,
  ...PSYCHOLOGICAL_ASSESSMENT_CARDS,
  ...SOCIAL_ASSESSMENT_CARDS,
];
