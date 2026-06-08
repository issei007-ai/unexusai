import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";

export default function ContactPage() {
  return (
    <>
      <Nav />
      <main>
        <section className="section-dark" style={{ paddingBlock: "6rem 4rem" }}>
          <div className="container max-w-2xl">
            <h1 className="text-h1 text-white mb-4">Let&apos;s talk</h1>
            <p className="text-lead" style={{ color: "var(--color-brand-300)" }}>
              Book a call or send a message. Either way, you&apos;ll hear back from a real person
              within one business day.
            </p>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-10">
              {/* Book a call */}
              <div className="card p-8">
                <h2 className="text-h3 mb-3" style={{ fontFamily: "var(--font-display)" }}>
                  Book a free 30-min strategy call
                </h2>
                <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--color-brand-500)" }}>
                  No pitch. No pressure. We&apos;ll take an honest look at your current situation
                  and tell you exactly where we think the biggest opportunities are.
                </p>
                <div
                  className="rounded-xl flex items-center justify-center text-sm mb-4"
                  style={{ background: "var(--color-brand-50)", height: "260px", color: "var(--color-brand-500)" }}
                >
                  [Calendly embed]
                </div>
                <p className="text-xs" style={{ color: "var(--color-brand-500)" }}>
                  You&apos;ll be speaking with Alex Carter, our Strategy Director.
                </p>
              </div>

              {/* Contact form */}
              <div className="card p-8">
                <h2 className="text-h3 mb-3" style={{ fontFamily: "var(--font-display)" }}>
                  Send us a message
                </h2>
                <form className="space-y-4">
                  {[
                    { label: "Name", type: "text", placeholder: "Your name" },
                    { label: "Email", type: "email", placeholder: "you@company.com" },
                    { label: "Company", type: "text", placeholder: "Your company" },
                  ].map((field) => (
                    <div key={field.label}>
                      <label className="block text-sm font-medium mb-1">{field.label}</label>
                      <input
                        type={field.type}
                        placeholder={field.placeholder}
                        className="w-full px-4 py-2.5 rounded-lg border text-sm outline-none focus:ring-2 transition"
                        style={{
                          borderColor: "var(--color-brand-200)",
                          background: "var(--color-brand-50)",
                        }}
                      />
                    </div>
                  ))}
                  <div>
                    <label className="block text-sm font-medium mb-1">What do you need?</label>
                    <select
                      className="w-full px-4 py-2.5 rounded-lg border text-sm outline-none focus:ring-2 transition"
                      style={{ borderColor: "var(--color-brand-200)", background: "var(--color-brand-50)" }}
                    >
                      {["Digital Marketing", "Website Development", "AI Automation", "AI Training", "Market Research", "Not sure yet"].map((opt) => (
                        <option key={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Tell us more</label>
                    <textarea
                      rows={4}
                      placeholder="A bit about your business and what you're trying to achieve..."
                      className="w-full px-4 py-2.5 rounded-lg border text-sm outline-none focus:ring-2 transition resize-none"
                      style={{ borderColor: "var(--color-brand-200)", background: "var(--color-brand-50)" }}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary w-full">Send message</button>
                  <p className="text-xs text-center" style={{ color: "var(--color-brand-500)" }}>
                    We respond within one business day. No newsletters, no spam.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
