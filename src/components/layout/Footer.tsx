const FOOTER_COLS = [
  {
    title: "Services",
    links: [
      { label: "Digital Marketing", href: "/services/digital-marketing" },
      { label: "Website Development", href: "/services/website-development" },
      { label: "AI Automation", href: "/services/ai-automation" },
      { label: "AI Training", href: "/services/ai-training" },
      { label: "Market Research", href: "/services/market-research" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Case Studies", href: "/case-studies" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Work with us",
    links: [
      { label: "Get a Free Audit", href: "/audit" },
      { label: "Book a Call", href: "/book" },
      { label: "Get a Quote", href: "/quote" },
      { label: "Resources", href: "/resources" },
    ],
  },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms-of-service" },
  { label: "Cookie Policy", href: "/cookie-policy" },
];

export default function Footer() {
  return (
    <footer
      className="bg-[var(--color-brand-950)]"
      style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
    >
      <div className="container py-14">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <a href="/" className="font-bold text-xl tracking-tight text-white block mb-3" style={{ fontFamily: "var(--font-display)" }}>
              richa<span style={{ color: "var(--color-accent-400)" }}>.</span>
            </a>
            <p className="text-sm leading-relaxed" style={{ color: "var(--color-brand-500)" }}>
              AI-native digital agency helping ambitious businesses grow faster.
            </p>
          </div>

          {/* Columns */}
          {FOOTER_COLS.map((col) => (
            <div key={col.title}>
              <div className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--color-brand-500)" }}>
                {col.title}
              </div>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-sm hover:text-white transition-colors" style={{ color: "var(--color-brand-300)" }}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)", color: "var(--color-brand-500)" }}
        >
          <span>© {new Date().getFullYear()} Richa. All rights reserved.</span>
          <div className="flex gap-6">
            {LEGAL_LINKS.map((link) => (
              <a key={link.label} href={link.href} className="hover:text-white transition-colors">
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
