import { PROCESS_STEPS } from "@/lib/constants";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function ProcessSteps() {
  return (
    <section className="section relative overflow-hidden" style={{ background: "var(--color-brand-950)" }}>
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div
        className="orb orb-primary absolute"
        style={{ width: 600, height: 600, top: "50%", left: "50%", transform: "translate(-50%,-50%)", opacity: 0.12 }}
      />

      <div className="container relative z-10">
        <div className="text-center mb-16">
          <ScrollReveal>
            <span className="badge badge-dark mb-5 inline-flex">How it works</span>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h2
                  className="text-white mb-5"
                  style={{
                    fontSize: "clamp(2.2rem,4vw,3.8rem)",
                    lineHeight: 1.1,
                  }}
                >
              From first call to real results — here's what working with us actually looks like.
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-lead max-w-xl mx-auto" style={{ color: "var(--color-brand-300)" }}>
              No black boxes. No waiting weeks to hear back. You'll know exactly what's happening and why at every stage.
            </p>
          </ScrollReveal>
        </div>

        <div className="relative">
          {/* Connector line */}
          <div
            className="hidden lg:block absolute h-px"
            style={{
              top: 30,
              left: "10%",
              right: "10%",
              background:
                "linear-gradient(90deg,transparent 0%,rgba(99,102,241,0.35) 15%,rgba(99,102,241,0.35) 85%,transparent 100%)",
            }}
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
            {PROCESS_STEPS.map((item, i) => (
              <ScrollReveal key={item.step} delay={i * 0.13} direction="up">
                <div className="text-center relative group cursor-default">
                  <div
                    className="w-[60px] h-[60px] rounded-full flex items-center justify-center mx-auto mb-4 relative z-10 transition-transform duration-300 group-hover:scale-110"
                    style={{
                      background:
                        "linear-gradient(135deg,var(--color-accent-500),var(--color-accent-600))",
                      boxShadow:
                        "0 0 28px rgba(99,102,241,0.45), 0 0 56px rgba(99,102,241,0.15)",
                    }}
                  >
                    <span
                      className="text-sm font-bold text-white"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {item.step}
                    </span>
                  </div>

                <p
                    className="text-[10px] uppercase tracking-widest mb-2"
                    style={{ color: "var(--color-brand-400)" }}
                  >
                    {item.feeling}
                </p>
                  
                  <h3
                    className="font-bold text-sm mb-3 text-white transition-colors group-hover:text-[var(--color-accent-300)]"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {item.title}
                  </h3>

                  <p
                    className="text-[13px] leading-relaxed"
                    style={{ color: "var(--color-brand-400)" }}
                  >
                    {item.desc}
                  </p>
                  
                  <p
                    className="text-[11px] mt-3"
                    style={{ color: "var(--color-brand-500)" }}
                  >
                    <strong>What you do:</strong> {item.action}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

