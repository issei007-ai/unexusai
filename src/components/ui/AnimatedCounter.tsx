"use client";
import { useEffect, useRef, useState } from "react";

function parseNum(s: string) {
  return parseFloat(s.replace(/[^0-9.]/g, "")) || 0;
}

function format(n: number, original: string) {
  const prefix = original.match(/^[£$€]*/)?.[0] ?? "";
  const suffix = original.match(/[%+hkMB]*$/)?.[0] ?? "";
  const rounded = original.includes(".") ? n.toFixed(1) : Math.round(n).toString();
  return prefix + rounded + suffix;
}

// Ease-out cubic
function easeOut(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

export default function AnimatedCounter({
  value,
  className,
  style,
}: {
  value: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState("0");
  const [started, setStarted] = useState(false);
  const target = parseNum(value);

  // Start when in view
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setStarted(true); obs.disconnect(); } },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Animate
  useEffect(() => {
    if (!started || target === 0) return;
    const DURATION = 1800;
    const startTime = performance.now();

    const tick = (now: number) => {
      const t = Math.min((now - startTime) / DURATION, 1);
      const current = easeOut(t) * target;
      setDisplay(format(current, value));
      if (t < 1) requestAnimationFrame(tick);
      else setDisplay(value); // snap to exact value
    };

    requestAnimationFrame(tick);
  }, [started, target, value]);

  return (
    <div ref={ref} className={className} style={style}>
      {display}
    </div>
  );
}
