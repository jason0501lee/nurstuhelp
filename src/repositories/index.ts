/**
 * Repository factory. Pages should call these accessors rather than
 * instantiating implementations directly so we can swap backends in
 * one place later.
 */
import type { CardRepository } from './CardRepository';
import { LocalCardRepository } from './LocalCardRepository';
import type { UserStateRepository } from './UserStateRepository';
import { LocalUserStateRepository } from './LocalUserStateRepository';

let cardRepo: CardRepository | null = null;
let userStateRepo: UserStateRepository | null = null;

export function getCardRepository(): CardRepository {
  if (!cardRepo) cardRepo = new LocalCardRepository();
  return cardRepo;
}

export function getUserStateRepository(): UserStateRepository {
  if (!userStateRepo) userStateRepo = new LocalUserStateRepository();
  return userStateRepo;
}

/** Test-only override hooks. Not used in app code. */
export function __setCardRepository(repo: CardRepository): void {
  cardRepo = repo;
}

export function __setUserStateRepository(repo: UserStateRepository): void {
  userStateRepo = repo;
}

export type { CardRepository } from './CardRepository';
export type { UserStateRepository } from './UserStateRepository';
export type {
  BundleVersion,
  CardFilter,
  SearchHit,
  SearchOpts,
} from './CardRepository';
