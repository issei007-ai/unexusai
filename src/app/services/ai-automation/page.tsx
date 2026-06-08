import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import ServicePageTemplate from "@/components/sections/ServicePageTemplate";

export default function AIAutomationPage() {
  return (
    <>
      <Nav />
      <ServicePageTemplate
        badge="Service 03"
        headline="AI that works for your business, not the other way around"
        body="Most AI tools are solutions looking for a problem. We start with your biggest bottlenecks and build AI systems that actually fix them — agents, pipelines, and voice AI that integrate with your existing stack."
        specialisms={["AI Agents", "RAG Pipelines", "Voice AI"]}
        subServices={[
          { title: "AI Agents", desc: "Automate the tasks your team hates doing. We build custom agents that handle lead qualification, data processing, outreach, and more.", href: "/services/ai-automation/agents" },
          { title: "RAG Pipelines", desc: "Give your AI a memory — and make it actually useful. We build retrieval-augmented generation systems that ground AI responses in your real data.", href: "/services/ai-automation/rag" },
          { title: "Voice AI", desc: "Phone calls, handled. Leads qualified. 24/7. We build voice AI systems that sound natural and integrate with your CRM.", href: "/services/ai-automation/voice-ai" },
        ]}
        faqs={[
          { q: "What tech stack do you build AI systems on?", a: "We typically use a combination of OpenAI or Anthropic models, LangChain or custom orchestration, and your existing data sources. We're stack-agnostic — we use what's right for the problem." },
          { q: "How do you ensure the AI is accurate and reliable?", a: "We build extensive evaluation pipelines and human-in-the-loop checkpoints before anything goes to production. Accuracy is non-negotiable." },
          { q: "Do you integrate with our existing tools?", a: "Yes. We've integrated AI systems with HubSpot, Salesforce, Slack, Notion, custom databases, and many others. Integration is a core part of every build." },
          { q: "What's the typical build time for an AI agent?", a: "Simple agents take 2–4 weeks. Complex multi-agent systems with custom RAG pipelines can take 8–12 weeks." },
          { q: "Do you provide ongoing maintenance?", a: "Yes. AI systems need monitoring, retraining, and iteration over time. We offer ongoing support retainers." },
        ]}
      />
      <Footer />
    </>
  );
}
