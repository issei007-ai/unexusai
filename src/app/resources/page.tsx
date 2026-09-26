import LxShell from "@/components/lx/LxShell";
import LxPageHero from "@/components/lx/LxPageHero";
import LeadForm from "@/components/ui/LeadForm";

import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Resources",
    description: "Free tools, templates, and guides to help you grow — no email wall on most of them.",
    path: "/resources",
  });
}

const RESOURCES = [
  { type: "Guide", title: "The 2026 AI Marketing Playbook", desc: "A 40-page guide to using AI across your marketing — the prompts and workflows we actually use, not theory." },
  { type: "Template", title: "Conversion audit checklist", desc: "The 60-point checklist we go through on every site before suggesting any changes." },
  { type: "Template", title: "90-day SEO roadmap", desc: "A quarter-by-quarter plan for going from barely-ranking to actually ranking. Copy it into whatever tool you use." },
  { type: "Calculator", title: "ROAS & CAC calculator", desc: "Put your numbers in and see what profitable growth would actually look like for your business." },
  { type: "Guide", title: "Prompt library for marketers", desc: "Over 100 prompts we've tested for copy, research, analysis, and general idea-generation." },
  { type: "Checklist", title: "Next.js launch checklist", desc: "Everything we check before a site goes live: performance, SEO, accessibility, analytics." },
];

export default function ResourcesPage() {
  return (
    <LxShell>
      <LxPageHero
        eyebrow="Resources"
        title="Free tools, templates & guides"
        subtitle="These are the actual resources we use day to day. Take whatever's useful — there's no catch."
        orbit={RESOURCES.map((r) => r.title)}
      />

      <section className="lx-sec lx-sec--white">
        <div className="lx-wrap">
          <div className="lx-grid lx-grid--3">
            {RESOURCES.map((r, i) => (
              <div key={r.title} className={`lx-card lx-card--soft lx-spot lx-res${i === 0 ? " lx-card--accent" : ""}`} data-lx-card>
                <span className="lx-chip-tag lx-chip-tag--static">{r.type}</span>
                <h3 className="lx-h3">{r.title}</h3>
                <p>{r.desc}</p>
                <span className="lx-link">Get it free →</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gate */}
      <section className="lx-sec">
        <div className="lx-wrap">
          <div className="lx-mini lx-form" data-lx-card>
            <span className="lx-badge">The full pack</span>
            <h3 className="lx-h2 lx-h2--sm">Get everything in one download</h3>
            <p>Drop your email and we&apos;ll send the whole pack over, plus anything new as we publish it.</p>
            <div className="lx-mini__f">
              <LeadForm source="resources" type="newsletter" submitLabel="Send me the pack" note="No spam. Unsubscribe anytime.">
                <div>
                  <input className="form-input" name="email" type="email" aria-label="Email address" placeholder="you@company.com" required />
                </div>
              </LeadForm>
            </div>
          </div>
        </div>
      </section>
    </LxShell>
  );
}
