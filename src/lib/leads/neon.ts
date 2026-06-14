import { neon, type NeonQueryFunction } from "@neondatabase/serverless";

/**
 * Shared Neon (serverless Postgres) access over HTTP. The database channel and
 * the admin read-path both go through here. Configured via NEON_DATABASE_URL —
 * use the *pooled* connection string (host contains "-pooler") for serverless.
 */
export function neonConfigured(): boolean {
  return !!process.env.NEON_DATABASE_URL;
}

let _sql: NeonQueryFunction<false, false> | null = null;

export function getSql(): NeonQueryFunction<false, false> {
  const url = process.env.NEON_DATABASE_URL;
  if (!url) throw new Error("NEON_DATABASE_URL is not set");
  if (!_sql) _sql = neon(url);
  return _sql;
}

let ensured: Promise<void> | null = null;

/** Creates the leads table on first use. Runs once per warm instance. */
export function ensureLeadsTable(): Promise<void> {
  if (!ensured) {
    const sql = getSql();
    ensured = (async () => {
      await sql`
        create table if not exists leads (
          id          bigserial primary key,
          created_at  timestamptz default now(),
          type        text,
          source      text,
          name        text,
          email       text,
          fields      jsonb
        )
      `;
    })().catch((err) => {
      ensured = null; // allow a retry on the next request
      throw err;
    });
  }
  return ensured;
}
