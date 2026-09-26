import Link from "next/link";

const FOOTER_COLS = [
  { title: "Services", links: [
    { label: "Digital Marketing", href: "/services/digital-marketing" },
    { label: "SEO", href: "/services/seo" },
    { label: "SEM", href: "/services/sem" },
    { label: "Website Development", href: "/services/website-development" },
    { label: "AI Automation", href: "/services/ai-automation" },
    { label: "AI Training", href: "/services/ai-training" },
    { label: "Market Research", href: "/services/market-research" },
    { label: "GEO", href: "/services/geo" },
  ]},
  { title: "Company", links: [
    { label: "About", href: "/about" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/unexusai/" },
    { label: "Instagram", href: "https://www.instagram.com/unexusai" },
    { label: "Facebook", href: "https://www.facebook.com/unexusai" },
  ]},
  { title: "Work with us", links: [
    { label: "Get a Free Audit", href: "/audit" },
    { label: "Book a Call", href: "/book" },
    { label: "Get a Quote", href: "/quote" },
    { label: "Resources", href: "/resources" },
  ]},
];

const LEGAL = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms-of-service" },
  { label: "Cookie Policy", href: "/cookie-policy" },
];

const MARQUEE_ITEMS = ["Digital Marketing", "AI Automation", "Website Development", "AI Training", "Market Research", "Growth Strategy", "SEO & GEO", "Paid Media"];

/** Redesign-2 footer: same links and copy as the site footer, ink panel. */
export default function LxFooter() {
  const strip = (hidden?: boolean) => (
    <div className="lx-foot__strip" aria-hidden={hidden || undefined}>
      {MARQUEE_ITEMS.map((m) => (
        <span key={m}>{m}<i aria-hidden="true" /></span>
      ))}
    </div>
  );
  return (
    <footer className="lx-foot">
      <div className="lx-foot__band">
        <div className="lx-foot__track">
          {strip()}
          {strip(true)}
        </div>
      </div>
      <div className="lx-wrap">
        <div className="lx-foot__grid">
          <div className="lx-foot__brand">
            <Link href="/" className="lx-foot__logo">Unexus <span>AI</span></Link>
            <p>Digital marketing, web development, and AI — run by one team that actually talks to itself.</p>
            <a href="/book" className="lx-btn lx-btn--primary">Book a Call</a>
          </div>
          {FOOTER_COLS.map((col) => (
            <div key={col.title}>
              <div className="lx-foot__h">{col.title}</div>
              <ul>
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      target={l.href.startsWith("http") ? "_blank" : undefined}
                      rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="lx-foot__legal">
          <span>© {new Date().getFullYear()} Unexus AI. All rights reserved.</span>
          <div>
            {LEGAL.map((l) => <a key={l.label} href={l.href}>{l.label}</a>)}
          </div>
        </div>
        <div className="lx-foot__mark" aria-hidden="true">
          {"unexusai.".split("").map((ch, i) => <span key={i} style={{ ["--i" as string]: i }}>{ch}</span>)}
        </div>
      </div>
    </footer>
  );
}
