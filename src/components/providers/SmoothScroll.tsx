"use client";
import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Buttery smooth scrolling on desktop via Lenis.
 * Mobile keeps NATIVE momentum scroll (better UX + perf on touch).
 * Disabled entirely for prefers-reduced-motion.
 * Exposes --scroll-y on <html> for any CSS-driven parallax.
 */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;

    // Mobile / reduced-motion: native scroll, just publish scroll position.
    if (coarse || reduced) {
      const onScroll = () =>
        document.documentElement.style.setProperty("--scroll-y", String(window.scrollY));
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    lenis.on("scroll", ({ scroll }: { scroll: number }) => {
      document.documentElement.style.setProperty("--scroll-y", String(scroll));
    });

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
