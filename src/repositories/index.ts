/**
 * Repository factory. The whole app talks to repositories through
 * these accessors so we can swap backends in one place.
 *
 * Selection rule: when both VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
 * are set at build time, SupabaseCardRepository (with IndexedDB
 * offline cache) takes over. Otherwise the LocalCardRepository
 * compiled-in bundle is used.
 */
import { isSupabaseEnabled } from '@/lib/supabase';
import type { CardRepository } from './CardRepository';
import { LocalCardRepository } from './LocalCardRepository';
import { SupabaseCardRepository } from './SupabaseCardRepository';
import type { UserStateRepository } from './UserStateRepository';
import { LocalUserStateRepository } from './LocalUserStateRepository';

let cardRepo: CardRepository | null = null;
let userStateRepo: UserStateRepository | null = null;

export function getCardRepository(): CardRepository {
  if (!cardRepo) {
    cardRepo = isSupabaseEnabled
      ? new SupabaseCardRepository()
      : new LocalCardRepository();
  }
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
