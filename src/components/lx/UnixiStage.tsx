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
  // Easter eggs: poke Unixi (click him) and idle Unixi (dozes after 20s).
  const [bubble, setBubble] = useState<{ id: number; text: string; cta?: boolean } | null>(null);
  const [asleep, setAsleep] = useState(false);
  const moodRef = useRef({ asleep: false });
  const headRef = useRef<HTMLDivElement>(null);

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
      angle += dt * 0.00022 * (moodRef.current.asleep ? 0.2 : 1);

      if (now >= nextCatch && !moodRef.current.asleep) {
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

    // The still poster shows immediately. Three.js (and the 0.5 MB model) only
    // start once the page has loaded, the browser is idle and the stage is on
    // screen, so they never compete with the first paint. Data-saver and very
    // low-end devices keep the poster.
    const nav = navigator as Navigator & { connection?: { saveData?: boolean }; deviceMemory?: number };
    const weak = !!nav.connection?.saveData || (nav.deviceMemory ?? 8) <= 2 || (navigator.hardwareConcurrency ?? 8) <= 2;
    if (weak) return;
    let started = false;
    const go = () => {
      if (started || disposed) return;
      started = true;
      start();
    };
    const whenIdle = () => {
      const ric = (window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number }).requestIdleCallback;
      if (ric) ric(() => go(), { timeout: 2500 });
      else window.setTimeout(go, 900);
    };
    const inView = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      inView.disconnect();
      if (document.readyState === "complete") whenIdle();
      else window.addEventListener("load", whenIdle, { once: true });
    });
    inView.observe(host);
    cleanups.push(() => inView.disconnect());

    const start = () => (async () => {
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

      // Rig: bones we animate procedurally (the GLB has a skeleton but no clips).
      type Rig = Record<string, { b: import("three").Object3D; rest: import("three").Quaternion; rw: import("three").Quaternion; rwi: import("three").Quaternion }>;
      const rig: Rig = {};
      const BONES = ["Head", "NeckTwist01", "Spine02", "R_Upperarm", "R_Forearm", "R_Hand", "L_Upperarm", "L_Forearm", "L_Hand", "L_Thigh", "L_Calf", "R_Thigh", "R_Calf", "L_Foot", "R_Foot"];
      // Eyelids: the eyes are painted on the visor texture, so blinking is done
      // in the shader by closing each eye's region (measured in bind-pose mesh
      // space) from top and bottom.
      const eyeU = { uBlink: { value: 0 } };

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
        model.updateMatrixWorld(true);
        let skinned: import("three").SkinnedMesh | null = null;
        model.traverse((o) => {
          const mesh = o as import("three").Mesh;
          if (!mesh.isMesh) return;
          mesh.frustumCulled = false;
          if ((o as import("three").SkinnedMesh).isSkinnedMesh) skinned = o as import("three").SkinnedMesh;
        });
        const sk = skinned as import("three").SkinnedMesh | null;
        if (sk) {
          // The source textures are only 512px. Sharper filtering plus a glossy
          // toy-plastic finish (clearcoat, low metalness) hides the soft spots
          // far better than the original fully-metallic grey look.
          const old = sk.material as import("three").MeshStandardMaterial;
          const aniso = renderer.capabilities.getMaxAnisotropy();
          for (const tex of [old.map, old.normalMap, old.roughnessMap, old.metalnessMap]) {
            if (tex) {
              tex.anisotropy = aniso;
              tex.needsUpdate = true;
            }
          }
          const mat = new THREE.MeshPhysicalMaterial({
            map: old.map,
            normalMap: old.normalMap,
            normalScale: old.normalScale.clone().multiplyScalar(0.65),
            roughnessMap: old.roughnessMap,
            metalnessMap: old.metalnessMap,
            metalness: 0.22,
            roughness: 0.6,
            clearcoat: 0.75,
            clearcoatRoughness: 0.2,
            envMapIntensity: 0.9,
            color: new THREE.Color(1.12, 1.12, 1.14),
          });
          mat.onBeforeCompile = (sh) => {
            sh.uniforms.uBlink = eyeU.uBlink;
            sh.vertexShader = sh.vertexShader
              .replace("#include <common>", "#include <common>\nvarying vec3 vBindPos;")
              .replace("#include <begin_vertex>", "#include <begin_vertex>\nvBindPos = position;");
            sh.fragmentShader = sh.fragmentShader
              .replace(
                "#include <common>",
                `#include <common>
varying vec3 vBindPos;
uniform float uBlink;
float uxBox(vec3 p, vec2 xr, vec2 yr) {
  return step(xr.x, p.x) * step(p.x, xr.y) * step(yr.x, p.y) * step(p.y, yr.y) * step(0.15, p.z);
}
float uxLid(vec3 p, vec2 xr, vec2 yr) {
  float cy = (yr.x + yr.y) * 0.5;
  float hh = (yr.y - yr.x) * 0.5;
  return uxBox(p, xr, yr) * step(max((1.0 - uBlink) * hh, 0.0045), abs(p.y - cy));
}`,
              )
              .replace(
                "#include <map_fragment>",
                `#include <map_fragment>
float uxEye = max(uxBox(vBindPos, vec2(-0.108, -0.033), vec2(0.612, 0.726)), uxBox(vBindPos, vec2(0.088, 0.168), vec2(0.592, 0.707)));
float uxClosed = uBlink > 0.0 ? max(uxLid(vBindPos, vec2(-0.108, -0.033), vec2(0.612, 0.726)), uxLid(vBindPos, vec2(0.088, 0.168), vec2(0.592, 0.707))) : 0.0;
float uxPurple = smoothstep(0.02, 0.14, diffuseColor.b - diffuseColor.g);
float uxInk = max(uxPurple, smoothstep(0.3, 0.55, dot(diffuseColor.rgb, vec3(0.299, 0.587, 0.114))));
diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.018, 0.018, 0.026), uxClosed * uxInk);`,
              )
              .replace(
                "#include <emissivemap_fragment>",
                `#include <emissivemap_fragment>
totalEmissiveRadiance += diffuseColor.rgb * uxPurple * uxEye * (1.0 - uxClosed) * 0.85;`,
              );
          };
          sk.material = mat;
          old.dispose();

          const meshInv = new THREE.Quaternion();
          sk.getWorldQuaternion(meshInv).invert();
          for (const name of BONES) {
            const b = model.getObjectByName(name);
            if (!b) continue;
            const rw = new THREE.Quaternion();
            b.getWorldQuaternion(rw).premultiply(meshInv);
            rig[name] = { b, rest: b.quaternion.clone(), rw, rwi: rw.clone().invert() };
          }
        }
        // measure the real top of the model (halo) for the bubble anchor
        headTop = new THREE.Box3().setFromObject(model).max.y + 0.08;
        group.add(model);
        loadedAt = performance.now();
        setReady(true);
      });

      let loadedAt = 0;
      let headTop = 1.3;
      const pointer = { x: 0, y: 0 };

      // ── Speech bubble ────────────────────────────────────────────────
      let sayId = 0;
      let sayTimer = 0;
      const say = (text: string, ms: number, cta = false) => {
        sayId++;
        setBubble({ id: sayId, text, cta });
        window.clearTimeout(sayTimer);
        sayTimer = window.setTimeout(() => setBubble(null), ms);
      };
      cleanups.push(() => window.clearTimeout(sayTimer));

      // One-shot body animations: 1 nod, 2 spin, 3 jump, 4 dizzy, 5 jolt awake.
      const DUR = [0, 700, 1000, 850, 1800, 650];
      const anim = { kind: 0, t0: 0 };
      const play = (kind: number) => {
        anim.kind = kind;
        anim.t0 = performance.now();
      };

      // ── Idle Unixi: dozes off after 20s without any activity ─────────
      const IDLE_MS = 20000;
      let lastAct = performance.now();
      let sleepK = 0;
      const wake = () => {
        lastAct = performance.now();
        if (!moodRef.current.asleep) return;
        moodRef.current.asleep = false;
        setAsleep(false);
        play(5);
        say("Huh? I'm up, I'm up!", 1900);
      };
      const onMove = (e: PointerEvent) => {
        pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
        pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
        wake();
      };
      window.addEventListener("pointermove", onMove, { passive: true });
      cleanups.push(() => window.removeEventListener("pointermove", onMove));
      const activity = ["pointerdown", "keydown", "wheel", "touchstart", "scroll"] as const;
      activity.forEach((ev) => window.addEventListener(ev, wake, { passive: true }));
      cleanups.push(() => activity.forEach((ev) => window.removeEventListener(ev, wake)));

      // ── Poke Unixi: only clicks that actually land on him count ──────
      // Forgiving hit test: his on-screen bounding box (padded), so a poke
      // still lands while he's mid-nod or mid-spin.
      const box = new THREE.Box3();
      const corner = new THREE.Vector3();
      const hits = (e: PointerEvent) => {
        if (!group.children.length) return false;
        box.setFromObject(group);
        let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
        for (let i = 0; i < 8; i++) {
          corner.set(i & 1 ? box.max.x : box.min.x, i & 2 ? box.max.y : box.min.y, i & 4 ? box.max.z : box.min.z).project(camera);
          x0 = Math.min(x0, corner.x); x1 = Math.max(x1, corner.x);
          y0 = Math.min(y0, corner.y); y1 = Math.max(y1, corner.y);
        }
        const r = host.getBoundingClientRect();
        const nx = ((e.clientX - r.left) / r.width) * 2 - 1;
        const ny = -((e.clientY - r.top) / r.height) * 2 + 1;
        const px = (x1 - x0) * 0.08;
        const py = (y1 - y0) * 0.04;
        return nx > x0 - px && nx < x1 + px && ny > y0 - py && ny < y1 + py;
      };
      let pokes = 0;
      let lastPoke = 0;
      const LINES: Record<number, [string, number] | null> = {
        1: null,
        2: ["Wheee!", 1400],
        3: ["Hey, that tickles!", 1800],
        4: ["Okay, now I'm dizzy.", 1900],
      };
      const onPoke = (e: PointerEvent) => {
        if (!hits(e)) return;
        const now = performance.now();
        if (now - lastPoke > 4000) pokes = 0;
        lastPoke = now;
        pokes++;
        if (pokes >= 5) {
          play(3);
          say("Okay okay, you've got my attention. Want me to find you some leads?", 8000, true);
          pokes = 0;
          return;
        }
        play(pokes);
        const line = LINES[pokes];
        if (line) say(line[0], line[1]);
      };
      // Listen on the whole stage: orbiting tokens often pass in front of him.
      const stageEl = host.parentElement ?? host;
      stageEl.addEventListener("pointerdown", onPoke);
      cleanups.push(() => stageEl.removeEventListener("pointerdown", onPoke));
      // Hand cursor only over Unixi himself (checked at most every 90ms).
      let lastHover = 0;
      const onHover = (e: PointerEvent) => {
        const now = performance.now();
        if (now - lastHover < 90) return;
        lastHover = now;
        stageEl.style.cursor = hits(e) ? "pointer" : "";
      };
      stageEl.addEventListener("pointermove", onHover, { passive: true });
      cleanups.push(() => stageEl.removeEventListener("pointermove", onHover));

      const headPt = new THREE.Vector3();

      // Rotate a bone by an offset given in the model's own axes
      // (x: pitch forward/back, y: turn, z: tilt in the screen plane).
      const qd = new THREE.Quaternion();
      const ql = new THREE.Quaternion();
      const eul = new THREE.Euler();
      const bone = (name: string, x: number, y: number, z: number) => {
        const r = rig[name];
        if (!r) return;
        eul.set(x, y, z);
        qd.setFromEuler(eul);
        ql.copy(r.rwi).multiply(qd).multiply(r.rw);
        r.b.quaternion.copy(r.rest).multiply(ql);
      };
      // Blinks: every 2.4-5.6s, sometimes a double blink.
      let nextBlink = performance.now() + 2200;
      let blinkT0 = -1;
      let doubleBlink = false;
      // Waves come in short bursts so they read as a greeting, not a twitch.
      let nextWave = performance.now() + 1500;
      let waveT0 = -1;
      const look = { x: 0, y: 0 };

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
        // idle: doze off when nothing has happened for a while
        if (!moodRef.current.asleep && loadedAt && now - lastAct > IDLE_MS) {
          moodRef.current.asleep = true;
          setAsleep(true);
        }
        sleepK += ((moodRef.current.asleep ? 1 : 0) - sleepK) * 0.03;

        // poke / wake one-shots
        let ax = 0;
        let ay = 0;
        let az = 0;
        let jy = 0;
        let sq = 0;
        let pk = 0;
        let pkK = 0;
        let pkArc = 0;
        if (anim.kind && !reduce) {
          const k = Math.min(1, (now - anim.t0) / DUR[anim.kind]);
          const arc = Math.sin(Math.PI * k);
          pk = anim.kind;
          pkK = k;
          pkArc = arc;
          if (anim.kind === 1) { ax = arc * 0.45; jy = arc * 0.12; }
          if (anim.kind === 2) { ay = (k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2) * Math.PI * 2; jy = arc * 0.15; }
          if (anim.kind === 3) { jy = arc * 0.5; sq = Math.sin(Math.PI * 2 * k) * 0.1; }
          if (anim.kind === 4) { az = Math.sin(k * 24) * 0.32 * (1 - k); ay = Math.sin(k * 10) * 0.5 * (1 - k); }
          if (anim.kind === 5) { jy = arc * 0.32; az = Math.sin(k * 34) * 0.14 * (1 - k); }
          if (k >= 1) anim.kind = 0;
        }

        if (!reduce) {
          group.position.y = 0.2 + Math.sin(t * 1.4) * 0.07 * (1 - sleepK) - catchK * 0.08 - (1 - intro) * 0.9 + sp * 0.5 - sleepK * 0.12 + jy;
          const base = (1 + catchK * 0.045) * (0.6 + intro * 0.4) * (1 + Math.sin(t * 1.3) * 0.018 * sleepK);
          group.scale.set(base * (1 - sq * 0.5), base * (1 + sq), base * (1 - sq * 0.5));
        }
        const awake = 1 - sleepK;
        rotY += ((pointer.x * 0.26 + (reduce ? 0 : Math.sin(t * 0.4) * 0.1)) * awake + sp * 2.4 - (1 - intro) * 2.6 - rotY) * 0.06;
        rotX += (pointer.y * 0.18 * awake - rotX + catchK * 0.25 + sleepK * 0.5) * 0.08;
        group.rotation.y = rotY + ay;
        group.rotation.x = rotX + ax;
        group.rotation.z = az + sleepK * 0.12;

        // ── Body life: head, breathing, arms, legs ──────────────────────
        const lv = reduce ? 0 : awake;
        look.x += (pointer.x - look.x) * 0.08;
        look.y += (pointer.y - look.y) * 0.08;
        // waving bursts with the raised right hand
        if (!reduce && awake > 0.5 && now >= nextWave) {
          waveT0 = now;
          nextWave = now + 5200 + Math.random() * 4000;
        }
        const wt = (now - waveT0) / 1700;
        const waveEnv = waveT0 > 0 && wt < 1 ? Math.sin(Math.PI * Math.min(1, wt)) : 0;
        const wave = Math.sin(t * 9) * (0.42 * waveEnv) + Math.sin(t * 1.3) * 0.07 * lv;
        const hop = pk === 3 ? pkArc : 0;
        const spinArms = pk === 2 ? pkArc : 0;
        const jolt = pk === 5 ? pkArc : 0;
        const dizzy = pk === 4 ? Math.sin(pkK * 24) * 0.3 * (1 - pkK) : 0;
        const nodP = pk === 1 ? pkArc * 0.35 : 0;

        bone("Spine02", Math.sin(t * 1.6) * 0.035 * (reduce ? 0 : 1) + sleepK * 0.18, 0, 0);
        bone("NeckTwist01", sleepK * 0.2, look.x * 0.12 * lv, 0);
        bone("Head",
          look.y * 0.16 * lv + nodP + sleepK * 0.32 - jolt * 0.2,
          look.x * 0.3 * lv + Math.sin(t * 0.55) * 0.08 * lv,
          Math.sin(t * 0.8) * 0.06 * lv + dizzy + sleepK * 0.14,
        );
        // right arm (the raised one): wave from the elbow and wrist
        bone("R_Upperarm", -sleepK * 0.25 + jolt * 0.3, 0, Math.sin(t * 1.1) * 0.05 * lv - spinArms * 0.5 - sleepK * 0.55);
        bone("R_Forearm", 0, 0, wave - sleepK * 0.6);
        bone("R_Hand", 0, 0, Math.sin(t * 9 + 0.7) * 0.28 * waveEnv);
        // left arm: relaxed sway
        bone("L_Upperarm", Math.sin(t * 1.2 + 1) * 0.1 * lv, 0, Math.sin(t * 1.05) * 0.08 * lv + spinArms * 0.5 + jolt * 0.35 + sleepK * 0.12);
        bone("L_Forearm", Math.sin(t * 1.3 + 2) * 0.14 * lv, 0, 0);
        bone("L_Hand", 0, 0, Math.sin(t * 1.7) * 0.12 * lv);
        // legs: floating, lazy alternating kick; tuck on a jump
        const kick = Math.sin(t * 1.5);
        bone("L_Thigh", kick * 0.16 * lv - hop * 0.45, 0, 0);
        bone("R_Thigh", -kick * 0.16 * lv - hop * 0.45, 0, 0);
        bone("L_Calf", (Math.sin(t * 1.5 - 0.7) * 0.2 + 0.05) * lv + hop * 0.7, 0, 0);
        bone("R_Calf", (-Math.sin(t * 1.5 - 0.7) * 0.2 + 0.05) * lv + hop * 0.7, 0, 0);
        bone("L_Foot", Math.sin(t * 1.5 - 1.2) * 0.12 * lv, 0, 0);
        bone("R_Foot", -Math.sin(t * 1.5 - 1.2) * 0.12 * lv, 0, 0);

        // blink
        let blink = 0;
        if (!moodRef.current.asleep) {
          if (now >= nextBlink) {
            blinkT0 = now;
            nextBlink = now + 2400 + Math.random() * 3200;
            doubleBlink = Math.random() < 0.22;
          }
          const bt = now - blinkT0;
          if (blinkT0 > 0 && bt < 160) blink = Math.sin((Math.PI * bt) / 160);
          else if (doubleBlink && bt >= 240 && bt < 400) blink = Math.sin((Math.PI * (bt - 240)) / 160);
        }
        if (pk === 3 || pk === 4) blink = Math.max(blink, pkArc * 0.55);
        eyeU.uBlink.value = Math.max(blink, sleepK > 0.5 ? 1 : sleepK * 1.6);

        // keep the speech bubble / zzz anchored above his head
        if (headRef.current) {
          headPt.set(0, headTop, 0);
          group.localToWorld(headPt);
          headPt.project(camera);
          const hw = host.clientWidth;
          const hh = host.clientHeight;
          headRef.current.style.transform = `translate(${((headPt.x + 1) / 2) * hw}px, ${((1 - headPt.y) / 2) * hh}px)`;
        }
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
    <div className="lx-stage" ref={stageRef}>
      <div className="lx-stage__floor" aria-hidden="true" />
      <div className="lx-stage__ring" aria-hidden="true" />
      <div ref={pulseEl} className="lx-stage__pulse" aria-hidden="true" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className={`lx-stage__poster${ready ? " is-hidden" : ""}`} src="/unixi-poster.webp" alt="" aria-hidden="true" width={602} height={577} fetchPriority="high" />
      <div ref={glRef} className={`lx-stage__gl${ready ? " is-ready" : ""}`} aria-hidden="true" />
      <div ref={headRef} className="lx-uxi-anchor">
        {asleep && (
          <span className="lx-zzz" aria-hidden="true">
            <i>z</i><i>z</i><i>z</i>
          </span>
        )}
        {bubble && (
          <div key={bubble.id} className="lx-uxi-say" role="status">
            <span>{bubble.text}</span>
            {bubble.cta && (
              <button type="button" onClick={() => { setBubble(null); window.dispatchEvent(new Event("unixi:chat")); }}>
                Find me leads →
              </button>
            )}
          </div>
        )}
      </div>
      {CHANNELS.map((c, i) => (
        <span key={c} ref={(el) => { tokenRefs.current[i] = el; }} className="lx-token" aria-hidden="true">
          {c}
        </span>
      ))}
      <div className="lx-leads" aria-hidden="true">
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
      <span className="lx-stage__note" aria-hidden="true">Example leads</span>
    </div>
  );
}
