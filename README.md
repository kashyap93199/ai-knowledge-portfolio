# AI Knowledge Portfolio

**An immersive, full-stack 3D website exploring Artificial Intelligence — built entirely with free and open-source tools.**

This is a complete, portfolio-quality AI website: a guided, slide-based journey through
artificial intelligence with interactive 3D visuals, a full SQLite-backed backend, REST APIs,
an admin panel, and professionally written original content — all runnable locally with three
commands and no paid services or API keys.

![AI Knowledge Portfolio](https://img.shields.io/badge/status-production--ready-22d3ee)
![License](https://img.shields.io/badge/license-MIT-a78bfa)
![Stack](https://img.shields.io/badge/stack-Next.js%20·%20TypeScript%20·%20Tailwind%20·%20Three.js-34d399)

---

## ✨ Features

- **Immersive 3D hero** — a procedural neural-network particle field built with React Three
  Fiber, with mouse parallax, off-screen pausing, capped pixel ratio, WebGL fallback, and full
  `prefers-reduced-motion` support.
- **10 AI domains** — interactive expandable cards covering ML, deep learning, NLP, computer
  vision, robotics, generative AI, reinforcement learning, expert systems, speech recognition,
  and recommendation systems, each with examples, tools, and free learning resources.
- **10-step AI workflow slider** — a full-screen transition-slide experience (problem definition
  → ethics & safety) with keyboard, touch/swipe, and button navigation, a progress bar, animated
  transitions, and focus management.
- **AI timeline** — an animated, responsive history of AI from the Turing Test to today.
- **Portfolio projects** — six sample projects with case-study pages, tags, category filtering,
  and procedural visual placeholders (no external images needed).
- **Resources & glossary** — 20+ free learning resources with filters, plus a searchable
  20+-term glossary with related-term links.
- **Site-wide search** — Ctrl/Cmd+K command-palette search across domains, projects, resources,
  glossary, workflow, and timeline.
- **Contact form** — validated with Zod, protected by a honeypot and IP rate limiting, stored in
  SQLite, and mirrored to a local log file. No email service required.
- **Admin panel** — local-credential login (scrypt-hashed, HMAC-signed session cookies), a
  dashboard, message inbox, site-settings editor, and full CRUD for projects, workflow steps,
  and resources.
- **REST API** — clean JSON endpoints for every content type.
- **Accessibility** — semantic HTML, skip links, visible focus states, ARIA labels, keyboard
  navigation, reduced-motion support, and high-contrast theming.
- **Design system** — dark mode by default with a light-mode toggle, cyan/violet accents, glow
  effects, smooth scroll-reveal animations, and a fully responsive layout.
- **SEO** — per-page metadata, Open Graph + Twitter cards, generated sitemap, robots.txt, and a
  generated OG image.

## 🖼️ Screenshots

> Placeholder — add your own screenshots here:
>
> `![Hero](docs/screenshots/hero.png)` · `![Workflow](docs/screenshots/workflow.png)` ·
> `![Admin](docs/screenshots/admin.png)`

## 🧰 Tech Stack

| Layer | Choice | Why |
| --- | --- | --- |
| Framework | **Next.js 14 (App Router) + React 18** | Full-stack React with server components, API routes, and metadata APIs |
| Language | **TypeScript (strict)** | Type safety across frontend, backend, and DB |
| Styling | **Tailwind CSS 3** | Utility-first design system with a custom theme |
| 3D | **Three.js + React Three Fiber + Drei** | Lightweight procedural 3D, no external models |
| Animation | **Framer Motion** | Scroll reveals and slide transitions, with reduced-motion support |
| Forms/Validation | **React Hook Form + Zod** | Accessible forms with schema validation |
| State | **Zustand + React Context** | Theme and search state |
| Database | **SQLite (`better-sqlite3`)** | Zero-config local file DB — free, no external service |
| Auth | **Node `crypto` (scrypt + HMAC)** | Local admin auth without paid services |
| Icons | **lucide-react** | Free, permissively licensed icon set |
| Fonts | **Inter, Space Grotesk, JetBrains Mono** | SIL OFL fonts, self-hosted via `next/font` |

## 📁 Folder Structure

```
.
├── app/                      # Next.js App Router
│   ├── api/                  # REST endpoints
│   │   ├── site/ topics/ workflow/ timeline/ projects/ resources/
│   │   ├── glossary/ search/ contact/
│   │   └── admin/            # login, messages, settings, CRUD APIs
│   ├── admin/                # Admin UI (dashboard, messages, settings, CRUD)
│   ├── overview/ domains/ workflow/ timeline/ projects/ resources/
│   ├── glossary/ about/ contact/
│   ├── layout.tsx  page.tsx  not-found.tsx
│   ├── globals.css  sitemap.ts  robots.ts  icon.svg  opengraph-image.tsx
├── components/
│   ├── ui/                   # Button, Badge, Fields, Feedback, ScrollReveal, FilterTabs, Icon
│   ├── layout/               # Navbar, Footer, ThemeToggle, SiteSearch
│   ├── three/                # Scene3D, CanvasScene, FallbackVisual, scene-helpers
│   ├── home/ ai/ workflow/ projects/ resources/ glossary/ timeline/ contact/
│   └── admin/                # CrudManager, AdminMessages, AdminSettings, Login, Logout
├── hooks/                    # use-theme
├── lib/
│   ├── db.ts                 # SQLite connection + schema
│   ├── queries.ts            # Typed read helpers
│   ├── seed.ts               # Seed script (npm run seed)
│   ├── seed-content.ts       # Settings, domains, workflow, timeline content
│   ├── seed-content-more.ts  # Projects, resources, glossary, about content
│   ├── auth.ts               # scrypt hashing, sessions, admin validation
│   ├── api.ts                # Response + auth-guard helpers
│   ├── utils.ts  load-env.ts
├── types/                    # Shared TypeScript types
├── data/                     # SQLite database + contact log (gitignored)
├── public/                   # Static assets (favicon etc.)
├── .env.example  .gitignore
├── LICENSE  ATTRIBUTION.md  README.md
```

## 🚀 Getting Started

> **Requirements:** Node.js 18.17+ and npm.

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

```bash
cp .env.example .env.local
```

Edit `.env.local` — at minimum change `ADMIN_PASSWORD` and `SESSION_SECRET`:

```bash
# Generate a strong secret:
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

| Variable | Description |
| --- | --- |
| `SITE_URL` | Public site URL (used by sitemap, robots, metadata) |
| `ADMIN_USERNAME` | Admin login username |
| `ADMIN_PASSWORD` | Admin login password |
| `SESSION_SECRET` | ≥16-char secret used to sign the admin session cookie |
| `DATABASE_PATH` | Optional; defaults to `./data/portfolio.db` |

### 3. Seed the database

```bash
npm run seed            # fill empty tables only (safe to run on every deploy)
npm run db:reset        # wipe everything and reseed from scratch
```

> Seeding is **deploy-safe**: tables that already contain data are left untouched, so admin
> edits (projects, settings, messages) survive redeploys that run the seed. Use `db:reset` to
> restore the original sample content.

The SQLite file is created automatically at `data/portfolio.db` — no separate migration step
needed (the schema is applied idempotently on startup).

### 4. Start developing

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 5. Production build

```bash
npm run build
npm run start           # serves on http://localhost:3000
```

### Other scripts

```bash
npm run lint            # ESLint
npm run typecheck       # tsc --noEmit
npm run format          # Prettier
```

## 🔑 Admin Panel

Visit [http://localhost:3000/admin](http://localhost:3000/admin) and sign in with
`ADMIN_USERNAME` / `ADMIN_PASSWORD` from `.env.local`.

You can then:

- View and manage **contact messages** (mark read, archive, delete).
- Edit **site settings** (hero copy, footer, social links) — changes appear immediately.
- Create, edit, and delete **projects**, **workflow steps**, and **resources**.

Security notes:

- Passwords are compared against env credentials with a length-safe constant-time compare.
- Sessions are HMAC-signed cookies (httpOnly, SameSite=Lax, Secure in production).
- Admin APIs reject unauthenticated requests with `401`.
- The admin area is excluded from `robots.txt`.

## 🌐 Deployment (free / self-hosted)

This app uses a local SQLite file, so it must run on a persistent Node server — it is **not**
compatible with read-only/serverless filesystems (e.g. Vercel serverless functions, unless you
move the DB elsewhere).

### Option A — Fly.io (recommended)

Fly.io runs the app as a container with a **persistent volume** mounted at `/app/data`, where the
SQLite file lives. Zero code changes — `Dockerfile`, `fly.toml`, and `.dockerignore` are included
in the repo. Eligible accounts get a free allowance (3 × shared-cpu-1x machines + 3GB volume);
otherwise a single machine costs roughly $2–3/month.

```bash
# 1. Install flyctl (https://fly.io/docs/flyctl/install/) and sign in
fly auth login

# 2. Create the app (first run) or set a unique name in fly.toml
fly launch --dockerfile Dockerfile --no-deploy

# 3. Create the persistent volume for the SQLite database
fly volumes create portfolio_data --size 1 --region ams

# 4. Set secrets (never commit these)
fly secrets set ADMIN_USERNAME=admin ADMIN_PASSWORD=<strong-password> SESSION_SECRET=<random-hex>

# 5. Point SITE_URL at your app in fly.toml, then deploy
fly deploy

# The release command seeds the database on first deploy.
# Open the site:
fly open
```

The admin panel is at `https://<your-app>.fly.dev/admin`. Back up the database any time with
`fly ssh console -C "sqlite3 /app/data/portfolio.db '.backup /app/data/backup.db'"` (or simply
download the file via `fly sftp`).

### Option B — any VPS / dedicated server

1. Copy the project (or `git clone` it) to the server.
2. `npm install && npm run build && npm run seed`
3. Set the environment variables in `.env.local` (use a long random `SESSION_SECRET`).
4. Run with a process manager:

```bash
# example systemd unit: /etc/systemd/system/ai-portfolio.service
[Unit]
Description=AI Knowledge Portfolio
After=network.target

[Service]
WorkingDirectory=/opt/ai-knowledge-portfolio
ExecStart=/usr/bin/npm run start
Restart=always
Environment=NODE_ENV=production
# Point DATABASE_PATH at persistent storage

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl enable --now ai-portfolio
```

5. Put a reverse proxy (Caddy or Nginx) in front, with a free TLS certificate, and set
   `SITE_URL=https://your-domain.com`.

### Option C — Render (blueprint included)

A `render.yaml` blueprint is included for Render. Note that **persistent disks require a paid
web service** (Starter, $7/mo) — Render's free tier has an ephemeral filesystem and no disks, so
SQLite data would be lost on every redeploy.

```bash
# Push the repo to GitHub → Render dashboard → New → Blueprint → select the repo
# Then set ADMIN_USERNAME, ADMIN_PASSWORD, SESSION_SECRET in the service's Environment tab.
# The preDeployCommand seeds the database; the disk mounts at /var/data.
```

The app automatically uses `RENDER_EXTERNAL_URL` for `SITE_URL` if `SITE_URL` is not set.

### Option D — Railway / other PaaS with volumes

Deploy a Node service with a persistent volume mounted at `/app/data` (where the SQLite file
lives) and set `DATABASE_PATH=/app/data/portfolio.db`. The same `Dockerfile` works on any
container platform. Be sure to back up that volume.

### Backups

The whole site is one file: `data/portfolio.db`. Back it up with `sqlite3 data/portfolio.db ".backup backup.db"` or just copy the file (stop the server or use the WAL-safe backup command).

## 🧪 Testing Checklist

- [ ] `npm install` → `npm run seed` → `npm run dev` starts without errors
- [ ] Home hero renders with the 3D network (or SVG fallback with reduced motion / no WebGL)
- [ ] All nav pages return `200`: Overview, Domains, Workflow, Timeline, Projects, Resources, Glossary, About, Contact
- [ ] Workflow slider works with buttons, arrow keys, Home/End, and touch swipe
- [ ] Search (Ctrl+K) returns results for e.g. “neural”, “ethics”, “transformer”
- [ ] Projects filter tabs work; project detail pages render
- [ ] Glossary search and category filters work
- [ ] Contact form rejects invalid input (Zod), accepts valid input, shows success
- [ ] Contact message appears in `/admin` → Messages
- [ ] Admin login works; wrong password → 401; logged-out API calls → 401
- [ ] Admin CRUD: edit a workflow step / project / resource and see it on the public site
- [ ] `npm run build` succeeds; `npm run start` serves the production build
- [ ] Light/dark theme toggle works and persists across reloads
- [ ] 404 page renders for unknown URLs; `/sitemap.xml` and `/robots.txt` exist

## 📄 License

MIT — see [LICENSE](LICENSE).

## 🙏 Attribution

All libraries, fonts, and icons are free and permissively licensed; all content is original.
See [ATTRIBUTION.md](ATTRIBUTION.md) for the complete list.

## 🔮 Future Improvements

- PostgreSQL adapter (same schema) for horizontally scaled deployments.
- WebSocket-based live updates between admin edits and the public site.
- Local-first blog section with markdown authoring.
- PWA support (offline shell + install prompt).
- Unit + E2E test suites (Vitest + Playwright).
- i18n (the content layer is fully database-driven, so translations slot in cleanly).