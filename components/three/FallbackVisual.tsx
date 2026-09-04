import { cn } from "@/lib/utils";

const NODES = [
  { x: 15, y: 50 },
  { x: 25, y: 32 },
  { x: 30, y: 68 },
  { x: 40, y: 46 },
  { x: 48, y: 62 },
  { x: 55, y: 30 },
  { x: 62, y: 52 },
  { x: 72, y: 38 },
  { x: 78, y: 60 },
  { x: 86, y: 44 },
];

const EDGES = [
  [0, 1],
  [0, 2],
  [1, 3],
  [2, 3],
  [3, 4],
  [3, 5],
  [4, 6],
  [5, 6],
  [6, 7],
  [6, 8],
  [7, 9],
  [8, 9],
];

/**
 * A lightweight animated network rendered with pure SVG + CSS.
 * Used when WebGL is unavailable or reduced motion is preferred
 * (the global reduced-motion rule freezes the animation).
 */
export function FallbackVisual({
  variant = "network",
  className,
}: {
  variant?: "network" | "particles" | "workflow";
  className?: string;
}) {
  if (variant === "workflow") {
    return (
      <div className={cn("flex h-full w-full items-center justify-center", className)} aria-hidden="true">
        <svg viewBox="0 0 100 100" className="h-full max-h-64 w-full max-w-64" role="img" aria-label="">
          {EDGES.map(([a, b], i) => (
            <line
              key={i}
              x1={NODES[a].x}
              y1={NODES[a].y}
              x2={NODES[b].x}
              y2={NODES[b].y}
              stroke="rgba(103, 232, 249, 0.35)"
              strokeWidth="0.6"
            />
          ))}
          {NODES.map((node, i) => (
            <circle key={i} cx={node.x} cy={node.y} r="2.2" fill="#22d3ee" className="animate-pulse-glow" />
          ))}
        </svg>
      </div>
    );
  }

  return (
    <div className={cn("flex h-full w-full items-center justify-center", className)} aria-hidden="true">
      <svg viewBox="0 0 100 100" className="h-full max-h-72 w-full max-w-72">
        {EDGES.map(([a, b], i) => (
          <line
            key={i}
            x1={NODES[a].x}
            y1={NODES[a].y}
            x2={NODES[b].x}
            y2={NODES[b].y}
            stroke="rgba(148, 163, 184, 0.4)"
            strokeWidth="0.5"
          />
        ))}
        {NODES.map((node, i) => (
          <g key={i}>
            <circle
              cx={node.x}
              cy={node.y}
              r="3"
              fill={i % 3 === 0 ? "#a78bfa" : "#22d3ee"}
              className="animate-pulse-glow"
              style={{ animationDelay: `${i * 0.25}s` }}
            />
          </g>
        ))}
      </svg>
    </div>
  );
}