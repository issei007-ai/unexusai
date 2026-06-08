"use client";
import { useEffect, useRef, useState } from "react";

interface Props {
  children: string;
  className?: string;
  delay?: number;      // base delay in seconds
  stagger?: number;    // per-word stagger in seconds
  once?: boolean;
}

export default function SplitText({
  children,
  className = "",
  delay = 0,
  stagger = 0.05,
  once = true,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          if (once) obs.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [once]);

  const words = children.split(" ");

  return (
    <span ref={ref} className={className} aria-label={children}>
      {words.map((word, wi) => (
        <span
          key={wi}
          style={{ display: "inline-block", overflow: "hidden", marginRight: "0.28em" }}
          aria-hidden
        >
          <span
            style={{
              display: "inline-block",
              transform: visible ? "translateY(0)" : "translateY(115%)",
              transition: `transform 0.75s cubic-bezier(0.22,1,0.36,1) ${delay + wi * stagger}s`,
            }}
          >
            {word}
          </span>
        </span>
      ))}
    </span>
  );
}
