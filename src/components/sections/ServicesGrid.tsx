import { SERVICES } from "@/lib/constants";
import ScrollReveal from "@/components/ui/ScrollReveal";
import TiltCard from "@/components/ui/TiltCard";
import SpotlightCard from "@/components/ui/SpotlightCard";

const SERVICE_ICONS: Record<string, React.ReactNode> = {
  "Digital Marketing": (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  ),
  "Website Development": (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  "AI Automation": (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
    </svg>
  ),
  "AI Training": (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  "Market Research": (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  ),
};

export default function ServicesGrid() {
  return (
    <section className="section relative overflow-hidden">
      <div className="absolute inset-0 bg-dots" style={{ opacity: 0.5 }} />

      <div className="container relative z-10">
        <div className="text-center mb-16">
          <ScrollReveal>
            <span className="badge badge-accent mb-5 inline-flex">What we do</span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="text-h2 mb-5">
              One agency.{" "}
              <span className="text-gradient">Every growth lever.</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-lead max-w-xl mx-auto">
              We built Richa because great businesses kept getting let down by specialists
              who couldn&apos;t see the bigger picture. Here&apos;s the full picture.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, i) => (
            <ScrollReveal key={service.num} delay={i * 0.08} direction="up">
              <TiltCard intensity={8} scale={1.025}>
                <SpotlightCard
                  spotlightColor="rgba(99,102,241,0.1)"
                  spotlightSize={300}
                  style={{
                    background: "#fff",
                    borderRadius: "var(--radius-lg)",
                    border: "1px solid var(--color-brand-200)",
                    boxShadow: "var(--shadow-card)",
                    display: "block",
                    height: "100%",
                  }}
                >
                  <a href={service.href} className="block p-8 h-full group">
                    {/* Icon row */}
                    <div className="flex items-start justify-between mb-6">
                      <div
                        className="icon-wrap transition-all duration-300 group-hover:scale-110"
                        style={{ color: "var(--color-accent-500)" }}
                      >
                        {SERVICE_ICONS[service.title]}
                      </div>
                      <span
                        className="text-xs tracking-widest"
                        style={{ fontFamily: "var(--font-mono)", color: "var(--color-brand-300)" }}
                      >
                        {service.num}
                      </span>
                    </div>

                    <h3
                      className="text-h3 mb-3 transition-colors duration-200 group-hover:text-[var(--color-accent-500)]"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {service.title}
                    </h3>

                    <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--color-brand-500)" }}>
                      {service.desc}
                    </p>

                    <span
                      className="inline-flex items-center gap-1.5 text-sm font-semibold"
                      style={{ color: "var(--color-accent-500)" }}
                    >
                      Explore
                      <svg
                        width="14" height="14" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                        className="transition-transform duration-200 group-hover:translate-x-1.5"
                      >
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </span>
                  </a>
                </SpotlightCard>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
