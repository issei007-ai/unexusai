"use client";
import { useEffect, useRef, useState } from "react";
import UnixiAvatar from "@/components/ui/UnixiAvatar";

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
  const [failed, setFailed] = useState(false);
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

          // ── Eyelids, at pre-measured positions ───────────────────────────
          // The eyes are painted on the visor texture with no eye bones, so
          // there's no cheap way to find them from the geometry alone. We used
          // to locate them at runtime — flood-filling the full texture for
          // purple "eye glow" blobs, then brute-force scanning all ~72k mesh
          // triangles to map each blob back to 3D — but that one-time scan was
          // a multi-hundred-ms main-thread block on every page load (the
          // single biggest hit to the Lighthouse Performance score). Since
          // unixi.glb is a fixed shipped asset, not user content, the result
          // never changes — so it's hardcoded from that same detection run.
          const eyeCenters: InstanceType<typeof THREE.Vector3>[] = [
            new THREE.Vector3(-0.177, 1.004, 0.473),
            new THREE.Vector3(0.29, 0.958, 0.541),
          ];
          const eyeRadius = 0.13;

          // ── Emissive map: only the purple "energy" texels glow ────────────
          // (halo, chest U, eyes, accents — everything else stays black.)
          try {
            let foundMesh: unknown = null;
            model.traverse((o) => {
              if ((o as unknown as { isSkinnedMesh?: boolean }).isSkinnedMesh) foundMesh = o;
            });
            const skinned = foundMesh as { material: unknown } | null;
            const img = (skinned?.material as { map?: { image?: CanvasImageSource & { width: number; height: number } } })?.map?.image;
            if (skinned && img && img.width * img.height <= 4_500_000) {
              const W = img.width, H = img.height;
              const cv = document.createElement("canvas");
              cv.width = W; cv.height = H;
              const cx = cv.getContext("2d")!;
              cx.drawImage(img, 0, 0);
              const px = cx.getImageData(0, 0, W, H).data;

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
            }
          } catch { /* glow is a visual nicety — skip it if anything's off */ }

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
        () => setFailed(true), // load/decode failed — fall back to the SVG
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
      {failed ? (
        <span style={{ display: "flex", width: size, height: size, alignItems: "flex-end", justifyContent: "center", paddingBottom: 18 }}>
          <UnixiAvatar size={Math.round(size * 0.42)} state="idle" />
        </span>
      ) : (
        <div ref={mountRef} style={{ width: size, height: size, opacity: ready ? 1 : 0, transition: "opacity 0.4s" }} />
      )}
    </button>
  );
}
