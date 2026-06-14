import { createHash } from "crypto";
import { cookies } from "next/headers";

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
  return !!process.env.SUPABASE_URL && !!process.env.SUPABASE_SERVICE_KEY;
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

/** Reads leads from Supabase with optional filtering + pagination. */
export async function fetchLeads(query: LeadQuery = {}): Promise<LeadPage> {
  if (!dbConfigured()) return { rows: [], total: 0 };
  const table = process.env.SUPABASE_LEADS_TABLE || "leads";
  const base = process.env.SUPABASE_URL!.replace(/\/$/, "");

  const params = new URLSearchParams({ select: "*", order: "created_at.desc" });
  if (query.source) params.set("source", `eq.${query.source}`);
  if (query.type) params.set("type", `eq.${query.type}`);
  if (query.from) params.append("created_at", `gte.${query.from}`);
  if (query.to) params.append("created_at", `lte.${query.to}T23:59:59.999`);
  params.set("limit", String(query.limit ?? PAGE_SIZE));
  params.set("offset", String(query.offset ?? 0));

  const res = await fetch(`${base}/rest/v1/${table}?${params.toString()}`, {
    headers: {
      apikey: process.env.SUPABASE_SERVICE_KEY!,
      Authorization: `Bearer ${process.env.SUPABASE_SERVICE_KEY}`,
      Prefer: "count=exact",
    },
    cache: "no-store",
  });

  if (!res.ok) throw new Error(`Supabase ${res.status}: ${await res.text()}`);

  const rows: LeadRow[] = await res.json();
  const total = parseContentRangeTotal(res.headers.get("content-range"));
  return { rows, total };
}

/** Parses the "0-49/123" Content-Range header into the total count. */
function parseContentRangeTotal(header: string | null): number {
  if (!header) return 0;
  const match = header.match(/\/(\d+)\s*$/);
  return match ? parseInt(match[1], 10) : 0;
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
