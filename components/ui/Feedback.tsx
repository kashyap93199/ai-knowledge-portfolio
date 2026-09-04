import { AlertTriangle, Inbox, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function Loader({ label = "Loading…", className }: { label?: string; className?: string }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn("flex items-center justify-center gap-2 py-12 text-muted", className)}
    >
      <Loader2 className="h-5 w-5 animate-spin text-cyan" aria-hidden="true" />
      <span className="text-sm">{label}</span>
    </div>
  );
}

export function ErrorState({
  title = "Something went wrong",
  message = "We couldn’t load this content. Please try again.",
  onRetry,
}: {
  title?: string;
  message?: string;
  onRetry?: () => void;
}) {
  return (
    <div
      role="alert"
      className="card-surface mx-auto max-w-md p-8 text-center"
    >
      <AlertTriangle className="mx-auto mb-3 h-8 w-8 text-danger" aria-hidden="true" />
      <h3 className="font-display text-lg font-semibold text-slate-100">{title}</h3>
      <p className="mt-1 text-sm text-muted">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-4 rounded-lg bg-cyan/10 px-4 py-2 text-sm font-medium text-cyan-soft hover:bg-cyan/20"
        >
          Try again
        </button>
      )}
    </div>
  );
}

export function EmptyState({ title = "Nothing here yet", message }: { title?: string; message?: string }) {
  return (
    <div className="card-surface mx-auto max-w-md p-8 text-center">
      <Inbox className="mx-auto mb-3 h-8 w-8 text-muted-dim" aria-hidden="true" />
      <h3 className="font-display text-lg font-semibold text-slate-100">{title}</h3>
      {message && <p className="mt-1 text-sm text-muted">{message}</p>}
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mb-10 max-w-3xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      {eyebrow && (
        <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-cyan-soft">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-3xl font-bold tracking-tight text-slate-100 sm:text-4xl">
        {title}
      </h2>
      {subtitle && <p className="mt-3 text-base leading-relaxed text-muted">{subtitle}</p>}
    </div>
  );
}