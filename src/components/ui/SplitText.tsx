"use client";
import { useEffect, useRef, useState } from "react";

interface Props {
  children: string;
  className?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
}

export default function SplitText({
  children,
  className = "",
  delay = 0,
  stagger = 0.055,
  once = true,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) obs.disconnect();
        }
      },
      {
        // Low threshold so even 5% visible triggers reveal.
        // Positive bottom rootMargin fires 80px before element reaches viewport bottom
        // — avoids text stuck invisible waiting to be scrolled into view.
        threshold: 0.05,
        rootMargin: "0px 0px 80px 0px",
      }
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
          style={{
            display: "inline-block",
            overflow: "hidden",
            marginRight: "0.28em",
            verticalAlign: "bottom",
          }}
          aria-hidden
        >
          <span
            style={{
              display: "inline-block",
              transform: visible ? "translateY(0)" : "translateY(115%)",
              transition: `transform 0.7s cubic-bezier(0.22,1,0.36,1) ${delay + wi * stagger}s`,
            }}
          >
            {word}
          </span>
        </span>
      ))}
    </span>
  );
}
