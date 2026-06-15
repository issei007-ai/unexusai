import ServicePageTemplate from "@/components/sections/ServicePageTemplate";

export const metadata = {
  title: "AI Training — Unexus AI",
  description: "Practical AI training and workflow redesign — built around the tools your team already has.",
};

export default function AITrainingPage() {
  return (
    <ServicePageTemplate
      num="04"
      accent="#10b981"
      badge="Service 04 — AI Training"
      headline="Your team probably has the tools — just not the habits yet"
      body="Most teams already have ChatGPT, Copilot, or something similar sitting half-used in a toolbar somewhere. The gap usually isn't access, it's knowing what to actually do with it. We run hands-on sessions that change daily habits, not just hand people another tool to ignore."
      specialisms={["Prompt Engineering", "AI Adoption", "Workflow Design"]}
      outcomes={[
        { value: "92%", label: "Team tool adoption" },
        { value: "3x", label: "Faster everyday workflows" },
        { value: "40+", label: "Teams trained" },
      ]}
      subServices={[
        { title: "Prompt Engineering", desc: "Small changes to how you ask usually make a big difference to what you get back. We teach the actual habits, not just a cheat sheet of one-liners to copy and paste." },
        { title: "AI Adoption & Change Management", desc: "A one-day workshop rarely changes anything a month later. We run programmes that build the habit over time, so it actually sticks once we're gone." },
        { title: "Workflow Design", desc: "We look at how your team actually works, find the parts AI is genuinely good at, and rebuild those steps — rather than bolting AI onto a process that was never designed for it." },
      ]}
      faqs={[
        { q: "Is this training online or in-person?", a: "Either, or a mix — remote workshops, in-person sessions, and some material people can come back to afterwards. We'll suggest what fits your team rather than push one format." },
        { q: "How do you measure the impact of training?", a: "We agree on what success looks like upfront, usually time saved and how much people are actually using the tools afterwards, and check in on those numbers as we go." },
        { q: "Do you tailor the training to our specific tools and use cases?", a: "Always — there's no generic version of this. Everything is built around the tools you already use and the problems your team is actually trying to solve." },
        { q: "What's the typical programme length?", a: "Most run 4 to 8 weeks, with optional monthly sessions afterwards for teams that want to keep building on it." },
        { q: "Can we train specific departments rather than the whole company?", a: "Yes, and often that's the better starting point. We usually begin with one team — marketing or ops tends to be common — and expand once it's working." },
      ]}
    />
  );
}
