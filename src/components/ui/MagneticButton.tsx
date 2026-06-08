"use client";
import { useRef, ReactNode } from "react";

interface Props {
  children: ReactNode;
  href?: string;
  className?: string;
  strength?: number;
  onClick?: () => void;
}

export default function MagneticButton({
  children,
  href,
  className = "",
  strength = 0.32,
  onClick,
}: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLAnchorElement & HTMLButtonElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const rect = wrap.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * strength;
    const y = (e.clientY - rect.top - rect.height / 2) * strength;
    wrap.style.transform = `translate(${x}px,${y}px)`;
    wrap.style.transition = "transform 0.15s ease";
  };

  const onLeave = () => {
    if (!wrapRef.current) return;
    wrapRef.current.style.transform = "translate(0,0)";
    wrapRef.current.style.transition = "transform 0.55s cubic-bezier(0.22,1,0.36,1)";
  };

  return (
    <div
      ref={wrapRef}
      style={{ display: "inline-block" }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {href ? (
        <a ref={btnRef as React.Ref<HTMLAnchorElement>} href={href} className={className}>
          {children}
        </a>
      ) : (
        <button ref={btnRef as React.Ref<HTMLButtonElement>} className={className} onClick={onClick}>
          {children}
        </button>
      )}
    </div>
  );
}
