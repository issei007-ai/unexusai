import type { Channel, Lead } from "../types";
import { leadRows, leadHeadline, channelAllowed } from "../types";

/**
 * WhatsApp channel via the Meta WhatsApp Cloud API. Enabled when
 * WHATSAPP_TOKEN, WHATSAPP_PHONE_ID and WHATSAPP_TO are set.
 *
 * Two delivery modes:
 *  - Template (recommended for production). Set WHATSAPP_TEMPLATE to the name of
 *    an approved template. Business-initiated messages need this — free-form text
 *    only delivers inside the 24h customer-service window. The template must have
 *    exactly four body variables, in this order: {{1}} type, {{2}} who,
 *    {{3}} details, {{4}} source. See LEADS.md for the exact template to create.
 *  - Text (default, no template). Good for quick testing.
 */
export const whatsappChannel: Channel = {
  name: "whatsapp",

  enabled() {
    return (
      channelAllowed("whatsapp") &&
      !!process.env.WHATSAPP_TOKEN &&
      !!process.env.WHATSAPP_PHONE_ID &&
      !!process.env.WHATSAPP_TO
    );
  },

  async send(lead: Lead) {
    const version = process.env.WHATSAPP_API_VERSION || "v21.0";
    const recipients = process.env.WHATSAPP_TO!.split(",").map((s) => s.trim()).filter(Boolean);
    const message = buildMessage(lead);

    for (const to of recipients) {
      const res = await fetch(
        `https://graph.facebook.com/${version}/${process.env.WHATSAPP_PHONE_ID}/messages`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ messaging_product: "whatsapp", to, ...message }),
        },
      );

      if (!res.ok) {
        throw new Error(`WhatsApp ${res.status}: ${await res.text()}`);
      }
    }
  },
};

/** Builds the message portion of the payload — template or free-form text. */
function buildMessage(lead: Lead): Record<string, unknown> {
  const templateName = process.env.WHATSAPP_TEMPLATE;

  if (templateName) {
    const who = lead.name || lead.email || "Someone";
    // Template body params can't contain newlines/tabs — keep details on one line.
    const details = leadRows(lead)
      .map(([k, v]) => `${k}: ${v}`)
      .join(" · ")
      .replace(/\s+/g, " ")
      .slice(0, 1000);

    return {
      type: "template",
      template: {
        name: templateName,
        language: { code: process.env.WHATSAPP_TEMPLATE_LANG || "en" },
        components: [
          {
            type: "body",
            parameters: [
              { type: "text", text: lead.type },
              { type: "text", text: who },
              { type: "text", text: details },
              { type: "text", text: lead.source },
            ],
          },
        ],
      },
    };
  }

  const body = [
    `*${leadHeadline(lead)}*`,
    "",
    ...leadRows(lead).map(([k, v]) => `*${k}:* ${v}`),
    "",
    `_Source: ${lead.source}_`,
  ].join("\n");

  return { type: "text", text: { body } };
}
