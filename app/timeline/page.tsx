import type { Metadata } from "next";
import { CanvasScene } from "@/components/three/CanvasScene";
import { TimelineItem } from "@/components/timeline/TimelineItem";
import { getTimeline } from "@/lib/queries";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "AI Timeline",
  description:
    "A journey through AI history: the Turing Test, the birth of the field, expert systems, deep learning breakthroughs, transformers, and generative AI.",
};

export default function TimelinePage() {
  const events = getTimeline();

  return (
    <>
      {/* Header with particle backdrop */}
      <section className="relative overflow-hidden border-b border-ink-line">
        <div className="absolute inset-0 opacity-40">
          <CanvasScene variant="particles" label="Abstract particle field" className="h-full w-full" />
        </div>
        <div className="relative z-10 mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 sm:py-24">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-cyan-soft">AI Timeline</p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-slate-50 sm:text-5xl">
            Seven Decades of Intelligence
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted">
            From Alan Turing’s question in 1950 to the generative systems of today — the ideas,
            breakthroughs, and people that built artificial intelligence.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <div className="relative">
          {/* Center line (desktop) / left line (mobile) */}
          <div
            className="absolute bottom-0 left-3 top-0 w-px bg-gradient-to-b from-cyan/60 via-violet/40 to-transparent md:left-1/2"
            aria-hidden="true"
          />
          <div className="space-y-2">
            {events.map((event, i) => (
              <TimelineItem key={event.id} event={event} side={i % 2 === 0 ? "left" : "right"} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}