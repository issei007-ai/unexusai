import ServicePageTemplate from "@/components/sections/ServicePageTemplate";

export const metadata = {
  title: "AI Training — Richa",
  description: "Practical AI training, prompt engineering, and workflow design that sticks.",
};

export default function AITrainingPage() {
  return (
    <ServicePageTemplate
      num="04"
      accent="#10b981"
      badge="Service 04 — AI Training"
      headline="Your team is sitting on untapped AI potential"
      body="The tools exist. The problem is knowing how to use them properly. We run practical AI training programmes that change how your team works — not just what tools they use."
      specialisms={["Prompt Engineering", "AI Adoption", "Workflow Design"]}
      outcomes={[
        { value: "92%", label: "Team tool adoption" },
        { value: "3x", label: "Faster everyday workflows" },
        { value: "40+", label: "Teams trained" },
      ]}
      subServices={[
        { title: "Prompt Engineering", desc: "Get dramatically better outputs from the AI tools you already pay for. We train your team to write prompts that work." },
        { title: "AI Adoption & Change Management", desc: "Move your whole team from curious to capable with adoption programmes that stick — not one-day workshops everyone forgets." },
        { title: "Workflow Design", desc: "Redesign your processes around what AI is actually good at. We map your workflows and rebuild them to be AI-native." },
      ]}
      faqs={[
        { q: "Is this training online or in-person?", a: "Both. We offer remote workshops, in-person intensives, and ongoing asynchronous resources. We'll recommend the right format for your team." },
        { q: "How do you measure the impact of training?", a: "We define success metrics upfront — usually time saved, output quality, and tool adoption — and report against them throughout." },
        { q: "Do you tailor the training to our specific tools and use cases?", a: "Always. We don't run generic AI training. Everything is built around the tools your team uses and the problems you need to solve." },
        { q: "What's the typical programme length?", a: "Most programmes run 4–8 weeks. We also offer ongoing monthly sessions for teams that want continuous improvement." },
        { q: "Can we train specific departments rather than the whole company?", a: "Yes. We often start with a single department — usually marketing or operations — and expand from there." },
      ]}
    />
  );
}
