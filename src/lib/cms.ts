import { neonConfigured, getSql } from "./leads/neon";

/**
 * Custom CMS backed by the existing Neon database. Each editable section is one
 * row in `site_content` (key → JSONB). Pages read a section merged over its
 * hardcoded defaults, so the site looks unchanged until something is edited.
 */

let ensured: Promise<void> | null = null;
function ensureContentTable(): Promise<void> {
  if (!ensured) {
    const sql = getSql();
    ensured = (async () => {
      await sql`
        create table if not exists site_content (
          key        text primary key,
          value      jsonb not null,
          updated_at timestamptz default now()
        )
      `;
    })().catch((e) => {
      ensured = null;
      throw e;
    });
  }
  return ensured;
}

export function cmsConfigured(): boolean {
  return neonConfigured();
}

type Dict = Record<string, unknown>;

/** Read one section's content, merged over its defaults. Never throws. */
export async function getSection<T extends Dict>(key: string, defaults: T): Promise<T> {
  if (!neonConfigured()) return defaults;
  try {
    await ensureContentTable();
    const sql = getSql();
    const rows = (await sql`select value from site_content where key = ${key}`) as { value: Dict }[];
    if (!rows.length || !rows[0].value) return defaults;
    return { ...defaults, ...rows[0].value } as T;
  } catch {
    return defaults;
  }
}

/** All stored overrides, keyed by section. For the admin editor to prefill. */
export async function getAllSections(): Promise<Record<string, Dict>> {
  if (!neonConfigured()) return {};
  try {
    await ensureContentTable();
    const sql = getSql();
    const rows = (await sql`select key, value from site_content`) as { key: string; value: Dict }[];
    const out: Record<string, Dict> = {};
    for (const r of rows) out[r.key] = r.value;
    return out;
  } catch {
    return {};
  }
}

export async function setSection(key: string, value: Dict): Promise<void> {
  await ensureContentTable();
  const sql = getSql();
  await sql`
    insert into site_content (key, value, updated_at)
    values (${key}, ${JSON.stringify(value)}::jsonb, now())
    on conflict (key) do update set value = excluded.value, updated_at = now()
  `;
}
