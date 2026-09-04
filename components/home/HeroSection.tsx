"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown, PlayCircle } from "lucide-react";
import { CanvasScene } from "@/components/three/CanvasScene";
import { Button } from "@/components/ui/Button";

interface HeroStats {
  label: string;
  value: string;
}

export function HeroSection({
  title,
  subtitle,
  eyebrow,
  stats,
}: {
  title: string;
  subtitle: string;
  eyebrow: string;
  stats: HeroStats[];
}) {
  const reduceMotion = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 40, damping: 20 });
  const sy = useSpring(my, { stiffness: 40, damping: 20 });
  const translateX = useTransform(sx, [-0.5, 0.5], [-12, 12]);
  const translateY = useTransform(sy, [-0.5, 0.5], [-8, 8]);

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (reduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
  };
  const item = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] as const } },
  };

  return (
    <section
      className="relative flex min-h-[calc(100vh-4rem)] items-center overflow-hidden"
      onPointerMove={handlePointerMove}
      aria-label="Hero"
    >
      {/* 3D background */}
      <div className="absolute inset-0">
        <CanvasScene variant="network" label="Animated 3D neural network visualization" className="h-full w-full" />
        <div className="bg-grid absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" aria-hidden="true" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" aria-hidden="true" />
      </div>

      {/* Content */}
      <motion.div
        variants={reduceMotion ? undefined : container}
        initial={reduceMotion ? undefined : "hidden"}
        animate={reduceMotion ? undefined : "show"}
        style={reduceMotion ? undefined : { x: translateX, y: translateY }}
        className="relative z-10 mx-auto w-full max-w-5xl px-4 py-24 text-center sm:px-6"
      >
        <motion.p
          variants={item}
          className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan/30 bg-cyan/5 px-4 py-1.5 font-mono text-xs uppercase tracking-[0.2em] text-cyan-soft"
        >
          <span className="h-1.5 w-1.5 animate-pulse-glow rounded-full bg-cyan" aria-hidden="true" />
          {eyebrow}
        </motion.p>

        <motion.h1
          variants={item}
          className="font-display text-4xl font-bold leading-[1.1] tracking-tight text-slate-50 sm:text-6xl lg:text-7xl"
        >
          {title}
        </motion.h1>

        <motion.p
          variants={item}
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg"
        >
          {subtitle}
        </motion.p>

        <motion.div
          variants={item}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Button href="/overview" size="lg">
            Explore AI
            <ArrowRight size={18} aria-hidden="true" />
          </Button>
          <Button href="/workflow" size="lg" variant="secondary">
            <PlayCircle size={18} aria-hidden="true" />
            View Workflow
          </Button>
          <Button href="/projects" size="lg" variant="outline">
            See Projects
          </Button>
        </motion.div>

        <motion.dl
          variants={item}
          className="mx-auto mt-16 grid max-w-2xl grid-cols-2 gap-6 sm:grid-cols-4"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <dt className="order-2 mt-1 text-xs uppercase tracking-wider text-muted-dim">
                {stat.label}
              </dt>
              <dd className="order-1 font-display text-2xl font-bold text-cyan-soft sm:text-3xl">
                {stat.value}
              </dd>
            </div>
          ))}
        </motion.dl>
      </motion.div>

      <a
        href="#featured"
        aria-label="Scroll to featured content"
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-muted-dim transition-colors hover:text-cyan-soft"
      >
        <ChevronDown size={26} className="animate-bounce" aria-hidden="true" />
      </a>
    </section>
  );
}