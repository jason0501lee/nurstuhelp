/**
 * Push BUNDLE_CARDS to Supabase using the service_role key.
 * Run: npm run push:supabase
 */
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createClient } from '@supabase/supabase-js';
import { BUNDLE_CARDS } from '../src/data/bundle';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ENV_PATH = resolve(__dirname, '../.env.local');

function loadEnvFile(path: string): void {
  let raw: string;
  try {
    raw = readFileSync(path, 'utf8');
  } catch {
    return;
  }
  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq < 0) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!(key in process.env)) {
      process.env[key] = value;
    }
  }
}

function decodeJwtRole(jwt: string): string | null {
  const parts = jwt.split('.');
  if (parts.length !== 3) return null;
  try {
    const payload = JSON.parse(
      Buffer.from(parts[1], 'base64url').toString('utf8'),
    ) as { role?: string };
    return payload.role ?? null;
  } catch {
    return null;
  }
}

function die(message: string): never {
  console.error(`\n✗ ${message}\n`);
  process.exit(1);
}

async function main(): Promise<void> {
  loadEnvFile(ENV_PATH);

  const url = process.env.VITE_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url) die('VITE_SUPABASE_URL is not set (.env.local).');
  if (!serviceKey) {
    die(
      'SUPABASE_SERVICE_ROLE_KEY is not set (.env.local).\n' +
        '  Get it: Supabase Dashboard -> Project Settings -> API -> service_role key.',
    );
  }

  const role = decodeJwtRole(serviceKey);
  if (role !== 'service_role') {
    die(
      `Refusing to push: SUPABASE_SERVICE_ROLE_KEY has role="${role ?? 'unknown'}", expected "service_role".`,
    );
  }

  const client = createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  console.log(`-> target: ${url}`);
  console.log(`-> source: BUNDLE_CARDS (${BUNDLE_CARDS.length} cards)`);

  const rows = BUNDLE_CARDS.map((card) => ({
    id: card.id,
    type: card.type,
    slug: card.slug,
    locale: card.locale,
    status: card.status,
    data: card,
  }));

  const BATCH = 50;
  let written = 0;
  for (let i = 0; i < rows.length; i += BATCH) {
    const chunk = rows.slice(i, i + BATCH);
    const { error } = await client
      .from('cards')
      .upsert(chunk, { onConflict: 'id' });
    if (error) {
      die(`Upsert failed at batch ${i}-${i + chunk.length}: ${error.message}`);
    }
    written += chunk.length;
    process.stdout.write(`\r  upserted ${written}/${rows.length}`);
  }
  process.stdout.write('\n');

  const { data: countRows, error: countErr } = await client
    .from('cards')
    .select('type', { count: 'exact' });
  if (countErr) {
    die(`Verify query failed: ${countErr.message}`);
  }
  const byType = new Map<string, number>();
  for (const r of countRows ?? []) {
    byType.set(r.type, (byType.get(r.type) ?? 0) + 1);
  }
  console.log('\n✓ done. Rows in public.cards:');
  for (const [type, n] of [...byType.entries()].sort()) {
    console.log(`    ${type.padEnd(12)} ${n}`);
  }
  console.log(`    ${'TOTAL'.padEnd(12)} ${countRows?.length ?? 0}`);
}

main().catch((err: unknown) => {
  console.error(err);
  process.exit(1);
});