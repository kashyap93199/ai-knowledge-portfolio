"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import {
  buildChainEdges,
  buildEdges,
  generatePipelineNodes,
  generateSphereNodes,
} from "./scene-helpers";

export type SceneVariant = "network" | "particles" | "workflow";

function useReducedMotionPref(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

interface SceneProps {
  paused: boolean;
}

function NetworkScene({ paused }: SceneProps) {
  const group = useRef<THREE.Group>(null);
  const reduced = useReducedMotionPref();

  const nodes = useMemo(() => generateSphereNodes(110, 4.6), []);
  const edges = useMemo(() => buildEdges(nodes, 2.55), [nodes]);

  const nodePositions = useMemo(() => new Float32Array(nodes.flatMap((n) => n.pos)), [nodes]);
  const nodeColors = useMemo(
    () => new Float32Array(nodes.flatMap((n) => new THREE.Color(n.color).toArray())),
    [nodes]
  );
  const edgePositions = useMemo(() => new Float32Array(edges), [edges]);

  const coreRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (paused || reduced || !group.current) return;
    group.current.rotation.y += delta * 0.05;
    // Gentle mouse parallax.
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      state.pointer.y * 0.14,
      0.04
    );
    group.current.rotation.z = THREE.MathUtils.lerp(
      group.current.rotation.z,
      state.pointer.x * 0.1,
      0.04
    );
    if (coreRef.current) {
      coreRef.current.rotation.x += delta * 0.12;
      coreRef.current.rotation.y += delta * 0.08;
    }
  });

  return (
    <group ref={group}>
      {/* Points: the neural nodes */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[nodePositions, 3]} />
          <bufferAttribute attach="attributes-color" args={[nodeColors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.11}
          vertexColors
          transparent
          opacity={0.95}
          sizeAttenuation
          depthWrite={false}
        />
      </points>

      {/* Lines: connections between nearby nodes */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[edgePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#67e8f9" transparent opacity={0.16} depthWrite={false} />
      </lineSegments>

      {/* Abstract core: wireframe icosahedron */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[1.6, 1]} />
        <meshBasicMaterial wireframe color="#a78bfa" transparent opacity={0.5} />
      </mesh>
    </group>
  );
}

function ParticlesScene({ paused }: SceneProps) {
  const group = useRef<THREE.Group>(null);
  const reduced = useReducedMotionPref();

  const { positions, colors } = useMemo(() => {
    const count = 900;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const palette = [new THREE.Color("#22d3ee"), new THREE.Color("#a78bfa"), new THREE.Color("#ffffff")];
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 22;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 12;
      const c = palette[Math.floor(Math.random() * palette.length)];
      c?.toArray(col, i * 3);
    }
    return { positions: pos, colors: col };
  }, []);

  useFrame((_, delta) => {
    if (paused || reduced || !group.current) return;
    group.current.rotation.y += delta * 0.02;
  });

  return (
    <group ref={group}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.07}
          vertexColors
          transparent
          opacity={0.7}
          sizeAttenuation
          depthWrite={false}
        />
      </points>
    </group>
  );
}

function WorkflowScene({ paused }: SceneProps) {
  const group = useRef<THREE.Group>(null);
  const pulseRef = useRef<THREE.Mesh>(null);
  const reduced = useReducedMotionPref();

  const nodes = useMemo(() => generatePipelineNodes(60), []);
  const edges = useMemo(() => buildChainEdges(nodes, 12), [nodes]);
  const nodePositions = useMemo(() => new Float32Array(nodes.flatMap((n) => n.pos)), [nodes]);
  const edgePositions = useMemo(() => new Float32Array(edges), [edges]);

  useFrame((state) => {
    if (paused || reduced || !group.current) return;
    group.current.rotation.y = state.pointer.x * 0.18;
    if (pulseRef.current) {
      // Traveling pulse along the pipeline.
      const t = (state.clock.elapsedTime * 0.35) % 1;
      const idx = Math.floor(t * (nodes.length - 1));
      const next = Math.min(idx + 1, nodes.length - 1);
      const [ax, ay, az] = nodes[idx].pos;
      const [bx, by, bz] = nodes[next].pos;
      const f = t * (nodes.length - 1) - idx;
      pulseRef.current.position.set(
        ax + (bx - ax) * f,
        ay + (by - ay) * f,
        az + (bz - az) * f
      );
    }
  });

  return (
    <group ref={group}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[nodePositions, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.16} color="#22d3ee" transparent opacity={0.9} sizeAttenuation depthWrite={false} />
      </points>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[edgePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#67e8f9" transparent opacity={0.3} depthWrite={false} />
      </lineSegments>
      <mesh ref={pulseRef}>
        <sphereGeometry args={[0.22, 12, 12]} />
        <meshBasicMaterial color="#a78bfa" />
      </mesh>
    </group>
  );
}

function SceneContent({ variant, paused }: { variant: SceneVariant; paused: boolean }) {
  switch (variant) {
    case "particles":
      return <ParticlesScene paused={paused} />;
    case "workflow":
      return <WorkflowScene paused={paused} />;
    default:
      return <NetworkScene paused={paused} />;
  }
}

/**
 * The actual WebGL canvas. Imported lazily (ssr: false) via CanvasScene,
 * with a capped device pixel ratio and no default lights needed.
 */
export function Scene3D({ variant = "network", paused = false }: { variant?: SceneVariant; paused?: boolean }) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      frameloop={paused ? "never" : "always"}
      camera={{ position: [0, 0, 11], fov: 50 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
      style={{ position: "absolute", inset: 0 }}
    >
      <SceneContent variant={variant} paused={paused} />
    </Canvas>
  );
}