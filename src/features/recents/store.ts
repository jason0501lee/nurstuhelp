/**
 * Recently-opened-card cache mirroring the favorites store pattern.
 *
 * Recents drive the home "今日捷徑" scroller and the search ranking
 * boost (`usage_score`). Persisted via UserStateRepository; in-memory
 * mirror keeps reads cheap.
 */
import { getUserStateRepository } from '@/repositories';
import type { RecentEntry } from '@/types/userState';

type Listener = (recents: readonly RecentEntry[]) => void;

let cache: RecentEntry[] | null = null;
let pendingLoad: Promise<RecentEntry[]> | null = null;
const listeners = new Set<Listener>();

async function loadIntoCache(): Promise<RecentEntry[]> {
  if (cache) return cache;
  if (!pendingLoad) {
    pendingLoad = (async () => {
      cache = await getUserStateRepository().getRecents();
      pendingLoad = null;
      return cache;
    })();
  }
  return pendingLoad;
}

function emit() {
  if (!cache) return;
  const snapshot = [...cache];
  for (const l of listeners) l(snapshot);
}

export async function getRecents(limit?: number): Promise<readonly RecentEntry[]> {
  const list = await loadIntoCache();
  return typeof limit === 'number' ? list.slice(0, limit) : list;
}

export async function trackOpen(cardId: string): Promise<void> {
  await getUserStateRepository().trackOpen(cardId);
  cache = await getUserStateRepository().getRecents();
  emit();
}

export function subscribeRecents(listener: Listener): () => void {
  listeners.add(listener);
  void loadIntoCache().then((list) => listener([...list]));
  return () => {
    listeners.delete(listener);
  };
}

export async function reloadRecents(): Promise<void> {
  cache = null;
  pendingLoad = null;
  await loadIntoCache();
  emit();
}
