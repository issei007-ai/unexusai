import LeadForm from "@/components/ui/LeadForm";
import RevealText3D from "@/components/ui/RevealText3D";
import { SERVICES } from "@/lib/constants";

const NEEDS = [...SERVICES.map((s) => s.title), "Not sure yet"];
const POINTS = [
  "Free 30-minute strategy call",
  "A real response within 24 hours",
  "No lock-in, no pressure",
];

export default function HomeContact() {
  return (
    <section className="section relative overflow-hidden" style={{ background: "var(--color-surface)" }}>
      <div className="orb orb-primary absolute" style={{ width: 600, height: 600, bottom: "-220px", left: "-140px", opacity: 0.14 }} />
      <div className="absolute inset-0 bg-grid" style={{ opacity: 0.2 }} />

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 items-center" style={{ maxWidth: "68rem", margin: "0 auto" }}>
          {/* Left: copy + image */}
          <div>
            <span className="badge badge-accent mb-5 inline-flex">Get in touch</span>
            <h2 className="text-h2 mb-5">
              <RevealText3D text="Let's talk about your growth" splitBy="word" />
            </h2>
            <p className="text-lead mb-7">
              Tell us where you are and where you want to be. We&apos;ll show you, specifically, how we&apos;d
              get you there — no pitch, no pressure.
            </p>
            <ul className="space-y-3 mb-8">
              {POINTS.map((p) => (
                <li key={p} className="flex items-center gap-3">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-success)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="text-white" style={{ fontWeight: 500 }}>{p}</span>
                </li>
              ))}
            </ul>
            <div className="media-frame" style={{ aspectRatio: "16 / 9" }}>
              <img src="https://picsum.photos/seed/richa-studio/900/520" alt="The Richa team at work" loading="lazy" />
            </div>
          </div>

          {/* Right: form */}
          <div className="glow-card p-8" style={{ border: "1px solid var(--color-border)" }}>
            <h3 className="text-h3 mb-5" style={{ fontFamily: "var(--font-display)" }}>Send us a message</h3>
            <LeadForm submitLabel="Send message" note="We respond within one business day. No spam, ever.">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Name</label>
                  <input className="form-input" type="text" placeholder="Your name" required />
                </div>
                <div>
                  <label className="form-label">Email</label>
                  <input className="form-input" type="email" placeholder="you@company.com" required />
                </div>
              </div>
              <div>
                <label className="form-label">Company</label>
                <input className="form-input" type="text" placeholder="Your company" />
              </div>
              <div>
                <label className="form-label">What do you need?</label>
                <select className="form-select">
                  {NEEDS.map((opt) => <option key={opt}>{opt}</option>)}
                </select>
              </div>
              <div>
                <label className="form-label">Tell us more</label>
                <textarea className="form-textarea" placeholder="A bit about your business and what you're trying to achieve..." />
              </div>
            </LeadForm>
          </div>
        </div>
      </div>
    </section>
  );
}
