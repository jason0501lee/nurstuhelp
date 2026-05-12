/**
 * Aggregator for all drug cards, grouped by 實習科別.
 *
 * Each category file owns its set of DrugCards; this barrel flattens
 * them into the single DRUG_CARDS array consumed by the bundle.
 */
import type { DrugCard } from '@/types/cards/drug';
import { BASIC_DRUG_CARDS } from './basic';
import { INTERNAL_DRUG_CARDS } from './internal';
import { SURGERY_DRUG_CARDS } from './surgery';
import { PSYCHIATRY_DRUG_CARDS } from './psychiatry';
import { OBSTETRIC_DRUG_CARDS } from './obstetric';
import { PEDIATRIC_DRUG_CARDS } from './pediatric';
import { COMMUNITY_DRUG_CARDS } from './community';

export const DRUG_CARDS: DrugCard[] = [
  ...BASIC_DRUG_CARDS,
  ...INTERNAL_DRUG_CARDS,
  ...SURGERY_DRUG_CARDS,
  ...PSYCHIATRY_DRUG_CARDS,
  ...OBSTETRIC_DRUG_CARDS,
  ...PEDIATRIC_DRUG_CARDS,
  ...COMMUNITY_DRUG_CARDS,
];
