import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Code2, Heart, Palette, Sparkles } from "lucide-react";
import { CanvasScene } from "@/components/three/CanvasScene";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "About",
  description:
    "Professional introduction, skills, technologies, and design philosophy behind the AI Knowledge Portfolio.",
};

const skills = [
  { icon: Code2, label: "Engineering", items: "TypeScript · Python · React · Next.js · Node.js · SQL · Testing · CI/CD" },
  { icon: Sparkles, label: "AI & ML", items: "Model training & evaluation · NLP · Computer Vision · Generative AI · MLOps" },
  { icon: Palette, label: "Design", items: "Design systems · Accessibility · Data visualization · 3D interfaces" },
  { icon: Heart, label: "Communication", items: "Technical writing · Teaching AI · Product thinking · Collaboration" },
];

export default function AboutPage() {
  const page = db.prepare("SELECT * FROM Page WHERE slug = 'about' AND published = 1").get() as
    | { title: string; description: string }
    | undefined;

  const sections = db
    .prepare("SELECT * FROM Section WHERE pageId = (SELECT id FROM Page WHERE slug = 'about') ORDER BY \"order\" ASC")
    .all() as { id: number; type: string; title: string; subtitle: string | null; content: string }[];

  if (!page) return null;

  return (
    <>
      <section className="relative overflow-hidden border-b border-ink-line">
        <div className="absolute inset-0 opacity-40">
          <CanvasScene variant="particles" label="Abstract particle field" className="h-full w-full" />
        </div>
        <div className="relative z-10 mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 sm:py-24">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-cyan-soft">About</p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-slate-50 sm:text-5xl">
            {page.title}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted">
            {page.description}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        {sections.map((section, i) => (
          <ScrollReveal key={section.id} delay={0.04}>
            <section className="mb-14" aria-labelledby={`about-${section.id}`}>
              <h2 id={`about-${section.id}`} className="font-display text-2xl font-bold text-slate-100 sm:text-3xl">
                {section.title}
              </h2>
              {section.subtitle && <p className="mt-1 text-sm text-muted-dim">{section.subtitle}</p>}
              <div className="prose-ai mt-5 whitespace-pre-line text-[15px] leading-relaxed">
                {section.content}
              </div>
            </section>
          </ScrollReveal>
        ))}

        {/* Skills grid */}
        <ScrollReveal>
          <section className="mb-14" aria-label="Skills">
            <h2 className="font-display text-2xl font-bold text-slate-100 sm:text-3xl">At a glance</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {skills.map((skill) => (
                <div key={skill.label} className="card-surface p-5">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan/20 to-violet/20 text-cyan-soft">
                      <skill.icon size={19} aria-hidden="true" />
                    </span>
                    <h3 className="font-display text-base font-semibold text-slate-100">{skill.label}</h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{skill.items}</p>
                </div>
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* Contact CTA */}
        <ScrollReveal>
          <section className="card-surface relative overflow-hidden p-10 text-center">
            <div className="bg-grid absolute inset-0 opacity-30" aria-hidden="true" />
            <div className="relative">
              <h2 className="font-display text-2xl font-bold text-slate-50 sm:text-3xl">
                Let’s talk about your next AI project
              </h2>
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted">
                Have a project in mind, or just curious about how AI could fit your work? My inbox
                is open.
              </p>
              <Link
                href="/contact"
                className="mt-6 inline-flex items-center gap-2 rounded-lg bg-cyan px-7 py-3 font-semibold text-ink shadow-glow transition-all hover:bg-cyan-soft"
              >
                Get in touch <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </div>
          </section>
        </ScrollReveal>
      </div>
    </>
  );
}