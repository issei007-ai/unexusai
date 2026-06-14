import type { Channel, Lead } from "../types";
import { leadRows, leadHeadline, channelAllowed } from "../types";

/**
 * Email channel via Resend (https://resend.com). Enabled when RESEND_API_KEY,
 * LEAD_EMAIL_TO and LEAD_EMAIL_FROM are set. No SDK — plain REST call.
 */
export const emailChannel: Channel = {
  name: "email",

  enabled() {
    return (
      channelAllowed("email") &&
      !!process.env.RESEND_API_KEY &&
      !!process.env.LEAD_EMAIL_TO &&
      !!process.env.LEAD_EMAIL_FROM
    );
  },

  async send(lead: Lead) {
    const rows = leadRows(lead);
    const html = `
      <div style="font-family:system-ui,sans-serif;max-width:560px">
        <h2 style="margin:0 0 4px">${leadHeadline(lead)}</h2>
        <p style="color:#667;margin:0 0 16px">Source: ${lead.source} · ${new Date(lead.submittedAt).toLocaleString()}</p>
        <table style="border-collapse:collapse;width:100%">
          ${rows
            .map(
              ([k, v]) =>
                `<tr><td style="padding:6px 12px 6px 0;color:#889;vertical-align:top;white-space:nowrap">${escapeHtml(
                  k,
                )}</td><td style="padding:6px 0;color:#111">${escapeHtml(v)}</td></tr>`,
            )
            .join("")}
        </table>
      </div>`;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.LEAD_EMAIL_FROM,
        to: process.env.LEAD_EMAIL_TO!.split(",").map((s) => s.trim()),
        reply_to: lead.email,
        subject: leadHeadline(lead),
        html,
      }),
    });

    if (!res.ok) {
      throw new Error(`Resend ${res.status}: ${await res.text()}`);
    }
  },
};

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));
}
