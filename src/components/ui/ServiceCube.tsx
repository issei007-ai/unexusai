import ScrollReveal from "@/components/ui/ScrollReveal";

/**
 * Lightweight CSS-only 3D cube — six faces, one for each service.
 * No canvas/WebGL: just CSS 3D transforms + a single keyframe animation,
 * paused on hover. Each face links to its service page.
 */
const FACES = [
  { face: "front", label: "Marketing", sub: "SEO · Paid · Email", metric: "+312%", accent: "#6366f1", href: "/services/digital-marketing" },
  { face: "right", label: "Websites", sub: "Next.js · CRO · Speed", metric: "98+", accent: "#06b6d4", href: "/services/website-development" },
  { face: "back", label: "Automation", sub: "Agents · WhatsApp · RAG", metric: "−72%", accent: "#7c3aed", href: "/services/ai-automation" },
  { face: "left", label: "AI Training", sub: "Workshops · Prompts", metric: "10×", accent: "#f59e0b", href: "/services/ai-training" },
  { face: "top", label: "Research", sub: "ICP · Competitors", metric: "4–6wk", accent: "#10b981", href: "/services/market-research" },
  { face: "bottom", label: "GEO", sub: "ChatGPT · Perplexity", metric: "5×", accent: "#ec4899", href: "/services/geo" },
];

export default function ServiceCube() {
  return (
    <ScrollReveal direction="left" className="flex flex-col items-center gap-5">
      <div className="svc-cube-scene">
        <div className="svc-cube">
          {FACES.map((f) => (
            <a
              key={f.face}
              href={f.href}
              data-face={f.face}
              className="svc-cube-face"
              style={{ borderColor: `${f.accent}66`, boxShadow: `inset 0 0 40px ${f.accent}1f, inset 0 1px 0 rgba(255,255,255,0.06)` }}
            >
              <span className="text-sm font-bold uppercase tracking-widest" style={{ color: f.accent, fontFamily: "var(--font-display)" }}>
                {f.label}
              </span>
              <span className="text-[0.68rem] tracking-wide" style={{ color: "var(--color-brand-400)" }}>{f.sub}</span>
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.9rem", lineHeight: 1, color: f.accent, letterSpacing: "-0.03em" }}>
                {f.metric}
              </span>
            </a>
          ))}
        </div>
      </div>
      <p className="text-xs text-center" style={{ color: "var(--color-brand-500)" }}>Hover to pause · tap a face to explore</p>
    </ScrollReveal>
  );
}
