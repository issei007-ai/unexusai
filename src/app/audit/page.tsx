import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";

const INCLUDED = [
  "Technical SEO analysis",
  "Conversion rate review",
  "Competitor benchmarking",
  "Growth opportunity report",
];

export default function AuditPage() {
  return (
    <>
      <Nav />
      <main>
        <section className="section-dark" style={{ paddingBlock: "6rem 4rem" }}>
          <div className="container max-w-2xl">
            <span className="badge badge-dark mb-6 inline-flex">Free — no obligation</span>
            <h1 className="text-h1 text-white mb-6">Get your free growth audit</h1>
            <p className="text-lead mb-8" style={{ color: "var(--color-brand-300)" }}>
              We&apos;ll review your website, your SEO position, your ad performance, and your
              conversion funnel — then tell you exactly where the biggest wins are.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {INCLUDED.map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm" style={{ color: "var(--color-brand-200)" }}>
                  <span style={{ color: "var(--color-success)" }}>✓</span> {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container max-w-lg">
            <div className="card p-8">
              <h2 className="text-h3 mb-6" style={{ fontFamily: "var(--font-display)" }}>Request your free audit</h2>
              <form className="space-y-4">
                {[
                  { label: "Name", type: "text", placeholder: "Your name" },
                  { label: "Email", type: "email", placeholder: "you@company.com" },
                  { label: "Website URL", type: "url", placeholder: "https://yoursite.com" },
                ].map((field) => (
                  <div key={field.label}>
                    <label className="block text-sm font-medium mb-1">{field.label}</label>
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      className="w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition"
                      style={{ borderColor: "var(--color-brand-200)", background: "var(--color-brand-50)" }}
                    />
                  </div>
                ))}
                <div>
                  <label className="block text-sm font-medium mb-1">What&apos;s your biggest challenge?</label>
                  <select
                    className="w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition"
                    style={{ borderColor: "var(--color-brand-200)", background: "var(--color-brand-50)" }}
                  >
                    {["Not enough traffic", "Low conversion rate", "High ad spend / low ROI", "Poor search rankings", "Not sure — that's why I'm here"].map((opt) => (
                      <option key={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
                <button type="submit" className="btn btn-primary w-full btn-lg">Request my free audit</button>
                <p className="text-xs text-center" style={{ color: "var(--color-brand-500)" }}>
                  We review every submission personally. You&apos;ll hear from us within 48 hours.
                </p>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
