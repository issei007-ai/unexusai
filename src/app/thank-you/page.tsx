import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";

const NEXT_STEPS = [
  { step: "01", title: "We review your submission", desc: "Every request is read by a real person, not a bot." },
  { step: "02", title: "We do our homework", desc: "Before we speak, we'll look at your current position so the conversation is useful from minute one." },
  { step: "03", title: "We reach out within 24 hours", desc: "Usually sooner. Occasionally a bit longer on Fridays." },
];

const WHILE_YOU_WAIT = [
  { label: "Read a case study", href: "/case-studies", desc: "See how we've helped businesses like yours." },
  { label: "Follow us on LinkedIn", href: "#", desc: "Weekly insights from the team." },
  { label: "Browse our resources", href: "/resources", desc: "Free tools, templates, and guides." },
];

export default function ThankYouPage() {
  return (
    <>
      <Nav />
      <main>
        <section className="section-dark" style={{ paddingBlock: "6rem 4rem" }}>
          <div className="container max-w-2xl text-center">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl"
              style={{ background: "var(--color-success)", color: "white" }}
            >
              ✓
            </div>
            <h1 className="text-h1 text-white mb-4">You&apos;re in.</h1>
            <p className="text-lead" style={{ color: "var(--color-brand-300)" }}>
              We&apos;ve received your request and someone from our team will reach out within
              one business day.
            </p>
          </div>
        </section>

        <section className="section">
          <div className="container max-w-2xl">
            <h2 className="text-h2 text-center mb-12">What happens next</h2>
            <div className="space-y-6">
              {NEXT_STEPS.map((item) => (
                <div key={item.step} className="card p-6 flex gap-4 items-start">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                    style={{ background: "var(--color-accent-100)", color: "var(--color-accent-600)" }}
                  >
                    {item.step}
                  </div>
                  <div>
                    <div className="font-semibold mb-1">{item.title}</div>
                    <p className="text-sm" style={{ color: "var(--color-brand-500)" }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section" style={{ background: "var(--color-brand-50)" }}>
          <div className="container max-w-3xl">
            <h2 className="text-h2 text-center mb-12">While you wait</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {WHILE_YOU_WAIT.map((item) => (
                <a key={item.label} href={item.href} className="card p-6 block group">
                  <div className="font-semibold mb-1 group-hover:text-[var(--color-accent-500)] transition-colors">{item.label} →</div>
                  <p className="text-sm" style={{ color: "var(--color-brand-500)" }}>{item.desc}</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="section-dark section">
          <div className="container text-center">
            <p className="text-lead text-white mb-6">Want to talk sooner?</p>
            <a href="/book" className="btn btn-primary btn-lg">Book a call now →</a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
