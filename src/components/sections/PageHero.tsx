import AuroraBg from "@/components/ui/AuroraBg";
import RevealText3D from "@/components/ui/RevealText3D";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface Props {
  eyebrow?: string;
  title: string;
  titleSplit?: "word" | "char";
  subtitle?: string;
  pills?: string[];
  align?: "left" | "center";
  children?: React.ReactNode; // CTAs / extras
}

/** Consistent dark hero for every interior page. CSS-only visuals (smooth). */
export default function PageHero({
  eyebrow,
  title,
  titleSplit = "word",
  subtitle,
  pills,
  align = "left",
  children,
}: Props) {
  const center = align === "center";
  return (
    <section className="page-hero">
      <AuroraBg />
      <div className="absolute inset-0 bg-grid" style={{ opacity: 0.25, zIndex: 1 }} />
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, var(--color-bg))", zIndex: 2 }}
      />
      <div
        className={`container relative ${center ? "text-center" : ""}`}
        style={{ zIndex: 3, maxWidth: center ? "52rem" : "56rem" }}
      >
        {eyebrow && (
          <ScrollReveal direction="none">
            <span className="badge badge-accent mb-5 inline-flex">{eyebrow}</span>
          </ScrollReveal>
        )}

        <h1 className="text-h1 mb-6">
          <RevealText3D text={title} splitBy={titleSplit} stagger={titleSplit === "char" ? 0.02 : 0.05} />
        </h1>

        {subtitle && (
          <ScrollReveal delay={0.15}>
            <p className="text-lead" style={{ maxWidth: "44rem", marginInline: center ? "auto" : undefined }}>
              {subtitle}
            </p>
          </ScrollReveal>
        )}

        {pills && pills.length > 0 && (
          <ScrollReveal delay={0.2}>
            <div className={`flex flex-wrap gap-2 mt-7 ${center ? "justify-center" : ""}`}>
              {pills.map((p) => (
                <span key={p} className="badge badge-dark">{p}</span>
              ))}
            </div>
          </ScrollReveal>
        )}

        {children && (
          <ScrollReveal delay={0.25}>
            <div className={`flex flex-wrap gap-4 mt-9 ${center ? "justify-center" : ""}`}>{children}</div>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
}
