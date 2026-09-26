import Image from "next/image";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import type { ServiceTemplateProps } from "@/components/sections/ServicePageTemplate";
import { PROCESS_STEPS, WHY_US } from "@/lib/constants";
import { faqJsonLd, serviceJsonLd, breadcrumbJsonLd, SITE_URL } from "@/lib/seo";
import { SERVICE_IMAGE_SIZES } from "@/lib/service-image-sizes";
import { lxFontVars } from "@/components/lx/fonts";
import LxMotion from "@/components/lx/LxMotion";
import SerpClimb from "@/components/lx/SerpClimb";
import SvcOrbit from "@/components/lx/SvcOrbit";
import LxScroll from "@/components/lx/LxScroll";
import LxSplit from "@/components/lx/LxSplit";
import LxContact from "@/components/lx/LxContact";
import "@/components/lx/lx.css";
import "@/components/lx/lx-motion.css";
import "@/components/lx/lx-svc.css";

/** Content-doc image at its natural ratio, never cropped. */
function Figure({ img, maxH = 520 }: { img?: { src: string; alt: string }; maxH?: number }) {
  if (!img?.src) return null;
  const size = SERVICE_IMAGE_SIZES[img.src] ?? { w: 16, h: 9 };
  const maxW = Math.round((maxH * size.w) / size.h);
  return (
    <figure className="lx-fig" style={{ maxWidth: `min(100%, ${maxW}px)` }}>
      <Image
        src={img.src}
        alt={img.alt}
        width={size.w}
        height={size.h}
        sizes={`(max-width: 768px) 100vw, ${Math.min(maxW, 1100)}px`}
        quality={90}
        style={{ display: "block", width: "100%", height: "auto" }}
      />
    </figure>
  );
}

/**
 * Redesign-2 service page. Same props (so the same CMS content and JSON-LD)
 * as ServicePageTemplate; only the presentation differs.
 */
export default function LxServicePage({
  badge,
  headline,
  body,
  specialisms,
  primaryCta = { label: "Get a Custom Quote", href: "#contact" },
  secondaryCta = { label: "Book a Call →", href: "#contact" },
  heroNote,
  includedTitle = "Here's what's actually in scope",
  includedIntro,
  subServices,
  approach = PROCESS_STEPS.map((s) => ({ title: s.title, desc: s.desc })),
  approachTitle = "How a project usually goes",
  approachIntro,
  benefits,
  benefitsTitle = "The benefits",
  benefitsIntro,
  useCases,
  useCasesTitle = "Where it applies",
  useCasesIntro,
  whyUs = WHY_US.map((w) => w.title),
  whyTitle = "Why people choose us for this",
  whyIntro,
  faqs,
  faqIntro,
  closing,
  sectionImages,
  serviceName,
  servicePath,
}: ServiceTemplateProps) {
  return (
    <>
      {faqs.length > 0 && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }} />
      )}
      {serviceName && servicePath && (
        <>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(
                serviceJsonLd({ name: serviceName, description: body, url: `${SITE_URL}${servicePath}`, provider: "Unexus AI" }),
              ),
            }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(
                breadcrumbJsonLd([
                  { name: "Home", url: SITE_URL },
                  { name: "Services", url: `${SITE_URL}/services` },
                  { name: serviceName, url: `${SITE_URL}${servicePath}` },
                ]),
              ),
            }}
          />
        </>
      )}
      <Nav />
      <div className={`lx ${lxFontVars}`}>
        <LxMotion />
        <LxScroll />
        <main>
          {/* ── Hero ─────────────────────────────────────────────────────── */}
          <section className="lx-wrap lx-shero">
            <div className="lx-hero__copy">
              <span className="lx-badge lx-enter">{badge}</span>
              <h1 className="lx-h1 lx-h1--svc lx-words"><LxSplit text={headline} /></h1>
              <p className="lx-lede lx-enter" style={{ ["--d" as string]: "140ms" }}>{body}</p>
              <div className="lx-ctas lx-enter" style={{ ["--d" as string]: "220ms" }}>
                <a href={primaryCta.href} className="lx-btn lx-btn--primary">{primaryCta.label}</a>
                <a href={secondaryCta.href} className="lx-btn lx-btn--ghost">{secondaryCta.label}</a>
              </div>
              <ul className="lx-tags lx-enter" style={{ ["--d" as string]: "300ms" }}>
                {specialisms.map((s) => <li key={s}>{s}</li>)}
              </ul>
            </div>
            <div className="lx-enter lx-shero__vis" style={{ ["--d" as string]: "180ms" }}>
              {servicePath === "/services/seo" ? (
                <>
                  <SerpClimb queries={specialisms} />
                  <span className="lx-stage__note" style={{ position: "static", display: "block", marginTop: "0.8rem" }}>Example results page</span>
                </>
              ) : (
                <SvcOrbit icon={`/services/${(servicePath ?? "").split("/").pop()}.png`} items={specialisms.slice(0, 7)} />
              )}
            </div>
          </section>

          {heroNote && (
            <div className="lx-wrap">
              <p className="lx-note" data-lx-reveal>{heroNote}</p>
            </div>
          )}

          {/* ── What's included ─────────────────────────────────────────── */}
          <section className="lx-sec">
            <div className="lx-wrap">
              <div className="lx-head" data-lx-reveal>
                <h2 className="lx-h2" data-lx-fill><LxSplit text={includedTitle} /></h2>
                {includedIntro && <p className="lx-lede">{includedIntro}</p>}
              </div>
              <Figure img={sectionImages?.included} />
              <div className="lx-inc">
                {subServices.map((s) => (
                  <div key={s.title} className="lx-spot">
                    <h3 className="lx-h3">{s.title}</h3>
                    <p>{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── Process ─────────────────────────────────────────────────── */}
          <section className="lx-sec lx-sec--white">
            <div className="lx-wrap">
              <div className="lx-rail-pin">
              <div className="lx-head" data-lx-reveal>
                <h2 className="lx-h2" data-lx-fill><LxSplit text={approachTitle} /></h2>
                {approachIntro && <p className="lx-lede">{approachIntro}</p>}
              </div>
              <ol className="lx-rail">
                {approach.map((s) => (
                  <li key={s.title}>
                    <h3>{s.title}</h3>
                    <p>{s.desc}</p>
                  </li>
                ))}
              </ol>
              </div>
              <div style={{ marginTop: "clamp(2.5rem, 5vw, 4rem)" }}>
                <Figure img={sectionImages?.approach} />
              </div>
            </div>
          </section>

          {/* ── Benefits ────────────────────────────────────────────────── */}
          {benefits && benefits.length > 0 && (
            <section className="lx-sec">
              <div className="lx-wrap lx-bene">
                <div data-lx-reveal>
                  <h2 className="lx-h2" data-lx-fill><LxSplit text={benefitsTitle} /></h2>
                  {benefitsIntro && <p className="lx-lede" style={{ marginTop: "1.2rem" }}>{benefitsIntro}</p>}
                  <div style={{ marginTop: "2rem" }}>
                    <Figure img={sectionImages?.benefits} maxH={380} />
                  </div>
                </div>
                <ul className="lx-checks">
                  {benefits.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            </section>
          )}

          {/* ── Industries ──────────────────────────────────────────────── */}
          {useCases && useCases.length > 0 && (
            <section className="lx-sec lx-sec--accent">
              <div className="lx-wrap">
                <div className="lx-head" data-lx-reveal>
                  <h2 className="lx-h2" data-lx-fill><LxSplit text={useCasesTitle} /></h2>
                  {useCasesIntro && <p className="lx-lede">{useCasesIntro}</p>}
                </div>
                <ul className="lx-pills">
                  {useCases.map((u) => (
                    <li key={u}>{u}</li>
                  ))}
                </ul>
                <div style={{ marginTop: "clamp(2.5rem, 5vw, 4rem)" }}>
                  <Figure img={sectionImages?.useCases} />
                </div>
              </div>
            </section>
          )}

          {/* ── Why ─────────────────────────────────────────────────────── */}
          <section className="lx-sec lx-sec--white">
            <div className="lx-wrap lx-bene">
              <div data-lx-reveal>
                <h2 className="lx-h2" data-lx-fill><LxSplit text={whyTitle} /></h2>
                <p className="lx-lede" style={{ marginTop: "1.2rem" }}>
                  {whyIntro ||
                    "We get up to speed quickly, we're straightforward about what's working and what isn't, and we care more about your results than our own report."}
                </p>
                <div style={{ marginTop: "2rem" }}>
                  <Figure img={sectionImages?.why} maxH={380} />
                </div>
              </div>
              <ul className="lx-checks">
                {whyUs.map((w) => (
                  <li key={w}>{w}</li>
                ))}
              </ul>
            </div>
          </section>

          {/* ── FAQ ─────────────────────────────────────────────────────── */}
          <section className="lx-sec">
            <div className="lx-wrap lx-faq">
              <div data-lx-reveal>
                <h2 className="lx-h2" data-lx-fill><LxSplit text="Common questions" /></h2>
                {faqIntro && <p className="lx-lede" style={{ marginTop: "1.2rem" }}>{faqIntro}</p>}
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

          {closing && (
            <section className="lx-wrap" style={{ paddingBottom: "clamp(3rem, 6vw, 5rem)" }}>
              <p className="lx-closing">{closing}</p>
            </section>
          )}

          <LxContact
            heading="Ready to get started?"
            body="Tell us roughly what you need and we'll put together a proposal within 48 hours — no long back-and-forth before that."
            defaultNeed={serviceName}
          />
        </main>
      </div>
      <Footer />
    </>
  );
}
