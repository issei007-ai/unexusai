import LxShell from "@/components/lx/LxShell";
import LxPageHero from "@/components/lx/LxPageHero";
import LxSplit from "@/components/lx/LxSplit";
import LxContact from "@/components/lx/LxContact";
import { SERVICES } from "@/lib/constants";
import { getSection } from "@/lib/cms";
import { SERVICES_OVERVIEW_DEFAULTS, SERVICES_CARDS_DEFAULTS } from "@/lib/cms-schema";
import type { Metadata } from "next";
import { sectionMetadata } from "@/lib/seo";

export function generateMetadata(): Promise<Metadata> {
  return sectionMetadata({
    key: "services.overview",
    defaults: SERVICES_OVERVIEW_DEFAULTS,
    path: "/services",
    fallbackTitle: "Services",
    fallbackDescription: "Digital marketing, SEO, GEO, website development, AI automation, AI training, and market research — seven services run by one connected team.",
  });
}

const SERVICE_IMG: Record<string, string> = {
  "Digital Marketing": "/services/digital-marketing.png",
  "SEO — Search Engine Optimisation": "/services/seo.png",
  "SEM — Search Engine Marketing": "/services/sem.png",
  "GEO — Generative Engine Optimization": "/services/geo.png",
  "Website Development": "/services/website-development.png",
  "AI Automation": "/services/ai-automation.png",
  "AI Training": "/services/ai-training.png",
  "Market Research": "/services/market-research.png",
};

export default async function ServicesPage() {
  const c = await getSection("services.overview", SERVICES_OVERVIEW_DEFAULTS);
  const whyCards = Array.isArray(c.whyCards) ? c.whyCards : [];
  const cards = (await getSection("services.cards", SERVICES_CARDS_DEFAULTS)).items as { title: string; desc: string }[];
  const services = SERVICES.map((s) => {
    const o = cards?.find((x) => x.title === (s.cardTitle ?? s.title)) ?? cards?.find((x) => x.title === s.title);
    return { name: o?.title || s.cardTitle || s.title, desc: o?.desc || s.desc, href: s.href, img: SERVICE_IMG[s.title] };
  });

  return (
    <LxShell>
      <LxPageHero
        eyebrow={c.heroEyebrow}
        title={c.heroTitle}
        subtitle={c.heroSubtitle}
        orbit={SERVICES.map((s) => s.title.split(" — ")[0])}
      >
        <a href={c.heroPrimaryHref} className="lx-btn lx-btn--primary">{c.heroPrimaryLabel}</a>
        <a href={c.heroSecondaryHref} className="lx-btn lx-btn--ghost">{c.heroSecondaryLabel}</a>
      </LxPageHero>

      <section className="lx-sec lx-sec--white">
        <div className="lx-wrap">
          <div className="lx-split lx-split--end" data-lx-reveal>
            <div className="lx-split__head">
              <span className="lx-badge">What we do</span>
              <h2 className="lx-h2" data-lx-fill><LxSplit text={c.gridHeading} /></h2>
            </div>
            <p className="lx-lede">{c.gridIntro}</p>
          </div>
          <div className="lx-svc">
            {services.map((s, i) => (
              <a key={s.href} href={s.href} className={i === 0 ? "is-lead lx-spot" : "lx-spot"} data-lx-tilt>
                <span className="lx-go" aria-hidden="true">↗</span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {s.img && <img src={s.img} alt={s.name} loading="lazy" />}
                <div>
                  <h3 className="lx-h3">{s.name}</h3>
                  <p>{s.desc}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Why Unexus AI */}
      <section className="lx-sec">
        <div className="lx-wrap">
          <div className="lx-head" data-lx-reveal>
            <span className="lx-badge">{c.whyBadge}</span>
            <h2 className="lx-h2" data-lx-fill><LxSplit text={c.whyTitle} /></h2>
          </div>
          <div className={`lx-why${whyCards.length === 6 ? " lx-why--six" : ""}`}>
            {whyCards.map((item: { title: string; desc: string }) => (
              <div key={item.title} className="lx-spot">
                <h3 className="lx-h3">{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <LxContact
        heading="Not sure where to start?"
        body="Tell us a bit about your business and we'll help you work out where to start — it's often not the thing people expect."
      />
    </LxShell>
  );
}
