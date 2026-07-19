"use client";
import { useEffect, useRef, useState } from "react";

/**
 * 3D Unixi mascot — Three.js, procedurally animated (no baked clips).
 *
 * Scene dressing (all generated in code, nothing extra to download):
 *  - Room environment map so the PBR materials render true colour, not grey clay
 *  - Emissive purple halo ring + additive glow sprite, spinning above his head
 *  - A drift of purple sparkle particles orbiting him
 *  - Idle float + breathing, cursor-follow gaze, greet-nod, hover excitement
 *
 * Three.js is dynamically imported, so it stays out of the main bundle and only
 * downloads when this component mounts. The render loop pauses when the tab is
 * hidden or the chat panel covers the launcher.
 */
export default function Unixi3D({
  size = 176,
  onClick,
  greetKey = 0,
  paused = false,
}: {
  size?: number;
  onClick?: () => void;
  /** Bump this to trigger a nod/greet (e.g. when the chat opens). */
  greetKey?: number;
  /** Skip rendering (e.g. while the chat panel covers it). */
  paused?: boolean;
}) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const greetRef = useRef(0);
  const pausedRef = useRef(paused);
  const hoverRef = useRef(false);
  useEffect(() => { pausedRef.current = paused; }, [paused]);

  // Nod whenever greetKey changes.
  useEffect(() => {
    greetRef.current = performance.now();
  }, [greetKey]);

  useEffect(() => {
    const host = mountRef.current;
    if (!host) return;

    let disposed = false;
    let raf = 0;
    const cleanups: Array<() => void> = [];

    (async () => {
      const THREE = await import("three");
      const { GLTFLoader } = await import("three/examples/jsm/loaders/GLTFLoader.js");
      const { DRACOLoader } = await import("three/examples/jsm/loaders/DRACOLoader.js");
      const { RoomEnvironment } = await import("three/examples/jsm/environments/RoomEnvironment.js");
      if (disposed) return;

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
      camera.position.set(0, 0.05, 7.2);

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(size, size);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.0;
      host.appendChild(renderer.domElement);

      // Environment map — the fix for the grey-clay look. PBR materials need
      // something to reflect before their colour reads correctly.
      const pmrem = new THREE.PMREMGenerator(renderer);
      scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

      // Lights — soft key, brand-purple rim, warm indigo fill.
      scene.add(new THREE.AmbientLight(0xffffff, 0.25));
      const key = new THREE.DirectionalLight(0xffffff, 1.3);
      key.position.set(2, 4, 4);
      scene.add(key);
      const rim = new THREE.DirectionalLight(0x8b5cf6, 1.4);
      rim.position.set(-3, 1, -2);
      scene.add(rim);
      const fill = new THREE.PointLight(0x6366f1, 0.8, 20);
      fill.position.set(0, -2, 3);
      scene.add(fill);

      const group = new THREE.Group();
      // Render the bot right-of-centre inside the canvas so he can hug the
      // screen edge while the (transparent) canvas stays fully on-screen.
      group.position.x = 0.95;
      scene.add(group);

      // Soft radial texture shared by the glow sprite and the sparkles.
      const makeRadialTexture = () => {
        const c = document.createElement("canvas");
        c.width = c.height = 128;
        const ctx = c.getContext("2d")!;
        const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
        g.addColorStop(0, "rgba(255,255,255,1)");
        g.addColorStop(0.35, "rgba(255,255,255,0.55)");
        g.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, 128, 128);
        return new THREE.CanvasTexture(c);
      };
      const radialTex = makeRadialTexture();
      cleanups.push(() => radialTex.dispose());

      // (No procedural halo — the Tripo model ships with its own, baked into
      // the mesh and textured purple.)

      // ── Sparkles — a slow drift of purple motes around him ──────────────
      const N = 44;
      const positions = new Float32Array(N * 3);
      const speeds = new Float32Array(N);
      const phases = new Float32Array(N);
      for (let i = 0; i < N; i++) {
        const r = 0.9 + Math.random() * 0.85;
        const a = Math.random() * Math.PI * 2;
        positions[i * 3] = Math.cos(a) * r;
        positions[i * 3 + 1] = -1.5 + Math.random() * 3.2;
        positions[i * 3 + 2] = Math.sin(a) * r;
        speeds[i] = 0.12 + Math.random() * 0.25;
        phases[i] = Math.random() * Math.PI * 2;
      }
      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      const pMat = new THREE.PointsMaterial({
        size: 0.06,
        map: radialTex,
        color: 0xc4b5fd,
        transparent: true,
        opacity: 0.85,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true,
      });
      const sparkles = new THREE.Points(pGeo, pMat);
      sparkles.position.x = group.position.x; // orbit the shifted bot
      scene.add(sparkles);

      // ── Rig puppeting + blink state (filled once the model loads) ───────
      // Wave: rotate the real arm bones over their bind pose each frame.
      const waveBones: Array<{ bone: { quaternion: { copy(q: unknown): { multiply(q: unknown): unknown } } }; q0: InstanceType<typeof THREE.Quaternion>; amp: number }> = [];
      const tmpQ = new THREE.Quaternion();
      const waveAxis = new THREE.Vector3(0, 0, 1);
      // Blink: two dark "eyelid" discs over the visor (eyes are painted on the
      // texture — no eye bones), closed briefly on a randomised timer.
      const lids: Array<{ scale: { y: number } }> = [];
      let nextBlink = 2;
      let blinkStart = -1;
      // Set once the emissive map is built — pulsed in the tick loop.
      let glowMat: { emissiveIntensity: number } | null = null;

      // ── The model (Draco-compressed: 2.7MB → 0.9MB) ─────────────────────
      const loader = new GLTFLoader();
      const draco = new DRACOLoader();
      draco.setDecoderPath("/draco/");
      loader.setDRACOLoader(draco);
      cleanups.push(() => draco.dispose());
      loader.load(
        "/unixi.glb",
        (gltf) => {
          if (disposed) return;
          const model = gltf.scene;
          const box = new THREE.Box3().setFromObject(model);
          const center = box.getCenter(new THREE.Vector3());
          const sizeV = box.getSize(new THREE.Vector3());
          // Framed a bit small so the halo, float bob, and rotation swing all
          // stay inside the canvas instead of clipping at its edges.
          const scale = 2.25 / (sizeV.y || 1);
          model.position.sub(center);
          model.scale.setScalar(scale);

          // The env map washes the textures out at full strength — the glossy
          // visor mirrors the bright room and everything reads white. Tame it
          // so the baked base colours (black visor, purple accents) survive.
          model.traverse((o) => {
            const mesh = o as unknown as { isMesh?: boolean; frustumCulled: boolean; material?: unknown };
            if (!mesh.isMesh) return;
            mesh.frustumCulled = false; // skinned mesh — avoid bad-bounds culling
            const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
            for (const m of mats as Array<{ envMapIntensity?: number; map?: { anisotropy: number } | null }>) {
              if (!m) continue;
              m.envMapIntensity = 0.35;
              if (m.map) m.map.anisotropy = 8;
            }
          });

          group.add(model);

          // Collect the bones we puppet. His right hand is already raised in
          // the bind pose, so small forearm/hand rotations read as a wave.
          const bones: Record<string, InstanceType<typeof THREE.Object3D>> = {};
          model.traverse((o) => {
            if ((o as unknown as { isBone?: boolean }).isBone) bones[o.name] = o;
          });
          for (const [name, amp] of [["R_Forearm", 0.3], ["R_Hand", 0.22]] as const) {
            const bone = bones[name];
            if (bone) waveBones.push({ bone, q0: bone.quaternion.clone(), amp });
          }

          // ── Eyelids, auto-placed ─────────────────────────────────────────
          // The eyes are painted on the visor texture (no eye bones), so we
          // locate them precisely: scan every front-facing vertex, sample its
          // texel via the UVs, and cluster the bright-purple "eye glow" ones.
          scene.updateMatrixWorld(true);
          const eyeCenters: InstanceType<typeof THREE.Vector3>[] = [];
          let eyeRadius = 0.09;
          try {
            type Attr = { getX(i: number): number; getY(i: number): number; getZ(i: number): number; count: number };
            type SkinnedLike = {
              geometry: {
                attributes: Record<string, Attr | undefined>;
                index?: { getX(i: number): number; count: number } | null;
              };
              material: unknown;
              localToWorld(v: InstanceType<typeof THREE.Vector3>): InstanceType<typeof THREE.Vector3>;
            };
            // Assigned via an `unknown` intermediate — TS can't track writes
            // made inside the traverse callback.
            let foundMesh: unknown = null;
            model.traverse((o) => {
              if ((o as unknown as { isSkinnedMesh?: boolean }).isSkinnedMesh) foundMesh = o;
            });
            const skinned = foundMesh as SkinnedLike | null;
            const geoAttrs = skinned?.geometry.attributes;
            const posA = geoAttrs?.position;
            const uvA = geoAttrs?.uv;
            const idxA = skinned?.geometry.index ?? null;
            const img = (skinned?.material as { map?: { image?: CanvasImageSource & { width: number; height: number } } })?.map?.image;
            // The eyes are painted BETWEEN vertices (smooth visor dome), so
            // vertex sampling can't find them. Instead: find the purple eye
            // blobs in the texture itself, then map their UV centroids back
            // to 3D through the triangles that contain them.
            if (skinned && posA && uvA && img && img.width * img.height <= 4_500_000) {
              const W = img.width, H = img.height;
              const cv = document.createElement("canvas");
              cv.width = W; cv.height = H;
              const cx = cv.getContext("2d")!;
              cx.drawImage(img, 0, 0);
              const px = cx.getImageData(0, 0, W, H).data;
              const isPurple = (o4: number) => px[o4 + 2] > 150 && px[o4] > 110 && px[o4 + 2] > px[o4 + 1] + 55 && px[o4] > px[o4 + 1] + 15;
              const isDark = (o4: number) => px[o4] + px[o4 + 1] + px[o4 + 2] < 170;

              // ── Emissive map: only the purple "energy" texels glow ────────
              // (halo, chest U, eyes, accents — everything else stays black.)
              const em = document.createElement("canvas");
              em.width = W; em.height = H;
              const ex = em.getContext("2d")!;
              const eData = ex.createImageData(W, H);
              for (let i4 = 0; i4 < px.length; i4 += 4) {
                const r = px[i4], g = px[i4 + 1], b = px[i4 + 2];
                if (b > 120 && b > g + 35 && r > 90) {
                  eData.data[i4] = r;
                  eData.data[i4 + 1] = g;
                  eData.data[i4 + 2] = b;
                }
                eData.data[i4 + 3] = 255;
              }
              ex.putImageData(eData, 0, 0);
              const emTex = new THREE.CanvasTexture(em);
              emTex.flipY = false; // match the glTF UV convention
              emTex.colorSpace = THREE.SRGBColorSpace;
              const gMat = skinned.material as {
                emissiveMap?: unknown;
                emissive?: { set(c: number): void };
                emissiveIntensity?: number;
                needsUpdate?: boolean;
              };
              gMat.emissiveMap = emTex;
              // Violet tint (not white) so tone mapping keeps the glow purple
              // instead of washing it out to pink.
              gMat.emissive?.set(0xa855f7);
              gMat.emissiveIntensity = 1.2;
              gMat.needsUpdate = true;
              glowMat = gMat as { emissiveIntensity: number };
              cleanups.push(() => emTex.dispose());

              // 1) Flood-fill purple texels into blobs.
              type Blob = { cx: number; cy: number; n: number; w: number; h: number };
              const seen = new Uint8Array(W * H);
              const blobs: Blob[] = [];
              const stack: number[] = [];
              for (let y = 0; y < H; y++) {
                for (let x = 0; x < W; x++) {
                  const ii = y * W + x;
                  if (seen[ii]) continue;
                  seen[ii] = 1;
                  if (!isPurple(ii * 4)) continue;
                  stack.length = 0;
                  stack.push(ii);
                  let n = 0, sx = 0, sy = 0, minx = x, maxx = x, miny = y, maxy = y;
                  while (stack.length) {
                    const ci = stack.pop()!;
                    const ax = ci % W, ay = (ci / W) | 0;
                    n++; sx += ax; sy += ay;
                    if (ax < minx) minx = ax; if (ax > maxx) maxx = ax;
                    if (ay < miny) miny = ay; if (ay > maxy) maxy = ay;
                    if (ax + 1 < W && !seen[ci + 1]) { seen[ci + 1] = 1; if (isPurple((ci + 1) * 4)) stack.push(ci + 1); }
                    if (ax - 1 >= 0 && !seen[ci - 1]) { seen[ci - 1] = 1; if (isPurple((ci - 1) * 4)) stack.push(ci - 1); }
                    if (ay + 1 < H && !seen[ci + W]) { seen[ci + W] = 1; if (isPurple((ci + W) * 4)) stack.push(ci + W); }
                    if (ay - 1 >= 0 && !seen[ci - W]) { seen[ci - W] = 1; if (isPurple((ci - W) * 4)) stack.push(ci - W); }
                  }
                  if (n >= 20) blobs.push({ cx: sx / n, cy: sy / n, n, w: maxx - minx + 1, h: maxy - miny + 1 });
                }
              }

              // 2) Eyes = roundish blobs ringed by the black visor (the smile
              // is too wide; halo/chest/feet sit on white, not black).
              const eyeBlobs = blobs
                .filter((b) => {
                  const ar = b.w / b.h;
                  if (ar > 2.2 || ar < 0.45) return false;
                  const rad = Math.max(b.w, b.h) * 0.9 + 2;
                  let dark = 0, tot = 0;
                  for (let k = 0; k < 20; k++) {
                    const a = (k / 20) * Math.PI * 2;
                    const x2 = Math.round(b.cx + Math.cos(a) * rad);
                    const y2 = Math.round(b.cy + Math.sin(a) * rad);
                    if (x2 < 0 || y2 < 0 || x2 >= W || y2 >= H) continue;
                    tot++;
                    if (isDark((y2 * W + x2) * 4)) dark++;
                  }
                  return tot > 0 && dark / tot >= 0.55;
                })
                .sort((a, b2) => b2.n - a.n)
                .slice(0, 2);

              // 3) Map blob centroids UV → 3D. Mirrored geometry can share
              // one UV island, so collect every triangle containing the UV.
              type Hit = { p: InstanceType<typeof THREE.Vector3>; r: number };
              const hits: Hit[] = [];
              const triCount = Math.floor((idxA ? idxA.count : posA.count) / 3);
              const gi = (i: number) => (idxA ? idxA.getX(i) : i);
              const pa = new THREE.Vector3(), pb = new THREE.Vector3();
              if (triCount < 200_000) {
                for (const b of eyeBlobs) {
                  const u = b.cx / W, v = b.cy / H;
                  for (let tI = 0; tI < triCount && hits.length < 12; tI++) {
                    const i0 = gi(tI * 3), i1 = gi(tI * 3 + 1), i2 = gi(tI * 3 + 2);
                    const u0 = uvA.getX(i0), v0 = uvA.getY(i0);
                    const u1 = uvA.getX(i1), v1 = uvA.getY(i1);
                    const u2 = uvA.getX(i2), v2 = uvA.getY(i2);
                    const d = (v1 - v2) * (u0 - u2) + (u2 - u1) * (v0 - v2);
                    if (Math.abs(d) < 1e-12) continue;
                    const w0 = ((v1 - v2) * (u - u2) + (u2 - u1) * (v - v2)) / d;
                    const w1 = ((v2 - v0) * (u - u2) + (u0 - u2) * (v - v2)) / d;
                    const w2 = 1 - w0 - w1;
                    if (w0 < -0.02 || w1 < -0.02 || w2 < -0.02) continue;
                    const p = new THREE.Vector3(
                      w0 * posA.getX(i0) + w1 * posA.getX(i1) + w2 * posA.getX(i2),
                      w0 * posA.getY(i0) + w1 * posA.getY(i1) + w2 * posA.getY(i2),
                      w0 * posA.getZ(i0) + w1 * posA.getZ(i1) + w2 * posA.getZ(i2),
                    );
                    skinned.localToWorld(p);
                    group.worldToLocal(p);
                    // texel→3D scale from one triangle edge, for the lid size
                    pa.set(posA.getX(i0), posA.getY(i0), posA.getZ(i0));
                    pb.set(posA.getX(i1), posA.getY(i1), posA.getZ(i1));
                    skinned.localToWorld(pa); group.worldToLocal(pa);
                    skinned.localToWorld(pb); group.worldToLocal(pb);
                    const eu = Math.hypot(u1 - u0, v1 - v0);
                    const scale3 = eu > 1e-9 ? pa.distanceTo(pb) / eu : 0;
                    hits.push({ p, r: scale3 * ((Math.max(b.w, b.h) * 0.5) / W) });
                  }
                }
              }

              // 4) Cluster the hits and keep the most eye-like pair.
              type Cl = { c: InstanceType<typeof THREE.Vector3>; n: number; r: number };
              const cls: Cl[] = [];
              for (const h of hits) {
                let home: Cl | undefined;
                for (const cl of cls) if (cl.c.distanceTo(h.p) < 0.12) { home = cl; break; }
                if (home) {
                  home.n++;
                  home.c.lerp(h.p, 1 / home.n);
                  home.r = (home.r * (home.n - 1) + h.r) / home.n;
                } else {
                  cls.push({ c: h.p.clone(), n: 1, r: h.r });
                }
              }
              let pairBest: [Cl, Cl] | null = null;
              for (let i = 0; i < cls.length; i++) {
                for (let j = i + 1; j < cls.length; j++) {
                  const A = cls[i], B = cls[j];
                  if (Math.abs(A.c.y - B.c.y) > 0.12) continue;
                  const dx = Math.abs(A.c.x - B.c.x);
                  if (dx < 0.15 || dx > 0.55) continue;
                  if (Math.abs(A.c.z - B.c.z) > 0.2) continue;
                  if (!pairBest || A.c.y + B.c.y > pairBest[0].c.y + pairBest[1].c.y) pairBest = [A, B];
                }
              }
              if (pairBest) {
                eyeCenters.push(pairBest[0].c, pairBest[1].c);
                eyeRadius = Math.min(0.13, Math.max(0.05, ((pairBest[0].r + pairBest[1].r) / 2) * 1.25));
              }
            }
          } catch { /* fall back below */ }

          // Fallback: head-bone anchored guess if detection found nothing.
          if (eyeCenters.length < 2) {
            eyeCenters.length = 0;
            const head = bones["Head"];
            const anchor = new THREE.Vector3(group.position.x, 0.45, 0);
            if (head) {
              head.updateWorldMatrix(true, false);
              head.getWorldPosition(anchor);
              group.worldToLocal(anchor);
            }
            for (const side of [-1, 1]) {
              eyeCenters.push(new THREE.Vector3(anchor.x + side * 0.16, anchor.y + 0.14, anchor.z + 0.5));
            }
          }

          const lidMat = new THREE.MeshBasicMaterial({ color: 0x0b0714 });
          for (const c of eyeCenters) {
            const lid = new THREE.Mesh(new THREE.CircleGeometry(eyeRadius, 24), lidMat);
            lid.scale.set(1.2, 0.01, 1);
            lid.position.copy(c);
            lid.position.z += 0.05; // sit just off the visor surface
            group.add(lid);
            lids.push(lid);
          }

          setReady(true);
        },
        undefined,
        () => setReady(true), // reveal container even if load fails
      );

      // Pointer, normalized to [-1, 1] across the viewport.
      const pointer = { x: 0, y: 0 };
      const onMove = (e: PointerEvent) => {
        pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
        pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
      };
      window.addEventListener("pointermove", onMove);
      cleanups.push(() => window.removeEventListener("pointermove", onMove));

      const clock = new THREE.Clock();
      let rotX = 0;
      let rotY = 0;
      let energy = 0; // 0 = calm, 1 = excited (hover)
      let lastFrame = 0;
      // Accumulated phases — speeding up on hover advances these faster
      // instead of multiplying absolute time (which teleports the sine phase
      // and makes the bob thrash while the speed ramps).
      let floatPhase = 0;
      let breathePhase = 0;

      const tick = () => {
        raf = requestAnimationFrame(tick);
        if (document.hidden || pausedRef.current) return;
        // 30fps is plenty for a 176px mascot — halves the GPU/CPU cost so
        // the widget never competes with page scrolling.
        const now = performance.now();
        if (now - lastFrame < 33) return;
        const dt = lastFrame ? Math.min(now - lastFrame, 100) / 1000 : 0.033;
        lastFrame = now;
        const t = clock.getElapsedTime();

        // Hover excitement ramps everything up slightly.
        energy += ((hoverRef.current ? 1 : 0) - energy) * 0.08;
        const pace = 1 + energy * 0.7;

        if (!reduce) {
          // Idle float + breathing — phase accumulates so hover speed-ups
          // glide instead of jumping.
          floatPhase += dt * 1.6 * pace;
          breathePhase += dt * 2.1 * pace;
          group.position.y = Math.sin(floatPhase) * (0.06 + energy * 0.03);
          const breathe = 1 + Math.sin(breathePhase) * 0.012 + energy * 0.04;
          group.scale.setScalar(breathe);

          // Sparkles: drift upward, wrap, gentle orbital sway.
          const pos = pGeo.attributes.position as { array: Float32Array; needsUpdate: boolean };
          for (let i = 0; i < N; i++) {
            pos.array[i * 3 + 1] += speeds[i] * dt * pace;
            pos.array[i * 3] += Math.sin(t * 0.8 + phases[i]) * 0.0012;
            if (pos.array[i * 3 + 1] > 1.9) pos.array[i * 3 + 1] = -1.6;
          }
          pos.needsUpdate = true;
          sparkles.rotation.y = t * 0.05;
          pMat.opacity = 0.7 + Math.sin(t * 1.3) * 0.15 + energy * 0.15;

          // Wave: a burst every ~7s (continuous while hovered), driven through
          // the real forearm/hand bones on top of their bind pose.
          const phase = t % 7;
          const burstWave = phase < 1.8 ? Math.sin(phase * 11) * Math.sin((phase / 1.8) * Math.PI) : 0;
          // Blend by smoothed energy so hover fades the wave in/out instead
          // of snapping the arm to a new phase.
          const hoverMix = Math.min(1, energy * 1.4);
          const wave = burstWave * (1 - hoverMix) + Math.sin(t * 11) * hoverMix;
          for (const w of waveBones) {
            tmpQ.setFromAxisAngle(waveAxis, wave * w.amp);
            w.bone.quaternion.copy(w.q0).multiply(tmpQ);
          }

          // Blink: quick shut-and-open on a randomised timer.
          if (t > nextBlink) {
            blinkStart = t;
            nextBlink = t + 2.6 + Math.random() * 2.4;
          }
          const bp = (t - blinkStart) / 0.16;
          let closed = bp >= 0 && bp <= 1 ? Math.sin(bp * Math.PI) : 0;
          for (const lid of lids) lid.scale.y = Math.max(0.01, closed * 1.05);

          // Soft glow pulse — halo, chest U and eyes breathe with him.
          if (glowMat) glowMat.emissiveIntensity = 1.1 + Math.sin(t * 2.2) * 0.3 + energy * 0.5;
        }

        // Look toward the cursor (clamped), with a base sway.
        const sway = reduce ? 0 : Math.sin(t * 0.5) * 0.1;
        rotY += (pointer.x * 0.36 + sway - rotY) * 0.06;
        rotX += (pointer.y * 0.2 - rotX) * 0.06;
        group.rotation.y = rotY;
        group.rotation.x = rotX;

        // Greet nod — a decaying dip for ~1s after greetKey changes.
        const since = (performance.now() - greetRef.current) / 1000;
        if (since < 1) {
          group.rotation.x += Math.sin(since * Math.PI * 3) * 0.28 * (1 - since);
        }

        renderer.render(scene, camera);
      };
      tick();

      cleanups.push(() => {
        cancelAnimationFrame(raf);
        pmrem.dispose();
        renderer.dispose();
        scene.traverse((o) => {
          const m = o as unknown as { geometry?: { dispose(): void }; material?: unknown };
          m.geometry?.dispose?.();
          const mat = m.material;
          if (Array.isArray(mat)) mat.forEach((x) => (x as { dispose?: () => void })?.dispose?.());
          else (mat as { dispose?: () => void })?.dispose?.();
        });
        renderer.domElement.remove();
      });
    })();

    return () => {
      disposed = true;
      cleanups.forEach((fn) => fn());
    };
  }, [size]);

  return (
    <button
      type="button"
      onClick={onClick}
      onPointerEnter={() => { hoverRef.current = true; }}
      onPointerLeave={() => { hoverRef.current = false; }}
      aria-label="Chat with Unixi"
      className="unixi3d-launch"
      style={{ width: size, height: size }}
    >
      <div ref={mountRef} style={{ width: size, height: size, opacity: ready ? 1 : 0, transition: "opacity 0.4s" }} />
    </button>
  );
}
