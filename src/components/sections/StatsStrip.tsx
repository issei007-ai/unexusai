import AnimatedCounter from "@/components/ui/AnimatedCounter";
import ScrollReveal from "@/components/ui/ScrollReveal";

const STATS = [
  { value: "312%", label: "Average increase in qualified leads", icon: "↑" },
  { value: "£24M+", label: "Client revenue attributed to our work", icon: "◆" },
  { value: "98%", label: "Client retention rate year-on-year", icon: "★" },
  { value: "48h", label: "Average time from brief to strategy", icon: "⚡" },
];

export default function StatsStrip() {
  return (
    <section className="relative overflow-hidden section-dark section">
      <div className="absolute inset-0 bg-grid opacity-25" />
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(180deg,var(--color-brand-950) 0%,#0D1229 100%)" }}
      />

      <div className="container relative z-10">
        <ScrollReveal>
          <p className="text-center text-xs uppercase tracking-widest mb-12" style={{ color: "var(--color-brand-500)" }}>
            Results that speak for themselves
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 0.1} direction="up">
              <div className="card-glass rounded-2xl p-7 text-center group cursor-default">
                <div className="text-xl mb-4" style={{ color: "var(--color-accent-400)" }}>
                  {stat.icon}
                </div>

                <AnimatedCounter
                  value={stat.value}
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 800,
                    fontSize: "clamp(2rem,4vw,3rem)",
                    letterSpacing: "-0.04em",
                    lineHeight: 1,
                    marginBottom: "0.5rem",
                    background: "linear-gradient(135deg,#ffffff 0%,var(--color-accent-300) 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                />

                <p className="text-xs leading-snug" style={{ color: "var(--color-brand-400)" }}>
                  {stat.label}
                </p>

                <div
                  className="mt-5 mx-auto rounded-full transition-all duration-500 group-hover:w-16"
                  style={{
                    height: 2,
                    width: 32,
                    background: "linear-gradient(90deg,var(--color-accent-500),#7C3AED)",
                    opacity: 0.6,
                  }}
                />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
