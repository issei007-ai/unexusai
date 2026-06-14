import { createHash } from "crypto";

const SALT = "digiexperts-admin-v1";

/**
 * Derived auth token kept in the admin cookie. We store a hash of the password
 * (not the password itself), and the page recomputes + compares it. Returns
 * null when ADMIN_PASSWORD isn't configured, which disables the admin area.
 */
export function adminToken(): string | null {
  const pw = process.env.ADMIN_PASSWORD;
  if (!pw) return null;
  return createHash("sha256").update(pw + SALT).digest("hex");
}

export const ADMIN_COOKIE = "admin_auth";

export interface LeadRow {
  id: number;
  created_at: string;
  type: string | null;
  source: string | null;
  name: string | null;
  email: string | null;
  fields: Record<string, string> | null;
}

export function dbConfigured(): boolean {
  return !!process.env.SUPABASE_URL && !!process.env.SUPABASE_SERVICE_KEY;
}

/** Reads the most recent leads straight from Supabase (server-side only). */
export async function fetchLeads(limit = 200): Promise<LeadRow[]> {
  if (!dbConfigured()) return [];
  const table = process.env.SUPABASE_LEADS_TABLE || "leads";
  const base = process.env.SUPABASE_URL!.replace(/\/$/, "");
  const url = `${base}/rest/v1/${table}?select=*&order=created_at.desc&limit=${limit}`;

  const res = await fetch(url, {
    headers: {
      apikey: process.env.SUPABASE_SERVICE_KEY!,
      Authorization: `Bearer ${process.env.SUPABASE_SERVICE_KEY}`,
    },
    cache: "no-store",
  });

  if (!res.ok) throw new Error(`Supabase ${res.status}: ${await res.text()}`);
  return res.json();
}
