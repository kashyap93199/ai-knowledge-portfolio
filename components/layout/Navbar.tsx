"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BrainCircuit, Menu, Search, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { useSiteSearch } from "./SiteSearch";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/overview", label: "Overview" },
  { href: "/domains", label: "Domains" },
  { href: "/workflow", label: "Workflow" },
  { href: "/timeline", label: "Timeline" },
  { href: "/projects", label: "Projects" },
  { href: "/resources", label: "Resources" },
  { href: "/glossary", label: "Glossary" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  const pathname = usePathname();
  const { openSearch } = useSiteSearch();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on navigation.
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-all duration-300",
        scrolled
          ? "border-ink-line bg-ink/85 backdrop-blur-md"
          : "border-transparent bg-transparent"
      )}
    >
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8"
      >
        <Link href="/" className="flex items-center gap-2 font-display text-lg font-bold text-slate-100">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan to-violet text-ink">
            <BrainCircuit size={20} aria-hidden="true" />
          </span>
          <span>
            AI Knowledge<span className="text-cyan-soft"> Portfolio</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const active =
              pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "text-cyan-soft"
                    : "text-muted hover:bg-slate-800/60 hover:text-slate-100"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={openSearch}
            aria-label="Search the site (Ctrl+K)"
            className="inline-flex h-9 items-center gap-2 rounded-lg border border-ink-line px-3 text-sm text-muted transition-colors hover:border-cyan/40 hover:text-slate-100"
          >
            <Search size={15} aria-hidden="true" />
            <span className="hidden md:inline">Search</span>
            <kbd className="hidden rounded border border-ink-line bg-ink-raised px-1.5 font-mono text-[10px] text-muted-dim md:inline">
              Ctrl K
            </kbd>
          </button>
          <ThemeToggle />
          <button
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-300 hover:bg-slate-800/70 hover:text-white lg:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div id="mobile-menu" className="border-t border-ink-line bg-ink/95 backdrop-blur-md lg:hidden">
          <ul className="mx-auto max-w-7xl space-y-1 px-4 py-4">
            {navLinks.map((link) => {
              const active =
                pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "block rounded-lg px-3 py-2.5 text-sm font-medium",
                      active ? "bg-cyan/10 text-cyan-soft" : "text-muted hover:bg-slate-800/60 hover:text-slate-100"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </header>
  );
}