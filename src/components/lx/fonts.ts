import { Funnel_Display, Funnel_Sans } from "next/font/google";

// Redesign-2 type system: Funnel Display for headings, Funnel Sans for body.
export const lxDisplay = Funnel_Display({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--lx-font-display",
  display: "swap",
});

export const lxSans = Funnel_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--lx-font-sans",
  display: "swap",
});

export const lxFontVars = `${lxDisplay.variable} ${lxSans.variable}`;
