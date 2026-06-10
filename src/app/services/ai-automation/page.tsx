import ServicePageTemplate from "@/components/sections/ServicePageTemplate";

export const metadata = {
  title: "AI Automation — DigiExperts",
  description: "Custom AI agents, RAG pipelines, and voice AI that integrate with your stack.",
};

export default function AIAutomationPage() {
  return (
    <ServicePageTemplate
      num="03"
      accent="#7c3aed"
      badge="Service 03 — AI Automation"
      headline="AI that works for your business, not the other way around"
      body="Most AI tools are solutions looking for a problem. We start with your biggest bottlenecks and build AI systems that actually fix them — agents, pipelines, and voice systems that integrate with your existing stack."
      specialisms={["AI Agents", "RAG Pipelines", "Voice AI"]}
      outcomes={[
        { value: "1,200+", label: "Hours saved per year" },
        { value: "−52%", label: "Manual workload" },
        { value: "24/7", label: "Always-on response" },
      ]}
      subServices={[
        { title: "AI Agents", desc: "Automate the tasks your team hates. Custom agents that handle lead qualification, data processing, outreach, and more." },
        { title: "RAG Pipelines", desc: "Give your AI a memory — and make it useful. Retrieval-augmented systems that ground responses in your real data." },
        { title: "Voice AI", desc: "Phone calls handled, leads qualified, 24/7. Voice systems that sound natural and integrate with your CRM." },
      ]}
      faqs={[
        { q: "What tech stack do you build AI systems on?", a: "Typically a combination of OpenAI or Anthropic models, custom orchestration, and your existing data sources. We're stack-agnostic — we use what's right for the problem." },
        { q: "How do you ensure the AI is accurate and reliable?", a: "We build extensive evaluation pipelines and human-in-the-loop checkpoints before anything goes to production. Accuracy is non-negotiable." },
        { q: "Do you integrate with our existing tools?", a: "Yes. We've integrated with HubSpot, Salesforce, Slack, Notion, custom databases, and many others. Integration is a core part of every build." },
        { q: "What's the typical build time for an AI agent?", a: "Simple agents take 2–4 weeks. Complex multi-agent systems with custom RAG pipelines can take 8–12 weeks." },
        { q: "Do you provide ongoing maintenance?", a: "Yes. AI systems need monitoring, retraining, and iteration over time. We offer ongoing support retainers." },
      ]}
    />
  );
}
