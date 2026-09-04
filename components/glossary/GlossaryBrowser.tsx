"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronDown, Search } from "lucide-react";
import type { GlossaryTerm } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/Feedback";
import { cn } from "@/lib/utils";

export function GlossaryBrowser({ terms }: { terms: GlossaryTerm[] }) {
  const categories = ["All", ...Array.from(new Set(terms.map((t) => t.category)))];
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [openTerm, setOpenTerm] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return terms.filter((t) => {
      const matchesCategory = category === "All" || t.category === category;
      const matchesQuery =
        q.length === 0 ||
        t.term.toLowerCase().includes(q) ||
        t.simpleDefinition.toLowerCase().includes(q) ||
        t.detailedDefinition.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [terms, query, category]);

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4">
        <label className="relative block w-full max-w-xl">
          <span className="sr-only">Search glossary terms</span>
          <Search size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-dim" aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search terms like “transformer”, “bias”, “inference”…"
            className="w-full rounded-xl border border-ink-line bg-ink-raised/70 py-3 pl-10 pr-4 text-sm text-slate-100 placeholder:text-muted-dim focus:border-cyan/60 focus:outline-none focus:ring-2 focus:ring-cyan/20"
          />
        </label>

        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter glossary by category">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => {
                setCategory(c);
                setOpenTerm(null);
              }}
              aria-pressed={category === c}
              className={cn(
                "rounded-full border px-3.5 py-1 text-sm font-medium transition-colors",
                category === c
                  ? "border-cyan/60 bg-cyan/10 text-cyan-soft"
                  : "border-ink-line text-muted hover:border-cyan/30 hover:text-slate-200"
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <p className="mb-4 text-sm text-muted-dim" aria-live="polite">
        {filtered.length} {filtered.length === 1 ? "term" : "terms"}
      </p>

      {filtered.length === 0 ? (
        <EmptyState title="No terms found" message="Try a different search or category." />
      ) : (
        <div className="space-y-3">
          {filtered.map((term) => {
            const isOpen = openTerm === term.slug;
            const related = term.relatedTerms.split("|").map((t) => t.trim()).filter(Boolean);
            return (
              <article
                key={term.slug}
                id={term.slug}
                className={cn(
                  "card-surface scroll-mt-24 transition-all duration-300",
                  isOpen && "border-cyan/40"
                )}
              >
                <button
                  type="button"
                  onClick={() => setOpenTerm(isOpen ? null : term.slug)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center gap-4 p-5 text-left"
                >
                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-center gap-2">
                      <h2 className="font-display text-lg font-semibold text-slate-100">{term.term}</h2>
                      <Badge tone="violet">{term.category}</Badge>
                    </span>
                    <p className="mt-1 text-sm text-muted">{term.simpleDefinition}</p>
                  </span>
                  <ChevronDown
                    size={18}
                    aria-hidden="true"
                    className={cn(
                      "shrink-0 text-muted-dim transition-transform duration-300",
                      isOpen && "rotate-180 text-cyan-soft"
                    )}
                  />
                </button>
                {isOpen && (
                  <div className="border-t border-ink-line p-5 pt-4">
                    <p className="text-sm leading-relaxed text-slate-300">{term.detailedDefinition}</p>
                    {related.length > 0 && (
                      <div className="mt-4 flex flex-wrap items-center gap-2">
                        <span className="font-mono text-xs uppercase tracking-wider text-muted-dim">
                          Related:
                        </span>
                        {related.map((r) => {
                          const target = terms.find((t) => t.term.toLowerCase() === r.toLowerCase());
                          const href = target ? `/glossary#${target.slug}` : "#";
                          return (
                            <Link
                              key={r}
                              href={href}
                              onClick={() => setOpenTerm(target?.slug ?? null)}
                              className="rounded-full border border-ink-line px-2.5 py-0.5 text-xs text-cyan-soft transition-colors hover:border-cyan/50 hover:bg-cyan/10"
                            >
                              {r}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}