/** Field + section schema that drives both the page rendering and the /admin/content editor. */

export type CmsField = {
  name: string;
  label: string;
  type: "text" | "textarea" | "list";
  help?: string;
};

export type CmsSection = {
  key: string;
  label: string;
  group: string;
  fields: CmsField[];
  defaults: Record<string, unknown>;
};

// ── Homepage: Hero ───────────────────────────────────────────────────────────
export const HOME_HERO_DEFAULTS = {
  badge: "AI-Powered Digital Marketing • Precision. Performance. Growth.",
  headlineFixed: "You're spending on marketing",
  rotatingLines: [
    "You're not seeing it in revenue",
    "You're not getting enough leads",
    "You're not showing up on AI search",
  ],
  sub: "We fix that — with GEO, Google Ads, Meta Ads, Digital Marketing and website development built to work together, for businesses across UAE, KSA, India and beyond.",
  ctaPrimary: "Book Free Consultation",
  ctaSecondary: "Book Free Call →",
  trustLabel: "Our clients span industries and time zones.",
};

export const SECTIONS: CmsSection[] = [
  {
    key: "home.hero",
    label: "Hero",
    group: "Homepage",
    fields: [
      { name: "badge", label: "Top badge", type: "text" },
      { name: "headlineFixed", label: "Headline — fixed line", type: "text" },
      { name: "rotatingLines", label: "Headline — rotating lines", type: "list", help: "One line per row. These type in/out under the fixed headline." },
      { name: "sub", label: "Sub-headline", type: "textarea" },
      { name: "ctaPrimary", label: "Primary button label", type: "text" },
      { name: "ctaSecondary", label: "Secondary button label", type: "text" },
      { name: "trustLabel", label: "Client strip label", type: "text" },
    ],
    defaults: HOME_HERO_DEFAULTS,
  },
];

export function getSectionSchema(key: string): CmsSection | undefined {
  return SECTIONS.find((s) => s.key === key);
}
