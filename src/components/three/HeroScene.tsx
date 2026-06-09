"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sparkles } from "@react-three/drei";
import { useEffect, useRef, useState, Suspense, RefObject } from "react";
import * as THREE from "three";

type Pointer = { x: number; y: number };

/** Distorted, light-reactive blob that gently tilts toward the cursor. */
function Blob({ pointer }: { pointer: RefObject<Pointer> }) {
  const group = useRef<THREE.Group>(null!);
  const mesh = useRef<THREE.Mesh>(null!);

  useFrame((_, delta) => {
    if (mesh.current) {
      mesh.current.rotation.y += delta * 0.14;
      mesh.current.rotation.z += delta * 0.04;
    }
    if (group.current) {
      // Smoothly lean toward the pointer for a parallax feel
      group.current.rotation.x = THREE.MathUtils.lerp(
        group.current.rotation.x,
        pointer.current.y * 0.25,
        0.04
      );
      group.current.rotation.y = THREE.MathUtils.lerp(
        group.current.rotation.y,
        pointer.current.x * 0.35,
        0.04
      );
    }
  });

  return (
    <group ref={group}>
      <Float speed={1.3} rotationIntensity={0.4} floatIntensity={0.9}>
        <mesh ref={mesh} scale={1.65}>
          {/* detail 5 ≈ 10k verts — smooth distortion, trivial for any desktop GPU */}
          <icosahedronGeometry args={[1, 5]} />
          <MeshDistortMaterial
            color="#5b56f0"
            emissive="#7c3aed"
            emissiveIntensity={0.45}
            roughness={0.25}
            metalness={0.35}
            distort={0.42}
            speed={1.6}
          />
        </mesh>
      </Float>
      <Sparkles count={60} scale={9} size={2.4} speed={0.3} opacity={0.6} color="#a5b4fc" />
    </group>
  );
}

export default function HeroScene() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const pointer = useRef<Pointer>({ x: 0, y: 0 });
  const [active, setActive] = useState(true);

  // Track cursor from window (canvas wrapper is pointer-events:none).
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
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        frameloop={active ? "always" : "never"}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={2.6} color="#818cf8" />
        <pointLight position={[-5, -4, 2]} intensity={2.2} color="#c026d3" />
        <pointLight position={[0, 3, -4]} intensity={1.3} color="#06b6d4" />
        <Suspense fallback={null}>
          <Blob pointer={pointer} />
        </Suspense>
      </Canvas>
    </div>
  );
}
