import Link from "next/link";
import { ArrowRight, ExternalLink, Github } from "lucide-react";
import type { Project } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

export function ProjectCard({ project, className }: { project: Project; className?: string }) {
  return (
    <article
      className={cn(
        "card-surface group flex h-full flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-violet/40 hover:shadow-glow-violet",
        className
      )}
    >
      {/* Procedural visual placeholder — no external images needed */}
      <div className="relative flex h-40 items-center justify-center overflow-hidden border-b border-ink-line bg-gradient-to-br from-ink-raised via-ink-card to-ink">
        <div className="bg-grid absolute inset-0 opacity-40" aria-hidden="true" />
        <div
          className="absolute h-28 w-28 rounded-full bg-gradient-to-br from-cyan/25 to-violet/25 blur-2xl transition-opacity duration-300 group-hover:opacity-100 opacity-60"
          aria-hidden="true"
        />
        <div className="relative flex items-center gap-1.5" aria-hidden="true">
          {[24, 34, 28, 40, 30].map((h, i) => (
            <div
              key={i}
              className="w-3 rounded-sm bg-gradient-to-t from-cyan/60 to-violet/60 transition-all duration-300 group-hover:scale-y-110"
              style={{ height: h }}
            />
          ))}
        </div>
        <span className="absolute bottom-3 right-3 font-mono text-[10px] text-muted-dim">
          procedural preview
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-2">
          <Badge tone="cyan">{project.category}</Badge>
          {project.featured && <Badge tone="violet">Featured</Badge>}
        </div>
        <h3 className="mt-3 font-display text-lg font-semibold text-slate-100 group-hover:text-cyan-soft">
          {project.title}
        </h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">{project.summary}</p>
        <p className="mt-3 font-mono text-xs text-muted-dim">{project.techStack}</p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tags.split("|").map((tag) => (
            <span key={tag} className="rounded-full border border-ink-line px-2 py-0.5 font-mono text-[10px] text-muted-dim">
              #{tag.trim()}
            </span>
          ))}
        </div>

        <div className="mt-5 flex items-center gap-2 border-t border-ink-line pt-4">
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-cyan-soft hover:underline"
          >
            View case study <ArrowRight size={14} aria-hidden="true" />
          </Link>
          <span className="ml-auto flex gap-1.5">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Live demo of ${project.title}`}
                className="rounded-md p-1.5 text-muted-dim transition-colors hover:text-emerald"
              >
                <ExternalLink size={15} aria-hidden="true" />
              </a>
            )}
            {project.repositoryUrl && (
              <a
                href={project.repositoryUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Source code of ${project.title}`}
                className="rounded-md p-1.5 text-muted-dim transition-colors hover:text-cyan-soft"
              >
                <Github size={15} aria-hidden="true" />
              </a>
            )}
          </span>
        </div>
      </div>
    </article>
  );
}