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
      data-nav
      className="sticky top-0 z-50 transition-all"
      style={{
        // Solid-ish bg instead of backdrop-filter blur — a sticky blurred bar
        // re-samples the whole page behind it every scroll frame (very laggy on
        // integrated GPUs). Opaque background looks the same on a dark theme.
        background: scrolled
          ? "rgba(8,12,24,0.96)"
          : "rgba(8,12,24,0.82)",
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
          className="flex items-center text-white"
          style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "1.05rem", letterSpacing: "0.22em", textTransform: "uppercase" }}
        >
          Unexus&nbsp;<span className="logo-ai">AI</span>
        </a>

        {/* Desktop links */}
        <div
          className="hidden md:flex items-center gap-8 text-sm font-medium"
          style={{ color: "var(--color-brand-300)" }}
        >
          {NAV_LINKS.map((link) =>
            link.children ? (
              <div key={link.href} className="nav-dd relative group">
                <a href={link.href} className="hover:text-white transition-colors inline-flex items-center gap-1" aria-haspopup="true">
                  {link.label}
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="nav-dd__chev">
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </a>
                <div className="nav-dd__panel" role="menu">
                  {link.children.map((c) => (
                    <a key={c.href} href={c.href} role="menuitem" className="nav-dd__item">
                      <b>{c.label}</b>
                      {c.desc && <span>{c.desc}</span>}
                    </a>
                  ))}
                </div>
              </div>
            ) : (
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
            ),
          )}
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
          data-nav-menu
          className="md:hidden px-6 py-5 flex flex-col gap-4"
          style={{
            background: "rgba(10,15,30,0.98)",
            borderTop: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {NAV_LINKS.flatMap((link) =>
            link.children
              ? link.children.map((c) => (
                  <a
                    key={c.href}
                    href={c.href}
                    className="text-sm font-medium hover:text-white transition-colors"
                    style={{ color: "var(--color-brand-300)" }}
                  >
                    {c.label}
                  </a>
                ))
              : [
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-sm font-medium hover:text-white transition-colors"
                    style={{ color: "var(--color-brand-300)" }}
                  >
                    {link.label}
                  </a>,
                ],
          )}
          <a href="/book" className="btn btn-primary btn-sm w-fit mt-2">
            Book a Call
          </a>
        </div>
      )}
    </nav>
  );
}
