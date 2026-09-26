"use client";

import { useEffect } from "react";

/**
 * Motion layer for redesign-2 pages. Nothing is hidden in the server HTML:
 * blocks marked [data-lx-reveal] are only pre-hidden here, after JS loads, and
 * only when still below the fold, so a slow phone never sees a blank page.
 */
export default function LxMotion() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("lx-js");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add("lx-in");
          io.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    if (!reduce) {
      const vh = window.innerHeight;
      document.querySelectorAll<HTMLElement>("[data-lx-reveal]").forEach((el) => {
        if (el.getBoundingClientRect().top < vh * 0.92) return;
        el.classList.add("lx-pre");
        io.observe(el);
      });
    }
    // Pause looping CSS animations (marquees, sheens, bobbing, pulses) while
    // their block is off-screen, so they don't burn battery out of sight.
    const loops = new IntersectionObserver(
      (entries) => {
        for (const e of entries) e.target.classList.toggle("lx-off", !e.isIntersecting);
      },
      { rootMargin: "120px 0px" },
    );
    document
      .querySelectorAll(".lx-logos, .lx-foot, .lx-svc, .lx-orbit, .lx-stage, .lx-founder, .lx-hero__copy, .lx-ind")
      .forEach((el) => loops.observe(el));

    return () => {
      io.disconnect();
      loops.disconnect();
      root.classList.remove("lx-js");
    };
  }, []);
  return null;
}
