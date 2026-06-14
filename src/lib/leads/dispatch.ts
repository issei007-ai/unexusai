import type { Channel, ChannelResult, Lead } from "./types";
import { emailChannel } from "./channels/email";
import { whatsappChannel } from "./channels/whatsapp";
import { databaseChannel } from "./channels/database";

const CHANNELS: Channel[] = [emailChannel, whatsappChannel, databaseChannel];

/**
 * Sends a lead to every enabled channel in parallel. One channel failing never
 * affects the others (or the user) — each result is captured independently.
 */
export async function dispatchLead(lead: Lead): Promise<ChannelResult[]> {
  return Promise.all(
    CHANNELS.map(async (channel): Promise<ChannelResult> => {
      if (!channel.enabled()) {
        return { channel: channel.name, ok: false, skipped: true };
      }
      try {
        await channel.send(lead);
        return { channel: channel.name, ok: true };
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        console.error(`[lead] ${channel.name} failed:`, message);
        return { channel: channel.name, ok: false, error: message };
      }
    }),
  );
}

/** Names of channels that are currently configured. */
export function activeChannels(): string[] {
  return CHANNELS.filter((c) => c.enabled()).map((c) => c.name);
}
