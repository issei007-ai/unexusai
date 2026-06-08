import { SERVICES } from "@/lib/constants";

const SERVICE_ICONS: Record<string, React.ReactNode> = {
  "Digital Marketing": (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  ),
  "Website Development": (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  "AI Automation": (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
    </svg>
  ),
  "AI Training": (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a10 10 0 1 0 10 10" />
      <path d="M12 6v6l4 2" />
      <path d="M18 2l4 4-4 4" />
      <path d="M22 2l-4 4" />
    </svg>
  ),
  "Market Research": (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
      <line x1="11" y1="8" x2="11" y2="14" />
      <line x1="8" y1="11" x2="14" y2="11" />
    </svg>
  ),
};

export default function ServicesGrid() {
  return (
    <section className="section relative overflow-hidden">
      {/* Light dot grid */}
      <div
        className="absolute inset-0 bg-dots opacity-60"
        style={{ backgroundSize: "32px 32px" }}
      />

      <div className="container relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="badge badge-accent mb-5 inline-flex">What we do</span>
          <h2 className="text-h2 mb-5">
            One agency.{" "}
            <span className="text-gradient">Every growth lever.</span>
          </h2>
          <p className="text-lead max-w-xl mx-auto">
            We built Richa because great businesses kept getting let down by specialists
            who couldn&apos;t see the bigger picture. Here&apos;s the full picture.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, i) => (
            <a
              key={service.num}
              href={service.href}
              className="card-gradient p-8 block group"
              style={{
                background: "#fff",
                border: "1px solid var(--color-brand-200)",
                borderRadius: "var(--radius-lg)",
                animationDelay: `${i * 0.08}s`,
              }}
            >
              {/* Number + Icon row */}
              <div className="flex items-start justify-between mb-5">
                <div className="icon-wrap" style={{ color: "var(--color-accent-500)" }}>
                  {SERVICE_ICONS[service.title]}
                </div>
                <span
                  className="text-xs font-mono tracking-widest"
                  style={{
                    fontFamily: "var(--font-mono)",
                    color: "var(--color-brand-300)",
                  }}
                >
                  {service.num}
                </span>
              </div>

              {/* Title */}
              <h3
                className="text-h3 mb-3 transition-colors"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {service.title}
              </h3>

              {/* Desc */}
              <p
                className="text-sm leading-relaxed mb-5"
                style={{ color: "var(--color-brand-500)" }}
              >
                {service.desc}
              </p>

              {/* Arrow CTA */}
              <span
                className="inline-flex items-center gap-1.5 text-sm font-semibold transition-gap"
                style={{ color: "var(--color-accent-500)" }}
              >
                Explore
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform group-hover:translate-x-1"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
