import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import ServicePageTemplate from "@/components/sections/ServicePageTemplate";

export default function WebsiteDevelopmentPage() {
  return (
    <>
      <Nav />
      <ServicePageTemplate
        badge="Service 02"
        headline="Websites built to convert, not just to look good"
        body="Your website has one job: turn visitors into customers. We build fast, accessible, conversion-optimised sites in Next.js — and we measure everything."
        specialisms={["Next.js", "Edge Performance", "CRO"]}
        subServices={[
          { title: "Next.js Development", desc: "Production-grade builds that scale without breaking. App Router, TypeScript, and edge-ready from day one.", href: "/services/website-development/nextjs" },
          { title: "Edge & Performance", desc: "Sub-second load times. Higher rankings. Better conversions. We optimise for Core Web Vitals and real-world performance.", href: "/services/website-development/edge" },
          { title: "Conversion Rate Optimisation", desc: "More revenue from the traffic you already have. We test, iterate, and compound improvements over time.", href: "/services/website-development/cro" },
        ]}
        faqs={[
          { q: "Why Next.js specifically?", a: "Next.js gives us the best combination of performance, developer experience, and SEO capability. It's the framework we'd choose for our own products." },
          { q: "Do you offer CMS integration?", a: "Yes. We typically integrate with Sanity or Contentful, but we can work with your existing CMS if you have one." },
          { q: "What does a typical build timeline look like?", a: "Most projects take 6–12 weeks from kick-off to launch, depending on scope. We'll give you a clear timeline in the proposal." },
          { q: "Do you handle hosting and deployment?", a: "We recommend Vercel for most Next.js projects and can handle the full deployment setup. Ongoing hosting management is available as an add-on." },
          { q: "Can you redesign an existing site rather than build from scratch?", a: "Yes. We often take over existing sites and improve performance and conversion rate without a full rebuild." },
        ]}
      />
      <Footer />
    </>
  );
}
