import Nav from "@/components/layout/Nav";
import { lxFontVars } from "@/components/lx/fonts";
import LxMotion from "@/components/lx/LxMotion";
import LxScroll from "@/components/lx/LxScroll";
import LxFooter from "@/components/lx/LxFooter";
import "@/components/lx/lx.css";
import "@/components/lx/lx-svc.css";
import "@/components/lx/lx-motion.css";
import "@/components/lx/lx-pages.css";

/** Page frame for every redesign-2 page: nav, light theme, motion, footer. */
export default function LxShell({ children, before }: { children: React.ReactNode; before?: React.ReactNode }) {
  return (
    <>
      {before}
      <Nav />
      <div className={`lx ${lxFontVars}`}>
        <LxMotion />
        <LxScroll />
        <main>{children}</main>
        <LxFooter />
      </div>
    </>
  );
}
