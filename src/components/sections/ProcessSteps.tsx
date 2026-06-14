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
            <span className="badge badge-dark mb-5 inline-flex">Our process</span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="text-h2 text-white mb-5">We plan before we touch anything</h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-lead max-w-xl mx-auto" style={{ color: "var(--color-brand-300)" }}>
              We won&apos;t start a campaign or write a line of code until we actually understand
              your business. Once we do, things move quickly.
            </p>
          </ScrollReveal>
        </div>

        <div className="relative">
          {/* Connector line */}
          <div
            className="hidden lg:block absolute h-px"
            style={{
              top: 36,
              left: "12.5%",
              right: "12.5%",
              background: "linear-gradient(90deg,transparent 0%,rgba(99,102,241,0.35) 15%,rgba(99,102,241,0.35) 85%,transparent 100%)",
            }}
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {PROCESS_STEPS.map((item, i) => (
              <ScrollReveal key={item.step} delay={i * 0.13} direction="up">
                <div className="text-center relative group cursor-default">
                  {/* Circle */}
                  <div
                    className="w-[72px] h-[72px] rounded-full flex items-center justify-center mx-auto mb-6 relative z-10 transition-transform duration-300 group-hover:scale-110"
                    style={{
                      background: "linear-gradient(135deg,var(--color-accent-500),var(--color-accent-600))",
                      boxShadow: "0 0 28px rgba(99,102,241,0.45), 0 0 56px rgba(99,102,241,0.15)",
                    }}
                  >
                    <span className="text-sm font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
                      {item.step}
                    </span>
                  </div>

                  <h3 className="font-bold text-lg mb-3 text-white transition-colors group-hover:text-[var(--color-accent-300)]" style={{ fontFamily: "var(--font-display)" }}>
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--color-brand-400)" }}>
                    {item.desc}
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
