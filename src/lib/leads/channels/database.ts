import type { Channel, Lead } from "../types";
import { channelAllowed } from "../types";

/**
 * Database channel via Supabase REST (PostgREST). Enabled when SUPABASE_URL and
 * SUPABASE_SERVICE_KEY are set. Writes one row per submission.
 *
 * Expected table (default name "leads"):
 *   create table leads (
 *     id          bigint generated always as identity primary key,
 *     created_at  timestamptz default now(),
 *     type        text,
 *     source      text,
 *     name        text,
 *     email       text,
 *     fields      jsonb
 *   );
 */
export const databaseChannel: Channel = {
  name: "database",

  enabled() {
    return (
      channelAllowed("database") &&
      !!process.env.SUPABASE_URL &&
      !!process.env.SUPABASE_SERVICE_KEY
    );
  },

  async send(lead: Lead) {
    const table = process.env.SUPABASE_LEADS_TABLE || "leads";
    const url = `${process.env.SUPABASE_URL!.replace(/\/$/, "")}/rest/v1/${table}`;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        apikey: process.env.SUPABASE_SERVICE_KEY!,
        Authorization: `Bearer ${process.env.SUPABASE_SERVICE_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify([
        {
          type: lead.type,
          source: lead.source,
          name: lead.name ?? null,
          email: lead.email ?? null,
          fields: lead.fields,
          created_at: lead.submittedAt,
        },
      ]),
    });

    if (!res.ok) {
      throw new Error(`Supabase ${res.status}: ${await res.text()}`);
    }
  },
};
