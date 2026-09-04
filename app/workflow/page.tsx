import type { Metadata } from "next";
import { CanvasScene } from "@/components/three/CanvasScene";
import { WorkflowSlider } from "@/components/workflow/WorkflowSlider";
import { getWorkflowSteps } from "@/lib/queries";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "AI Workflow",
  description:
    "Follow an AI project end to end: problem definition, data collection, training, evaluation, deployment, monitoring, and ethics — in a slide-based interactive experience.",
};

export default function WorkflowPage() {
  const steps = getWorkflowSteps();

  return (
    <>
      {/* Header with animated pipeline scene */}
      <section className="relative overflow-hidden border-b border-ink-line">
        <div className="absolute inset-0 opacity-60">
          <CanvasScene variant="workflow" label="Animated 3D AI pipeline visualization" className="h-full w-full" />
        </div>
        <div className="relative z-10 mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 sm:py-24">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-cyan-soft">The AI Workflow</p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-slate-50 sm:text-5xl">
            From Idea to Production
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted">
            Ten steps take an AI project from a vague problem to a monitored, ethical production
            system. Navigate with the buttons, arrow keys, or swipe gestures.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <WorkflowSlider steps={steps} />
      </div>
    </>
  );
}