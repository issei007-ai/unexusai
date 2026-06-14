import { createHash } from "crypto";
import { cookies } from "next/headers";
import { neonConfigured, getSql, ensureLeadsTable } from "./leads/neon";

const SALT = "digiexperts-admin-v1";

/** Form sources used across the site — drives the admin filter dropdown. */
export const KNOWN_SOURCES = [
  "audit",
  "contact",
  "contact-cta",
  "quote",
  "resources",
  "blog",
  "book",
  "contact-book",
] as const;

export const LEAD_TYPES = ["lead", "booking", "newsletter"] as const;

export const PAGE_SIZE = 50;

/** Accepts only well-formed YYYY-MM-DD strings; returns undefined otherwise. */
export function safeDate(value: string | undefined): string | undefined {
  return value && /^\d{4}-\d{2}-\d{2}$/.test(value) ? value : undefined;
}

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
  return neonConfigured();
}

/** Whether the current request carries a valid admin cookie. */
export async function isAdminAuthed(): Promise<boolean> {
  const token = adminToken();
  if (!token) return false;
  const store = await cookies();
  return store.get(ADMIN_COOKIE)?.value === token;
}

export interface LeadQuery {
  source?: string;
  type?: string;
  /** Inclusive start date, YYYY-MM-DD. */
  from?: string;
  /** Inclusive end date, YYYY-MM-DD (covers the whole day). */
  to?: string;
  limit?: number;
  offset?: number;
}

export interface LeadPage {
  rows: LeadRow[];
  total: number;
}

/** Reads leads from Neon with optional filtering + pagination. */
export async function fetchLeads(query: LeadQuery = {}): Promise<LeadPage> {
  if (!neonConfigured()) return { rows: [], total: 0 };
  await ensureLeadsTable();
  const sql = getSql();

  const conds: string[] = [];
  const params: unknown[] = [];
  let i = 1;
  if (query.source) { conds.push(`source = $${i++}`); params.push(query.source); }
  if (query.type) { conds.push(`type = $${i++}`); params.push(query.type); }
  if (query.from) { conds.push(`created_at >= $${i++}`); params.push(query.from); }
  if (query.to) { conds.push(`created_at <= $${i++}`); params.push(`${query.to}T23:59:59.999`); }
  const where = conds.length ? `where ${conds.join(" and ")}` : "";

  const limitIdx = i++; params.push(query.limit ?? PAGE_SIZE);
  const offsetIdx = i++; params.push(query.offset ?? 0);

  const text = `
    select id, created_at, type, source, name, email, fields,
           count(*) over()::int as _total
    from leads
    ${where}
    order by created_at desc
    limit $${limitIdx} offset $${offsetIdx}
  `;

  const result = (await sql.query(text, params)) as Array<LeadRow & { _total: number }>;
  const total = result.length ? Number(result[0]._total) : 0;
  const rows: LeadRow[] = result.map((r) => ({
    id: r.id,
    created_at: r.created_at,
    type: r.type,
    source: r.source,
    name: r.name,
    email: r.email,
    fields: r.fields,
  }));
  return { rows, total };
}

/** Serialises leads to CSV, with one column per distinct captured field. */
export function leadsToCsv(rows: LeadRow[]): string {
  const fieldKeys = Array.from(new Set(rows.flatMap((r) => Object.keys(r.fields ?? {}))));
  const headers = ["created_at", "type", "source", "name", "email", ...fieldKeys];
  const lines = [headers.map(csvCell).join(",")];
  for (const r of rows) {
    const row = [
      r.created_at,
      r.type,
      r.source,
      r.name,
      r.email,
      ...fieldKeys.map((k) => r.fields?.[k] ?? ""),
    ];
    lines.push(row.map(csvCell).join(","));
  }
  return lines.join("\r\n");
}

function csvCell(value: unknown): string {
  const s = value == null ? "" : String(value);
  return /[",\r\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}
