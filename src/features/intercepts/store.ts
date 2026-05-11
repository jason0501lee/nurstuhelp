/**
 * Intercept log — student-facing reassurance counter that backs the
 * "本班完成 三讀六對 ×3" line on the home page. Entries are PII-free
 * by contract (the editorial / flow layer is responsible for
 * sanitising before calling logIntercept).
 */
import { getUserStateRepository } from '@/repositories';
import type { InterceptContext, InterceptEntry } from '@/types/userState';

type Listener = (entries: readonly InterceptEntry[]) => void;

let cache: InterceptEntry[] | null = null;
let pendingLoad: Promise<InterceptEntry[]> | null = null;
const listeners = new Set<Listener>();

async function loadIntoCache(): Promise<InterceptEntry[]> {
  if (cache) return cache;
  if (!pendingLoad) {
    pendingLoad = (async () => {
      cache = await getUserStateRepository().getIntercepts();
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

export async function getIntercepts(): Promise<readonly InterceptEntry[]> {
  return loadIntoCache();
}

export async function logIntercept(args: {
  context: InterceptContext;
  note?: string;
}): Promise<InterceptEntry> {
  const record = await getUserStateRepository().logIntercept(args);
  await loadIntoCache();
  cache = [record, ...(cache ?? [])];
  emit();
  return record;
}

export function subscribeIntercepts(listener: Listener): () => void {
  listeners.add(listener);
  void loadIntoCache().then((items) => listener([...items]));
  return () => {
    listeners.delete(listener);
  };
}

export async function reloadIntercepts(): Promise<void> {
  cache = null;
  pendingLoad = null;
  await loadIntoCache();
  emit();
}
