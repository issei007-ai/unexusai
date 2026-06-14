import type { Channel, Lead } from "../types";
import { leadRows, leadHeadline, channelAllowed } from "../types";

/**
 * WhatsApp channel via the Meta WhatsApp Cloud API. Enabled when
 * WHATSAPP_TOKEN, WHATSAPP_PHONE_ID and WHATSAPP_TO are set.
 *
 * Note: free-form text messages only deliver inside the 24h customer-service
 * window. For business-initiated notifications to your own number this is fine
 * in testing; for production you may need an approved message template.
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
    const lines = [
      `*${leadHeadline(lead)}*`,
      "",
      ...leadRows(lead).map(([k, v]) => `*${k}:* ${v}`),
      "",
      `_Source: ${lead.source}_`,
    ].join("\n");

    const version = process.env.WHATSAPP_API_VERSION || "v21.0";
    const recipients = process.env.WHATSAPP_TO!.split(",").map((s) => s.trim());

    for (const to of recipients) {
      const res = await fetch(
        `https://graph.facebook.com/${version}/${process.env.WHATSAPP_PHONE_ID}/messages`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messaging_product: "whatsapp",
            to,
            type: "text",
            text: { body: lines },
          }),
        },
      );

      if (!res.ok) {
        throw new Error(`WhatsApp ${res.status}: ${await res.text()}`);
      }
    }
  },
};
