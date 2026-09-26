import LxShell from "@/components/lx/LxShell";
import LxPageHero from "@/components/lx/LxPageHero";
import Link from "next/link";

import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Thank you",
    description: "We've received your request and will be in touch within one business day.",
    path: "/thank-you",
    noindex: true,
  });
}

const NEXT_STEPS = [
  { step: "01", title: "We review your submission", desc: "Every request is read by a real person, not a bot." },
  { step: "02", title: "We do our homework", desc: "Before we speak, we look at your current position so the conversation is useful from minute one." },
  { step: "03", title: "We reach out within 24 hours", desc: "Usually sooner. Occasionally a bit longer on Fridays." },
];

const WHILE_YOU_WAIT = [
  { label: "Read a case study", href: "/case-studies", desc: "See how we've helped businesses like yours." },
  { label: "Browse our resources", href: "/resources", desc: "Free tools, templates, and guides." },
  { label: "Read the blog", href: "/blog", desc: "Playbooks and field notes from the team." },
];

export default function ThankYouPage() {
  return (
    <LxShell>
      <LxPageHero
        eyebrow="✓ Request received"
        title="You're in."
        subtitle="We've received your request and someone from our team will reach out within one business day."
        orbit={NEXT_STEPS.map((s) => s.title)}
      >
        <a href="/book" className="lx-btn lx-btn--primary">Book a call now →</a>
        <Link href="/" className="lx-btn lx-btn--ghost">Back to home</Link>
      </LxPageHero>

      <section className="lx-sec lx-sec--white">
        <div className="lx-wrap lx-grid lx-grid--2 lx-grid--top">
          <div data-lx-reveal>
            <h2 className="lx-h3 lx-panel__t">What happens next</h2>
            <ol className="lx-vsteps">
              {NEXT_STEPS.map((s) => (
                <li key={s.step}>
                  <i>{s.step}</i>
                  <div>
                    <b>{s.title}</b>
                    <p>{s.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h2 className="lx-h3 lx-panel__t" data-lx-reveal>While you wait</h2>
            <div className="lx-grid">
              {WHILE_YOU_WAIT.map((item) => (
                <a key={item.label} href={item.href} className="lx-card lx-card--soft lx-spot is-link" data-lx-card>
                  <b className="lx-h3">{item.label} →</b>
                  <p>{item.desc}</p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </LxShell>
  );
}
