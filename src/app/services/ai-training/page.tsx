import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import ServicePageTemplate from "@/components/sections/ServicePageTemplate";

export default function AITrainingPage() {
  return (
    <>
      <Nav />
      <ServicePageTemplate
        badge="Service 04"
        headline="Your team is sitting on untapped AI potential"
        body="The tools exist. The problem is knowing how to use them properly. We run practical AI training programmes that change how your team works — not just what tools they use."
        specialisms={["Prompt Engineering", "AI Adoption", "Workflow Design"]}
        subServices={[
          { title: "Prompt Engineering", desc: "Get dramatically better outputs from the AI tools you already pay for. We train your team to write prompts that actually work.", href: "/services/ai-training/prompts" },
          { title: "AI Adoption & Change Management", desc: "Move your whole team from curious to capable. We design adoption programmes that stick — not one-day workshops that everyone forgets.", href: "/services/ai-training/adoption" },
          { title: "Workflow Design", desc: "Redesign your processes around what AI is actually good at. We map your current workflows and rebuild them to be AI-native.", href: "/services/ai-training/workflows" },
        ]}
        faqs={[
          { q: "Is this training online or in-person?", a: "Both. We offer remote workshops, in-person intensives, and ongoing asynchronous learning resources. We'll recommend the right format based on your team size and goals." },
          { q: "How do you measure the impact of training?", a: "We define success metrics upfront — usually time saved, output quality improvement, and tool adoption rates — and report against them throughout the engagement." },
          { q: "Do you tailor the training to our specific tools and use cases?", a: "Always. We don't run generic AI training. Everything is built around the tools your team uses and the problems your business needs to solve." },
          { q: "What's the typical programme length?", a: "Most programmes run 4–8 weeks. We also offer ongoing monthly sessions for teams that want continuous improvement." },
          { q: "Can we train specific departments rather than the whole company?", a: "Yes. We often start with a single department — usually marketing or operations — and expand from there." },
        ]}
      />
      <Footer />
    </>
  );
}
