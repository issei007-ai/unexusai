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
    <section className="section section-dark">
      <div className="container text-center">
        <h2 className="text-h2 text-white mb-4">{heading}</h2>
        <p className="text-lead mb-8 max-w-xl mx-auto" style={{ color: "var(--color-brand-300)" }}>
          {body}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a href={primaryHref} className="btn btn-primary btn-lg">{primaryLabel}</a>
          <a href={secondaryHref} className="btn btn-ghost-white btn-lg">{secondaryLabel}</a>
        </div>
      </div>
    </section>
  );
}
