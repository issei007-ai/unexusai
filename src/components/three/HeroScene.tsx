"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sparkles } from "@react-three/drei";
import { useEffect, useRef, useState, Suspense, RefObject } from "react";
import * as THREE from "three";

type Pointer = { x: number; y: number };

interface Props {
  onUnsupported?: () => void;
  onStable?: () => void;
}

/** Measures real frame rate over ~1s of rendered time; if the GPU can't keep
 *  up, bail out. Uses accumulated frame deltas (not wall clock) so pausing the
 *  scene mid-measure doesn't produce a false negative. Frames with a huge delta
 *  (a pause/resume or stall spike) are skipped, not counted. */
function FpsWatchdog({ onUnsupported, onStable }: Props) {
  const frames = useRef(0);
  const acc = useRef(0);
  const done = useRef(false);

  useFrame((_, delta) => {
    if (done.current) return;
    if (delta > 0.25) return; // ignore pause/resume or stall spikes
    frames.current++;
    acc.current += delta;
    if (acc.current >= 1.0) {
      done.current = true;
      const fps = frames.current / acc.current;
      if (fps < 40) onUnsupported?.();
      else onStable?.();
    }
  });
  return null;
}

/** Distorted, light-reactive blob that gently tilts toward the cursor. */
function Blob({ pointer }: { pointer: RefObject<Pointer> }) {
  const group = useRef<THREE.Group>(null!);
  const mesh = useRef<THREE.Mesh>(null!);

  useFrame((_, delta) => {
    if (mesh.current) {
      mesh.current.rotation.y += delta * 0.12;
      mesh.current.rotation.z += delta * 0.03;
    }
    if (group.current) {
      group.current.rotation.x = THREE.MathUtils.lerp(
        group.current.rotation.x,
        pointer.current.y * 0.22,
        0.04
      );
      group.current.rotation.y = THREE.MathUtils.lerp(
        group.current.rotation.y,
        pointer.current.x * 0.3,
        0.04
      );
    }
  });

  return (
    <group ref={group}>
      <Float speed={1.2} rotationIntensity={0.35} floatIntensity={0.8}>
        <mesh ref={mesh} scale={1.65}>
          {/* detail 4 ≈ 2.5k verts — smooth enough, much cheaper than detail 5 */}
          <icosahedronGeometry args={[1, 4]} />
          <MeshDistortMaterial
            color="#5b56f0"
            emissive="#7c3aed"
            emissiveIntensity={0.45}
            roughness={0.28}
            metalness={0.3}
            distort={0.4}
            speed={1.3}
          />
        </mesh>
      </Float>
      <Sparkles count={32} scale={8} size={2.2} speed={0.25} opacity={0.55} color="#a5b4fc" />
    </group>
  );
}

export default function HeroScene({ onUnsupported, onStable }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const pointer = useRef<Pointer>({ x: 0, y: 0 });
  const [active, setActive] = useState(true);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // Pause rendering when the hero scrolls out of view or the tab is hidden.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => setActive(e.isIntersecting && !document.hidden),
      { threshold: 0.01 }
    );
    io.observe(el);
    const onVis = () => setActive(!document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <div ref={wrapRef} className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, 4.2], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        frameloop={active ? "always" : "never"}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={2.6} color="#818cf8" />
        <pointLight position={[-5, -4, 2]} intensity={2.2} color="#c026d3" />
        <Suspense fallback={null}>
          <Blob pointer={pointer} />
        </Suspense>
        <FpsWatchdog onUnsupported={onUnsupported} onStable={onStable} />
      </Canvas>
    </div>
  );
}
