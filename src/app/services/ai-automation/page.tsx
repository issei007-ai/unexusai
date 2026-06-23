import ServicePageTemplate from "@/components/sections/ServicePageTemplate";
import { getSection } from "@/lib/cms";
import { SVC_AI_AUTOMATION_DEFAULTS } from "@/lib/cms-schema";
import { toServiceProps } from "@/lib/service-cms";

export const metadata = {
  title: "AI Automation — Unexus AI",
  description: "AI agents, WhatsApp automation, RAG pipelines, and voice systems built around your actual bottlenecks. For businesses across the UAE and Middle East.",
};

export default async function AIAutomationPage() {
  const c = await getSection("services.ai-automation", SVC_AI_AUTOMATION_DEFAULTS);
  return <ServicePageTemplate {...toServiceProps(c)} />;
}
