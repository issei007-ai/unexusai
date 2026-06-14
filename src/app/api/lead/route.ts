import { NextResponse } from "next/server";
import type { Lead, LeadType } from "@/lib/leads/types";
import { dispatchLead, activeChannels } from "@/lib/leads/dispatch";

const VALID_TYPES: LeadType[] = ["lead", "booking", "newsletter"];
const RESERVED = new Set(["type", "source", "name", "email"]);

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const email = typeof body.email === "string" ? body.email.trim() : undefined;
  const name = typeof body.name === "string" ? body.name.trim() : undefined;

  // A contactable lead needs at least an email.
  if (!email) {
    return NextResponse.json({ ok: false, error: "Email is required" }, { status: 400 });
  }

  // Honeypot: bots fill hidden fields; humans leave them blank.
  if (typeof body.company_website === "string" && body.company_website.trim()) {
    return NextResponse.json({ ok: true }); // silently accept + drop
  }

  const type = VALID_TYPES.includes(body.type as LeadType) ? (body.type as LeadType) : "lead";
  const source = typeof body.source === "string" && body.source ? body.source : "site";

  const fields: Record<string, string> = {};
  for (const [key, value] of Object.entries(body)) {
    if (RESERVED.has(key) || key === "company_website") continue;
    if (typeof value === "string" && value.trim()) fields[key] = value.trim();
  }

  const lead: Lead = { type, source, name, email, fields, submittedAt: new Date().toISOString() };

  const results = await dispatchLead(lead);
  const delivered = results.filter((r) => r.ok).map((r) => r.channel);

  // If channels are configured but every one failed, surface an error so the
  // form can react. If no channels are configured at all, still succeed — the
  // submission flow shouldn't break before the integrations are switched on.
  const configured = activeChannels();
  if (configured.length > 0 && delivered.length === 0) {
    return NextResponse.json({ ok: false, error: "Delivery failed", results }, { status: 502 });
  }

  return NextResponse.json({ ok: true, delivered });
}
