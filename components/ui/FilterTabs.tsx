"use client";

import { cn } from "@/lib/utils";

interface FilterTabsProps {
  options: string[];
  active: string;
  onChange: (value: string) => void;
  label: string;
  className?: string;
}

export function FilterTabs({ options, active, onChange, label, className }: FilterTabsProps) {
  return (
    <div
      role="group"
      aria-label={label}
      className={cn("mb-8 flex flex-wrap items-center gap-2", className)}
    >
      {options.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onChange(option)}
          aria-pressed={active === option}
          className={cn(
            "rounded-full border px-4 py-1.5 text-sm font-medium transition-all duration-200",
            active === option
              ? "border-cyan/60 bg-cyan/10 text-cyan-soft shadow-glow"
              : "border-ink-line text-muted hover:border-cyan/30 hover:text-slate-200"
          )}
        >
          {option}
        </button>
      ))}
    </div>
  );
}