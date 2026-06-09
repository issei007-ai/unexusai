"use client";
import { useEffect, useRef } from "react";

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    // Cache doc height — reading scrollHeight per scroll frame forces a reflow.
    let docHeight = 1;
    const measure = () => {
      docHeight = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    };
    measure();

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        bar.style.transform = `scaleX(${Math.min(1, window.scrollY / docHeight)})`;
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <div
      ref={barRef}
      className="scroll-progress-bar"
      style={{ transformOrigin: "left center" }}
    />
  );
}
