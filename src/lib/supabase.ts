/**
 * Supabase client. Only constructed when both env vars are present —
 * this is the single switch that selects SupabaseCardRepository vs
 * LocalCardRepository in repositories/index.ts.
 *
 * The anon key is safe to ship in client; the database is protected
 * by Row Level Security (see supabase/migrations/0001_cards.sql).
 */
import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseEnabled: boolean = Boolean(url && anonKey);

export const supabase: SupabaseClient | null = isSupabaseEnabled
  ? createClient(url!, anonKey!, {
      auth: {
        // MVP has no accounts; we do not want Supabase to manage one.
        persistSession: false,
        autoRefreshToken: false,
      },
      global: {
        headers: {
          'x-client-info': 'nurstuhelp-pwa',
        },
      },
    })
  : null;

/**
 * Sanity-check struct surfaced in Settings so the student can confirm
 * which data source they're actually hitting.
 */
export interface DataSourceInfo {
  source: 'supabase' | 'local-bundle';
  url?: string;
}

export function getDataSourceInfo(): DataSourceInfo {
  return isSupabaseEnabled
    ? { source: 'supabase', url }
    : { source: 'local-bundle' };
}
