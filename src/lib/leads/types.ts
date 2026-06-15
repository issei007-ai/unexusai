/** Shared types for the lead pipeline. */

export type LeadType = "lead" | "booking" | "newsletter" | "whatsapp";

export interface Lead {
  /** What kind of submission this is. */
  type: LeadType;
  /** Which form/page it came from, e.g. "audit", "contact", "book". */
  source: string;
  name?: string;
  email?: string;
  /** Everything else the form captured, keyed by field name. */
  fields: Record<string, string>;
  /** ISO timestamp set on the server when received. */
  submittedAt: string;
}

export interface ChannelResult {
  channel: string;
  ok: boolean;
  /** True when the channel isn't configured and was skipped. */
  skipped?: boolean;
  error?: string;
}

/** A delivery destination (email, WhatsApp, database, ...). */
export interface Channel {
  name: string;
  /** Channel only runs when its required env vars are set. */
  enabled(): boolean;
  send(lead: Lead): Promise<void>;
}

const LABELS: Record<string, string> = {
  website: "Website",
  phone: "Phone",
  company: "Company",
  service: "Service",
  need: "What they need",
  budget: "Budget",
  timeline: "Timeline",
  challenge: "Biggest challenge",
  message: "Message",
  date: "Preferred date",
  time: "Preferred time",
};

function labelFor(key: string): string {
  return LABELS[key] ?? key.charAt(0).toUpperCase() + key.slice(1).replace(/[_-]/g, " ");
}

/** Flattens a lead into ordered [label, value] rows for display. */
export function leadRows(lead: Lead): Array<[string, string]> {
  const rows: Array<[string, string]> = [];
  if (lead.name) rows.push(["Name", lead.name]);
  if (lead.email) rows.push(["Email", lead.email]);
  for (const [key, value] of Object.entries(lead.fields)) {
    if (typeof value === "string" && value.trim()) rows.push([labelFor(key), value.trim()]);
  }
  return rows;
}

/**
 * Whether a channel is permitted by the optional LEAD_CHANNELS allowlist.
 * If LEAD_CHANNELS is unset, every channel is allowed (and then gated only by
 * whether its own credentials are present).
 */
export function channelAllowed(name: string): boolean {
  const allow = process.env.LEAD_CHANNELS;
  if (!allow) return true;
  return allow.split(",").map((s) => s.trim()).includes(name);
}

/** Human-readable one-liner used in notification subjects. */
export function leadHeadline(lead: Lead): string {
  const who = lead.name || lead.email || "Someone";
  if (lead.type === "booking") {
    const when = [lead.fields.date, lead.fields.time].filter(Boolean).join(" at ");
    return `New booking from ${who}${when ? ` — ${when}` : ""}`;
  }
  if (lead.type === "newsletter") return `New newsletter signup: ${who}`;
  if (lead.type === "whatsapp") return `New WhatsApp enquiry from ${who}`;
  return `New lead from ${who}${lead.source ? ` (${lead.source})` : ""}`;
}
