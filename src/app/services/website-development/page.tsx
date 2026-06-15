import ServicePageTemplate from "@/components/sections/ServicePageTemplate";

export const metadata = {
  title: "Website Development — Unexus AI",
  description: "Fast, conversion-focused websites built in Next.js — designed to turn the traffic you already have into customers. For businesses across the UAE and India.",
};

export default function WebsiteDevelopmentPage() {
  return (
    <ServicePageTemplate
      num="02"
      accent="#06b6d4"
      badge="Service 02 — Website Development"
      headline="Your website is live. But is it actually working?"
      body="Most businesses in the UAE have a website that looks decent but converts poorly. Visitors land, scroll, and leave — without filling a form, making a booking, or picking up the phone. We build websites in Next.js that are designed around one thing: turning the traffic you already have into customers."
      specialisms={["UI/UX Design", "Next.js Development", "CRO", "SEO-Ready", "CMS Integration", "Performance"]}
      primaryCta={{ label: "Get a free audit", href: "/audit" }}
      secondaryCta={{ label: "Book a 30-min call →", href: "/book" }}
      audienceTitle="For businesses whose website looks fine — but isn't doing its job."
      audienceIntro="If any of these sound like you, your website is costing you more than it's making you."
      audience={[
        { title: "Real estate", desc: "Listings everywhere but serious buyers not converting online." },
        { title: "Healthcare & wellness", desc: "No online booking system — patients calling or not bothering at all." },
        { title: "Hospitality & F&B", desc: "Beautiful venue, a website that hasn't been updated in two years." },
        { title: "Retail & e-commerce", desc: "Traffic coming in from ads but the site isn't built to convert it." },
        { title: "Startups & scale-ups", desc: "Outgrowing a template site that can't keep up with the business." },
      ]}
      includedTitle="A website built to convert — from first design to post-launch."
      includedIntro="Every build includes design, development, tracking, and support. Nothing handed off halfway."
      subServices={[
        {
          title: "UI/UX Design",
          desc: "Designed around your audience and what they need to see before they take action — not just what looks good in a portfolio.",
          points: ["User journey mapping & wireframes", "Mobile-first responsive design", "Brand-aligned visual language", "Design review & approval before build"],
        },
        {
          title: "Next.js Development",
          desc: "Built with Next.js — fast, scalable, and SEO-ready from day one. No shortcuts that need a rebuild in two years.",
          points: ["Next.js App Router & TypeScript", "Core Web Vitals optimised", "Accessibility compliant build", "Deployed on Vercel — fast globally"],
        },
        {
          title: "Conversion Rate Optimisation",
          desc: "Often the fastest way to grow revenue is getting more from the traffic you already have. We build for conversion from the start — not as an afterthought.",
          points: ["CTA strategy & placement", "Landing page design & testing", "Form & booking flow optimisation", "Heatmap & behaviour tracking setup"],
        },
        {
          title: "CMS Integration",
          desc: "You shouldn't need a developer to update your own website. We integrate a CMS so your team can manage content independently from day one.",
          points: ["Sanity or Contentful integration", "Custom content schemas for your needs", "Team training on CMS usage", "Blog, listings & page management"],
        },
        {
          title: "Analytics & Tracking",
          desc: "Tracking set up from day one — not bolted on after launch. You'll know exactly where your visitors come from and what they do on your site.",
          points: ["GA4 & Meta Pixel setup", "Goal & event tracking configuration", "Live traffic & conversion dashboard", "Post-launch performance review"],
        },
        {
          title: "Post-Launch Support",
          desc: "We don't hand over a site and disappear. Ongoing support, iterative improvements, and a team that's reachable when something needs fixing.",
          points: ["30-day post-launch support included", "Bug fixes & performance monitoring", "Ongoing retainer options available", "Iterative improvement cycles"],
        },
      ]}
      approachTitle="From first conversation to live website — here's what the process looks like."
      approach={[
        { title: "Discovery — we understand your business before touching a pixel", desc: "We look at your current site, your competitors, your audience, and what you need visitors to do. We ask the questions most developers skip — so the design is built around your goals, not our portfolio." },
        { title: "Design — wireframes and visuals, approved before we build", desc: "We present the full design before a single line of code is written. You review, give feedback, and sign off. No surprises at the end of an 8-week build." },
        { title: "Build — development in Next.js with tracking from day one", desc: "We build to the approved design — fast, clean, and with analytics configured from the start. You get regular progress updates, not radio silence for six weeks." },
        { title: "Launch — tested, reviewed, and live on your schedule", desc: "Full QA across devices and browsers before anything goes live. We handle the launch and stay close for the first 30 days to catch anything that needs attention." },
        { title: "Improve — we keep building on what the data tells us", desc: "After launch we review what visitors are doing, where they're dropping off, and what to improve next. A website is never finished — it gets better every month." },
      ]}
      whyTitle="What makes this different from any other web agency in the UAE."
      whyCards={[
        { title: "Built to connect with your marketing", desc: "Because we also run SEO, GEO, and paid media, your website is built to support your marketing — not fight it. Structure, speed, and content all aligned from the start." },
        { title: "Conversion first, aesthetics second", desc: "We care about whether your site converts — not whether it wins a design award. Every layout decision is made with your visitor's next action in mind." },
        { title: "UAE and India market knowledge", desc: "We understand what UAE and Indian audiences expect — payment integrations, language considerations, local compliance, and what builds trust in these markets specifically." },
        { title: "No handover and disappear", desc: "Most agencies hand over a site and move on. We stay involved — monthly improvements, ongoing support, and a team that's reachable when something needs fixing." },
      ]}
      faqIntro="Things people usually ask before getting started."
      faqs={[
        { q: "How long does a typical website build take?", a: "Between 6 and 10 weeks from kick-off to launch, depending on scope. A straightforward business site is closer to 6 weeks. Something with custom features, integrations, or e-commerce takes longer. You'll get a specific timeline in your proposal." },
        { q: "Can you redesign our existing site rather than build from scratch?", a: "Yes — and often that's the smarter option. We can take your existing site, fix what's slow or broken, and improve conversion without throwing everything out. We'll tell you honestly which approach makes more sense after seeing what you have." },
        { q: "Do you handle hosting and deployment?", a: "Yes. We deploy on Vercel — fast, globally distributed, and reliable. We set the whole thing up and can manage it ongoing if you'd prefer not to deal with it yourself." },
        { q: "We need Arabic language support. Can you build that?", a: "Yes — RTL layout support and Arabic content integration is something we build for regularly in the UAE market. It needs to be planned from the start of the design phase, not added at the end." },
        { q: "What payment gateways do you integrate for UAE businesses?", a: "We integrate with UAE-compatible gateways including Telr, PayTabs, and Stripe. We'll recommend the right one based on your business type, transaction volume, and which currencies you need to accept." },
        { q: "Do you offer ongoing maintenance after launch?", a: "Yes — all builds include 30 days of post-launch support. Beyond that, we offer monthly retainers for ongoing updates, improvements, and monitoring. Most clients stay on a retainer because the site keeps getting better." },
      ]}
      closing="A website that loads fast, ranks on search, and converts the traffic you're already getting — built specifically for your audience in the UAE and beyond."
    />
  );
}
