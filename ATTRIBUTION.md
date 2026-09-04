# Attribution

This project uses **only free, open-source, and permissively licensed assets**. No asset
requires purchase, subscription, or a premium account. Every third-party component is listed
below.

## Fonts

Served self-hosted via `next/font` (downloaded from Google Fonts at build time).

| Font | Author | Source | License |
| --- | --- | --- | --- |
| Inter | Rasmus Andersson & The Inter Project | https://rsms.me/inter/ | SIL Open Font License 1.1 |
| Space Grotesk | Florian Karsten | https://fonts.google.com/specimen/Space+Grotesk | SIL Open Font License 1.1 |
| JetBrains Mono | JetBrains | https://www.jetbrains.com/lp/mono/ | SIL Open Font License 1.1 |

## Icon set

| Asset | Author | Source | License |
| --- | --- | --- | --- |
| lucide-react | Lucide Contributors | https://lucide.dev | ISC License (permissive, free to use) |

## JavaScript / TypeScript libraries

| Library | Source | License |
| --- | --- | --- |
| Next.js | https://github.com/vercel/next.js | MIT |
| React | https://github.com/facebook/react | MIT |
| TypeScript | https://github.com/microsoft/TypeScript | Apache-2.0 |
| Tailwind CSS | https://github.com/tailwindlabs/tailwindcss | MIT |
| Three.js | https://github.com/mrdoob/three.js | MIT |
| @react-three/fiber | https://github.com/pmndrs/react-three-fiber | MIT |
| @react-three/drei | https://github.com/pmndrs/drei | MIT |
| Framer Motion | https://github.com/framer/motion | MIT |
| Zustand | https://github.com/pmndrs/zustand | MIT |
| React Hook Form | https://github.com/react-hook-form/react-hook-form | MIT |
| @hookform/resolvers | https://github.com/react-hook-form/resolvers | MIT |
| Zod | https://github.com/colinhacks/zod | MIT |
| better-sqlite3 | https://github.com/WiseLibs/better-sqlite3 | MIT |
| clsx | https://github.com/lukeed/clsx | MIT |
| tailwind-merge | https://github.com/dcastil/tailwind-merge | MIT |
| tsx | https://github.com/privatenumber/tsx | MIT |
| ESLint + eslint-config-next | https://github.com/eslint/eslint | MIT |
| Prettier | https://github.com/prettier/prettier | MIT |

## 3D / images / textures / models

**None.** All visuals are procedurally generated at runtime:

- The hero neural network, particle fields, and workflow pipeline are generated with Three.js
  geometry (no external models or textures).
- Project previews are procedural CSS/SVG compositions (no external images).
- The favicon and Open Graph image are generated from code (SVG / `next/og`).
- The 404 page uses an inline SVG/CSS visual.

## Content

- All written content (domains, workflow steps, timeline, projects, resources, glossary, about
  text) is original and written for this project.
- Timeline events reference historically attributed works (e.g., Alan Turing’s 1950 paper,
  the 2017 “Attention Is All You Need” paper) — these are cited as source notes, not copied.
- The Resources page links only to free, reputable learning sources (official documentation,
  free courses, open-access papers). No affiliate or paid links are used.

## Contact log

Contact form submissions are additionally appended to a plain-text log file
(`data/contact-messages.log`) for local backup. This log may contain personal information
(name and email) and should be treated as private data.

---

*Last updated: September 2026*