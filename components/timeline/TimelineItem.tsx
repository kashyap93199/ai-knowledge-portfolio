import type { TimelineEvent } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { cn } from "@/lib/utils";

const categoryTone: Record<string, "cyan" | "violet" | "emerald" | "danger" | "neutral"> = {
  Foundations: "cyan",
  "Deep Learning": "violet",
  NLP: "emerald",
  "Expert Systems": "danger",
  Games: "neutral",
  "Generative AI": "violet",
  Future: "cyan",
};

export function TimelineItem({
  event,
  side,
}: {
  event: TimelineEvent;
  side: "left" | "right";
}) {
  return (
    <ScrollReveal className="relative">
      <div
        className={cn(
          "mb-12 flex md:mb-16",
          side === "right" ? "md:justify-start md:pl-[50%]" : "md:justify-end md:pr-[50%]"
        )}
      >
        <div
          className={cn(
            "card-surface group w-full p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan/40 hover:shadow-glow sm:p-6",
            side === "left" ? "md:text-right" : ""
          )}
        >
          <div className={cn("flex items-center gap-3", side === "left" && "md:flex-row-reverse")}>
            <span className="font-display text-2xl font-bold text-gradient">{event.year}</span>
            <Badge tone={categoryTone[event.category] ?? "neutral"}>{event.category}</Badge>
          </div>
          <h3 className="mt-2 font-display text-lg font-semibold text-slate-100">{event.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{event.description}</p>
          {event.sourceNote && (
            <p className="mt-3 font-mono text-xs text-muted-dim">{event.sourceNote}</p>
          )}
        </div>
      </div>
    </ScrollReveal>
  );
}