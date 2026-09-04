import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Tone = "cyan" | "violet" | "emerald" | "danger" | "neutral";

const toneClasses: Record<Tone, string> = {
  cyan: "bg-cyan/10 text-cyan-soft border-cyan/30",
  violet: "bg-violet/10 text-violet-soft border-violet/30",
  emerald: "bg-emerald/10 text-emerald border-emerald/30",
  danger: "bg-danger/10 text-danger border-danger/30",
  neutral: "bg-slate-500/10 text-muted border-ink-line",
};

export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 font-mono text-xs font-medium",
        toneClasses[tone],
        className
      )}
    >
      {children}
    </span>
  );
}