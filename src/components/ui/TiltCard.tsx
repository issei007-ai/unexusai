"use client";
import { useRef, ReactNode, CSSProperties } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  intensity?: number;
  scale?: number;
}

export default function TiltCard({
  children,
  className = "",
  style,
  intensity = 10,
  scale = 1.02,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const onEnter = () => {
    const el = ref.current;
    if (!el) return;
    // Only set willChange on hover — avoids permanently promoting every card to a GPU layer
    el.style.willChange = "transform";
  };

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotX = (y - 0.5) * -intensity;
    const rotY = (x - 0.5) * intensity;
    el.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(${scale})`;
    el.style.transition = "transform 0.08s ease";
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)";
    el.style.transition = "transform 0.5s cubic-bezier(0.22,1,0.36,1)";
    // Reset willChange after animation settles
    setTimeout(() => {
      if (ref.current) ref.current.style.willChange = "auto";
    }, 550);
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{ ...style, transformStyle: "preserve-3d" }}
      onMouseEnter={onEnter}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </div>
  );
}
