/**
 * The compiled-in content bundle.
 *
 * Each card type has its own seed file under `cards/`. This file is
 * the single import surface for the runtime (the LocalCardRepository
 * pulls from BUNDLE_CARDS, the Settings page reads BUNDLE_VERSION).
 *
 * Bumping `version` is part of any content change PR.
 */
import type { Card } from '@/types/card';
import type { BundleVersion } from '@/repositories/CardRepository';

import { VITAL_SIGN_CARDS } from './cards/vital-signs';
import { ASSESSMENT_CARDS } from './cards/assessment';
import { DRUG_CARDS } from './cards/drugs';
import { DISEASE_CARDS } from './cards/diseases';
import { HEALTH_EDU_CARDS } from './cards/health-edu';
import { ISBAR_TEMPLATES } from './cards/isbar-templates';
import { MED_CHECK_CARDS } from './cards/med-check';

export const BUNDLE_CARDS: Card[] = [
  ...VITAL_SIGN_CARDS,
  ...ASSESSMENT_CARDS,
  ...DRUG_CARDS,
  ...DISEASE_CARDS,
  ...HEALTH_EDU_CARDS,
  ...ISBAR_TEMPLATES,
  ...MED_CHECK_CARDS,
];

export const BUNDLE_VERSION: BundleVersion = {
  version: '0.6.0',
  updatedAt: '2026-05-11',
  cardCount: BUNDLE_CARDS.length,
};
