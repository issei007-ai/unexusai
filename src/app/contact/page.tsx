import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/sections/PageHero";
import LeadForm from "@/components/ui/LeadForm";
import BookingScheduler from "@/components/ui/BookingScheduler";

export const metadata = {
  title: "Contact — Unexus AI",
  description: "Book a call or send a message. You'll hear back from a real person within one business day.",
};

const NEEDS = ["Digital Marketing", "Website Development", "AI Automation", "AI Training", "Market Research", "Not sure yet"];

export default function ContactPage() {
  return (
    <>
      <Nav />
      <main>
        <PageHero
          align="center"
          eyebrow="Contact"
          title="Let's talk"
          titleSplit="char"
          subtitle="Book a call or send a message. Either way, you'll hear back from a real person within one business day."
        />

        <section className="section" style={{ paddingTop: "1rem" }}>
          <div className="container grid md:grid-cols-2 gap-6" style={{ maxWidth: "62rem" }}>
            {/* Book a call */}
            <div className="glow-card p-8" style={{ border: "1px solid var(--color-border)" }}>
              <h2 className="text-h3 mb-3" style={{ fontFamily: "var(--font-display)" }}>Book a free 30-min strategy call</h2>
              <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--color-brand-300)" }}>
                Thirty minutes, no pitch deck. We&apos;ll take an honest look at where things stand and
                tell you what we&apos;d focus on first.
              </p>
              <div className="mb-4">
                <BookingScheduler source="contact-book" />
              </div>
              <p className="text-xs" style={{ color: "var(--color-brand-500)" }}>
                You&apos;ll be speaking with Alex Carter, our Strategy Director.
              </p>
            </div>

            {/* Message form */}
            <div className="glow-card p-8" style={{ border: "1px solid var(--color-border)" }}>
              <h2 className="text-h3 mb-5" style={{ fontFamily: "var(--font-display)" }}>Send us a message</h2>
              <LeadForm source="contact" submitLabel="Send message" note="We respond within one business day. No newsletters, no spam.">
                <div>
                  <label className="form-label">Name</label>
                  <input className="form-input" name="name" type="text" placeholder="Your name" required />
                </div>
                <div>
                  <label className="form-label">Email</label>
                  <input className="form-input" name="email" type="email" placeholder="you@company.com" required />
                </div>
                <div>
                  <label className="form-label">Company</label>
                  <input className="form-input" name="company" type="text" placeholder="Your company" />
                </div>
                <div>
                  <label className="form-label">What do you need?</label>
                  <select className="form-select" name="need">
                    {NEEDS.map((opt) => <option key={opt}>{opt}</option>)}
                  </select>
                </div>
                <div>
                  <label className="form-label">Tell us more</label>
                  <textarea className="form-textarea" name="message" placeholder="A bit about your business and what you're trying to achieve..." />
                </div>
              </LeadForm>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
