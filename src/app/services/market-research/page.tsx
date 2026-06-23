import ServicePageTemplate from "@/components/sections/ServicePageTemplate";
import { getSection } from "@/lib/cms";
import { SVC_MARKET_RESEARCH_DEFAULTS } from "@/lib/cms-schema";
import { toServiceProps } from "@/lib/service-cms";

export const metadata = {
  title: "Market Research — Unexus AI",
  description: "Audience research, competitor analysis, positioning, and market-entry research for the UAE and India — built to feed straight into your marketing.",
};

export default async function MarketResearchPage() {
  const c = await getSection("services.market-research", SVC_MARKET_RESEARCH_DEFAULTS);
  return <ServicePageTemplate {...toServiceProps(c)} />;
}
