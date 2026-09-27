import LxShell from "@/components/lx/LxShell";
import LxPageHero from "@/components/lx/LxPageHero";
import LeadForm from "@/components/ui/LeadForm";
import PhoneField from "@/components/ui/PhoneField";

import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Free Growth Audit",
    description: "Get a free, no-obligation audit of your website, SEO, ads, and conversion funnel.",
    path: "/audit",
  });
}

const CHALLENGES = [
  "Not enough traffic",
  "Low conversion rate",
  "High ad spend / low ROI",
  "Poor search rankings",
  "Not sure — that's why I'm here",
];

const PILLS = ["Technical SEO analysis", "Conversion review", "Competitor benchmarking", "Opportunity report"];

export default function AuditPage() {
  return (
    <LxShell>
      <LxPageHero
        eyebrow="✓ Free — no obligation"
        title="Get your free growth audit"
        subtitle="We'll go through your website, SEO, ad performance, and conversion funnel, then tell you straight what we think is worth fixing first."
        pills={PILLS}
      />

      <section className="lx-sec lx-sec--white">
        <div className="lx-wrap">
          <div className="lx-panel lx-form lx-panel--center" data-lx-card>
            <h2 className="lx-h3 lx-panel__t">Request your free audit</h2>
            <LeadForm source="audit" submitLabel="Request my free audit" note="We review every submission personally. You'll hear from us within 48 hours.">
              <div>
                <label className="form-label" htmlFor="audit-name">Name</label>
                <input className="form-input" id="audit-name" name="name" type="text" placeholder="Your name" required />
              </div>
              <div>
                <label className="form-label" htmlFor="audit-email">Email</label>
                <input className="form-input" id="audit-email" name="email" type="email" placeholder="you@company.com" required />
              </div>
              <PhoneField />
              <div>
                <label className="form-label" htmlFor="audit-website">Website URL</label>
                <input className="form-input" id="audit-website" name="website" type="url" placeholder="https://yoursite.com" />
              </div>
              <div>
                <label className="form-label" htmlFor="audit-challenge">What&apos;s your biggest challenge?</label>
                <select className="form-select" id="audit-challenge" name="challenge">
                  {CHALLENGES.map((opt) => <option key={opt}>{opt}</option>)}
                </select>
              </div>
            </LeadForm>
          </div>
        </div>
      </section>
    </LxShell>
  );
}
