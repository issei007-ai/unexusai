import LxShell from "@/components/lx/LxShell";
import LxPageHero from "@/components/lx/LxPageHero";
import LeadForm from "@/components/ui/LeadForm";
import PhoneField from "@/components/ui/PhoneField";

import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Get a Quote",
    description: "Tell us what you need and we'll send a clear scope, timeline, and price within 48 hours.",
    path: "/quote",
  });
}

const SERVICES = ["Digital Marketing", "Website Development", "AI Automation", "AI Training", "Market Research", "Multiple / not sure"];
const BUDGETS = ["Under £2k / mo", "£2k–£5k / mo", "£5k–£10k / mo", "£10k+ / mo", "One-off project"];
const TIMELINES = ["As soon as possible", "Within a month", "This quarter", "Just exploring"];

const STEPS = [
  { step: "01", title: "Send us the brief", desc: "The form below covers most of it — we'll follow up if there's anything else we need." },
  { step: "02", title: "We scope it properly", desc: "Deliverables, timeline, fixed price — written clearly enough that you won't need a call just to understand it." },
  { step: "03", title: "You'll have it in 48 hours", desc: "Then it's over to you. No countdown, no 'this offer expires Friday'." },
];

export default function QuotePage() {
  return (
    <LxShell>
      <LxPageHero
        eyebrow="Get a Quote"
        title="Get a custom proposal in 48 hours"
        subtitle="Tell us what you need and we'll come back with a clear scope, timeline, and price. We keep the sales process short, because honestly, nobody enjoys a long one."
        orbit={SERVICES.slice(0, 5)}
      />

      <section className="lx-sec lx-sec--white">
        <div className="lx-wrap lx-grid lx-grid--quote">
          {/* Form */}
          <div className="lx-panel lx-form" data-lx-card>
            <LeadForm source="quote" submitLabel="Request my proposal" note="We'll reply within 48 hours with a clear, fixed-scope proposal.">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="form-label" htmlFor="quote-name">Name</label>
                  <input className="form-input" id="quote-name" name="name" type="text" placeholder="Your name" required />
                </div>
                <div>
                  <label className="form-label" htmlFor="quote-email">Email</label>
                  <input className="form-input" id="quote-email" name="email" type="email" placeholder="you@company.com" required />
                </div>
              </div>
              <PhoneField />
              <div>
                <label className="form-label" htmlFor="quote-company">Company</label>
                <input className="form-input" id="quote-company" name="company" type="text" placeholder="Your company" />
              </div>
              <div>
                <label className="form-label" htmlFor="quote-service">What do you need?</label>
                <select className="form-select" id="quote-service" name="service">
                  {SERVICES.map((s) => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="form-label" htmlFor="quote-budget">Budget</label>
                  <select className="form-select" id="quote-budget" name="budget">
                    {BUDGETS.map((b) => <option key={b}>{b}</option>)}
                  </select>
                </div>
                <div>
                  <label className="form-label" htmlFor="quote-timeline">Timeline</label>
                  <select className="form-select" id="quote-timeline" name="timeline">
                    {TIMELINES.map((t) => <option key={t}>{t}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="form-label" htmlFor="quote-message">Tell us about the project</label>
                <textarea className="form-textarea" id="quote-message" name="message" placeholder="What are you trying to achieve, and where are you stuck?" />
              </div>
            </LeadForm>
          </div>

          {/* What happens next */}
          <div className="lx-sticky" data-lx-reveal>
            <h2 className="lx-h3 lx-panel__t">What happens next</h2>
            <ol className="lx-vsteps">
              {STEPS.map((s) => (
                <li key={s.step}>
                  <i>{s.step}</i>
                  <div>
                    <b>{s.title}</b>
                    <p>{s.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="lx-panel__b" style={{ marginTop: "1.5rem" }}>
              Prefer to talk it through first? <a href="/book" className="lx-link">Book a free call →</a>
            </p>
          </div>
        </div>
      </section>
    </LxShell>
  );
}
