export interface SceneNode {
  pos: [number, number, number];
  color: string;
}

const COLORS = ["#22d3ee", "#a78bfa", "#67e8f9"];

/** Random points distributed through a sphere (cube-root for uniform volume). */
export function generateSphereNodes(count: number, radius: number): SceneNode[] {
  const nodes: SceneNode[] = [];
  for (let i = 0; i < count; i++) {
    const r = radius * Math.cbrt(Math.random());
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    nodes.push({
      pos: [
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi),
      ],
      color: COLORS[Math.floor(Math.random() * COLORS.length)] ?? COLORS[0],
    });
  }
  return nodes;
}

/** Connect nearby nodes into a flat list of line-segment endpoints. */
export function buildEdges(nodes: SceneNode[], maxDistance: number): number[] {
  const positions: number[] = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const [ax, ay, az] = nodes[i].pos;
      const [bx, by, bz] = nodes[j].pos;
      const dx = ax - bx;
      const dy = ay - by;
      const dz = az - bz;
      if (dx * dx + dy * dy + dz * dz < maxDistance * maxDistance) {
        positions.push(ax, ay, az, bx, by, bz);
      }
    }
  }
  return positions;
}

/** Nodes laid out along a winding pipeline path (workflow variant). */
export function generatePipelineNodes(count: number): SceneNode[] {
  const nodes: SceneNode[] = [];
  for (let i = 0; i < count; i++) {
    const t = (i / (count - 1)) * Math.PI * 3.2;
    nodes.push({
      pos: [
        (i / (count - 1) - 0.5) * 16,
        Math.sin(t) * 1.6 + Math.sin(t * 0.7) * 0.8,
        Math.cos(t * 0.9) * 1.2,
      ],
      color: COLORS[i % 3] ?? COLORS[0],
    });
  }
  return nodes;
}

/** Connect pipeline nodes in sequence, with a few cross-links. */
export function buildChainEdges(nodes: SceneNode[], crossLinks = 0): number[] {
  const positions: number[] = [];
  for (let i = 0; i < nodes.length - 1; i++) {
    const [ax, ay, az] = nodes[i].pos;
    const [bx, by, bz] = nodes[i + 1].pos;
    positions.push(ax, ay, az, bx, by, bz);
  }
  for (let k = 0; k < crossLinks; k++) {
    const i = Math.floor(Math.random() * (nodes.length - 4));
    const j = i + 2 + Math.floor(Math.random() * 3);
    if (j < nodes.length) {
      const [ax, ay, az] = nodes[i].pos;
      const [bx, by, bz] = nodes[j].pos;
      positions.push(ax, ay, az, bx, by, bz);
    }
  }
  return positions;
}

export function supportsWebGL(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl2") || canvas.getContext("webgl"))
    );
  } catch {
    return false;
  }
}