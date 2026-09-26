"use client";

import { useEffect, useRef } from "react";

/**
 * Scroll choreography for redesign-2 pages (GSAP ScrollTrigger + Lenis).
 *
 * Rules this file keeps:
 *  - Everything is visible in the server HTML. Start states are only applied
 *    here, to things still below the fold, so nothing flashes or goes missing.
 *  - prefers-reduced-motion gets native scrolling and no scroll effects.
 *  - Hover effects only run on a fine pointer.
 */
export default function LxScroll() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let killed = false;
    const cleanups: Array<() => void> = [];

    (async () => {
      const [{ gsap }, { ScrollTrigger }, { default: Lenis }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
        import("lenis"),
      ]);
      if (killed) return;
      gsap.registerPlugin(ScrollTrigger);

      const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const $ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => Array.from(r.querySelectorAll<T>(s) as NodeListOf<T>);
      const below = (el: Element) => el.getBoundingClientRect().top > window.innerHeight * 0.9;

      // ── Pointer effects (fine pointers only, work with reduced motion too) ──
      if (fine) {
        // Cursor spotlight on cards
        const onSpot = (e: PointerEvent) => {
          const el = e.currentTarget as HTMLElement;
          const r = el.getBoundingClientRect();
          el.style.setProperty("--px", `${e.clientX - r.left}px`);
          el.style.setProperty("--py", `${e.clientY - r.top}px`);
          if (el.dataset.lxTilt !== undefined && !reduce) {
            const nx = (e.clientX - r.left) / r.width - 0.5;
            const ny = (e.clientY - r.top) / r.height - 0.5;
            el.style.setProperty("--ry", `${nx * 7}deg`);
            el.style.setProperty("--rx", `${-ny * 7}deg`);
          }
        };
        const offSpot = (e: PointerEvent) => {
          const el = e.currentTarget as HTMLElement;
          el.style.setProperty("--ry", "0deg");
          el.style.setProperty("--rx", "0deg");
        };
        $(".lx-spot").forEach((el) => {
          el.addEventListener("pointermove", onSpot);
          el.addEventListener("pointerleave", offSpot);
          cleanups.push(() => {
            el.removeEventListener("pointermove", onSpot);
            el.removeEventListener("pointerleave", offSpot);
          });
        });

        // Magnetic buttons (uses the `translate` property so :active scale still works)
        if (!reduce) {
          $(".lx-btn, .lx-ind__cta").forEach((b) => {
            const move = (e: PointerEvent) => {
              const r = b.getBoundingClientRect();
              const dx = e.clientX - (r.left + r.width / 2);
              const dy = e.clientY - (r.top + r.height / 2);
              b.style.setProperty("--mx", `${dx * 0.22}px`);
              b.style.setProperty("--my", `${dy * 0.32}px`);
            };
            const leave = () => {
              b.style.setProperty("--mx", "0px");
              b.style.setProperty("--my", "0px");
            };
            b.addEventListener("pointermove", move);
            b.addEventListener("pointerleave", leave);
            cleanups.push(() => {
              b.removeEventListener("pointermove", move);
              b.removeEventListener("pointerleave", leave);
            });
          });
        }
      }

      if (reduce) return;

      // ── Smooth scroll ─────────────────────────────────────────────────────
      const lenis = new Lenis({ lerp: 0.11, anchors: { offset: -72 }, autoRaf: false });
      lenis.on("scroll", ScrollTrigger.update);
      const raf = (t: number) => lenis.raf(t * 1000);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);
      cleanups.push(() => {
        gsap.ticker.remove(raf);
        lenis.destroy();
      });

      const ctx = gsap.context(() => {
        // ── Progress bar + nav that hides on the way down ─────────────────
        if (barRef.current) {
          gsap.fromTo(barRef.current, { scaleX: 0 }, {
            scaleX: 1, ease: "none",
            scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
          });
        }
        const nav = document.querySelector<HTMLElement>("[data-nav]");
        if (nav) {
          ScrollTrigger.create({
            start: 0, end: "max",
            onUpdate: (self) => nav.classList.toggle("lx-nav-hide", self.direction === 1 && self.scroll() > 240),
          });
          cleanups.push(() => nav.classList.remove("lx-nav-hide"));
        }

        // ── Hero scroll-out: copy lifts away, visual sinks and shrinks ────
        $(".lx-hero, .lx-shero, .lx-phero").forEach((hero) => {
          const copy = hero.querySelector(".lx-hero__copy");
          const vis = hero.querySelector(".lx-stage, .lx-shero__vis > *");
          const tl = gsap.timeline({ scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true } });
          if (copy) tl.to(copy, { yPercent: -18, opacity: 0.15, ease: "none" }, 0);
          if (vis) tl.to(vis, { y: 90, scale: 0.9, rotate: -2, ease: "none" }, 0);
        });

        // ── Headings fill word by word as they scroll through ──────────────
        $("[data-lx-fill]").forEach((h) => {
          const words = $(".lx-w > span", h);
          if (!words.length || !below(h)) return;
          gsap.fromTo(words, { opacity: 0.12, yPercent: 40 }, {
            opacity: 1, yPercent: 0, stagger: 0.06, ease: "none",
            scrollTrigger: { trigger: h, start: "top 88%", end: "top 45%", scrub: 0.6 },
          });
        });

        // ── Staggered card entrances (batched per row) ───────────────────
        const batch = (sel: string, from: gsap.TweenVars, to: gsap.TweenVars = {}) => {
          const els = $(sel).filter(below);
          if (!els.length) return;
          gsap.set(els, from);
          ScrollTrigger.batch(els, {
            start: "top 90%",
            once: true,
            onEnter: (b) => gsap.to(b, {
              opacity: 1, x: 0, y: 0, rotate: 0, rotateX: 0, scale: 1,
              ...(from.clipPath ? { clipPath: "inset(0% 0% 0% 0% round 20px)" } : {}),
              duration: 1.1, ease: "expo.out", stagger: 0.09, clearProps: "transform,clipPath,opacity", ...to,
            }),
          });
        };
        batch(".lx-svc > a", { opacity: 0, y: 90, rotateX: -28, transformPerspective: 900, transformOrigin: "50% 100%" });
        batch(".lx-why > div", { opacity: 0, y: 60, scale: 0.94, clipPath: "inset(14% 10% 14% 10% round 20px)" });
        batch(".lx-inc > div", { opacity: 0, y: 50, scale: 0.96 });
        batch(".lx-quote:nth-child(odd)", { opacity: 0, x: -90, rotate: -3 });
        batch(".lx-quote:nth-child(even)", { opacity: 0, x: 90, rotate: 3 });
        batch(".lx-checks li", { opacity: 0, x: 60 }, { stagger: 0.07 });
        batch(".lx-pills li", { opacity: 0, y: 40, scale: 0.6 }, { ease: "back.out(2.2)", duration: 0.8, stagger: 0.05 });
        batch(".lx-contact li", { opacity: 0, x: -30 });
        batch("[data-lx-card]", { opacity: 0, y: 70, rotateX: -18, transformPerspective: 900, transformOrigin: "50% 100%" });
        batch("[data-lx-pop]", { opacity: 0, y: 30, scale: 0.8 }, { ease: "back.out(1.8)", duration: 0.8, stagger: 0.05 });

        // ── Footer wordmark rises letter by letter ────────────────────────
        const mark = document.querySelector(".lx-foot__mark");
        if (mark) {
          gsap.fromTo($("span", mark), { yPercent: 110 }, {
            yPercent: 0, stagger: 0.05, ease: "none",
            scrollTrigger: { trigger: mark, start: "top bottom", end: "bottom bottom", scrub: 0.6 },
          });
        }
        // ── Timeline spine draws as you read down it ──────────────────────
        $(".lx-tl").forEach((tl) => {
          gsap.fromTo(tl, { "--p": 0 }, {
            "--p": 1, ease: "none",
            scrollTrigger: { trigger: tl, start: "top 70%", end: "bottom 60%", scrub: 0.5 },
          });
          $("li", tl).forEach((li) => ScrollTrigger.create({ trigger: li, start: "top 68%", onEnter: () => li.classList.add("is-on"), onLeaveBack: () => li.classList.remove("is-on") }));
        });
        // ── Stat numbers count up ─────────────────────────────────────────
        $("[data-lx-count]").forEach((el) => {
          const raw = el.textContent ?? "";
          const m = raw.match(/^(\D*)([\d.,]+)(.*)$/);
          if (!m || !below(el)) return;
          const target = parseFloat(m[2].replace(/,/g, ""));
          const dec = (m[2].split(".")[1] ?? "").length;
          const o = { v: 0 };
          gsap.to(o, {
            v: target, duration: 1.6, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
            onUpdate: () => { el.textContent = `${m[1]}${o.v.toFixed(dec)}${m[3]}`; },
            onComplete: () => { el.textContent = raw; },
          });
          el.textContent = `${m[1]}${(0).toFixed(dec)}${m[3]}`;
        });

        // ── Logo tiles pop in, then the marquee takes over ─────────────────
        const logos = document.querySelector(".lx-logos");
        if (logos && below(logos)) {
          gsap.from($(".lx-logos__track > *", logos).slice(0, 8), {
            y: 30, opacity: 0, scale: 0.7, stagger: 0.05, duration: 0.8, ease: "back.out(2)", clearProps: "transform,opacity",
            scrollTrigger: { trigger: logos, start: "top 92%", once: true },
          });
        }

        // ── Connect diagram: chips slide in, wires draw, output lands ─────
        const flow = document.querySelector(".lx-flow");
        if (flow && below(flow)) {
          const paths = $<SVGPathElement>("path", flow);
          paths.forEach((p) => {
            const len = p.getTotalLength();
            gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
          });
          gsap.timeline({ scrollTrigger: { trigger: flow, start: "top 80%", end: "top 30%", scrub: 0.8 } })
            .from($(".lx-chip", flow), { x: -70, opacity: 0, stagger: 0.12, ease: "power3.out" }, 0)
            .to(paths, { strokeDashoffset: 0, stagger: 0.08, ease: "none" }, 0.2)
            .from(flow.querySelector(".lx-flow__out"), { scale: 0.7, opacity: 0, x: 40, ease: "back.out(1.6)" }, 0.55);
        }

        // ── Process line draws itself; steps light up as it passes ─────────
        $(".lx-steps").forEach((ol) => {
          gsap.fromTo(ol, { "--p": 0 }, {
            "--p": 1, ease: "none",
            scrollTrigger: { trigger: ol, start: "top 75%", end: "bottom 55%", scrub: 0.5 },
          });
          $("li", ol).forEach((li) => {
            ScrollTrigger.create({ trigger: li, start: "top 70%", onEnter: () => li.classList.add("is-on"), onLeaveBack: () => li.classList.remove("is-on") });
          });
        });

        // ── Figures: clip reveal + inner parallax ─────────────────────────
        $(".lx-fig").forEach((fig) => {
          const img = fig.querySelector("img");
          if (below(fig)) {
            gsap.fromTo(fig, { clipPath: "inset(12% 8% 12% 8% round 32px)" }, {
              clipPath: "inset(0% 0% 0% 0% round 20px)", ease: "none",
              scrollTrigger: { trigger: fig, start: "top 95%", end: "top 45%", scrub: 0.6 },
            });
          }
          if (img) {
            // Scale always leaves (scale - 1) / 2 of spare image on each side,
            // which must cover the drift, or the frame's background shows.
            gsap.fromTo(img, { scale: 1.2, yPercent: -3 }, {
              scale: 1.08, yPercent: 3, ease: "none",
              scrollTrigger: { trigger: fig, start: "top bottom", end: "bottom top", scrub: true },
            });
          }
        });

        // ── Accent band grows from a card to full bleed ───────────────────
        $(".lx-sec--accent").forEach((sec) => {
          gsap.fromTo(sec, { clipPath: "inset(0% 4% 0% 4% round 48px)" }, {
            clipPath: "inset(0% 0% 0% 0% round 0px)", ease: "none",
            scrollTrigger: { trigger: sec, start: "top 95%", end: "top 25%", scrub: 0.5 },
          });
        });

        // ── Process steps: flip up in sequence (no scroll pinning) ────────
        batch(".lx-rail li", { opacity: 0, y: 60, rotateX: -20, transformPerspective: 900, transformOrigin: "50% 100%" }, { stagger: 0.1 });

        // ── Contact form floats up a little slower than the page ──────────
        $(".lx-contact .lx-form").forEach((f) => {
          gsap.fromTo(f, { y: 80 }, {
            y: -20, ease: "none",
            scrollTrigger: { trigger: f, start: "top bottom", end: "bottom top", scrub: true },
          });
        });

        // ── Closing statement: slight zoom-in as it arrives ───────────────
        $(".lx-closing").forEach((c) => {
          gsap.fromTo(c, { scale: 0.92, borderRadius: 48 }, {
            scale: 1, borderRadius: 24, ease: "none",
            scrollTrigger: { trigger: c, start: "top 95%", end: "top 55%", scrub: 0.5 },
          });
        });
      });
      cleanups.push(() => ctx.revert());

      // Fonts and images change layout after load; re-measure once they settle.
      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener("load", refresh);
      document.fonts?.ready.then(refresh);
      cleanups.push(() => window.removeEventListener("load", refresh));
    })();

    return () => {
      killed = true;
      cleanups.reverse().forEach((fn) => fn());
    };
  }, []);

  return <div ref={barRef} className="lx-progress" aria-hidden="true" />;
}
