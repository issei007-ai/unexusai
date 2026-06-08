interface CTABannerProps {
  heading?: string;
  body?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

export default function CTABanner({
  heading = "Ready to find out where you're leaving growth on the table?",
  body = "Book a free 30-minute strategy call. No pitch, no pressure — just an honest look at where you are and where you could be.",
  primaryLabel = "Get a Free Audit",
  primaryHref = "/audit",
  secondaryLabel = "Book a Call",
  secondaryHref = "/book",
}: CTABannerProps) {
  return (
    <section className="section relative overflow-hidden" style={{ background: "var(--color-brand-950)" }}>
      {/* Orbs */}
      <div className="orb orb-primary absolute" style={{ width: 500, height: 500, bottom: "-200px", left: "-100px", opacity: 0.4 }} />
      <div className="orb orb-secondary absolute" style={{ width: 400, height: 400, top: "-100px", right: "-80px", opacity: 0.3 }} />

      {/* Grid */}
      <div className="absolute inset-0 bg-grid opacity-20" />

      {/* Glow behind content */}
      <div
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-48 mx-auto max-w-2xl rounded-full blur-3xl"
        style={{ background: "rgba(99,102,241,0.12)" }}
      />

      <div className="container relative z-10 text-center">
        {/* Tag */}
        <span className="badge badge-dark mb-6 inline-flex">Ready to grow?</span>

        <h2
          className="text-h2 text-white mb-5 max-w-2xl mx-auto"
          style={{ textShadow: "0 0 60px rgba(99,102,241,0.3)" }}
        >
          {heading}
        </h2>

        <p
          className="text-lead mb-10 max-w-xl mx-auto"
          style={{ color: "var(--color-brand-300)" }}
        >
          {body}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <a href={primaryHref} className="btn btn-primary btn-lg">
            {primaryLabel}
          </a>
          <a href={secondaryHref} className="btn btn-ghost-white btn-lg">
            {secondaryLabel}
          </a>
        </div>

        {/* Bottom trust strip */}
        <div
          className="mt-14 pt-8 flex flex-wrap items-center justify-center gap-8"
          style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
        >
          {[
            "No lock-in contracts",
            "Senior-only delivery",
            "Response within 24h",
            "Free strategy session",
          ].map((item) => (
            <div
              key={item}
              className="flex items-center gap-2 text-xs"
              style={{ color: "var(--color-brand-400)" }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--color-success)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
