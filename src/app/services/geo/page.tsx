import ServicePageTemplate from "@/components/sections/ServicePageTemplate";
import { getSection } from "@/lib/cms";
import { SVC_GEO_DEFAULTS } from "@/lib/cms-schema";
import { toServiceProps } from "@/lib/service-cms";

export const metadata = {
  title: "GEO — Generative Engine Optimisation — Unexus AI",
  description: "Get your business recommended by ChatGPT, Perplexity, Gemini, and Claude — not just found on Google. GEO for businesses across the UAE and beyond.",
};

export default async function GEOPage() {
  const c = await getSection("services.geo", SVC_GEO_DEFAULTS);
  return <ServicePageTemplate {...toServiceProps(c)} />;
}
