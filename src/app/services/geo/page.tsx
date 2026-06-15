import ServicePageTemplate from "@/components/sections/ServicePageTemplate";

export const metadata = {
  title: "GEO — Generative Engine Optimization — Unexus AI",
  description: "Get your business named and recommended inside AI answers from ChatGPT, Perplexity, and Gemini — not just ranked on Google.",
};

export default function GEOPage() {
  return (
    <ServicePageTemplate
      num="06"
      accent="#6366f1"
      badge="Service 06 — GEO"
      headline="Show up when the answer comes from AI, not a search bar"
      body="Your customers are increasingly skipping Google and asking ChatGPT, Perplexity, and Gemini directly. GEO — Generative Engine Optimization — is how we get your business named, quoted, and recommended inside those answers, the same way SEO got you ranked on Google."
      specialisms={["AI Answer Visibility", "Entities & Schema", "Content for LLMs"]}
      outcomes={[
        { value: "3+", label: "AI engines we optimise for" },
        { value: "Day 1", label: "Tracking your AI mentions" },
        { value: "24/7", label: "Presence as people ask AI" },
      ]}
      subServices={[
        { title: "AI Answer Visibility", desc: "We track what your customers are actually asking ChatGPT, Perplexity, and Gemini — then make sure your brand is the one those engines reach for when they answer." },
        { title: "Entities, Schema & Structured Data", desc: "AI engines trust sources they can understand. We structure your site, reviews, and listings so the models can confidently pull facts about your business — and get them right." },
        { title: "Content Built for LLMs", desc: "The pages that get quoted by AI are clear, specific, and genuinely useful. We write and structure content the way these engines like to cite — not keyword-stuffed filler." },
      ]}
      faqs={[
        { q: "What exactly is GEO?", a: "Generative Engine Optimization — getting your business mentioned and recommended inside AI-generated answers from tools like ChatGPT, Perplexity, and Gemini, the same way SEO gets you ranked on Google." },
        { q: "Is this different from SEO?", a: "Related, but not the same. Good SEO still helps, but AI engines weigh things like clear structure, authority, and citable facts differently. GEO focuses on what makes a model choose to mention you." },
        { q: "Can you actually influence what ChatGPT says?", a: "Not with a switch — nobody can promise that. What we can do is shape the signals these models rely on: structured data, authoritative content, and consistent mentions across the web. Over time, that moves the needle." },
        { q: "How do you measure results?", a: "We track how often your brand shows up for the prompts your customers actually use, across the major engines, and watch that share grow month over month." },
        { q: "Do I still need GEO if my SEO is already good?", a: "Increasingly, yes. A growing share of searches now end inside an AI answer with no click at all. If you're only optimised for the classic results page, you're invisible to that audience." },
      ]}
    />
  );
}
