import type { Client } from "@/lib/constants";
import ClientLogo from "@/components/ui/ClientLogo";

/** Light pill for the client marquee: logo in a circle, name, country flag. */
export default function LxClientChip({ client, index = 0, hidden }: { client: Client; index?: number; hidden?: boolean }) {
  return (
    <div className="lx-chipc" aria-hidden={hidden || undefined}>
      <ClientLogo client={client} index={index} size={36} shape="circle" showFlag={false} transparentLogo />
      <span>{client.short || client.name}</span>
      {client.flag && (
        // eslint-disable-next-line @next/next/no-img-element
        <img className="lx-chipc__flag" src={`https://flagcdn.com/${client.flag}.svg`} alt="" loading="lazy" />
      )}
    </div>
  );
}
