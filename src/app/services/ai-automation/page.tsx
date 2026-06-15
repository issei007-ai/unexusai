import ServicePageTemplate from "@/components/sections/ServicePageTemplate";

export const metadata = {
  title: "AI Automation — Unexus AI",
  description: "AI agents, WhatsApp automation, RAG pipelines, and voice systems built around your actual bottlenecks. For businesses across the UAE and Middle East.",
};

export default function AIAutomationPage() {
  return (
    <ServicePageTemplate
      num="03"
      accent="#7c3aed"
      badge="Service 03 — AI Automation"
      headline="Your team is spending hours on work that shouldn't need a human."
      body="Lead follow-ups, appointment scheduling, data entry, customer queries — businesses across the UAE are paying people to do things AI can handle faster, more accurately, and around the clock. We find exactly what's slowing your team down and build automation that takes it off their plate permanently."
      specialisms={["AI Agents", "WhatsApp Automation", "RAG Pipelines", "CRM Integration", "Voice AI", "Lead Qualification"]}
      primaryCta={{ label: "Book a free discovery call", href: "/book" }}
      secondaryCta={{ label: "See how it works →", href: "#contact" }}
      audienceTitle="For teams doing manually what should already be automated."
      audienceIntro="If your team is spending time on any of these, there's a faster way."
      audience={[
        { title: "Real estate", desc: "Agents manually qualifying leads, chasing follow-ups, and sending the same WhatsApp messages 50 times a day." },
        { title: "Healthcare & wellness", desc: "Receptionists spending half their day on appointment reminders and rebooking calls." },
        { title: "Hospitality & F&B", desc: "Reservation enquiries sitting unanswered after hours, losing bookings to competitors who respond instantly." },
        { title: "Retail & e-commerce", desc: "Customer service teams buried in repetitive queries — order status, returns, product questions." },
        { title: "Startups & scale-ups", desc: "Trying to scale operations without scaling headcount — and hitting a wall doing it manually." },
      ]}
      includedTitle="AI built around your actual bottlenecks — not a generic demo."
      includedIntro="We start by finding what's worth automating. Then we build it, test it, and keep it running."
      subServices={[
        {
          title: "AI Agents",
          desc: "Custom-built agents that handle the tasks your team shouldn't be doing — lead qualification, outreach, data processing, internal workflows. Built around how you actually work.",
          points: ["Lead qualification & scoring agents", "Automated outreach & follow-up sequences", "Internal workflow automation", "Multi-step agent orchestration"],
        },
        {
          title: "WhatsApp & Chat Automation",
          desc: "WhatsApp is the primary communication channel for businesses across the UAE and Middle East. We build automated flows that respond instantly, qualify leads, and book appointments — 24/7.",
          points: ["WhatsApp Business API integration", "Automated lead qualification flows", "Appointment booking & reminders", "Handoff to human agent when needed"],
        },
        {
          title: "RAG Pipelines",
          desc: "An AI that only knows what it was trained on isn't much use for your business. RAG pipelines connect AI to your own data — product catalogues, policies, past conversations — so answers are accurate, not guesses.",
          points: ["Custom knowledge base setup", "Document & data ingestion pipelines", "Accurate, source-grounded responses", "Regular knowledge base updates"],
        },
        {
          title: "Voice AI",
          desc: "A voice system that picks up, asks the right questions, and either books the appointment or routes to the right person — running around the clock without adding headcount.",
          points: ["Inbound call handling & qualification", "Appointment scheduling via voice", "Arabic & English language support", "CRM integration & call logging"],
        },
        {
          title: "CRM & Tool Integration",
          desc: "Automation only works if it connects to the tools your team already uses. We integrate with your existing CRM, calendar, and communication stack — nothing siloed.",
          points: ["HubSpot, Salesforce & Zoho integration", "Calendar & booking system sync", "Slack, email & notification routing", "Custom API integrations as needed"],
        },
        {
          title: "Testing, Monitoring & Maintenance",
          desc: "AI systems drift over time — they need monitoring, retraining, and the occasional fix. We don't build and disappear. Ongoing support is part of how we work.",
          points: ["Pre-launch testing & quality assurance", "Performance monitoring & alerts", "Regular model updates & retraining", "Monthly performance review"],
        },
      ]}
      approachTitle="We find what's worth automating before we build anything."
      approach={[
        { title: "Workflow audit — find what's actually worth automating", desc: "We spend time understanding how your team works — where the hours go, what's repetitive, and what has the highest impact if automated. Not everything should be automated. We'll tell you honestly what will and won't work." },
        { title: "Design — we map the automation before building it", desc: "We design the full logic flow — what triggers the automation, what it does, what happens at each decision point, and when it hands off to a human. You review and approve before a line of code is written." },
        { title: "Build — developed and integrated with your existing tools", desc: "We build the automation and connect it to your CRM, WhatsApp, calendar, or whatever tools you already use. Integration is usually most of the work — we treat it as the priority, not an afterthought." },
        { title: "Test — properly, before anything touches real customers", desc: "We test every scenario — including the edge cases — before going live. Getting this wrong erodes trust fast, so we don't rush it. You'll see it working before your customers do." },
        { title: "Monitor — we keep it running and improve it over time", desc: "After launch we monitor performance, catch anything unexpected, and keep improving. AI systems need ongoing attention — we stay on retainer so you're never left managing it alone." },
      ]}
      whyTitle="What makes this different from any other AI agency in the UAE."
      whyCards={[
        { title: "WhatsApp-first for the UAE market", desc: "WhatsApp is how UAE businesses communicate. We build automation around it natively — not as a bolt-on to a system designed for email-first markets." },
        { title: "We audit before we build", desc: "Most agencies want to start building immediately. We spend time finding what's actually worth automating first — so you don't pay to automate the wrong thing." },
        { title: "Connected to your whole system", desc: "Because we also handle your marketing and website, automation connects to everything — not just one isolated tool. Leads captured on your site flow straight into your CRM and trigger the right follow-up automatically." },
        { title: "Built to last, not just to demo well", desc: "We test properly, monitor ongoing, and stay involved after launch. AI systems that aren't maintained break. We make sure yours doesn't." },
      ]}
      faqIntro="Things people usually ask before getting started."
      faqs={[
        { q: "We're not a tech company. Can you still build this for us?", a: "Yes — most of our automation clients are not tech businesses. Hospitality groups, real estate agencies, healthcare clinics, retail brands. We handle all the technical complexity and build something your team can actually use without needing a developer on call." },
        { q: "How long does it take to build an AI automation?", a: "A straightforward WhatsApp qualification flow or appointment bot takes 2 to 4 weeks. Something with multiple agents, a RAG pipeline, and deep CRM integration is closer to 8 to 12 weeks. We give you a specific timeline after the workflow audit." },
        { q: "Which CRMs do you integrate with?", a: "HubSpot, Salesforce, Zoho, and Pipedrive are the most common. We also integrate with custom databases and internal systems. If you're already using a tool, we'll work with it rather than ask you to switch." },
        { q: "Does the AI support Arabic?", a: "Yes — Arabic and English language support is something we build for regularly in the UAE and wider Middle East market. It's planned from the design phase, not added at the end." },
        { q: "What happens if the AI makes a mistake?", a: "Every system we build has a human handoff point for cases the AI can't handle confidently. We also test extensively before launch and monitor ongoing. If something goes wrong after launch, we fix it fast — it's part of what the retainer covers." },
        { q: "Do you offer ongoing support after the build?", a: "Yes — and we recommend it. AI systems need monitoring, retraining, and regular updates. We offer monthly retainers that cover ongoing maintenance, performance reviews, and improvements as your business grows." },
      ]}
      closing="Hours back every week, faster response times, fewer manual errors — and a team that focuses on work that actually needs them, not the repetitive stuff AI can handle."
    />
  );
}
