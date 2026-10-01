import Image from "next/image";
import Nav from "@/components/layout/Nav";
import LxFooter from "@/components/lx/LxFooter";
import { SERVICES } from "@/lib/constants";
import { getSection } from "@/lib/cms";
import {
  HOME_CLIENTS_DEFAULTS,
  HOME2_META_DEFAULTS,
  HOME2_HERO_DEFAULTS,
  HOME2_STATS_DEFAULTS,
  HOME2_CHALLENGES_DEFAULTS,
  HOME2_SYSTEM_DEFAULTS,
  HOME2_SERVICES_DEFAULTS,
  HOME2_GEO_DEFAULTS,
  HOME2_INDUSTRIES_DEFAULTS,
  HOME2_RESULTS_DEFAULTS,
  HOME2_WHY_DEFAULTS,
  HOME2_PROCESS_DEFAULTS,
  HOME2_TESTIMONIALS_DEFAULTS,
  HOME2_STORY_DEFAULTS,
  HOME2_FAQ_DEFAULTS,
  HOME2_CTA_DEFAULTS,
} from "@/lib/cms-schema";
import type { Metadata } from "next";
import { buildMetadata, faqJsonLd, SITE_URL, ORG_ID, WEBSITE_ID, FOUNDER_ID, logoJsonLd } from "@/lib/seo";
import { lxFontVars } from "@/components/lx/fonts";
import LxMotion from "@/components/lx/LxMotion";
import UnixiStage from "@/components/lx/UnixiStage";
import LxContact from "@/components/lx/LxContact";
import LxClientChip from "@/components/lx/LxClientChip";
import type { Client } from "@/lib/constants";
import LxScroll from "@/components/lx/LxScroll";
import LxSplit from "@/components/lx/LxSplit";
import "@/components/lx/lx.css";
import "@/components/lx/lx-motion.css";
import "@/components/lx/lx-pages.css";

export async function generateMetadata(): Promise<Metadata> {
  const m = await getSection("home2.meta", HOME2_META_DEFAULTS);
  return buildMetadata({ title: m.metaTitle, description: m.metaDescription, path: "/", absoluteTitle: true });
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

type TitleDesc = { title: string; desc: string };

/**
 * "Active in 5 Countries and Markets" -> small lead-in, the number large, then
 * the label, so the full sentence still reads in order. Lines without a number
 * show as plain text.
 */
function Stat({ text }: { text: string }) {
  const m = text.match(/^(.*?)(\d+\+?)(.*)$/);
  if (!m) return <div><b className="lx-stat__word">{text}</b></div>;
  return (
    <div>
      {m[1].trim() && <small>{m[1].trim()}</small>}
      <b>{m[2]}</b>
      <span>{m[3].trim()}</span>
    </div>
  );
}

/**
 * The homepage's schema.org graph. The Organization and WebSite nodes come from
 * the root layout (same @ids), so this only adds what is homepage-specific.
 */
function homeJsonLd(opts: { title: string; description: string; services: { name: string; href: string }[]; faqs: { q: string; a: string }[] }) {
  const faq = faqJsonLd(opts.faqs);
  return {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Person", "@id": FOUNDER_ID, name: "Richa Gupta", jobTitle: "Founder", worksFor: { "@id": ORG_ID } },
      {
        "@type": "ProfessionalService",
        "@id": `${SITE_URL}/#professional-service`,
        name: "Unexus AI",
        url: `${SITE_URL}/`,
        image: logoJsonLd().url,
        logo: logoJsonLd(),
        telephone: "+971501257204",
        email: "richa@unexusai.com",
        description: "AI-powered digital growth partner providing digital marketing, SEO, GEO, paid media, website development, AI automation, AI training, and market research services.",
        provider: { "@id": ORG_ID },
        address: { "@type": "PostalAddress", addressLocality: "Dubai", addressCountry: "AE" },
        areaServed: "Worldwide",
        sameAs: ["https://www.facebook.com/unexusai", "https://www.instagram.com/unexusai", "https://www.linkedin.com/company/unexusai/"],
        hasOfferCatalog: { "@id": `${SITE_URL}/#service-catalog` },
      },
      {
        "@type": "OfferCatalog",
        "@id": `${SITE_URL}/#service-catalog`,
        name: "Unexus AI Digital Growth Services",
        itemListElement: opts.services.map((s) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: s.name, url: `${SITE_URL}${s.href}`, provider: { "@id": ORG_ID } },
        })),
      },
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/#webpage`,
        url: `${SITE_URL}/`,
        name: opts.title,
        description: opts.description,
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": ORG_ID },
        mainEntity: { "@id": `${SITE_URL}/#professional-service` },
        breadcrumb: { "@id": `${SITE_URL}/#breadcrumb` },
        primaryImageOfPage: logoJsonLd(),
        inLanguage: "en",
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${SITE_URL}/#breadcrumb`,
        itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` }],
      },
      { "@type": "FAQPage", "@id": `${SITE_URL}/#faq`, mainEntity: faq.mainEntity },
    ],
  };
}

export default async function HomePage() {
  const [meta, hero, clientsSec, stats, chal, system, svc, geo, ind, results, why, proc, testi, story, faq, cta] = await Promise.all([
    getSection("home2.meta", HOME2_META_DEFAULTS),
    getSection("home2.hero", HOME2_HERO_DEFAULTS),
    getSection("home.clients", HOME_CLIENTS_DEFAULTS),
    getSection("home2.stats", HOME2_STATS_DEFAULTS),
    getSection("home2.challenges", HOME2_CHALLENGES_DEFAULTS),
    getSection("home2.system", HOME2_SYSTEM_DEFAULTS),
    getSection("home2.services", HOME2_SERVICES_DEFAULTS),
    getSection("home2.geo", HOME2_GEO_DEFAULTS),
    getSection("home2.industries", HOME2_INDUSTRIES_DEFAULTS),
    getSection("home2.results", HOME2_RESULTS_DEFAULTS),
    getSection("home2.why", HOME2_WHY_DEFAULTS),
    getSection("home2.process", HOME2_PROCESS_DEFAULTS),
    getSection("home2.testimonials", HOME2_TESTIMONIALS_DEFAULTS),
    getSection("home2.story", HOME2_STORY_DEFAULTS),
    getSection("home2.faq", HOME2_FAQ_DEFAULTS),
    getSection("home2.cta", HOME2_CTA_DEFAULTS),
  ]);
  const cards = (svc.items ?? []) as TitleDesc[];
  const services = SERVICES.map((s, i) => ({
    name: cards[i]?.title || s.cardTitle || s.title,
    desc: cards[i]?.desc || s.desc,
    href: s.href,
    img: SERVICE_IMG[s.title],
  }));
  const clients = clientsSec.items as Client[];
  const faqs = (faq.items ?? []) as { q: string; a: string }[];
  const ld = homeJsonLd({ title: meta.metaTitle, description: meta.metaDescription, services, faqs });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <Nav />
      <div className={`lx ${lxFontVars}`}>
        <LxMotion />
        <LxScroll />
        <main>
          {/* ── Hero ─────────────────────────────────────────────────────── */}
          <section className="lx-wrap lx-hero">
            <div className="lx-hero__copy">
              <h1 className="lx-h1 lx-h1--long lx-words">
                <LxSplit text={hero.headline} />
              </h1>
              <p className="lx-lede lx-enter" style={{ ["--d" as string]: "120ms" }}>
                {hero.sub}
              </p>
              {hero.prompt && (
                <p className="lx-hero__prompt lx-enter" style={{ ["--d" as string]: "180ms" }}>{hero.prompt}</p>
              )}
              <div className="lx-ctas lx-enter" style={{ ["--d" as string]: "220ms" }}>
                <a href="#contact" className="lx-btn lx-btn--primary">{hero.ctaPrimary}</a>
                <a href="/services" className="lx-btn lx-btn--ghost">{hero.ctaSecondary}</a>
              </div>
            </div>
            <div className="lx-enter" style={{ ["--d" as string]: "150ms" }}>
              <UnixiStage />
            </div>
          </section>

          {/* ── Logos ────────────────────────────────────────────────────── */}
          <section className="lx-logos">
            <div className="lx-wrap lx-logos__in">
              <p>{hero.trustLabel}</p>
              <div className="lx-logos__row">
                <div className="lx-logos__track lx-logos__track--chips">
                  {clients.map((c, i) => (
                    <LxClientChip key={c.name} client={c} index={i} />
                  ))}
                  {clients.map((c, i) => (
                    <LxClientChip key={`${c.name}-2`} client={c} index={i} hidden />
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ── Experience ───────────────────────────────────────────────── */}
          <section className="lx-sec">
            <div className="lx-wrap">
              <div data-lx-reveal style={{ display: "grid", gap: "1.2rem" }}>
                <h2 className="lx-h2" data-lx-fill><LxSplit text={stats.title} /></h2>
                <p className="lx-lede">{stats.intro}</p>
              </div>
            </div>
          </section>
          <section className="lx-stats" aria-label={stats.title}>
            <div className="lx-wrap lx-stats__in lx-stats__in--five">
              {(stats.items as string[]).map((t) => <Stat key={t} text={t} />)}
            </div>
          </section>

          {/* ── Challenges ───────────────────────────────────────────────── */}
          <section className="lx-sec lx-sec--white">
            <div className="lx-wrap lx-split2">
              <div data-lx-reveal style={{ display: "grid", gap: "1.2rem", alignContent: "start" }}>
                <h2 className="lx-h2" data-lx-fill><LxSplit text={chal.title} /></h2>
                <p className="lx-lede">{chal.intro}</p>
              </div>
              <div data-lx-reveal>
                <ul className="lx-chal">
                  {(chal.items as string[]).map((t) => <li key={t}>{t}</li>)}
                </ul>
                {chal.solution && <p className="lx-chal__fix">{chal.solution}</p>}
              </div>
            </div>
          </section>

          {/* ── Growth system + services ─────────────────────────────────── */}
          <section className="lx-sec">
            <div className="lx-wrap">
              <div className="lx-connect">
                <div className="lx-connect__copy" data-lx-reveal>
                  <h2 className="lx-h2" data-lx-fill><LxSplit text={system.title} /></h2>
                  {(system.paragraphs as string[]).map((p) => <p key={p} className="lx-lede">{p}</p>)}
                </div>
                <div className="lx-flow" aria-hidden="true">
                  <div className="lx-flow__in">
                    <div className="lx-chip">SEO <span>Google search</span></div>
                    <div className="lx-chip">GEO <span>AI answers</span></div>
                    <div className="lx-chip">Google &amp; Meta Ads <span>Paid reach</span></div>
                    <div className="lx-chip">Website <span>Turns visits into leads</span></div>
                  </div>
                  <svg viewBox="0 0 120 240" preserveAspectRatio="none">
                    <g fill="none" stroke="#4f46e5" strokeWidth="1.5" opacity="0.55" vectorEffect="non-scaling-stroke">
                      <path id="lx-p1" d="M0 28 C 60 28, 60 120, 120 120" />
                      <path id="lx-p2" d="M0 89 C 60 89, 60 120, 120 120" />
                      <path id="lx-p3" d="M0 151 C 60 151, 60 120, 120 120" />
                      <path id="lx-p4" d="M0 212 C 60 212, 60 120, 120 120" />
                    </g>
                    {[1, 2, 3, 4].map((n) => (
                      <circle key={n} r="4" className="lx-flow__dot">
                        <animateMotion dur="2.4s" begin={`${n * 0.45}s`} repeatCount="indefinite">
                          <mpath href={`#lx-p${n}`} />
                        </animateMotion>
                      </circle>
                    ))}
                  </svg>
                  <div className="lx-flow__out">
                    <span>One team</span>
                    <b>Leads in your inbox</b>
                    <span>WhatsApp, email and your dashboard</span>
                  </div>
                </div>
              </div>

              <h2 className="lx-h2" data-lx-reveal style={{ marginTop: "clamp(4rem, 8vw, 6rem)" }}>{svc.title}</h2>
              <div className="lx-svc">
                {services.map((s, i) => (
                  <a key={s.href} href={s.href} className={i === 0 ? "is-lead lx-spot" : "lx-spot"} data-lx-tilt>
                    <span className="lx-go" aria-hidden="true">↗</span>
                    {s.img && (
                      <span className="lx-svc__art" style={{ ["--art" as string]: `url(/_next/image?url=${encodeURIComponent(s.img)}&w=128&q=75)`, ["--k" as string]: i }}>
                        <Image src={s.img} alt="" width={156} height={156} sizes="(max-width: 700px) 88px, 156px" />
                      </span>
                    )}
                    <div>
                      <h3 className="lx-h3">{s.name}</h3>
                      <p>{s.desc}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </section>

          {/* ── AI search (GEO) ──────────────────────────────────────────── */}
          <section className="lx-sec lx-sec--ink">
            <div className="lx-wrap lx-split2">
              <h2 className="lx-h2" data-lx-reveal><LxSplit text={geo.title} /></h2>
              <div className="lx-prose" data-lx-reveal>
                {(geo.paragraphs as string[]).map((p) => <p key={p}>{p}</p>)}
              </div>
            </div>
          </section>

          {/* ── Industries ───────────────────────────────────────────────── */}
          <section className="lx-sec lx-sec--white">
            <div className="lx-wrap">
              <div data-lx-reveal style={{ display: "grid", gap: "1.2rem" }}>
                <h2 className="lx-h2" data-lx-fill><LxSplit text={ind.title} /></h2>
                <p className="lx-lede">{ind.intro}</p>
                {ind.lead && <p className="lx-lede" style={{ color: "var(--lx-ink)" }}><strong>{ind.lead}</strong></p>}
              </div>
              <div className="lx-why">
                {(ind.items as TitleDesc[]).map((r) => (
                  <div key={r.title} className="lx-spot">
                    <h3 className="lx-h3">{r.title}</h3>
                    <p>{r.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── Results ──────────────────────────────────────────────────── */}
          <section className="lx-sec">
            <div className="lx-wrap">
              <div data-lx-reveal style={{ display: "grid", gap: "1.2rem" }}>
                <h2 className="lx-h2" data-lx-fill><LxSplit text={results.title} /></h2>
                <p className="lx-lede">{results.intro}</p>
              </div>
              <div className="lx-four">
                {(results.items as TitleDesc[]).map((r, i) => (
                  <div key={r.title} data-lx-reveal style={{ ["--d" as string]: `${i * 80}ms` }}>
                    <span aria-hidden="true">0{i + 1}</span>
                    <h3 className="lx-h3">{r.title}</h3>
                    <p>{r.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── Why ──────────────────────────────────────────────────────── */}
          <section className="lx-sec lx-sec--white">
            <div className="lx-wrap">
              <h2 className="lx-h2" data-lx-reveal data-lx-fill><LxSplit text={why.title} /></h2>
              <div className="lx-why lx-why--six">
                {(why.items as TitleDesc[]).map((r) => (
                  <div key={r.title} className="lx-spot">
                    <h3 className="lx-h3">{r.title}</h3>
                    <p>{r.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── Process ──────────────────────────────────────────────────── */}
          <section className="lx-sec">
            <div className="lx-wrap">
              <h2 className="lx-h2" style={{ maxWidth: "52rem" }} data-lx-reveal data-lx-fill><LxSplit text={proc.title} /></h2>
              <ol className="lx-steps">
                {(proc.steps as TitleDesc[]).map((s, i) => (
                  <li key={s.title} data-lx-reveal style={{ ["--d" as string]: `${i * 80}ms` }}>
                    <small>Step {i + 1}</small>
                    <h3>{s.title}</h3>
                    <p>{s.desc}</p>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* ── Testimonials ─────────────────────────────────────────────── */}
          <section className="lx-sec lx-sec--white">
            <div className="lx-wrap">
              <h2 className="lx-h2" data-lx-reveal data-lx-fill><LxSplit text={testi.title} /></h2>
              <div className="lx-quotes lx-quotes--three">
                {(testi.items as { quote: string; name: string }[]).map((t) => (
                  <figure key={t.quote} className="lx-quote">
                    <blockquote>“{t.quote}”</blockquote>
                    <figcaption>
                      <span aria-hidden="true">{t.name.charAt(0)}</span>
                      <div><b>{t.name}</b></div>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </section>

          {/* ── Story ────────────────────────────────────────────────────── */}
          <section className="lx-sec">
            <div className="lx-wrap lx-split2">
              <h2 className="lx-h2" data-lx-reveal data-lx-fill><LxSplit text={story.title} /></h2>
              <div className="lx-prose lx-prose--light" data-lx-reveal>
                {(story.paragraphs as string[]).map((p) => <p key={p}>{p}</p>)}
              </div>
            </div>
          </section>

          {/* ── FAQ ──────────────────────────────────────────────────────── */}
          <section className="lx-sec lx-sec--white">
            <div className="lx-wrap lx-faq">
              <div data-lx-reveal>
                <h2 className="lx-h2" data-lx-fill><LxSplit text={faq.title} /></h2>
              </div>
              <div>
                {faqs.map((f, i) => (
                  <details key={f.q} open={i === 0}>
                    <summary>{f.q}</summary>
                    <p>{f.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>

          <LxContact heading={cta.title} body={(cta.paragraphs as string[])[0]}>
            {(cta.paragraphs as string[]).slice(1).map((p) => (
              <p key={p} className="lx-lede" style={{ marginTop: "1rem" }}>{p}</p>
            ))}
            <div className="lx-ctas" style={{ marginTop: "1.6rem" }}>
              <a href="/book" className="lx-btn lx-btn--primary">{cta.ctaPrimary}</a>
              <a href="/contact" className="lx-btn lx-btn--ghost">{cta.ctaSecondary}</a>
            </div>
          </LxContact>
        </main>
        <LxFooter />
      </div>
    </>
  );
}
