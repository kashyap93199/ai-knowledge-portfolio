# syntax=docker/dockerfile:1

# ---------------------------------------------------------------------------
# deps — install all dependencies (including build tools so better-sqlite3
# can compile from source if no musl prebuild is available)
# ---------------------------------------------------------------------------
FROM node:22-alpine AS deps
WORKDIR /app
RUN apk add --no-cache python3 make g++
COPY package.json package-lock.json ./
RUN npm ci

# ---------------------------------------------------------------------------
# builder — type-safe production build
# ---------------------------------------------------------------------------
FROM node:22-alpine AS builder
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Pre-seed the build database. `next build` renders pages in parallel worker
# processes; if the SQLite file does not exist yet, those workers race to
# create and initialize it and fail with "database is locked". Seeding first
# means every worker opens an already-initialized WAL database. This file is
# build-only — it is not copied into the runtime image, where the volume is
# seeded by the release/pre-deploy step instead.
RUN mkdir -p /app/data && npm run seed
RUN npm run build

# ---------------------------------------------------------------------------
# runner — minimal production image
# ---------------------------------------------------------------------------
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV DATABASE_PATH=/app/data/portfolio.db

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.mjs ./next.config.mjs
COPY --from=builder /app/public ./public

# The SQLite file lives here — this is where the Fly volume must be mounted.
RUN mkdir -p /app/data

EXPOSE 3000
CMD ["npm", "run", "start"]