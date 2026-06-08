"use client";
import { useEffect, useRef, useState, ReactNode, CSSProperties } from "react";

type Direction = "up" | "down" | "left" | "right" | "scale" | "none";

interface Props {
  children: ReactNode;
  delay?: number;           // seconds
  duration?: number;        // seconds
  direction?: Direction;
  distance?: number;        // px
  className?: string;
  style?: CSSProperties;
  threshold?: number;
}

function getHidden(dir: Direction, dist: number): string {
  switch (dir) {
    case "up":    return `translateY(${dist}px) scale(0.97)`;
    case "down":  return `translateY(-${dist}px)`;
    case "left":  return `translateX(${dist}px)`;
    case "right": return `translateX(-${dist}px)`;
    case "scale": return `scale(0.88)`;
    default:      return "none";
  }
}

export default function ScrollReveal({
  children,
  delay = 0,
  duration = 0.65,
  direction = "up",
  distance = 36,
  className = "",
  style,
  threshold = 0.12,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold, rootMargin: "0px 0px 60px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : getHidden(direction, distance),
        transition: `opacity ${duration}s cubic-bezier(0.22,1,0.36,1) ${delay}s,
                     transform ${duration}s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}
