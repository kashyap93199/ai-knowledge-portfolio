"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, CornerDownLeft, Info } from "lucide-react";
import type { WorkflowStep } from "@/types";
import { Icon } from "@/components/ui/Icon";
import { Badge } from "@/components/ui/Badge";
import { cn, parseList } from "@/lib/utils";

interface WorkflowSliderProps {
  steps: WorkflowStep[];
}

export function WorkflowSlider({ steps }: WorkflowSliderProps) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const reduceMotion = useReducedMotion();
  const regionRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  const step = steps[index];
  const total = steps.length;

  const goTo = useCallback(
    (next: number, dir: number) => {
      if (next < 0 || next >= total) return;
      setDirection(dir);
      setIndex(next);
    },
    [total]
  );

  const goPrev = useCallback(() => goTo(index - 1, -1), [goTo, index]);
  const goNext = useCallback(() => goTo(index + 1, 1), [goTo, index]);

  // Keyboard navigation: arrows + Home/End. Ignored when typing in inputs.
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const target = e.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.tagName === "SELECT") return;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      } else if (e.key === "Home") {
        e.preventDefault();
        goTo(0, -1);
      } else if (e.key === "End") {
        e.preventDefault();
        goTo(total - 1, 1);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goNext, goPrev, goTo, total]);

  // Move focus into the slide region when navigating (not on first render).
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    regionRef.current?.focus({ preventScroll: true });
  }, [index]);

  // Touch / swipe support.
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = (e.changedTouches[0]?.clientX ?? touchStartX.current) - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) > 60) {
      if (delta < 0) goNext();
      else goPrev();
    }
  };

  const slideVariants = {
    enter: (dir: number) => ({ x: dir * 60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir * -60, opacity: 0 }),
  };

  const toneClasses: Record<string, string> = {
    cyan: "text-cyan-soft",
    violet: "text-violet-soft",
    emerald: "text-emerald",
  };

  const detailsLists = step
    ? [
        { title: "Inputs", items: parseList(step.inputs), tone: "cyan" },
        { title: "Outputs", items: parseList(step.outputs), tone: "violet" },
        { title: "Tools", items: parseList(step.tools), tone: "emerald" },
      ]
    : [];

  return (
    <div
      className="relative"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight" || e.key === "ArrowLeft") e.preventDefault();
      }}
    >
      {/* Progress bar */}
      <div className="mb-6 flex items-center gap-4">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-800">
          <div
            className="h-full rounded-full bg-gradient-to-r from-cyan to-violet transition-all duration-500"
            style={{ width: `${((index + 1) / total) * 100}%` }}
            role="progressbar"
            aria-valuenow={index + 1}
            aria-valuemin={1}
            aria-valuemax={total}
            aria-label="Workflow progress"
          />
        </div>
        <p className="font-mono text-sm text-muted">
          <span className="text-cyan-soft">{String(index + 1).padStart(2, "0")}</span>
          <span className="text-muted-dim"> / {String(total).padStart(2, "0")}</span>
        </p>
      </div>

      {/* Slide content */}
      <div
        ref={regionRef}
        tabIndex={-1}
        aria-live="polite"
        className="card-surface relative overflow-hidden outline-none"
        aria-label={`Workflow step ${index + 1} of ${total}: ${step?.title ?? ""}`}
      >
        <AnimatePresence mode="wait" custom={direction} initial={false}>
          {step && (
            <motion.div
              key={step.id}
              custom={direction}
              variants={reduceMotion ? undefined : slideVariants}
              initial={reduceMotion ? false : "enter"}
              animate="center"
              exit={reduceMotion ? undefined : "exit"}
              transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
              className="grid lg:grid-cols-[1.15fr_1fr]"
            >
              {/* Left: narrative */}
              <div className="p-6 sm:p-10">
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan/25 to-violet/25 text-cyan-soft">
                    <Icon name={step.icon} size={24} aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-soft">
                      Step {step.order}
                    </p>
                    <h2 className="font-display text-2xl font-bold text-slate-50 sm:text-3xl">
                      {step.title}
                    </h2>
                  </div>
                </div>

                <p className="text-base font-medium text-cyan-soft/90">{step.subtitle}</p>
                <p className="mt-3 text-[15px] leading-relaxed text-slate-300">{step.description}</p>
                <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-muted">
                  {step.details}
                </p>
              </div>

              {/* Right: visual + structured details */}
              <div className="border-t border-ink-line bg-ink-raised/40 p-6 sm:p-8 lg:border-l lg:border-t-0">
                {/* Diagram */}
                <div className="relative flex h-36 items-center justify-center overflow-hidden rounded-xl border border-ink-line bg-ink/50">
                  <div className="bg-grid absolute inset-0 opacity-50" aria-hidden="true" />
                  <div className="relative flex items-center gap-2" aria-hidden="true">
                    {[0, 1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center gap-2">
                        <span
                          className={cn(
                            "h-3.5 w-3.5 rounded-full",
                            i === 0 ? "animate-pulse-glow bg-cyan shadow-glow" : "bg-slate-600"
                          )}
                        />
                        {i < 3 && <span className="h-0.5 w-8 rounded bg-cyan/40" />}
                      </div>
                    ))}
                  </div>
                  <Badge tone="violet" className="absolute left-3 top-3">
                    Step {step.order} diagram
                  </Badge>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {detailsLists.map((list) => (
                    <div key={list.title} className="rounded-xl border border-ink-line bg-ink/40 p-4">
                      <h3 className={cn("mb-2 font-mono text-xs uppercase tracking-wider", toneClasses[list.tone])}>
                        {list.title}
                      </h3>
                      <ul className="space-y-1">
                        {list.items.map((item) => (
                          <li key={item} className="text-sm leading-snug text-slate-300">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {step.bestPractices && (
                  <div className="mt-4 rounded-xl border border-emerald/25 bg-emerald/5 p-4">
                    <h3 className="mb-2 flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-emerald">
                      <Info size={13} aria-hidden="true" /> Best practices
                    </h3>
                    <ul className="space-y-1">
                      {parseList(step.bestPractices).map((item) => (
                        <li key={item} className="text-sm leading-snug text-slate-300">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-2" role="tablist" aria-label="Workflow steps">
          {steps.map((s, i) => (
            <button
              key={s.id}
              role="tab"
              aria-selected={i === index}
              aria-label={`Go to step ${i + 1}: ${s.title}`}
              onClick={() => goTo(i, i > index ? 1 : -1)}
              className={cn(
                "h-2.5 flex-1 rounded-full transition-all duration-300 sm:flex-none sm:w-10",
                i === index
                  ? "bg-cyan shadow-glow"
                  : "bg-slate-700 hover:bg-slate-600"
              )}
            />
          ))}
        </div>

        <div className="flex items-center gap-3">
          <p className="hidden font-mono text-xs text-muted-dim sm:block">
            <kbd className="rounded border border-ink-line bg-ink-raised px-1.5 py-0.5">←</kbd>{" "}
            <kbd className="rounded border border-ink-line bg-ink-raised px-1.5 py-0.5">→</kbd> or swipe
          </p>
          <button
            onClick={goPrev}
            disabled={index === 0}
            className="inline-flex items-center gap-2 rounded-lg border border-ink-line px-4 py-2.5 text-sm font-medium text-slate-200 transition-colors hover:border-cyan/50 hover:text-cyan-soft disabled:pointer-events-none disabled:opacity-40"
            aria-label="Previous step"
          >
            <ArrowLeft size={16} aria-hidden="true" /> Previous
          </button>
          <button
            onClick={goNext}
            disabled={index === total - 1}
            className="inline-flex items-center gap-2 rounded-lg bg-cyan px-5 py-2.5 text-sm font-semibold text-ink transition-all hover:bg-cyan-soft disabled:pointer-events-none disabled:opacity-40"
            aria-label={index === total - 1 ? "Last step" : "Next step"}
          >
            {index === total - 1 ? (
              <>
                Done <CornerDownLeft size={16} aria-hidden="true" />
              </>
            ) : (
              <>
                Next <ArrowRight size={16} aria-hidden="true" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}