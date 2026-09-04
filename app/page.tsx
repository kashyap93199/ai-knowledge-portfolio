import Link from "next/link";
import { ArrowRight, Layers, Sparkles, Workflow } from "lucide-react";
import { HeroSection } from "@/components/home/HeroSection";
import { SectionHeading } from "@/components/ui/Feedback";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { getProjects, getSiteSettings, getTopics, getWorkflowSteps } from "@/lib/queries";

export const dynamic = "force-dynamic";

const heroStats = [
  { label: "AI Domains", value: "10" },
  { label: "Workflow Steps", value: "10" },
  { label: "Projects", value: "6" },
  { label: "Glossary Terms", value: "20+" },
];

export default function HomePage() {
  const settings = getSiteSettings();
  const topics = getTopics().filter((t) => t.featured).slice(0, 4);
  const workflowSteps = getWorkflowSteps();
  const projects = getProjects().filter((p) => p.featured).slice(0, 3);

  return (
    <>
      <HeroSection
        title={settings.heroTitle}
        subtitle={settings.heroSubtitle}
        eyebrow={settings.heroEyebrow}
        stats={heroStats}
      />

      {/* Featured domains */}
      <section id="featured" className="relative py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionHeading
              eyebrow="Explore the field"
              title="Featured AI Domains"
              subtitle="Ten major areas of artificial intelligence, each explained from the ground up with examples, tools, and free learning resources."
            />
          </ScrollReveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {topics.map((topic, i) => (
              <ScrollReveal key={topic.slug} delay={i * 0.06}>
                <Link
                  href={`/domains#${topic.slug}`}
                  className="card-surface group block h-full p-6 transition-all duration-300 hover:-translate-y-1 hover:border-cyan/40 hover:shadow-glow"
                >
                  <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-cyan/20 to-violet/20 text-cyan-soft transition-colors group-hover:text-cyan">
                    <Icon name={topic.icon} size={22} aria-hidden="true" />
                  </span>
                  <h3 className="font-display text-lg font-semibold text-slate-100">{topic.name}</h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">
                    {topic.shortDefinition}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-cyan-soft">
                    Learn more <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow teaser */}
      <section className="relative border-y border-ink-line bg-ink-raised/40 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <div>
                <Badge tone="violet" className="mb-4">
                  <Workflow size={12} aria-hidden="true" /> Core feature
                </Badge>
                <h2 className="font-display text-3xl font-bold tracking-tight text-slate-100 sm:text-4xl">
                  Follow an AI project from idea to deployment
                </h2>
                <p className="mt-4 text-base leading-relaxed text-muted">
                  A full-screen, slide-based journey through the ten stages of building an AI
                  system — from defining the problem to monitoring in production. Navigate with
                  buttons, keyboard arrows, or swipe gestures.
                </p>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {workflowSteps.slice(0, 6).map((step) => (
                    <li key={step.id} className="flex items-center gap-3 text-sm text-slate-300">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-cyan/10 font-mono text-xs font-bold text-cyan-soft">
                        {step.order}
                      </span>
                      {step.title}
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Link
                    href="/workflow"
                    className="inline-flex items-center gap-2 rounded-lg bg-violet px-6 py-3 font-semibold text-white shadow-glow-violet transition-all hover:bg-violet-soft hover:text-ink"
                  >
                    <Layers size={18} aria-hidden="true" /> Start the workflow
                    <ArrowRight size={18} aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <div className="card-surface relative h-80 overflow-hidden">
                <div className="absolute inset-0">
                  {/* Static pipeline visual: no WebGL needed for this teaser */}
                  <div
                    className="absolute inset-0 bg-grid opacity-40"
                    aria-hidden="true"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex items-end gap-2">
                      {workflowSteps.map((step, i) => (
                        <div
                          key={step.id}
                          className="flex w-10 flex-col items-center gap-2"
                          aria-hidden="true"
                        >
                          <div
                            className="w-10 rounded-md border border-cyan/30 bg-cyan/10"
                            style={{ height: `${24 + (i % 5) * 8}px` }}
                          />
                          <span className="font-mono text-[10px] text-muted-dim">{step.order}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="absolute bottom-4 left-4 right-4 text-center font-mono text-xs text-muted-dim">
                  10 slides · keyboard + swipe navigation · progress tracking
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Projects preview */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionHeading
              eyebrow="Portfolio"
              title="Selected Projects"
              subtitle="Hands-on explorations of the ideas on this site — chatbots, vision tools, dashboards, and more."
            />
          </ScrollReveal>

          <div className="grid gap-6 md:grid-cols-3">
            {projects.map((project, i) => (
              <ScrollReveal key={project.slug} delay={i * 0.08}>
                <Link
                  href={`/projects/${project.slug}`}
                  className="card-surface group block h-full p-6 transition-all duration-300 hover:-translate-y-1 hover:border-violet/40 hover:shadow-glow-violet"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <Badge tone="cyan">{project.category}</Badge>
                    <Sparkles size={16} className="text-violet-soft" aria-hidden="true" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-slate-100 group-hover:text-cyan-soft">
                    {project.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">
                    {project.summary}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.tags.split("|").slice(0, 3).map((tag) => (
                      <span key={tag} className="font-mono text-[11px] text-muted-dim">
                        #{tag.trim()}
                      </span>
                    ))}
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}