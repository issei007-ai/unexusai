import ScrollReveal from "@/components/ui/ScrollReveal";
import { getSection } from "@/lib/cms";
import { HOME_CUBE_DEFAULTS } from "@/lib/cms-schema";

/**
 * Lightweight CSS-only 3D cube — six faces, one per service.
 * No canvas/WebGL: just CSS 3D transforms + a single keyframe animation,
 * paused on hover. Content is CMS-driven (home.cube).
 */
const FACE_ORDER = ["front", "right", "back", "left", "top", "bottom"] as const;

type Face = { label: string; sub: string; metric: string; accent: string };

export default async function ServiceCube() {
  const c = await getSection("home.cube", HOME_CUBE_DEFAULTS);
  const faces = (Array.isArray(c.faces) ? c.faces : HOME_CUBE_DEFAULTS.faces).slice(0, 6) as Face[];

  return (
    <ScrollReveal direction="left" className="flex flex-col items-center gap-5">
      <div className="svc-cube-scene">
        <div className="svc-cube">
          {faces.map((f, i) => {
            const accent = f.accent || "#6366f1";
            return (
              <div
                key={i}
                data-face={FACE_ORDER[i]}
                className="svc-cube-face"
                style={{ borderColor: `${accent}66`, boxShadow: `inset 0 0 40px ${accent}1f, inset 0 1px 0 rgba(255,255,255,0.06)` }}
              >
                <span className="text-sm font-bold uppercase tracking-widest" style={{ color: accent, fontFamily: "var(--font-display)" }}>
                  {f.label}
                </span>
                <span className="text-[0.68rem] tracking-wide" style={{ color: "var(--color-brand-400)" }}>{f.sub}</span>
                <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.9rem", lineHeight: 1, color: accent, letterSpacing: "-0.03em" }}>
                  {f.metric}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      {c.caption && <p className="text-xs text-center" style={{ color: "var(--color-brand-500)" }}>{c.caption}</p>}
    </ScrollReveal>
  );
}
