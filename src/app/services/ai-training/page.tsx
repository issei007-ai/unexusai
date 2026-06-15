import ServicePageTemplate from "@/components/sections/ServicePageTemplate";

export const metadata = {
  title: "AI Training — Unexus AI",
  description: "Practical, hands-on AI training that changes daily habits — built around your team, your tools, and your workflows. Delivered across the UAE and India.",
};

export default function AITrainingPage() {
  return (
    <ServicePageTemplate
      num="04"
      accent="#f59e0b"
      badge="Service 04 — AI Training"
      headline="Your team has access to AI. That's not the same as using it."
      body="Most businesses across the UAE and India have already paid for AI tools — ChatGPT, Copilot, Gemini, whatever was trending at the time. Six months later, nothing has changed. The tools sit half-used in a browser tab while the team works exactly as they did before. The gap isn't access. It's knowing what to actually do with it, every single day."
      specialisms={["Hands-on Workshops", "Prompt Engineering", "Workflow Redesign", "AI Adoption", "Role-specific Training", "In-person & Remote"]}
      primaryCta={{ label: "Book a free discovery call", href: "/book" }}
      secondaryCta={{ label: "See how it works →", href: "#contact" }}
      audienceTitle="For teams with AI tools they're not getting value from."
      audienceIntro="If your team is nodding along to AI demos but nothing's changing at work — this is built for you."
      audience={[
        { title: "Retail & e-commerce", desc: "Marketing teams using AI for captions once a week — and nothing else." },
        { title: "Real estate", desc: "Agents who know AI exists but don't use it to write listings, respond to leads, or prep for calls." },
        { title: "Healthcare & wellness", desc: "Admin teams doing manually what AI could handle — patient comms, scheduling prep, documentation." },
        { title: "Hospitality & F&B", desc: "Operations and marketing teams with no structured approach to using AI in their day-to-day." },
        { title: "Startups & scale-ups", desc: "Founders doing everything themselves — not using AI to multiply their output." },
      ]}
      includedTitle="Practical training that changes daily habits — not a one-day workshop people forget."
      includedIntro="Everything is built around your team, your tools, and your actual workflows. No generic slides."
      subServices={[
        {
          title: "AI Needs Assessment",
          desc: "Before any training happens, we spend time understanding how your team works — where AI can save the most time, which tools fit, and what skill gaps exist across different roles.",
          points: ["Team workflow & tool audit", "Role-by-role gap analysis", "AI tool stack recommendations", "Training roadmap & priority order"],
        },
        {
          title: "Hands-on Workshops",
          desc: "In-person or remote sessions built around real tasks your team does every day — not theoretical examples. People learn by doing, not by watching slides.",
          points: ["In-person workshops across UAE & India", "Remote sessions for distributed teams", "Department-specific sessions", "Arabic & English delivery available"],
        },
        {
          title: "Prompt Engineering",
          desc: "The difference between an AI that's useful and one that wastes time is almost always how you ask. We teach the real habits — not a cheat sheet of prompts to copy and paste.",
          points: ["Role-specific prompt libraries", "Live prompt-writing practice", "Common mistakes & how to fix them", "Team prompt playbook delivered post-session"],
        },
        {
          title: "Workflow Redesign",
          desc: "We look at how your team actually works and rebuild the steps that AI is genuinely good at — rather than bolting it onto a process that was never designed for it.",
          points: ["Process mapping & AI integration points", "New workflow documentation", "Tool setup & configuration support", "Before/after time-saving benchmarks"],
        },
        {
          title: "Adoption & Follow-through",
          desc: "A one-day workshop rarely changes anything a month later. We run programmes that build the habit over time — with check-ins, follow-up sessions, and adoption tracking so it actually sticks.",
          points: ["4 to 8 week structured programme", "Weekly check-ins & Q&A sessions", "Tool adoption tracking & reporting", "Monthly follow-up sessions available"],
        },
        {
          title: "Custom Resource Library",
          desc: "Every team gets a resource library they can keep — prompts, playbooks, guides, and templates built specifically for their role and tools. Something to come back to, not just a PDF that gets filed away.",
          points: ["Role-specific prompt playbooks", "Tool guides & quick-reference sheets", "Use-case templates for daily tasks", "Updated as AI tools evolve"],
        },
      ]}
      approachTitle="From first conversation to a team that actually uses AI — here's the journey."
      approach={[
        { title: "Discovery — we understand your team before designing anything", desc: "We talk to you and a few team members to understand how work actually gets done, where time is lost, and what AI tools are already in play. No generic training programme gets designed until we know your specific situation." },
        { title: "Programme design — built around your roles, tools, and goals", desc: "We design a training programme specific to your team — which departments, which tools, which workflows, in which order. You review and approve before anything starts." },
        { title: "Workshops — hands-on, practical, built around real tasks", desc: "Sessions are run in-person or remotely, built around the actual work your team does. Not slides about AI in theory — live practice with the tools they'll use tomorrow morning." },
        { title: "Follow-through — check-ins to make sure habits actually form", desc: "We check in weekly during the programme — answering questions, addressing blockers, and tracking whether people are actually using what they learned. Most resistance to AI comes from uncertainty, not unwillingness." },
        { title: "Measure — we agree what success looks like and track it", desc: "Time saved, tool adoption rate, tasks automated — we agree on the metrics upfront and report on them. You'll know whether the training is working, not just whether people enjoyed it." },
      ]}
      whyTitle="What makes this different from a generic AI workshop."
      whyCards={[
        { title: "We build AI tools too", desc: "We don't just train teams on AI — we build AI automation for businesses. That means we train people on tools we actually use and understand deeply, not just tools we've read about." },
        { title: "UAE and India delivery", desc: "In-person workshops across Dubai, Abu Dhabi, and major Indian cities. We understand the work culture, the tools businesses use locally, and what actually lands in these markets." },
        { title: "Role-specific, not one-size", desc: "A marketing manager and a finance director need completely different AI training. We build every programme around specific roles — so nobody sits through content that has nothing to do with their job." },
        { title: "Measured on adoption, not attendance", desc: "We don't count heads in a room and call it done. We track whether your team is actually using AI differently after training — and keep going until they are." },
      ]}
      faqIntro="Things people usually ask before getting started."
      faqs={[
        { q: "Our team has very mixed levels of AI experience. Can you handle that?", a: "Yes — this is the most common situation. We assess individual skill levels upfront and run sessions that meet people where they are. Beginners and more experienced users don't have to sit through the same content." },
        { q: "Is training delivered in person or online?", a: "Both — in-person across Dubai, Abu Dhabi, and major Indian cities, or remote for distributed teams. Most programmes use a mix: in-person for the intensive early sessions, remote for follow-up check-ins." },
        { q: "Can you train specific departments rather than the whole company?", a: "Yes — and often that's the smarter starting point. We usually begin with one high-impact team, typically marketing or operations, and expand once it's working and the rest of the business can see the difference." },
        { q: "What AI tools do you train on?", a: "We train on the tools your team already has or is considering — ChatGPT, Claude, Gemini, Copilot, Perplexity, and specialist tools relevant to your industry. We recommend the right stack based on your workflow, not on what's trending." },
        { q: "How long does a typical training programme run?", a: "Most programmes run 4 to 8 weeks — intensive enough to build real habits, spread out enough that people can practice between sessions. We also offer monthly follow-up sessions for teams that want to keep building on it." },
        { q: "Do you offer training in Arabic?", a: "Yes — training delivery in Arabic is available for UAE and wider Middle East teams. We let you know at the planning stage so sessions and materials are prepared accordingly." },
      ]}
      closing="A team that uses AI confidently every single day — cutting hours, producing better output, and staying ahead of competitors who are still figuring it out."
    />
  );
}
