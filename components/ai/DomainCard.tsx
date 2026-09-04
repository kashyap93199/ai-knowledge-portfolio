"use client";

import { useState } from "react";
import { BookOpen, ChevronDown, ExternalLink, Wrench } from "lucide-react";
import type { AiTopic } from "@/types";
import { Icon } from "@/components/ui/Icon";
import { Badge } from "@/components/ui/Badge";
import { cn, parseList } from "@/lib/utils";

export function DomainCard({ topic }: { topic: AiTopic }) {
  const [open, setOpen] = useState(false);
  const examples = parseList(topic.examples);
  const tools = parseList(topic.tools);
  const resources = parseList(topic.freeResources);

  return (
    <article
      id={topic.slug}
      className={cn(
        "card-surface scroll-mt-24 transition-all duration-300",
        open ? "border-cyan/40 shadow-glow" : "hover:border-ink-line"
      )}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center gap-4 p-5 text-left"
      >
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan/20 to-violet/20 text-cyan-soft">
          <Icon name={topic.icon} size={22} aria-hidden="true" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-center gap-2">
            <h3 className="font-display text-lg font-semibold text-slate-100">{topic.name}</h3>
            {topic.featured ? (
              <Badge tone="cyan" className="hidden sm:inline-flex">
                Featured
              </Badge>
            ) : null}
          </span>
          <p className="mt-0.5 line-clamp-2 text-sm text-muted">{topic.shortDefinition}</p>
        </span>
        <ChevronDown
          size={20}
          aria-hidden="true"
          className={cn("shrink-0 text-muted-dim transition-transform duration-300", open && "rotate-180 text-cyan-soft")}
        />
      </button>

      {open && (
        <div className="border-t border-ink-line p-5 pt-4">
          <div className="prose-ai whitespace-pre-line text-sm leading-relaxed">
            {topic.longDescription}
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <div>
              <h4 className="mb-2 flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-cyan-soft">
                <BookOpen size={14} aria-hidden="true" /> Examples
              </h4>
              <ul className="space-y-1.5">
                {examples.map((example) => (
                  <li key={example} className="text-sm text-slate-300">
                    {example}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="mb-2 flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-violet-soft">
                <Wrench size={14} aria-hidden="true" /> Tools &amp; methods
              </h4>
              <ul className="space-y-1.5">
                {tools.map((tool) => (
                  <li key={tool} className="text-sm text-slate-300">
                    {tool}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="mb-2 flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-emerald">
                <ExternalLink size={14} aria-hidden="true" /> Free learning
              </h4>
              <ul className="space-y-1.5">
                {resources.map((resource) => {
                  const [label, url] = resource.split(": ");
                  const href = resource.match(/https?:\/\/\S+/)?.[0];
                  return (
                    <li key={resource} className="text-sm">
                      {href ? (
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-300 underline decoration-emerald/40 underline-offset-2 transition-colors hover:text-emerald"
                        >
                          {label}
                        </a>
                      ) : (
                        <span className="text-slate-300">{label}</span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}