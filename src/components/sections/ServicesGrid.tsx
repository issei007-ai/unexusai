import { SERVICES } from "@/lib/constants";
import ScrollReveal from "@/components/ui/ScrollReveal";
import TiltCard from "@/components/ui/TiltCard";
import RevealText3D from "@/components/ui/RevealText3D";

const SERVICE_ICONS: Record<string, React.ReactNode> = {
  "Digital Marketing": (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  ),
  "Website Development": (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  "AI Automation": (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
    </svg>
  ),
  "AI Training": (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  "Market Research": (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  ),
};

const SERVICE_IMG: Record<string, string> = {
  "Digital Marketing": "dx-marketing",
  "Website Development": "dx-web",
  "AI Automation": "dx-ai",
  "AI Training": "dx-training",
  "Market Research": "dx-research",
};

const BENTO_CONFIG = [
  { colClass: "bento-wide",   minHeight: "220px" },
  { colClass: "bento-narrow", minHeight: "220px" },
  { colClass: "bento-third",  minHeight: "200px" },
  { colClass: "bento-third",  minHeight: "200px" },
  { colClass: "bento-third",  minHeight: "200px" },
];

export default function ServicesGrid() {
  return (
    <section className="section relative overflow-hidden" style={{ background: "var(--color-surface)" }}>
      <div className="absolute inset-0 bg-grid" style={{ opacity: 0.4 }} />
      <div className="orb orb-primary absolute" style={{ width: 500, height: 500, top: "-100px", right: "-100px", opacity: 0.08 }} />

      <div className="container relative z-10">
        {/* Header */}
        <div className="mb-16">
          <ScrollReveal>
            <span className="badge badge-accent mb-5 inline-flex">What we do</span>
          </ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="text-h2" style={{ maxWidth: "28rem" }}>
              <RevealText3D text="One agency. Every growth lever." splitBy="word" stagger={0.06} />
            </h2>
            <ScrollReveal delay={0.2} direction="left">
              <p className="text-lead" style={{ maxWidth: "26rem" }}>
                Five specialist services built to work together — each one powerful alone, unstoppable as a system.
              </p>
            </ScrollReveal>
          </div>
        </div>

        {/* Bento grid */}
        <div className="bento-grid">
          {SERVICES.map((service, i) => (
            <ScrollReveal key={service.num} delay={i * 0.07} direction="up" className={BENTO_CONFIG[i].colClass}>
              <TiltCard intensity={6} scale={1.02} className="h-full">
                <a
                  href={service.href}
                  className="group relative block h-full overflow-hidden rounded-3xl border border-white/[0.08] transition-all duration-500 hover:border-indigo-400/40 hover:shadow-[0_10px_40px_-12px_rgba(99,102,241,0.45)]"
                  style={{ minHeight: BENTO_CONFIG[i].minHeight, background: "var(--color-panel)" }}
                >
                  {/* Background image */}
                  <img
                    src={`https://picsum.photos/seed/${SERVICE_IMG[service.title]}/800/600`}
                    alt=""
                    aria-hidden
                    loading="lazy"
                    className="svc-img"
                  />
                  {/* Overlay — dark behind the text (bottom), image visible up top */}
                  <span
                    aria-hidden
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(to top, rgba(3,7,18,0.93) 0%, rgba(5,10,24,0.5) 55%, rgba(5,10,24,0.28) 100%)" }}
                  />

                  {/* Content */}
                  <div className="relative flex flex-col h-full p-7" style={{ zIndex: 2 }}>
                    {/* Top row */}
                    <div className="flex items-start justify-between mb-auto">
                      <div className="icon-wrap">{SERVICE_ICONS[service.title]}</div>
                      <span
                        className="text-xs tracking-widest opacity-40"
                        style={{ fontFamily: "var(--font-mono)", color: "#fff" }}
                      >
                        {service.num}
                      </span>
                    </div>

                    {/* Decorative large number */}
                    <div
                      className="my-4 text-8xl font-black select-none pointer-events-none"
                      style={{
                        fontFamily: "var(--font-display)",
                        color: "rgba(255,255,255,0.07)",
                        lineHeight: 1,
                        letterSpacing: "-0.05em",
                      }}
                    >
                      {service.num}
                    </div>

                    {/* Text */}
                    <div>
                      <h3 className="text-h3 mb-2" style={{ fontFamily: "var(--font-display)" }}>
                        {service.title}
                      </h3>
                      <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--color-brand-200)" }}>
                        {service.desc}
                      </p>
                      <span
                        className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider transition-all duration-300 group-hover:gap-3"
                        style={{ color: "var(--color-accent-300)" }}
                      >
                        Explore
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </a>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
