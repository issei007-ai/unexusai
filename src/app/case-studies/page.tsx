import LxShell from "@/components/lx/LxShell";
import LxPageHero from "@/components/lx/LxPageHero";
import LxCaseGrid from "@/components/lx/LxCaseGrid";
import LxContact from "@/components/lx/LxContact";
import { getSection } from "@/lib/cms";
import { CASESTUDIES_PAGE_DEFAULTS, CASESTUDIES_CASES_DEFAULTS } from "@/lib/cms-schema";
import type { Metadata } from "next";
import { sectionMetadata } from "@/lib/seo";

export function generateMetadata(): Promise<Metadata> {
  return sectionMetadata({
    key: "casestudies.page",
    defaults: CASESTUDIES_PAGE_DEFAULTS,
    path: "/case-studies",
    fallbackTitle: "Case Studies",
    fallbackDescription: "Real problems, real work, real results — across retail, hospitality, real estate, healthcare, and startups in the UAE and India.",
  });
}

export default async function CaseStudiesPage() {
  const page = await getSection("casestudies.page", CASESTUDIES_PAGE_DEFAULTS);
  const raw = await getSection("casestudies.cases", CASESTUDIES_CASES_DEFAULTS);

  // Normalise metrics from "value | label" lines into { value, label }.
  const cases = raw.items.map((c) => ({
    category: c.category,
    flag: c.flag,
    headline: c.headline,
    quote: c.quote,
    tags: c.tags as string[],
    metrics: (c.metrics as string[]).map((m) => {
      const [value, ...rest] = m.split("|");
      return { value: (value || "").trim(), label: rest.join("|").trim() };
    }),
  }));
  const orbit = cases.flatMap((c) => c.metrics.slice(0, 1).map((m) => `${m.value} ${m.label}`)).slice(0, 6);

  return (
    <LxShell>
      <LxPageHero eyebrow={page.heroEyebrow} title={page.heroTitle} subtitle={page.heroSubtitle} orbit={orbit}>
        <a href="#contact" className="lx-btn lx-btn--primary">Start your story</a>
      </LxPageHero>

      <LxCaseGrid cases={cases} />

      <LxContact heading={page.ctaHeading} body={page.ctaBody} />
    </LxShell>
  );
}
