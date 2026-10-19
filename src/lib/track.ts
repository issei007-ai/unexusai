/**
 * Lead conversion signal for GTM. Every lead path (contact forms, booking
 * scheduler, Unixi chat) calls this after /api/lead succeeds, so GA4 and
 * Google Ads see one `generate_lead` per real lead. GTM forwards it to GA4
 * (key event) and Google Ads. No-op without GTM, e.g. on /admin.
 */
export function trackLead(type: string, source: string, extra: Record<string, unknown> = {}): void {
  if (typeof window === "undefined") return;
  const w = window as Window & { dataLayer?: Record<string, unknown>[] };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event: "generate_lead", lead_type: type, lead_source: source, ...extra });
}
