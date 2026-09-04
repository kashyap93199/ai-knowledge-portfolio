import Database from "better-sqlite3";
import fs from "node:fs";
import path from "node:path";

// ---------------------------------------------------------------------------
// Lazy, race-tolerant SQLite connection
//
// The connection is created on first use rather than at module import time.
// During `next build`, Next.js evaluates route and page modules in parallel
// worker processes; an import-time connection made every worker race to
// create and initialize a fresh database file, which surfaced as
// "database is locked" (SQLITE_BUSY) when the file did not exist yet (e.g. a
// clean volume in a Docker build). Lazily connecting — combined with a busy
// timeout, bounded retries on lock errors, and a schema fast-path — keeps
// module imports side-effect free and makes concurrent first use safe.
// ---------------------------------------------------------------------------

// Resolve the database path. Defaults to ./data/portfolio.db in the project root.
function resolveDbPath(): string {
  const configured = process.env.DATABASE_PATH;
  if (configured) return path.resolve(process.cwd(), configured);
  return path.join(process.cwd(), "data", "portfolio.db");
}

/** Blocking sleep (better-sqlite3 is synchronous, so we cannot await here). */
function sleep(ms: number): void {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
}

/** True when SQLite reported a transient lock that a retry may resolve. */
function isLockError(error: unknown): boolean {
  const code = (error as { code?: string } | null)?.code;
  return code === "SQLITE_BUSY" || code === "SQLITE_LOCKED";
}

let connection: Database.Database | null = null;

/**
 * Open a fresh connection, configure pragmas, and make sure the schema exists.
 * Retries transient lock errors (another process may be mid-initialization).
 */
function openDatabase(): Database.Database {
  const dbPath = resolveDbPath();
  fs.mkdirSync(path.dirname(dbPath), { recursive: true });

  let lastError: unknown;
  for (let attempt = 1; attempt <= 10; attempt++) {
    let candidate: Database.Database | null = null;
    try {
      candidate = new Database(dbPath);
      // Wait for the lock instead of failing instantly when another process
      // (e.g. another Next.js build worker) holds the database.
      candidate.pragma("busy_timeout = 10000");
      // WAL mode greatly reduces lock contention. A few filesystems reject
      // it, so fall back to the default rollback journal rather than crash.
      try {
        candidate.pragma("journal_mode = WAL");
      } catch {
        /* journal_mode stays at its default (DELETE) */
      }
      candidate.pragma("foreign_keys = ON");
      ensureSchema(candidate);
      return candidate;
    } catch (error) {
      try {
        candidate?.close();
      } catch {
        /* ignore */
      }
      lastError = error;
      if (!isLockError(error)) throw error;
      sleep(Math.min(100 * attempt, 1000));
    }
  }
  throw lastError;
}

/** Get (creating on first use) the shared connection. */
export function getDb(): Database.Database {
  if (!connection) {
    connection = openDatabase();
  }
  return connection;
}

function hasSchema(db: Database.Database): boolean {
  return !!db
    .prepare(
      "SELECT 1 AS found FROM sqlite_master WHERE type = 'table' AND name = 'SiteSetting' LIMIT 1"
    )
    .get();
}

/**
 * Idempotent schema creation. Only runs DDL when the schema is missing, so
 * opening an already-initialized database (the common case at build and at
 * runtime) is a cheap read instead of a burst of write locks.
 */
function ensureSchema(db: Database.Database): void {
  if (hasSchema(db)) return;
  db.exec(SCHEMA_SQL);
}

/**
 * Ensure the schema exists. Safe to call explicitly (e.g. from the seed
 * script) — it is a no-op on an already-initialized database.
 */
export function initSchema(): void {
  getDb();
}

const SCHEMA_SQL = `
  CREATE TABLE IF NOT EXISTS SiteSetting (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    key TEXT NOT NULL UNIQUE,
    value TEXT NOT NULL DEFAULT '',
    updatedAt TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS Page (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    description TEXT NOT NULL DEFAULT '',
    "order" INTEGER NOT NULL DEFAULT 0,
    published INTEGER NOT NULL DEFAULT 1,
    createdAt TEXT NOT NULL DEFAULT (datetime('now')),
    updatedAt TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS Section (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    pageId INTEGER REFERENCES Page(id) ON DELETE CASCADE,
    type TEXT NOT NULL DEFAULT 'text',
    title TEXT NOT NULL,
    subtitle TEXT,
    content TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    visible INTEGER NOT NULL DEFAULT 1,
    createdAt TEXT NOT NULL DEFAULT (datetime('now')),
    updatedAt TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS Slide (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    sectionId INTEGER REFERENCES Section(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    subtitle TEXT,
    description TEXT NOT NULL DEFAULT '',
    details TEXT NOT NULL DEFAULT '',
    "order" INTEGER NOT NULL DEFAULT 0,
    animationType TEXT,
    icon TEXT,
    mediaType TEXT,
    mediaSrc TEXT,
    createdAt TEXT NOT NULL DEFAULT (datetime('now')),
    updatedAt TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS AiTopic (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    shortDefinition TEXT NOT NULL DEFAULT '',
    longDescription TEXT NOT NULL DEFAULT '',
    examples TEXT NOT NULL DEFAULT '',
    tools TEXT NOT NULL DEFAULT '',
    freeResources TEXT NOT NULL DEFAULT '',
    icon TEXT NOT NULL DEFAULT 'brain',
    "order" INTEGER NOT NULL DEFAULT 0,
    featured INTEGER NOT NULL DEFAULT 0,
    createdAt TEXT NOT NULL DEFAULT (datetime('now')),
    updatedAt TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS WorkflowStep (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    subtitle TEXT,
    description TEXT NOT NULL DEFAULT '',
    details TEXT NOT NULL DEFAULT '',
    inputs TEXT,
    outputs TEXT,
    tools TEXT,
    bestPractices TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    icon TEXT NOT NULL DEFAULT 'circle',
    animationType TEXT,
    createdAt TEXT NOT NULL DEFAULT (datetime('now')),
    updatedAt TEXT NOT NULL DEFAULT (datetime('now')),
    UNIQUE("order")
  );

  CREATE TABLE IF NOT EXISTS TimelineEvent (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    year TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL DEFAULT '',
    category TEXT NOT NULL DEFAULT 'General',
    sourceNote TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    createdAt TEXT NOT NULL DEFAULT (datetime('now')),
    updatedAt TEXT NOT NULL DEFAULT (datetime('now')),
    UNIQUE("order")
  );

  CREATE TABLE IF NOT EXISTS Project (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    summary TEXT NOT NULL DEFAULT '',
    problem TEXT NOT NULL DEFAULT '',
    solution TEXT NOT NULL DEFAULT '',
    features TEXT NOT NULL DEFAULT '',
    techStack TEXT NOT NULL DEFAULT '',
    category TEXT NOT NULL DEFAULT 'General',
    tags TEXT NOT NULL DEFAULT '',
    imageUrl TEXT,
    demoUrl TEXT,
    repositoryUrl TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    featured INTEGER NOT NULL DEFAULT 0,
    createdAt TEXT NOT NULL DEFAULT (datetime('now')),
    updatedAt TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS Resource (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    url TEXT NOT NULL UNIQUE,
    category TEXT NOT NULL DEFAULT 'Beginner',
    description TEXT NOT NULL DEFAULT '',
    license TEXT,
    level TEXT,
    createdAt TEXT NOT NULL DEFAULT (datetime('now')),
    updatedAt TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS GlossaryTerm (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    term TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    simpleDefinition TEXT NOT NULL DEFAULT '',
    detailedDefinition TEXT NOT NULL DEFAULT '',
    category TEXT NOT NULL DEFAULT 'General',
    relatedTerms TEXT NOT NULL DEFAULT '',
    createdAt TEXT NOT NULL DEFAULT (datetime('now')),
    updatedAt TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS ContactMessage (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT NOT NULL DEFAULT '',
    message TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'new',
    createdAt TEXT NOT NULL DEFAULT (datetime('now')),
    updatedAt TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS AdminUser (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    passwordHash TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'editor',
    createdAt TEXT NOT NULL DEFAULT (datetime('now')),
    updatedAt TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE INDEX IF NOT EXISTS idx_topic_slug ON AiTopic(slug);
  CREATE INDEX IF NOT EXISTS idx_workflow_order ON WorkflowStep("order");
  CREATE INDEX IF NOT EXISTS idx_project_slug ON Project(slug);
  CREATE INDEX IF NOT EXISTS idx_project_category ON Project(category);
  CREATE INDEX IF NOT EXISTS idx_resource_category ON Resource(category);
  CREATE INDEX IF NOT EXISTS idx_glossary_slug ON GlossaryTerm(slug);
`;

/**
 * Lazy handle exposing the same API as better-sqlite3's Database. Importing
 * this module never touches the filesystem — the real connection is created
 * on the first property access (i.e. the first actual query), which keeps
 * Next.js build-time module evaluation free of database side effects.
 */
export const db: Database.Database = new Proxy(
  {} as Record<PropertyKey, unknown>,
  {
    get(_target, prop) {
      const real = getDb() as unknown as Record<PropertyKey, unknown>;
      const value = real[prop];
      return typeof value === "function"
        ? (value as (...args: unknown[]) => unknown).bind(real)
        : value;
    },
  }
) as unknown as Database.Database;

export type { Database };
