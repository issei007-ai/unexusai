import ServicePageTemplate from "@/components/sections/ServicePageTemplate";
import { getSection } from "@/lib/cms";
import { SVC_AI_TRAINING_DEFAULTS } from "@/lib/cms-schema";
import { toServiceProps } from "@/lib/service-cms";

export const metadata = {
  title: "AI Training — Unexus AI",
  description: "Practical, hands-on AI training that changes daily habits — built around your team, your tools, and your workflows. Delivered across the UAE and India.",
};

export default async function AITrainingPage() {
  const c = await getSection("services.ai-training", SVC_AI_TRAINING_DEFAULTS);
  return <ServicePageTemplate {...toServiceProps(c)} />;
}
