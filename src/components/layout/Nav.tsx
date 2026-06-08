"use client";

import { useState } from "react";
import { NAV_LINKS } from "@/lib/constants";

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav
      className="sticky top-0 z-50 bg-[var(--color-brand-950)] backdrop-blur-md"
      style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
    >
      <div className="container flex items-center justify-between h-16">
        {/* Logo */}
        <a href="/" className="font-bold text-xl tracking-tight text-white" style={{ fontFamily: "var(--font-display)" }}>
          richa<span style={{ color: "var(--color-accent-400)" }}>.</span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium" style={{ color: "var(--color-brand-300)" }}>
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="hover:text-white transition-colors">
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <a href="/book" className="hidden md:inline-flex btn btn-primary btn-sm">
          Book a Call
        </a>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-0.5 bg-white transition-all ${open ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-5 h-0.5 bg-white transition-all ${open ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-0.5 bg-white transition-all ${open ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t px-6 py-4 flex flex-col gap-4" style={{ borderColor: "rgba(255,255,255,0.08)", background: "var(--color-brand-950)" }}>
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="text-sm font-medium hover:text-white transition-colors" style={{ color: "var(--color-brand-300)" }}>
              {link.label}
            </a>
          ))}
          <a href="/book" className="btn btn-primary btn-sm w-fit mt-2">Book a Call</a>
        </div>
      )}
    </nav>
  );
}
