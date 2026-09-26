import LxShell from "@/components/lx/LxShell";
import LxPageHero from "@/components/lx/LxPageHero";
import BookingScheduler from "@/components/ui/BookingScheduler";

import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Book a Call",
    description: "Book a free 30-minute strategy call. No pitch, no pressure.",
    path: "/book",
  });
}

const EXPECT = [
  "We look at where things actually stand — not what you think the problem is, but what the data says",
  "We tell you the two or three things we'd tackle first — and why",
  "You get a rough idea of timeline, approach, and cost",
  "You leave with something useful, whether you work with us or not",
];

export default function BookPage() {
  return (
    <LxShell>
      <LxPageHero
        eyebrow="Book a free call"
        title="Book a free 30-minute call"
        subtitle="No pitch deck. No pressure. Just an honest look at where your marketing stands — and what we'd do about it."
        orbit={false}
      />

      <section className="lx-sec lx-sec--white">
        <div className="lx-wrap lx-grid lx-grid--book">
          {/* What to expect */}
          <div data-lx-reveal>
            <h2 className="lx-h3 lx-panel__t">What you&apos;ll walk away with</h2>
            <ul className="lx-checks">
              {EXPECT.map((item) => <li key={item}>{item}</li>)}
            </ul>
            <div className="lx-byline">
              <span aria-hidden="true">R</span>
              <div>
                <b>Richa Gupta</b>
                <small>Founder, Unexus AI</small>
              </div>
            </div>
            <p className="lx-note lx-note--sm">
              Times shown in Gulf Standard Time (GST, UTC+4). If you&apos;re joining from India or elsewhere, we&apos;ll confirm your timezone when you book.
            </p>
          </div>

          {/* Scheduler */}
          <div className="lx-panel" data-lx-card>
            <BookingScheduler />
          </div>
        </div>
      </section>
    </LxShell>
  );
}
