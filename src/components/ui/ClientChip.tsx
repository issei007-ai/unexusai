import type { Client } from "@/lib/constants";
import ClientLogo from "./ClientLogo";

/** Pill chip for the trust marquee: logo/monogram + name + country flag. */
export default function ClientChip({ client, index = 0 }: { client: Client; index?: number }) {
  return (
    <div
      className="flex items-center gap-2.5 flex-shrink-0 rounded-full"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid var(--color-border-bright)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)",
        padding: "0.4rem 1.05rem 0.4rem 0.4rem",
      }}
    >
      <ClientLogo client={client} index={index} size={34} shape="circle" showFlag={false} />
      <span className="text-sm font-semibold whitespace-nowrap" style={{ color: "var(--color-brand-100)" }}>
        {client.short ?? client.name}
      </span>
      {client.flag && (
        <img
          src={`https://flagcdn.com/${client.flag}.svg`}
          alt=""
          loading="lazy"
          style={{ width: 22, height: 15, borderRadius: 3, objectFit: "cover", flexShrink: 0, boxShadow: "0 1px 3px rgba(0,0,0,0.4)" }}
        />
      )}
    </div>
  );
}
