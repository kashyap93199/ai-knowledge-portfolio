"use client";

import { useMemo, useState } from "react";
import { ExternalLink, Search } from "lucide-react";
import type { Resource } from "@/types";
import { FilterTabs } from "@/components/ui/FilterTabs";
import { EmptyState } from "@/components/ui/Feedback";
import { Badge } from "@/components/ui/Badge";

const levelTone: Record<string, "cyan" | "violet" | "emerald" | "danger" | "neutral"> = {
  Beginner: "emerald",
  Intermediate: "cyan",
  Advanced: "violet",
};

export function ResourceFilters({ resources }: { resources: Resource[] }) {
  const categories = ["All", ...Array.from(new Set(resources.map((r) => r.category)))];
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return resources.filter((r) => {
      const matchesCategory = category === "All" || r.category === category;
      const matchesQuery =
        q.length === 0 ||
        r.title.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        (r.license ?? "").toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [resources, category, query]);

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <FilterTabs
          options={categories}
          active={category}
          onChange={setCategory}
          label="Filter resources by category"
          className="mb-0"
        />
        <label className="relative block w-full sm:w-72">
          <span className="sr-only">Search resources</span>
          <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-dim" aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filter resources…"
            className="w-full rounded-lg border border-ink-line bg-ink-raised/70 py-2.5 pl-9 pr-3 text-sm text-slate-100 placeholder:text-muted-dim focus:border-cyan/60 focus:outline-none focus:ring-2 focus:ring-cyan/20"
          />
        </label>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          title="No matching resources"
          message="Try a different category or search term."
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {filtered.map((resource) => (
            <a
              key={resource.url}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="card-surface group block p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald/40 hover:shadow-glow"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-display text-base font-semibold text-slate-100 group-hover:text-emerald">
                  {resource.title}
                </h3>
                <ExternalLink size={15} className="mt-1 shrink-0 text-muted-dim transition-colors group-hover:text-emerald" aria-hidden="true" />
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted">{resource.description}</p>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <Badge tone="cyan">{resource.category}</Badge>
                {resource.level && (
                  <Badge tone={levelTone[resource.level] ?? "neutral"}>{resource.level}</Badge>
                )}
                {resource.license && (
                  <span className="font-mono text-[11px] text-muted-dim">{resource.license}</span>
                )}
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}