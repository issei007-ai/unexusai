import LeadForm from "@/components/ui/LeadForm";
import PhoneField from "@/components/ui/PhoneField";
import { SERVICES } from "@/lib/constants";

const NEEDS = [...SERVICES.map((s) => s.title), "Not sure yet"];
const POINTS = ["A free 30-minute call to start", "A real reply within 24 hours", "No contracts, no pressure"];

/**
 * Closing contact block for redesign-2 pages. Same copy, fields, lead source
 * ("contact-cta") and id="contact" anchor as the site-wide ContactCTA.
 */
export default function LxContact({
  heading = "Got a project in mind?",
  body = "Tell us a bit about where you are and where you'd like to get to. We'll come back with specific ideas, not a generic pitch.",
  defaultNeed,
}: {
  heading?: string;
  body?: string;
  defaultNeed?: string;
}) {
  const needKey = (s: string) => s.split(" — ")[0].trim();
  const selectedNeed = defaultNeed
    ? NEEDS.find((n) => n === defaultNeed || needKey(n) === needKey(defaultNeed))
    : undefined;
  return (
    <section id="contact" className="lx-sec lx-sec--white" style={{ scrollMarginTop: "4rem" }}>
      <div className="lx-wrap lx-contact">
        <div data-lx-reveal>
          <h2 className="lx-h2">{heading}</h2>
          <p className="lx-lede" style={{ marginTop: "1.2rem" }}>
            {body}
          </p>
          <ul>
            {POINTS.map((p) => <li key={p}>{p}</li>)}
          </ul>
        </div>
        <div className="lx-form" data-lx-reveal>
          <h3>Send us a message</h3>
          <LeadForm source="contact-cta" submitLabel="Send message" note="We respond within one business day. No spam, ever.">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="form-label" htmlFor="cta-name">Name</label>
                <input className="form-input" id="cta-name" name="name" type="text" placeholder="Your name" required />
              </div>
              <div>
                <label className="form-label" htmlFor="cta-email">Email</label>
                <input className="form-input" id="cta-email" name="email" type="email" placeholder="you@company.com" required />
              </div>
            </div>
            <PhoneField />
            <div>
              <label className="form-label" htmlFor="cta-company">Company</label>
              <input className="form-input" id="cta-company" name="company" type="text" placeholder="Your company" />
            </div>
            <div>
              <label className="form-label" htmlFor="cta-need">What do you need?</label>
              <select className="form-select" name="need" id="cta-need" defaultValue={selectedNeed}>
                {NEEDS.map((opt) => <option key={opt}>{opt}</option>)}
              </select>
            </div>
            <div>
              <label className="form-label" htmlFor="cta-message">Tell us more</label>
              <textarea className="form-textarea" id="cta-message" name="message" placeholder="A bit about your business and what you're trying to achieve..." />
            </div>
          </LeadForm>
        </div>
      </div>
    </section>
  );
}
