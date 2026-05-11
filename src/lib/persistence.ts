/**
 * Thin wrapper around `idb-keyval` so the rest of the app uses one
 * persistence surface. If we later need batching / migrations we can
 * upgrade to Dexie without touching consumers.
 *
 * All data here is device-local and never automatically synced.
 */
import {
  get as idbGet,
  set as idbSet,
  del as idbDel,
  clear as idbClear,
  keys as idbKeys,
  createStore,
  type UseStore,
} from 'idb-keyval';

const STORE_NAME = 'nurstuhelp';
const DB_NAME = 'nurstuhelp-db';

let store: UseStore | null = null;

function getStore(): UseStore {
  if (!store) {
    store = createStore(DB_NAME, STORE_NAME);
  }
  return store;
}

export async function kvGet<T>(key: string): Promise<T | undefined> {
  return idbGet<T>(key, getStore());
}

export async function kvSet<T>(key: string, value: T): Promise<void> {
  return idbSet(key, value, getStore());
}

export async function kvDel(key: string): Promise<void> {
  return idbDel(key, getStore());
}

export async function kvClear(): Promise<void> {
  return idbClear(getStore());
}

export async function kvKeys(): Promise<IDBValidKey[]> {
  return idbKeys(getStore());
}
