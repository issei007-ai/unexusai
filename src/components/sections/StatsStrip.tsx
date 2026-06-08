const STATS = [
  { value: "312%", label: "Average increase in qualified leads", icon: "↑" },
  { value: "£24M+", label: "Client revenue attributed to our work", icon: "◆" },
  { value: "98%", label: "Client retention rate year-on-year", icon: "★" },
  { value: "48h", label: "Average time from brief to strategy", icon: "⚡" },
];

export default function StatsStrip() {
  return (
    <section className="relative overflow-hidden section-dark section">
      {/* Subtle grid */}
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, var(--color-brand-950) 0%, #0D1229 100%)",
        }}
      />

      <div className="container relative z-10">
        {/* Label */}
        <p
          className="text-center text-xs uppercase tracking-widest mb-12"
          style={{ color: "var(--color-brand-500)" }}
        >
          Results that speak for themselves
        </p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className="card-glass rounded-2xl p-6 text-center group"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {/* Icon */}
              <div
                className="text-lg mb-3"
                style={{ color: "var(--color-accent-400)" }}
              >
                {stat.icon}
              </div>

              {/* Number */}
              <div
                className="mb-2"
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 800,
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                  background:
                    "linear-gradient(135deg, #ffffff 0%, var(--color-accent-300) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {stat.value}
              </div>

              {/* Label */}
              <p
                className="text-xs leading-snug"
                style={{ color: "var(--color-brand-400)" }}
              >
                {stat.label}
              </p>

              {/* Bottom glow line */}
              <div
                className="mt-5 mx-auto rounded-full"
                style={{
                  height: 2,
                  width: 40,
                  background:
                    "linear-gradient(90deg, var(--color-accent-500), #7C3AED)",
                  opacity: 0.6,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
