"use client";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import ScrollReveal from "@/components/ui/ScrollReveal";

const STATS = [
  { value: "312%", label: "Average increase in qualified leads", icon: "↑", color: "var(--color-accent-400)" },
  { value: "£24M+", label: "Client revenue attributed to our work", icon: "◆", color: "#34d399" },
  { value: "98%", label: "Client retention rate year-on-year", icon: "★", color: "#f59e0b" },
  { value: "48h", label: "Average time from brief to strategy", icon: "⚡", color: "#06b6d4" },
];

export default function StatsStrip() {
  return (
    <section className="section relative overflow-hidden" style={{ background: "var(--color-panel)" }}>
      <div className="absolute inset-0 bg-dots" style={{ opacity: 0.3 }} />

      <div className="container relative z-10">
        <ScrollReveal>
          <p className="text-center text-xs uppercase tracking-widest mb-14" style={{ color: "var(--color-brand-500)" }}>
            Results that speak for themselves
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {STATS.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 0.1}>
              <TiltCardShell color={stat.color}>
                <div className="glow-card p-6 text-center group cursor-default h-full" style={{ border: "1px solid var(--color-border)" }}>
                  <div className="text-2xl mb-3" style={{ color: stat.color }}>{stat.icon}</div>

                  <AnimatedCounter
                    value={stat.value}
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 800,
                      fontSize: "clamp(1.9rem,4vw,2.75rem)",
                      letterSpacing: "-0.04em",
                      lineHeight: 1,
                      marginBottom: "0.6rem",
                      color: "#fff",
                    }}
                  />

                  <p className="text-xs leading-snug" style={{ color: "var(--color-brand-400)" }}>
                    {stat.label}
                  </p>

                  <div
                    className="mt-5 mx-auto rounded-full transition-all duration-500 group-hover:w-14"
                    style={{ height: 2, width: 28, background: stat.color, opacity: 0.5 }}
                  />
                </div>
              </TiltCardShell>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// Inline tilt shell to avoid circular import
function TiltCardShell({ children, color }: { children: React.ReactNode; color: string }) {
  return (
    <div
      className="h-full"
      style={{
        filter: `drop-shadow(0 0 0 transparent)`,
        transition: "filter 0.3s",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.filter = `drop-shadow(0 0 20px ${color}22)`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.filter = "drop-shadow(0 0 0 transparent)";
      }}
    >
      {children}
    </div>
  );
}
