import ScrollReveal from "@/components/ui/ScrollReveal";
import RevealText3D from "@/components/ui/RevealText3D";
import ServiceCube from "@/components/ui/ServiceCube";
import { getSection } from "@/lib/cms";
import { HOME_INDUSTRIES_DEFAULTS } from "@/lib/cms-schema";

type Point = { title: string; desc: string };
type Industry = {
  name: string;
  segments: string;
  accent: string;
  cta: string;
  icon: React.ReactNode;
  points: Point[];
};

const sw = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" } as const;

const INDUSTRIES: Industry[] = [
  {
    name: "E-commerce",
    segments: "UAE · India · Cross-border retail",
    accent: "#818cf8",
    cta: "How we help e-commerce brands grow",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" {...sw}>
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    ),
    points: [
      { title: "High ad spend, unclear returns", desc: `Meta and Google campaigns running — but ROAS is inconsistent and attribution is always murky. You don't know which channel is actually selling.` },
      { title: "Not showing up on AI-powered search", desc: `Shoppers now ask ChatGPT and Perplexity "best skincare brand in UAE" or "affordable furniture online Dubai" — and your store isn't in the answer.` },
      { title: "Slow site killing conversions", desc: `Every extra second of load time costs you sales. A fast, conversion-optimised storefront isn't optional anymore — it's the baseline.` },
    ],
  },
  {
    name: "Hospitality & F&B",
    segments: "Hotels · Restaurants · Cafés · Tourism",
    accent: "#f59e0b",
    cta: "How we help hospitality brands fill seats",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" {...sw}>
        <path d="M6 3v7a2 2 0 0 0 2 2 2 2 0 0 0 2-2V3" />
        <path d="M8 12v9" />
        <path d="M16 3c-1.1 0-2 1.8-2 4s.9 4 2 4v10" />
      </svg>
    ),
    points: [
      { title: `Invisible on "near me" and AI search`, desc: `When someone asks Google or ChatGPT "best brunch spot in Dubai Marina" or "hotels near Dubai Mall" — showing up there isn't luck, it's strategy.` },
      { title: "Social content that looks busy but doesn't convert", desc: `Posting daily but footfall isn't moving. Content without a clear conversion goal is just noise — and it's expensive noise.` },
      { title: "No system to turn one-time guests into regulars", desc: `Repeat business is the most profitable kind. Most hospitality brands have no email, no loyalty loop, no automation keeping guests coming back.` },
    ],
  },
  {
    name: "Healthcare & Wellness",
    segments: "Clinics · Gyms · Wellness centres · Med-spa",
    accent: "#34d399",
    cta: "How we help clinics attract and retain patients",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" {...sw}>
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    points: [
      { title: "Patients find competitors first", desc: `When someone searches "dermatologist in Dubai" or "physiotherapy clinic Abu Dhabi" — your clinic needs to appear in Google, maps, and now AI assistants.` },
      { title: "Website built for looks, not bookings", desc: `A beautiful website that makes it hard to book an appointment is a liability. Every friction point between visitor and booking is lost revenue.` },
      { title: "No follow-up system after the first visit", desc: `Most clinics and wellness centres lose patients between appointments — no reminders, no re-engagement, no automated care journey keeping them connected.` },
    ],
  },
  {
    name: "Real Estate",
    segments: "Developers · Brokerages · Property management",
    accent: "#f87171",
    cta: "How we help real estate brands generate qualified leads",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" {...sw}>
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    points: [
      { title: "Leads coming in but not converting", desc: `Portals and paid ads bring enquiries — but they're unqualified, slow to respond to, and rarely nurtured past the first call. Pipeline leaks everywhere.` },
      { title: "Not visible to overseas buyers searching on AI", desc: `International investors now ask AI tools "best areas to invest in Dubai real estate" or "off-plan properties in UAE 2025." Your listings need to be in that answer.` },
      { title: "No content strategy building long-term authority", desc: `One-off portal listings aren't a brand. The agencies winning in real estate are the ones publishing market insights, area guides, and investment content consistently.` },
    ],
  },
];

export default async function IndustriesSection() {
  const c = await getSection("home.industries", HOME_INDUSTRIES_DEFAULTS);
  return (
    <section className="section relative overflow-hidden" style={{ background: "var(--color-bg)" }}>
      <div className="absolute inset-0 bg-grid" style={{ opacity: 0.18 }} />

      <div className="container relative z-10">
        <div className="mb-14 grid lg:grid-cols-[1fr_280px] gap-10 lg:gap-12 items-center">
          <div style={{ maxWidth: "44rem" }}>
            <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--color-brand-500)" }}>
              {c.eyebrow}
            </span>
            <h2 className="text-h2 mt-3 mb-4">
              <RevealText3D text={c.title} splitBy="word" />
            </h2>
            <p className="text-lead" style={{ color: "var(--color-brand-300)" }}>{c.intro}</p>
          </div>
          <div className="flex justify-center lg:justify-end">
            <ServiceCube />
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-5">
          {INDUSTRIES.map((ind, i) => (
            <ScrollReveal key={ind.name} delay={(i % 2) * 0.1}>
              <div className="glow-card h-full p-7 md:p-8 flex flex-col" style={{ border: "1px solid var(--color-border)" }}>
                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div
                    style={{
                      width: 46, height: 46, borderRadius: "var(--radius-md)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      background: `${ind.accent}1f`, border: `1px solid ${ind.accent}40`,
                      color: ind.accent, flexShrink: 0,
                    }}
                  >
                    {ind.icon}
                  </div>
                  <div>
                    <h3 className="text-white" style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.2rem", letterSpacing: "-0.01em" }}>
                      {ind.name}
                    </h3>
                    <span className="text-xs" style={{ color: "var(--color-brand-500)" }}>{ind.segments}</span>
                  </div>
                </div>

                {/* Pain points */}
                <div className="space-y-5 flex-1">
                  {ind.points.map((p) => (
                    <div key={p.title} className="flex gap-3">
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: ind.accent, flexShrink: 0, marginTop: 8 }} />
                      <div>
                        <div className="font-semibold text-white mb-1" style={{ fontSize: "0.95rem" }}>{p.title}</div>
                        <p className="text-sm leading-relaxed" style={{ color: "var(--color-brand-300)" }}>{p.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="divider my-6" />
                <div className="flex items-center justify-between gap-3">
                  <a href="/services" className="text-sm font-medium inline-flex items-center gap-2 transition-colors hover:text-white" style={{ color: "var(--color-brand-300)" }}>
                    <span style={{ color: ind.accent }}>→</span> {ind.cta}
                  </a>
                  <span className="badge badge-accent flex-shrink-0" style={{ fontSize: "0.62rem", letterSpacing: "0.06em", display: "inline-flex", alignItems: "center", gap: 4 }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M12 2l1.8 7.2L21 11l-7.2 1.8L12 20l-1.8-7.2L3 11l7.2-1.8z" />
                    </svg>
                    GEO
                  </span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
