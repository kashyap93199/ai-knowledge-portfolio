"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { FallbackVisual } from "./FallbackVisual";
import { supportsWebGL } from "./scene-helpers";
import type { SceneVariant } from "./Scene3D";
import { cn } from "@/lib/utils";

const Scene3D = dynamic(() => import("./Scene3D").then((m) => m.Scene3D), {
  ssr: false,
  loading: () => <FallbackVisual />,
});

interface CanvasSceneProps {
  variant?: SceneVariant;
  className?: string;
  label?: string;
}

/**
 * Mounts a WebGL scene lazily, pauses it when off-screen, respects
 * prefers-reduced-motion, and falls back to an SVG visual when WebGL
 * is unavailable. The canvas is purely decorative (aria-hidden).
 */
export function CanvasScene({ variant = "network", className, label }: CanvasSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [webgl, setWebgl] = useState<boolean | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    setWebgl(supportsWebGL());
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    // Start paused; only animate when at least partially visible.
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry?.isIntersecting ?? true),
      { rootMargin: "120px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const showFallback = reduceMotion === true || webgl === false || webgl === null;

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden", className)}
      role="img"
      aria-label={label ?? "Abstract 3D visualization of artificial intelligence"}
    >
      {showFallback ? (
        <FallbackVisual variant={variant} className="h-full w-full" />
      ) : (
        <Scene3D variant={variant} paused={!inView} />
      )}
    </div>
  );
}