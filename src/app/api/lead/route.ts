import { NextResponse } from "next/server";
import type { Lead, LeadType } from "@/lib/leads/types";
import { dispatchLead, activeChannels } from "@/lib/leads/dispatch";
import { rateLimit, clientIp } from "@/lib/rate-limit";

const VALID_TYPES: LeadType[] = ["lead", "booking", "newsletter", "whatsapp"];
const RESERVED = new Set(["type", "source", "name", "email"]);

// Input caps — keep stored payloads bounded and reject abusive submissions.
const MAX_FIELDS = 40;
const MAX_KEY_LEN = 64;
const MAX_VALUE_LEN = 2000;
const MAX_NAME_LEN = 200;
const MAX_EMAIL_LEN = 254;
const MAX_PHONE_LEN = 40;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Trim a value to a string and clip to `max`, or undefined when empty/non-string. */
function clip(v: unknown, max: number): string | undefined {
  if (typeof v !== "string") return undefined;
  const t = v.trim();
  return t ? t.slice(0, max) : undefined;
}

export async function POST(req: Request) {
  // Throttle abusive submissions: 10 per minute per IP.
  const rl = rateLimit(`lead:${clientIp(req)}`, 10, 60_000);
  if (!rl.ok) {
    return NextResponse.json(
      { ok: false, error: "Too many submissions. Please try again shortly." },
      { status: 429, headers: { "Retry-After": String(rl.retryAfter) } },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }
  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    return NextResponse.json({ ok: false, error: "Invalid payload" }, { status: 400 });
  }

  const email = clip(body.email, MAX_EMAIL_LEN);
  const name = clip(body.name, MAX_NAME_LEN);
  const phone = clip(body.phone, MAX_PHONE_LEN);

  // A contactable lead needs at least one way to reach them.
  if (!email && !phone) {
    return NextResponse.json({ ok: false, error: "Email or phone is required" }, { status: 400 });
  }
  if (email && !EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: "Enter a valid email address" }, { status: 400 });
  }

  // Honeypot: bots fill hidden fields; humans leave them blank.
  if (typeof body.company_website === "string" && body.company_website.trim()) {
    return NextResponse.json({ ok: true }); // silently accept + drop
  }

  const type = VALID_TYPES.includes(body.type as LeadType) ? (body.type as LeadType) : "lead";
  const source = clip(body.source, 64) ?? "site";

  const fields: Record<string, string> = {};
  let count = 0;
  for (const [key, value] of Object.entries(body)) {
    if (RESERVED.has(key) || key === "company_website") continue;
    if (typeof value !== "string") continue;
    const trimmed = value.trim();
    if (!trimmed) continue;
    if (count >= MAX_FIELDS) break;
    fields[key.slice(0, MAX_KEY_LEN)] = trimmed.slice(0, MAX_VALUE_LEN);
    count++;
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
