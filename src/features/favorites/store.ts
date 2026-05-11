/**
 * Tiny pub/sub on top of UserStateRepository so any component can
 * observe favorites without each page reloading independently.
 *
 * Intentionally not Zustand — we have one set of strings; a 40-line
 * store keeps the dependency count down. If we add recents-style
 * derived data the right call is to upgrade to Zustand at that point.
 */
import { getUserStateRepository } from '@/repositories';

type Listener = (set: ReadonlySet<string>) => void;

let cache: Set<string> | null = null;
let pendingLoad: Promise<Set<string>> | null = null;
const listeners = new Set<Listener>();

async function loadIntoCache(): Promise<Set<string>> {
  if (cache) return cache;
  if (!pendingLoad) {
    pendingLoad = (async () => {
      const list = await getUserStateRepository().getFavorites();
      cache = new Set(list);
      pendingLoad = null;
      return cache;
    })();
  }
  return pendingLoad;
}

function emit() {
  if (!cache) return;
  const snapshot: ReadonlySet<string> = new Set(cache);
  for (const l of listeners) l(snapshot);
}

export async function getFavoritesSet(): Promise<ReadonlySet<string>> {
  return loadIntoCache();
}

export async function toggleFavorite(cardId: string): Promise<boolean> {
  const isOn = await getUserStateRepository().toggleFavorite(cardId);
  await loadIntoCache();
  if (isOn) cache!.add(cardId);
  else cache!.delete(cardId);
  emit();
  return isOn;
}

export function subscribeFavorites(listener: Listener): () => void {
  listeners.add(listener);
  // Prime the listener once cache is ready.
  void loadIntoCache().then((set) => listener(new Set(set)));
  return () => {
    listeners.delete(listener);
  };
}

/** Force-reload from storage; used by Settings → 清除使用紀錄. */
export async function reloadFavorites(): Promise<void> {
  cache = null;
  pendingLoad = null;
  await loadIntoCache();
  emit();
}
