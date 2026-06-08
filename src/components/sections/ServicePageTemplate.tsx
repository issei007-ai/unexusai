import CTABanner from "@/components/layout/CTABanner";
import { TESTIMONIALS } from "@/lib/constants";

interface SubService {
  title: string;
  desc: string;
  href: string;
}

interface ServicePageTemplateProps {
  badge: string;
  headline: string;
  body: string;
  specialisms: string[];
  subServices: SubService[];
  faqs: { q: string; a: string }[];
}

export default function ServicePageTemplate({
  badge,
  headline,
  body,
  specialisms,
  subServices,
  faqs,
}: ServicePageTemplateProps) {
  return (
    <main>
      {/* Hero */}
      <section className="section-dark" style={{ paddingBlock: "6rem 4rem" }}>
        <div className="container max-w-3xl">
          <span className="badge badge-dark mb-6 inline-flex">{badge}</span>
          <h1 className="text-h1 text-white mb-6">{headline}</h1>
          <p className="text-lead mb-8" style={{ color: "var(--color-brand-300)" }}>{body}</p>
          <div className="flex flex-wrap gap-2 mb-10">
            {specialisms.map((s) => (
              <span key={s} className="badge badge-dark">{s}</span>
            ))}
          </div>
          <div className="flex flex-wrap gap-4">
            <a href="/quote" className="btn btn-primary btn-lg">Get a Custom Quote</a>
            <a href="/book" className="btn btn-ghost-white btn-lg">Book a Call</a>
          </div>
        </div>
      </section>

      {/* Sub-services */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-14">
            <h2 className="text-h2 mb-4">What&apos;s included</h2>
            <p className="text-lead max-w-xl mx-auto">Everything you need, delivered by specialists.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {subServices.map((sub) => (
              <a key={sub.href} href={sub.href} className="card p-8 group block">
                <h3 className="text-h3 mb-3 group-hover:text-[var(--color-accent-500)] transition-colors" style={{ fontFamily: "var(--font-display)" }}>
                  {sub.title}
                </h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--color-brand-500)" }}>{sub.desc}</p>
                <span className="text-sm font-semibold" style={{ color: "var(--color-accent-500)" }}>Learn more →</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section" style={{ background: "var(--color-brand-50)" }}>
        <div className="container">
          <div className="text-center mb-14">
            <h2 className="text-h2">What clients say</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.slice(0, 3).map((t) => (
              <div key={t.name} className="card p-8">
                <p className="text-sm leading-relaxed mb-6 italic" style={{ color: "var(--color-brand-700)" }}>
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="font-semibold text-sm">{t.name}</div>
                <div className="text-xs" style={{ color: "var(--color-brand-500)" }}>{t.role}, {t.company}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="section">
        <div className="container max-w-2xl">
          <div className="text-center mb-14">
            <h2 className="text-h2">Common questions</h2>
          </div>
          <div className="space-y-6">
            {faqs.map((faq) => (
              <div key={faq.q} className="card p-6">
                <h3 className="font-semibold mb-2">{faq.q}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--color-brand-500)" }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        heading="Ready to get started?"
        body="Tell us what you need and we'll put together a proposal within 48 hours."
        primaryLabel="Get a Custom Quote"
        primaryHref="/quote"
        secondaryLabel="Book a Call"
        secondaryHref="/book"
      />
    </main>
  );
}
