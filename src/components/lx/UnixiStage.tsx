"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Hero motion piece: Unixi's lead desk.
 *
 * Channel tokens orbit Unixi on a tilted ring. Every few seconds one breaks
 * orbit and flies into him; he nods, his glow pulses, and a lead card slides
 * onto the stack beside him. The story in one loop: every channel we run ends
 * as a lead in your inbox.
 *
 * Three.js loads lazily; until the model is ready (or if WebGL fails) the
 * stage still shows the orbit and the lead stack, so the hero never looks
 * empty. All leads are example data and labelled as such.
 */

type Lead = { id: number; kind: string; who: string; what: string; source: string };

const CHANNELS = ["Google Search", "ChatGPT", "Meta Ads", "Google Maps", "Website", "Gemini"];

const LEADS: Omit<Lead, "id" | "source">[] = [
  { kind: "New enquiry", who: "Aisha K., Dubai Marina", what: "Dental implants, wants a consult this week" },
  { kind: "Call booked", who: "Faisal M., Riyadh", what: "Google Ads for 3 clinics, Thu 4:00 pm" },
  { kind: "Quote request", who: "Rohan Mehta, Bengaluru", what: "New store website" },
  { kind: "New enquiry", who: "Priya S., Abu Dhabi", what: "Table for 12 on Friday" },
  { kind: "Call booked", who: "Omar H., Sharjah", what: "Physio clinic, Saturday 11:00 am" },
  { kind: "Quote request", who: "Neha G., Delhi", what: "SEO retainer for 2 locations" },
];

const RING_CX = 0.37;
const RING_RX = 0.35; // ellipse radii as a fraction of the stage size
const RING_RY = 0.1;
const RING_CY = 0.8;

export default function UnixiStage() {
  const stageRef = useRef<HTMLDivElement>(null);
  const glRef = useRef<HTMLDivElement>(null);
  const tokenRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const pulseRef = useRef(0);
  const pulseEl = useRef<HTMLDivElement>(null);
  const [leads, setLeads] = useState<Lead[]>(() =>
    LEADS.slice(0, 2).map((l, i) => ({ ...l, id: -i - 1, source: CHANNELS[i + 1] })),
  );
  const [ready, setReady] = useState(false);

  // ── Orbit + catch loop (DOM) ────────────────────────────────────────────
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const n = CHANNELS.length;
    // flight[i] = start time (ms) of a token's fly-in, or -1 while orbiting
    const flight = new Array(n).fill(-1);
    const FLY = 900;
    let raf = 0;
    let angle = 0;
    let last = performance.now();
    let visible = true;
    let nextCatch = performance.now() + 1600;
    let leadIdx = 2;
    let turn = 0;

    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(stage);

    const place = (now: number) => {
      const w = stage.clientWidth;
      const h = stage.clientHeight;
      const cx = w * RING_CX;
      const cy = h * RING_CY;
      for (let i = 0; i < n; i++) {
        const el = tokenRefs.current[i];
        if (!el) continue;
        const a = angle + (i / n) * Math.PI * 2;
        const ox = cx + Math.cos(a) * w * RING_RX;
        const oy = cy + Math.sin(a) * h * RING_RY;
        const depth = (Math.sin(a) + 1) / 2; // 0 = back, 1 = front
        let x = ox;
        let y = oy;
        let s = 0.78 + depth * 0.3;
        let o = 0.45 + depth * 0.55;
        if (flight[i] >= 0) {
          const t = Math.min(1, (now - flight[i]) / FLY);
          const e = 1 - Math.pow(1 - t, 3); // ease-out
          x = ox + (cx - ox) * e;
          y = oy + (h * 0.5 - oy) * e - Math.sin(t * Math.PI) * 60;
          s *= 1 - e * 0.7;
          o *= 1 - Math.max(0, (t - 0.7) / 0.3);
          if (t >= 1) flight[i] = -2; // caught: stays hidden until it rejoins
        }
        if (flight[i] === -2) o = 0;
        el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%) scale(${s})`;
        el.style.opacity = String(o);
        el.style.zIndex = depth > 0.5 ? "3" : "1";
      }
    };

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      if (!visible || document.hidden) {
        last = now;
        return;
      }
      const dt = Math.min(now - last, 60);
      last = now;
      angle += dt * 0.00022;

      if (now >= nextCatch) {
        // pick the front-most orbiting token so the flight reads clearly
        let best = -1;
        let bestDepth = -2;
        for (let i = 0; i < n; i++) {
          if (flight[i] !== -1) continue;
          const d = Math.sin(angle + (i / n) * Math.PI * 2);
          if (d > bestDepth) {
            bestDepth = d;
            best = i;
          }
        }
        if (best >= 0) {
          flight[best] = now;
          const src = CHANNELS[best];
          const lead = LEADS[leadIdx % LEADS.length];
          const id = ++turn;
          leadIdx++;
          window.setTimeout(() => {
            pulseRef.current = performance.now();
            pulseEl.current?.animate(
              [
                { transform: "translate(-50%, -50%) scale(0.6)", opacity: 0.9 },
                { transform: "translate(-50%, -50%) scale(1.5)", opacity: 0 },
              ],
              { duration: 900, easing: "cubic-bezier(0.23, 1, 0.32, 1)" },
            );
            setLeads((prev) => [{ ...lead, id, source: src }, ...prev].slice(0, 3));
          }, FLY);
          // the caught token rejoins the ring a little later
          window.setTimeout(() => {
            flight[best] = -1;
          }, FLY + 2200);
        }
        nextCatch = now + 2800;
      }
      place(now);
    };

    if (reduce) {
      place(performance.now());
    } else {
      raf = requestAnimationFrame(tick);
    }
    const onResize = () => place(performance.now());
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  // ── Unixi (Three.js) ────────────────────────────────────────────────────
  useEffect(() => {
    const host = glRef.current;
    if (!host) return;
    let disposed = false;
    let raf = 0;
    const cleanups: Array<() => void> = [];

    (async () => {
      let THREE: typeof import("three");
      try {
        THREE = await import("three");
      } catch {
        return;
      }
      const { GLTFLoader } = await import("three/examples/jsm/loaders/GLTFLoader.js");
      const { DRACOLoader } = await import("three/examples/jsm/loaders/DRACOLoader.js");
      const { RoomEnvironment } = await import("three/examples/jsm/environments/RoomEnvironment.js");
      if (disposed) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      let renderer: InstanceType<typeof THREE.WebGLRenderer>;
      try {
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
      } catch {
        return;
      }
      const size = () => ({ w: host.clientWidth, h: host.clientHeight });
      const { w, h } = size();
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      host.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(30, w / h, 0.1, 100);
      camera.position.set(0, 0.2, 8.2);
      const pmrem = new THREE.PMREMGenerator(renderer);
      scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
      scene.add(new THREE.AmbientLight(0xffffff, 0.5));
      const key = new THREE.DirectionalLight(0xffffff, 1.6);
      key.position.set(2.5, 4, 5);
      scene.add(key);
      const rim = new THREE.DirectionalLight(0x6d5dfc, 1.2);
      rim.position.set(-3, 2, -2);
      scene.add(rim);

      const group = new THREE.Group();
      group.position.set(-0.62, 0.2, 0);
      scene.add(group);

      const draco = new DRACOLoader();
      draco.setDecoderPath("/draco/");
      const loader = new GLTFLoader();
      loader.setDRACOLoader(draco);
      cleanups.push(() => draco.dispose());
      loader.load("/unixi.glb", (gltf) => {
        if (disposed) return;
        const model = gltf.scene;
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const s = box.getSize(new THREE.Vector3());
        model.position.sub(center);
        model.scale.setScalar(2.55 / (s.y || 1));
        model.traverse((o) => {
          const mesh = o as unknown as { isMesh?: boolean; frustumCulled: boolean; material?: unknown };
          if (!mesh.isMesh) return;
          mesh.frustumCulled = false;
          const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
          for (const m of mats as Array<{ envMapIntensity?: number }>) {
            if (m) m.envMapIntensity = 0.45;
          }
        });
        group.add(model);
        loadedAt = performance.now();
        setReady(true);
      });

      let loadedAt = 0;
      const pointer = { x: 0, y: 0 };
      const onMove = (e: PointerEvent) => {
        pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
        pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
      };
      window.addEventListener("pointermove", onMove, { passive: true });
      cleanups.push(() => window.removeEventListener("pointermove", onMove));

      const ro = new ResizeObserver(() => {
        const { w: nw, h: nh } = size();
        renderer.setSize(nw, nh);
        camera.aspect = nw / Math.max(1, nh);
        camera.updateProjectionMatrix();
      });
      ro.observe(host);
      cleanups.push(() => ro.disconnect());

      let visible = true;
      const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
      io.observe(host);
      cleanups.push(() => io.disconnect());

      let rotX = 0;
      let rotY = 0;
      const t0 = performance.now();
      const tick = () => {
        raf = requestAnimationFrame(tick);
        if (!visible || document.hidden) return;
        const now = performance.now();
        const t = (now - t0) / 1000;
        const since = (now - pulseRef.current) / 1000;
        const catchK = since < 0.9 ? Math.sin((since / 0.9) * Math.PI) : 0;
        // entrance: rises and spins in once the model has loaded
        const k = loadedAt ? Math.min(1, (now - loadedAt) / 1600) : 0;
        const intro = reduce ? 1 : 1 - Math.pow(1 - k, 4);
        // scrolling away spins him round and lifts him out of frame
        const sp = reduce ? 0 : Math.min(1.4, window.scrollY / Math.max(1, window.innerHeight));
        if (!reduce) {
          group.position.y = 0.2 + Math.sin(t * 1.4) * 0.07 - catchK * 0.08 - (1 - intro) * 0.9 + sp * 0.5;
          group.scale.setScalar((1 + catchK * 0.045) * (0.6 + intro * 0.4));
        }
        rotY += (pointer.x * 0.45 + (reduce ? 0 : Math.sin(t * 0.4) * 0.12) + sp * 2.4 - (1 - intro) * 2.6 - rotY) * 0.06;
        rotX += (pointer.y * 0.18 - rotX + catchK * 0.25) * 0.08;
        group.rotation.y = rotY;
        group.rotation.x = rotX;
        renderer.render(scene, camera);
      };
      tick();

      cleanups.push(() => {
        cancelAnimationFrame(raf);
        pmrem.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      });
    })();

    return () => {
      disposed = true;
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return (
    <div className="lx-stage" ref={stageRef} aria-hidden="true">
      <div className="lx-stage__floor" />
      <div className="lx-stage__ring" />
      <div ref={pulseEl} className="lx-stage__pulse" />
      <div ref={glRef} className={`lx-stage__gl${ready ? " is-ready" : ""}`} />
      {CHANNELS.map((c, i) => (
        <span key={c} ref={(el) => { tokenRefs.current[i] = el; }} className="lx-token">
          {c}
        </span>
      ))}
      <div className="lx-leads">
        {leads.map((l, i) => (
          <div key={l.id} className="lx-lead" style={{ ["--i" as string]: i }}>
            <div className="lx-lead__top">
              <b>{l.kind}</b>
              <span>{i === 0 ? "now" : `${i * 3 + 1}m ago`}</span>
            </div>
            <p>
              {l.who}. {l.what}.
            </p>
            <small>via {l.source}</small>
          </div>
        ))}
      </div>
      <span className="lx-stage__note">Example leads</span>
    </div>
  );
}
