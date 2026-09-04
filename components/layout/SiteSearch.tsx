"use client";

import Link from "next/link";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Search, X } from "lucide-react";
import type { SearchResult } from "@/types";
import { cn } from "@/lib/utils";

const SearchContext = createContext<{ openSearch: () => void }>({ openSearch: () => {} });

export const useSiteSearch = () => useContext(SearchContext);

const typeLabels: Record<SearchResult["type"], string> = {
  topic: "Domain",
  project: "Project",
  resource: "Resource",
  glossary: "Glossary",
  workflow: "Workflow",
  timeline: "Timeline",
};

export function SiteSearchProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openSearch = useCallback(() => {
    setOpen(true);
    setQuery("");
    setResults([]);
    setError(null);
  }, []);

  const closeSearch = useCallback(() => {
    setOpen(false);
    setQuery("");
    setResults([]);
  }, []);

  // Ctrl/Cmd+K opens search; Escape closes.
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        openSearch();
      }
      if (e.key === "Escape") closeSearch();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [openSearch, closeSearch]);

  // Focus the input when the dialog opens; lock scroll behind it.
  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Debounced search against the API.
  useEffect(() => {
    if (!open || query.trim().length < 2) {
      setResults([]);
      return;
    }
    if (debounceRef.current) clearTimeout(debounceRef.current);
    setLoading(true);
    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query.trim())}`);
        if (!res.ok) throw new Error("Search failed");
        const data = (await res.json()) as { results: SearchResult[] };
        setResults(data.results);
        setError(null);
      } catch {
        setError("Search is unavailable right now. Please try again.");
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 250);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, open]);

  return (
    <SearchContext.Provider value={{ openSearch }}>
      {children}

      {open && (
        <div
          className="fixed inset-0 z-[90] flex items-start justify-center bg-black/60 p-4 pt-[12vh] backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Search the site"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeSearch();
          }}
        >
          <div className="card-surface w-full max-w-xl overflow-hidden shadow-card">
            <div className="flex items-center gap-3 border-b border-ink-line px-4">
              <Search className="h-4 w-4 text-muted-dim" aria-hidden="true" />
              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search domains, projects, resources, glossary…"
                aria-label="Search query"
                className="w-full bg-transparent py-3.5 text-sm text-slate-100 placeholder:text-muted-dim focus:outline-none"
              />
              <button
                onClick={closeSearch}
                aria-label="Close search"
                className="rounded-md p-1.5 text-muted hover:bg-slate-800/70 hover:text-white"
              >
                <X size={16} aria-hidden="true" />
              </button>
            </div>

            <div className="max-h-[55vh] overflow-y-auto p-2">
              {loading && (
                <p className="px-3 py-4 text-sm text-muted" aria-live="polite">
                  Searching…
                </p>
              )}
              {error && <p className="px-3 py-4 text-sm text-danger">{error}</p>}
              {!loading && !error && query.trim().length < 2 && (
                <p className="px-3 py-4 text-sm text-muted">
                  Type at least two characters to search. Try “neural” or “ethics”.
                </p>
              )}
              {!loading && !error && query.trim().length >= 2 && results.length === 0 && (
                <p className="px-3 py-4 text-sm text-muted">
                  No results for “{query}”.
                </p>
              )}
              <ul className="space-y-0.5">
                {results.map((result, i) => (
                  <li key={`${result.type}-${result.title}-${i}`}>
                    <Link
                      href={result.url}
                      onClick={closeSearch}
                      className="flex items-start gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-cyan/10"
                    >
                      <span
                        className={cn(
                          "mt-0.5 rounded border px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider",
                          "border-ink-line text-muted-dim"
                        )}
                      >
                        {typeLabels[result.type]}
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-medium text-slate-100">
                          {result.title}
                        </span>
                        <span className="block truncate text-xs text-muted">{result.excerpt}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </SearchContext.Provider>
  );
}