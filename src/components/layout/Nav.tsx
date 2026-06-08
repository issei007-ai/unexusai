"use client";

import { useState, useEffect } from "react";
import { NAV_LINKS } from "@/lib/constants";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="sticky top-0 z-50 transition-all"
      style={{
        background: scrolled
          ? "rgba(10,15,30,0.92)"
          : "rgba(10,15,30,0.7)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: scrolled
          ? "1px solid rgba(255,255,255,0.08)"
          : "1px solid transparent",
        boxShadow: scrolled ? "0 4px 32px rgba(0,0,0,0.3)" : "none",
      }}
    >
      <div className="container flex items-center justify-between h-16">
        {/* Logo */}
        <a
          href="/"
          className="font-bold text-xl tracking-tight text-white flex items-center gap-1.5"
          style={{ fontFamily: "var(--font-display)" }}
        >
          <span
            className="inline-flex w-7 h-7 rounded-lg items-center justify-center text-xs font-bold text-white"
            style={{ background: "linear-gradient(135deg,var(--color-accent-500),var(--color-accent-600))" }}
          >
            R
          </span>
          richa
          <span style={{ color: "var(--color-accent-400)" }}>.</span>
        </a>

        {/* Desktop links */}
        <div
          className="hidden md:flex items-center gap-8 text-sm font-medium"
          style={{ color: "var(--color-brand-300)" }}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-white transition-colors relative group"
            >
              {link.label}
              <span
                className="absolute -bottom-0.5 left-0 w-0 h-px group-hover:w-full transition-all duration-300"
                style={{ background: "var(--color-accent-400)" }}
              />
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a href="/contact" className="text-sm font-medium hover:text-white transition-colors" style={{ color: "var(--color-brand-300)" }}>
            Contact
          </a>
          <a href="/book" className="btn btn-primary btn-sm">
            Book a Call
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${open ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${open ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${open ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          className="md:hidden px-6 py-5 flex flex-col gap-4"
          style={{
            background: "rgba(10,15,30,0.98)",
            borderTop: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium hover:text-white transition-colors"
              style={{ color: "var(--color-brand-300)" }}
            >
              {link.label}
            </a>
          ))}
          <a href="/book" className="btn btn-primary btn-sm w-fit mt-2">
            Book a Call
          </a>
        </div>
      )}
    </nav>
  );
}
