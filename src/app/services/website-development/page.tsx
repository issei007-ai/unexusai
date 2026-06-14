import ServicePageTemplate from "@/components/sections/ServicePageTemplate";

export const metadata = {
  title: "Website Development — DigiExperts",
  description: "Websites built in Next.js — fast, accessible, and built around getting visitors to do something.",
};

export default function WebsiteDevelopmentPage() {
  return (
    <ServicePageTemplate
      num="02"
      accent="#06b6d4"
      badge="Service 02 — Website Development"
      headline="A website that's actually trying to do something"
      body="A lot of websites exist just to exist. We build ours in Next.js to load fast, work properly on every device, and nudge visitors toward becoming customers — then we keep an eye on whether that's actually happening."
      specialisms={["Next.js", "Edge Performance", "CRO"]}
      outcomes={[
        { value: "0.9s", label: "Average page load time" },
        { value: "+64%", label: "Conversion rate uplift" },
        { value: "100", label: "Lighthouse performance score" },
      ]}
      subServices={[
        { title: "Next.js Development", desc: "We build with the App Router, TypeScript, and modern tooling from day one, so the site holds up as you grow instead of needing a rebuild in two years." },
        { title: "Edge & Performance", desc: "Slow sites lose people before they've read a word. We optimise for Core Web Vitals and real-world load times — not just a score in a testing tool." },
        { title: "Conversion Rate Optimisation", desc: "Often the fastest way to grow revenue is getting more out of the traffic you already have. We test changes, see what actually moves the numbers, and build on that." },
      ]}
      faqs={[
        { q: "Why Next.js specifically?", a: "It's the framework we'd pick for our own products — good performance, a solid developer experience, and it plays nicely with SEO. Not every project strictly needs it, but most benefit." },
        { q: "Do you offer CMS integration?", a: "Yes, usually Sanity or Contentful. If you've already got a CMS you're happy with, we can normally work with that instead of switching you over." },
        { q: "What does a typical build timeline look like?", a: "Somewhere between 6 and 12 weeks from kick-off to launch, depending on scope. You'll get a proper timeline in the proposal, not just a rough guess." },
        { q: "Do you handle hosting and deployment?", a: "We usually deploy on Vercel and can set the whole thing up for you. If you'd like us to keep an eye on hosting afterwards, that's available too." },
        { q: "Can you redesign an existing site rather than build from scratch?", a: "Yes, and often that's the better option. We can take an existing site and improve speed and conversion without throwing everything out and starting over." },
      ]}
    />
  );
}
