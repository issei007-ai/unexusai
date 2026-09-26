import LxShell from "@/components/lx/LxShell";
import LxPageHero from "@/components/lx/LxPageHero";
import LxQuotes from "@/components/lx/LxQuotes";
import LxContact from "@/components/lx/LxContact";
import ClientLogo from "@/components/ui/ClientLogo";
import { CLIENTS } from "@/lib/constants";

import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Portfolio",
    description: "Some of the brands and institutions we've worked with — from schools and D2C brands to enterprise tech.",
    path: "/portfolio",
  });
}

export default function PortfolioPage() {
  return (
    <LxShell>
      <LxPageHero
        eyebrow="Portfolio"
        title="The teams we get to work with"
        subtitle="From schools and D2C brands to enterprise tech, here are some of the people who've trusted us with their growth."
        orbit={CLIENTS.slice(0, 7).map((c) => c.name)}
      />

      <section className="lx-sec lx-sec--white">
        <div className="lx-wrap">
          <div className="lx-grid lx-grid--logos">
            {CLIENTS.map((c, i) => (
              <div key={c.name} className="lx-card lx-card--soft lx-client lx-spot" data-lx-pop>
                <ClientLogo client={c} index={i} size={80} />
                <b>{c.name}</b>
              </div>
            ))}
          </div>
        </div>
      </section>

      <LxQuotes />

      <LxContact
        heading="Want to join them?"
        body="Tell us where things feel stuck right now, and we'll talk through specifically what we'd do about it — no pressure either way."
      />
    </LxShell>
  );
}
