import Nav from "@/components/layout/Nav";
import LxFooter from "@/components/lx/LxFooter";
import { SERVICES, CLIENTS } from "@/lib/constants";
import { INDUSTRIES } from "@/components/sections/IndustriesSection";
import { getSection } from "@/lib/cms";
import {
  HOME_HERO_DEFAULTS,
  HOME_SERVICES_DEFAULTS,
  SERVICES_CARDS_DEFAULTS,
  HOME_INDUSTRIES_DEFAULTS,
  HOME_WHY_DEFAULTS,
  HOME_PROCESS_DEFAULTS,
  HOME_TESTIMONIALS_DEFAULTS,
} from "@/lib/cms-schema";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { lxFontVars } from "@/components/lx/fonts";
import LxMotion from "@/components/lx/LxMotion";
import UnixiStage from "@/components/lx/UnixiStage";
import IndustryTabs from "@/components/lx/IndustryTabs";
import LxContact from "@/components/lx/LxContact";
import LxScroll from "@/components/lx/LxScroll";
import LxSplit from "@/components/lx/LxSplit";
import "@/components/lx/lx.css";
import "@/components/lx/lx-motion.css";
import "@/components/lx/lx-pages.css";

export function generateMetadata(): Promise<Metadata> {
  return buildMetadata({ path: "/" });
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

// Real client logos that hold up at strip size (the rest are tiny favicons).
const LOGO_STRIP = ["Wentworth House", "Awake Solar", "Rajwada", "Shaadi Emporio", "Café Chennai", "Learning From Ant", "Lilawati Vidya Mandir"];


export default async function HomePage() {
  const [hero, servicesHead, cardsSec, ind, why, proc, testi] = await Promise.all([
    getSection("home.hero", HOME_HERO_DEFAULTS),
    getSection("home.services", HOME_SERVICES_DEFAULTS),
    getSection("services.cards", SERVICES_CARDS_DEFAULTS),
    getSection("home.industries", HOME_INDUSTRIES_DEFAULTS),
    getSection("home.why", HOME_WHY_DEFAULTS),
    getSection("home.process", HOME_PROCESS_DEFAULTS),
    getSection("home.testimonials", HOME_TESTIMONIALS_DEFAULTS),
  ]);
  const cards = cardsSec.items as { title: string; desc: string }[];
  const services = SERVICES.map((s) => {
    const o = cards?.find((c) => c.title === (s.cardTitle ?? s.title)) ?? cards?.find((c) => c.title === s.title);
    return { name: o?.title || s.cardTitle || s.title, desc: o?.desc || s.desc, href: s.href, img: SERVICE_IMG[s.title] };
  });
  const logos = LOGO_STRIP.map((n) => CLIENTS.find((c) => c.name === n)).filter((c) => c?.logo);

  return (
    <>
      <Nav />
      <div className={`lx ${lxFontVars}`}>
        <LxMotion />
        <LxScroll />
        <main>
          {/* ── Hero ─────────────────────────────────────────────────────── */}
          <section className="lx-wrap lx-hero">
            <div className="lx-hero__copy">
              <h1 className="lx-h1 lx-words">
                <LxSplit text={hero.headlineFixed} />{" "}
                <span className="lx-accent lx-rotor lx-rotor--in">
                  {hero.rotatingLines.map((line: string, k: number) => (
                    <span key={line} style={{ ["--k" as string]: k }}>
                      {line}
                    </span>
                  ))}
                </span>
              </h1>
              <p className="lx-lede lx-enter" style={{ ["--d" as string]: "120ms" }}>
                {hero.sub}
              </p>
              <div className="lx-ctas lx-enter" style={{ ["--d" as string]: "220ms" }}>
                <a href="#contact" className="lx-btn lx-btn--primary">{hero.ctaPrimary}</a>
                <a href="/book" className="lx-btn lx-btn--ghost">{hero.ctaSecondary}</a>
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
                <div className="lx-logos__track">
                  {logos.map((c) => (
                    <img key={c!.name} src={c!.logo} alt={c!.name} loading="lazy" />
                  ))}
                  {logos.map((c) => (
                    <img key={`${c!.name}-2`} src={c!.logo} alt="" aria-hidden="true" loading="lazy" />
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ── How it connects + services ─────────────────────────────── */}
          <section className="lx-sec">
            <div className="lx-wrap">
              <div className="lx-connect">
                <div className="lx-connect__copy" data-lx-reveal>
                  <h2 className="lx-h2" data-lx-fill><LxSplit text={servicesHead.heading} /></h2>
                  <p className="lx-lede">{servicesHead.intro}</p>
                </div>
                <div className="lx-flow" aria-hidden="true">
                  <div className="lx-flow__in">
                    <div className="lx-chip">SEO <span>Google search</span></div>
                    <div className="lx-chip">GEO <span>AI answers</span></div>
                    <div className="lx-chip">Google &amp; Meta Ads <span>Paid reach</span></div>
                    <div className="lx-chip">Website <span>Turns visits into leads</span></div>
                  </div>
                  <svg viewBox="0 0 120 240">
                    <g fill="none" stroke="#4f46e5" strokeWidth="1.5" opacity="0.55">
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

              <div className="lx-svc">
                {services.map((s, i) => (
                  <a key={s.href} href={s.href} className={i === 0 ? "is-lead lx-spot" : "lx-spot"} data-lx-tilt>
                    <span className="lx-go" aria-hidden="true">↗</span>
                    {s.img && <img src={s.img} alt="" loading="lazy" />}
                    <div>
                      <h3 className="lx-h3">{s.name}</h3>
                      <p>{s.desc}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </section>

          {/* ── Industries ──────────────────────────────────────────────── */}
          <section className="lx-sec lx-sec--white">
            <div className="lx-wrap">
              <div data-lx-reveal style={{ display: "grid", gap: "1.2rem" }}>
                <h2 className="lx-h2" data-lx-fill><LxSplit text={ind.title} /></h2>
                <p className="lx-lede">{ind.intro}</p>
              </div>
              <IndustryTabs items={INDUSTRIES.map((i) => ({ name: i.name, segments: i.segments, cta: i.cta, points: i.points }))} />
            </div>
          </section>

          {/* ── Why ─────────────────────────────────────────────────────── */}
          <section className="lx-sec">
            <div className="lx-wrap">
              <div data-lx-reveal style={{ display: "grid", gap: "1.2rem" }}>
                <h2 className="lx-h2" data-lx-fill><LxSplit text={why.title} /></h2>
                <p className="lx-lede">{why.intro}</p>
              </div>
              <div className="lx-why">
                {why.reasons.map((r: { title: string; desc: string }) => (
                  <div key={r.title} className="lx-spot">
                    <h3 className="lx-h3">{r.title}</h3>
                    <p>{r.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── Process ─────────────────────────────────────────────────── */}
          <section className="lx-sec lx-sec--white">
            <div className="lx-wrap">
              <div data-lx-reveal style={{ display: "grid", gap: "1.2rem" }}>
                <h2 className="lx-h2" style={{ maxWidth: "52rem" }} data-lx-fill><LxSplit text={proc.title} /></h2>
                <p className="lx-lede">{proc.intro}</p>
              </div>
              <ol className="lx-steps">
                {proc.steps.map((s: { feeling: string; title: string; desc: string; action: string }, i: number) => (
                  <li key={s.title} data-lx-reveal style={{ ["--d" as string]: `${i * 80}ms` }}>
                    <small>{s.feeling}</small>
                    <h3>{s.title}</h3>
                    <p>{s.desc}</p>
                    <p><strong style={{ color: "var(--lx-ink-2)" }}>What you do:</strong> {s.action}</p>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* ── Testimonials ────────────────────────────────────────────── */}
          <section className="lx-sec">
            <div className="lx-wrap">
              <div data-lx-reveal style={{ display: "grid", gap: "1.2rem" }}>
                <h2 className="lx-h2" data-lx-fill><LxSplit text={testi.title} /></h2>
                <p className="lx-lede">{testi.intro}</p>
              </div>
              <div className="lx-quotes">
                {testi.items.map((t: { quote: string; name: string; role: string; company?: string }) => (
                  <figure key={t.quote} className="lx-quote" style={{ background: "#fff" }}>
                    <blockquote>“{t.quote}”</blockquote>
                    <figcaption>
                      <span aria-hidden="true">{t.name.charAt(0)}</span>
                      <div>
                        <b>{t.name}</b>
                        <small>{t.role}{t.company ? `, ${t.company}` : ""}</small>
                      </div>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </section>

          <LxContact />
        </main>
        <LxFooter />
      </div>
    </>
  );
}
