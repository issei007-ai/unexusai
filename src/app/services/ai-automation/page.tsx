import ServicePageTemplate from "@/components/sections/ServicePageTemplate";

export const metadata = {
  title: "AI Automation — DigiExperts",
  description: "AI agents, RAG pipelines, and voice systems, built around the bottlenecks you actually have.",
};

export default function AIAutomationPage() {
  return (
    <ServicePageTemplate
      num="03"
      accent="#7c3aed"
      badge="Service 03 — AI Automation"
      headline="AI built around your bottlenecks, not a demo"
      body="There's a lot of AI out there looking for a problem to solve. We work the other way round — we look at what's actually slowing your team down, then figure out whether an agent, a RAG pipeline, a voice system, or honestly nothing at all is the right fix."
      specialisms={["AI Agents", "RAG Pipelines", "Voice AI"]}
      outcomes={[
        { value: "1,200+", label: "Hours saved per year" },
        { value: "−52%", label: "Manual workload" },
        { value: "24/7", label: "Always-on response" },
      ]}
      subServices={[
        { title: "AI Agents", desc: "The tasks nobody on your team wants to do are usually the ones an agent can take on — qualifying leads, processing data, drafting outreach. Built around how you actually work, not a generic template." },
        { title: "RAG Pipelines", desc: "An AI that only knows what it was trained on isn't much use for your business specifically. RAG pipelines connect it to your own data, so answers are grounded in what's true for you, not a guess." },
        { title: "Voice AI", desc: "A voice system that picks up, asks the right questions, and either books the call or hands it off — running around the clock, plugged into whatever CRM you're already using." },
      ]}
      faqs={[
        { q: "What tech stack do you build AI systems on?", a: "Usually a mix of OpenAI or Anthropic models plus your existing data and tools, glued together with custom orchestration. We're not loyal to one stack — we use whatever fits the problem." },
        { q: "How do you ensure the AI is accurate and reliable?", a: "Before anything goes live, it's tested properly and usually has a person checking its work for a while. Getting this wrong erodes trust fast, so we don't rush it." },
        { q: "Do you integrate with our existing tools?", a: "Yes — HubSpot, Salesforce, Slack, Notion, and plenty of custom databases so far. Integration is usually most of the actual work, not an afterthought." },
        { q: "What's the typical build time for an AI agent?", a: "A simple agent might take 2 to 4 weeks. Something with multiple agents and a custom RAG setup is more like 8 to 12." },
        { q: "Do you provide ongoing maintenance?", a: "Yes. AI systems drift and need attention over time — monitoring, retraining, the occasional tweak. We offer ongoing retainers for exactly that." },
      ]}
    />
  );
}
