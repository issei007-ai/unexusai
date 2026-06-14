import type { Channel, Lead } from "../types";
import { channelAllowed } from "../types";
import { neonConfigured, getSql, ensureLeadsTable } from "../neon";

/**
 * Database channel via Neon (serverless Postgres). Enabled when
 * NEON_DATABASE_URL is set. The leads table is created automatically on first
 * write (see ensureLeadsTable), so no manual SQL is required.
 */
export const databaseChannel: Channel = {
  name: "database",

  enabled() {
    return channelAllowed("database") && neonConfigured();
  },

  async send(lead: Lead) {
    await ensureLeadsTable();
    const sql = getSql();
    await sql`
      insert into leads (created_at, type, source, name, email, fields)
      values (
        ${lead.submittedAt},
        ${lead.type},
        ${lead.source},
        ${lead.name ?? null},
        ${lead.email ?? null},
        ${JSON.stringify(lead.fields)}::jsonb
      )
    `;
  },
};
