/**
 * IndexedDB-backed implementation of UserStateRepository.
 *
 * Keys are kept short and intentionally human-readable so they are
 * easy to inspect in DevTools. There is no migration story in MVP —
 * if the schema changes, bumping STORE_VERSION wipes the store on
 * first read.
 */
import { kvClear, kvDel, kvGet, kvSet } from '@/lib/persistence';
import type {
  InterceptContext,
  InterceptEntry,
  RecentEntry,
} from '@/types/userState';
import type { UserStateRepository } from './UserStateRepository';

const STORE_VERSION = 1;
const K_FAVORITES = `v${STORE_VERSION}:favorites`;
const K_RECENTS = `v${STORE_VERSION}:recents`;
const K_INTERCEPTS = `v${STORE_VERSION}:intercepts`;

const MAX_RECENTS = 50;
const MAX_INTERCEPTS = 200;

function nowIso(): string {
  return new Date().toISOString();
}

function genId(): string {
  // Sufficient for in-app ids; never used as a clinical identifier.
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

export class LocalUserStateRepository implements UserStateRepository {
  /* ----- favorites ----- */

  async getFavorites(): Promise<string[]> {
    return (await kvGet<string[]>(K_FAVORITES)) ?? [];
  }

  async isFavorited(cardId: string): Promise<boolean> {
    const list = await this.getFavorites();
    return list.includes(cardId);
  }

  async toggleFavorite(cardId: string): Promise<boolean> {
    const list = await this.getFavorites();
    const idx = list.indexOf(cardId);
    let next: string[];
    let isOn: boolean;
    if (idx === -1) {
      next = [cardId, ...list];
      isOn = true;
    } else {
      next = list.filter((id) => id !== cardId);
      isOn = false;
    }
    await kvSet(K_FAVORITES, next);
    return isOn;
  }

  /* ----- recents ----- */

  async getRecents(limit?: number): Promise<RecentEntry[]> {
    const list = (await kvGet<RecentEntry[]>(K_RECENTS)) ?? [];
    return typeof limit === 'number' ? list.slice(0, limit) : list;
  }

  async trackOpen(cardId: string): Promise<void> {
    const list = (await kvGet<RecentEntry[]>(K_RECENTS)) ?? [];
    const existingIdx = list.findIndex((e) => e.cardId === cardId);
    const now = nowIso();
    let next: RecentEntry[];
    if (existingIdx === -1) {
      next = [{ cardId, openedAt: now, openCount: 1 }, ...list];
    } else {
      const existing = list[existingIdx]!;
      const merged: RecentEntry = {
        cardId,
        openedAt: now,
        openCount: existing.openCount + 1,
      };
      next = [merged, ...list.filter((_, i) => i !== existingIdx)];
    }
    if (next.length > MAX_RECENTS) {
      next = next.slice(0, MAX_RECENTS);
    }
    await kvSet(K_RECENTS, next);
  }

  /* ----- intercepts ----- */

  async getIntercepts(): Promise<InterceptEntry[]> {
    return (await kvGet<InterceptEntry[]>(K_INTERCEPTS)) ?? [];
  }

  async logIntercept(entry: {
    context: InterceptContext;
    note?: string;
  }): Promise<InterceptEntry> {
    const list = (await kvGet<InterceptEntry[]>(K_INTERCEPTS)) ?? [];
    const record: InterceptEntry = {
      id: genId(),
      occurredAt: nowIso(),
      context: entry.context,
      note: entry.note,
    };
    let next = [record, ...list];
    if (next.length > MAX_INTERCEPTS) {
      next = next.slice(0, MAX_INTERCEPTS);
    }
    await kvSet(K_INTERCEPTS, next);
    return record;
  }

  /* ----- maintenance ----- */

  async clearAll(): Promise<void> {
    await Promise.all([
      kvDel(K_FAVORITES),
      kvDel(K_RECENTS),
      kvDel(K_INTERCEPTS),
    ]);
    // Best-effort full wipe in case schema-versioned keys exist alongside.
    await kvClear();
  }
}
