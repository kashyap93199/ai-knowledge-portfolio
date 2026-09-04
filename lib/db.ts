import Database from "better-sqlite3";
import fs from "node:fs";
import path from "node:path";

// Resolve the database path. Defaults to ./data/portfolio.db in the project root.
function resolveDbPath(): string {
  const configured = process.env.DATABASE_PATH;
  if (configured) return path.resolve(process.cwd(), configured);
  return path.join(process.cwd(), "data", "portfolio.db");
}

const DB_PATH = resolveDbPath();
fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });

// A single shared connection is safe because better-sqlite3 is synchronous and
// Next.js runs server code on the Node.js runtime.
export const db = new Database(DB_PATH);
db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");

/**
 * Idempotent schema creation. Safe to run on every startup.
 */
export function initSchema(): void {
  db.exec(`
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
  `);
}

// Ensure the schema exists as soon as this module is imported.
initSchema();

export type { Database };