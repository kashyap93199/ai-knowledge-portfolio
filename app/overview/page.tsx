import type { Metadata } from "next";
import { CanvasScene } from "@/components/three/CanvasScene";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "AI Overview",
  description:
    "What AI is, why it matters, how AI systems learn, and the differences between AI, machine learning, deep learning, and generative AI.",
};

const comparison = [
  {
    label: "AI",
    scope: "The whole field",
    blurb: "Any system that performs tasks requiring human-like intelligence.",
    accent: "from-cyan to-cyan-soft",
  },
  {
    label: "Machine Learning",
    scope: "Learns from data",
    blurb: "Algorithms that improve with experience instead of hand-coded rules.",
    accent: "from-violet to-violet-soft",
  },
  {
    label: "Deep Learning",
    scope: "Multi-layer neural nets",
    blurb: "Neural networks with many layers that learn hierarchical features.",
    accent: "from-cyan to-violet",
  },
  {
    label: "Generative AI",
    scope: "Creates new content",
    blurb: "Models that generate text, images, audio, and code from prompts.",
    accent: "from-violet to-cyan",
  },
];

export default function OverviewPage() {
  const page = db
    .prepare("SELECT * FROM Page WHERE slug = 'overview' AND published = 1")
    .get() as { title: string; description: string } | undefined;

  const sections = db
    .prepare("SELECT * FROM Section WHERE pageId = (SELECT id FROM Page WHERE slug = 'overview') ORDER BY \"order\" ASC")
    .all() as {
    id: number;
    type: string;
    title: string;
    subtitle: string | null;
    content: string;
  }[];

  if (!page) return null;

  return (
    <>
      {/* Header with particle backdrop */}
      <section className="relative overflow-hidden border-b border-ink-line">
        <div className="absolute inset-0 opacity-50">
          <CanvasScene variant="particles" label="Abstract particle field" className="h-full w-full" />
        </div>
        <div className="relative z-10 mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 sm:py-28">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-cyan-soft">AI Overview</p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-slate-50 sm:text-5xl">
            {page.title}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            {page.description}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        {sections.map((section, i) => {
          if (section.type === "comparison") {
            return (
              <ScrollReveal key={section.id} delay={0.05}>
                <section className="mb-14" aria-labelledby={`section-${section.id}`}>
                  <h2 id={`section-${section.id}`} className="font-display text-2xl font-bold text-slate-100 sm:text-3xl">
                    {section.title}
                  </h2>
                  <p className="mt-1 text-sm text-muted-dim">{section.subtitle}</p>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {comparison.map((c, idx) => (
                      <div
                        key={c.label}
                        className="card-surface relative p-5"
                        style={{ transform: `translateY(${idx % 2 === 0 ? 0 : 12}px)` }}
                      >
                        <div className={`mb-3 h-1 w-10 rounded-full bg-gradient-to-r ${c.accent}`} aria-hidden="true" />
                        <h3 className="font-display text-xl font-bold text-slate-100">{c.label}</h3>
                        <p className="mt-0.5 font-mono text-[11px] uppercase tracking-wider text-cyan-soft">
                          {c.scope}
                        </p>
                        <p className="mt-2 text-sm leading-relaxed text-muted">{c.blurb}</p>
                      </div>
                    ))}
                  </div>
                  <p className="mt-6 text-sm leading-relaxed text-muted">{section.content}</p>
                </section>
              </ScrollReveal>
            );
          }

          return (
            <ScrollReveal key={section.id} delay={0.04}>
              <section className="mb-14" aria-labelledby={`section-${section.id}`}>
                <h2 id={`section-${section.id}`} className="font-display text-2xl font-bold text-slate-100 sm:text-3xl">
                  {section.title}
                </h2>
                {section.subtitle && <p className="mt-1 text-sm text-muted-dim">{section.subtitle}</p>}
                <div className="prose-ai mt-5 whitespace-pre-line text-[15px] leading-relaxed">
                  {section.content}
                </div>
              </section>
            </ScrollReveal>
          );
        })}
      </div>
    </>
  );
}