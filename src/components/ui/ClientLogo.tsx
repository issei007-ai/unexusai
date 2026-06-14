import type { Client } from "@/lib/constants";

const ACCENTS = ["#6366f1", "#7c3aed", "#06b6d4", "#f59e0b", "#10b981", "#ec4899", "#818cf8", "#67e8f9"];

/** Two-letter monogram from a client name (handles single words + symbols). */
function initials(name: string): string {
  const words = name.replace(/[^a-zA-Z0-9 ]/g, " ").trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return "?";
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

interface Props {
  client: Client;
  index?: number;
  /** Tile size in px. */
  size?: number;
  /** Tile shape. */
  shape?: "rounded" | "circle";
}

/**
 * Renders a client's logo on a light tile, or a gradient monogram tile when no
 * logo file is available. Uniform tiles keep the wall consistent either way.
 */
export default function ClientLogo({ client, index = 0, size = 80, shape = "rounded" }: Props) {
  const radius = shape === "circle" ? "50%" : Math.round(size * 0.22);

  if (client.logo) {
    return (
      <div
        style={{
          width: size,
          height: size,
          borderRadius: radius,
          background: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: Math.round(size * 0.18),
          flexShrink: 0,
        }}
      >
        <img
          src={client.logo}
          alt={`${client.name} logo`}
          loading="lazy"
          style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
        />
      </div>
    );
  }

  const accent = ACCENTS[index % ACCENTS.length];
  return (
    <div
      aria-label={client.name}
      style={{
        width: size,
        height: size,
        borderRadius: radius,
        background: `linear-gradient(135deg, ${accent}, var(--color-glow))`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        fontWeight: 800,
        fontSize: Math.round(size * 0.32),
        fontFamily: "var(--font-display)",
        letterSpacing: "-0.02em",
        flexShrink: 0,
      }}
    >
      {initials(client.name)}
    </div>
  );
}
