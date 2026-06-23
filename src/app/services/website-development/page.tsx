import ServicePageTemplate from "@/components/sections/ServicePageTemplate";
import { getSection } from "@/lib/cms";
import { SVC_WEBSITE_DEVELOPMENT_DEFAULTS } from "@/lib/cms-schema";
import { toServiceProps } from "@/lib/service-cms";

export const metadata = {
  title: "Website Development — Unexus AI",
  description: "Fast, conversion-focused websites built in Next.js — designed to turn the traffic you already have into customers. For businesses across the UAE and India.",
};

export default async function WebsiteDevelopmentPage() {
  const c = await getSection("services.website-development", SVC_WEBSITE_DEVELOPMENT_DEFAULTS);
  return <ServicePageTemplate {...toServiceProps(c)} />;
}
