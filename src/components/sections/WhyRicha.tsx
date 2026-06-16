import ScrollReveal from "@/components/ui/ScrollReveal";
import RevealText3D from "@/components/ui/RevealText3D";
import { WHY_US } from "@/lib/constants";

const META = [
  {
    accent: "#818cf8",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" />
        <path d="M7 11V7a5 5 0 0 1 9.9-1" />
      </svg>
    ),
  },
  {
    accent: "#34d399",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <rect x="9" y="9" width="6" height="6" />
        <line x1="9" y1="1" x2="9" y2="4" /><line x1="15" y1="1" x2="15" y2="4" />
        <line x1="9" y1="20" x2="9" y2="23" /><line x1="15" y1="20" x2="15" y2="23" />
        <line x1="20" y1="9" x2="23" y2="9" /><line x1="20" y1="14" x2="23" y2="14" />
        <line x1="1" y1="9" x2="4" y2="9" /><line x1="1" y1="14" x2="4" y2="14" />
      </svg>
    ),
  },
  {
    accent: "#22d3ee",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="18" cy="5" r="3" />
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="19" r="3" />
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
      </svg>
    ),
  },
  {
    accent: "#f59e0b",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
];

export default function WhyRicha() {
  return (
    <section className="section relative overflow-hidden" style={{ background: "var(--color-panel)" }}>
      <div className="absolute inset-0 bg-dots" style={{ opacity: 0.22 }} />

      <div className="container relative z-10">
        <div className="text-center mb-14">
          <span className="badge badge-accent mb-5 inline-flex">Why Unexus AI</span>
          <h2 className="text-h2 mb-4">
            <RevealText3D text="Not promises. Just how we actually work." splitBy="word" />
          </h2>
          <p className="text-lead max-w-xl mx-auto">
            The things that matter when you&apos;re choosing who to trust with your growth.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {WHY_US.map((item, i) => {
            const m = META[i % META.length];
            return (
              <ScrollReveal key={item.title} delay={i * 0.09}>
                <div className="glow-card h-full p-7" style={{ border: "1px solid var(--color-border)" }}>
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: "var(--radius-md)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: `${m.accent}1f`,
                      border: `1px solid ${m.accent}40`,
                      color: m.accent,
                      marginBottom: "1.25rem",
                    }}
                  >
                    {m.icon}
                  </div>
                  <h3 className="mb-2 text-white" style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.2rem", letterSpacing: "-0.01em" }}>
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--color-brand-300)" }}>{item.desc}</p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
