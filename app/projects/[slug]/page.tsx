import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Github, Lightbulb, Target } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { getProjectBySlug, getProjects } from "@/lib/queries";
import { parseList } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const project = getProjectBySlug(params.slug);
  if (!project) return { title: "Project not found" };
  return {
    title: project.title,
    description: project.summary,
  };
}

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug);
  const allProjects = getProjects();
  if (!project) notFound();

  const features = parseList(project.features);
  const tags = project.tags.split("|").map((t) => t.trim()).filter(Boolean);
  const others = allProjects.filter((p) => p.slug !== project.slug).slice(0, 2);

  return (
    <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
      <nav aria-label="Breadcrumb" className="mb-8">
        <ol className="flex items-center gap-2 text-sm text-muted-dim">
          <li>
            <Link href="/" className="hover:text-cyan-soft">Home</Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/projects" className="hover:text-cyan-soft">Projects</Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-muted">{project.title}</li>
        </ol>
      </nav>

      <header className="mb-10">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="cyan">{project.category}</Badge>
          {project.featured && <Badge tone="violet">Featured</Badge>}
        </div>
        <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-slate-50 sm:text-4xl">
          {project.title}
        </h1>
        <p className="mt-3 text-lg leading-relaxed text-muted">{project.summary}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span key={tag} className="rounded-full border border-ink-line px-2.5 py-0.5 font-mono text-xs text-muted-dim">
              #{tag}
            </span>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          {project.demoUrl && (
            <Button href={project.demoUrl} target="_blank" rel="noopener noreferrer" variant="outline">
              <ExternalLink size={16} aria-hidden="true" /> Live demo
            </Button>
          )}
          {project.repositoryUrl && (
            <Button href={project.repositoryUrl} target="_blank" rel="noopener noreferrer" variant="secondary">
              <Github size={16} aria-hidden="true" /> View source
            </Button>
          )}
        </div>
      </header>

      {/* Procedural preview band */}
      <div className="relative mb-10 flex h-56 items-center justify-center overflow-hidden rounded-2xl border border-ink-line bg-gradient-to-br from-ink-raised via-ink-card to-ink">
        <div className="bg-grid absolute inset-0 opacity-40" aria-hidden="true" />
        <div className="absolute h-40 w-40 rounded-full bg-gradient-to-br from-cyan/25 to-violet/25 blur-3xl" aria-hidden="true" />
        <div className="relative flex items-end gap-2" aria-hidden="true">
          {[28, 40, 32, 48, 36, 52, 30].map((h, i) => (
            <div key={i} className="w-4 rounded-sm bg-gradient-to-t from-cyan/60 to-violet/60" style={{ height: h }} />
          ))}
        </div>
        <p className="absolute bottom-3 right-4 font-mono text-[10px] text-muted-dim">
          procedural preview — replace with a screenshot
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2">
        <section className="card-surface p-6">
          <h2 className="mb-3 flex items-center gap-2 font-display text-lg font-semibold text-slate-100">
            <Target size={18} className="text-danger" aria-hidden="true" /> The Problem
          </h2>
          <p className="whitespace-pre-line text-sm leading-relaxed text-muted">{project.problem}</p>
        </section>

        <section className="card-surface p-6">
          <h2 className="mb-3 flex items-center gap-2 font-display text-lg font-semibold text-slate-100">
            <Lightbulb size={18} className="text-cyan-soft" aria-hidden="true" /> The Solution
          </h2>
          <p className="whitespace-pre-line text-sm leading-relaxed text-muted">{project.solution}</p>
        </section>
      </div>

      <section className="mt-8">
        <h2 className="font-display text-xl font-semibold text-slate-100">Key Features</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {features.map((feature) => (
            <li key={feature} className="card-surface flex items-start gap-3 p-4 text-sm text-slate-300">
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-cyan" aria-hidden="true" />
              {feature}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-8 card-surface p-6">
        <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-muted">
          Technologies
        </h2>
        <p className="mt-2 font-mono text-sm text-cyan-soft">{project.techStack}</p>
      </section>

      {others.length > 0 && (
        <nav className="mt-12 flex items-center justify-between gap-4 border-t border-ink-line pt-8" aria-label="More projects">
          <Link href="/projects" className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-cyan-soft">
            <ArrowLeft size={16} aria-hidden="true" /> All projects
          </Link>
          <Link href={`/projects/${others[0]?.slug}`} className="text-sm font-medium text-cyan-soft hover:underline">
            Next: {others[0]?.title}
          </Link>
        </nav>
      )}
    </article>
  );
}