import { db } from "./db";
import type {
  AiTopic,
  ContactMessage,
  GlossaryTerm,
  Project,
  Resource,
  SearchResult,
  SiteSetting,
  TimelineEvent,
  WorkflowStep,
} from "@/types";

export function getSiteSettings(): Record<string, string> {
  const rows = db.prepare("SELECT key, value FROM SiteSetting").all() as Pick<
    SiteSetting,
    "key" | "value"
  >[];
  return Object.fromEntries(rows.map((row) => [row.key, row.value]));
}

export function getSetting(key: string): string {
  const row = db.prepare("SELECT value FROM SiteSetting WHERE key = ?").get(key) as
    | { value: string }
    | undefined;
  return row?.value ?? "";
}

export function getTopics(): AiTopic[] {
  return db
    .prepare('SELECT * FROM AiTopic ORDER BY "order" ASC, id ASC')
    .all() as AiTopic[];
}

export function getTopicBySlug(slug: string): AiTopic | null {
  const row = db.prepare("SELECT * FROM AiTopic WHERE slug = ?").get(slug) as
    | AiTopic
    | undefined;
  return row ?? null;
}

export function getWorkflowSteps(): WorkflowStep[] {
  return db
    .prepare('SELECT * FROM WorkflowStep ORDER BY "order" ASC, id ASC')
    .all() as WorkflowStep[];
}

export function getTimeline(): TimelineEvent[] {
  return db
    .prepare('SELECT * FROM TimelineEvent ORDER BY "order" ASC, id ASC')
    .all() as TimelineEvent[];
}

export function getProjects(): Project[] {
  return db
    .prepare('SELECT * FROM Project ORDER BY "order" ASC, id ASC')
    .all() as Project[];
}

export function getProjectBySlug(slug: string): Project | null {
  const row = db.prepare("SELECT * FROM Project WHERE slug = ?").get(slug) as
    | Project
    | undefined;
  return row ?? null;
}

export function getProjectCategories(): string[] {
  const rows = db
    .prepare("SELECT DISTINCT category FROM Project ORDER BY category ASC")
    .all() as { category: string }[];
  return rows.map((row) => row.category);
}

export function getResources(): Resource[] {
  return db.prepare("SELECT * FROM Resource ORDER BY id ASC").all() as Resource[];
}

export function getResourceCategories(): string[] {
  const rows = db
    .prepare("SELECT DISTINCT category FROM Resource ORDER BY category ASC")
    .all() as { category: string }[];
  return rows.map((row) => row.category);
}

export function getGlossaryTerms(): GlossaryTerm[] {
  return db.prepare("SELECT * FROM GlossaryTerm ORDER BY term ASC").all() as GlossaryTerm[];
}

export function getContactMessages(status?: string): ContactMessage[] {
  if (status) {
    return db
      .prepare("SELECT * FROM ContactMessage WHERE status = ? ORDER BY id DESC")
      .all(status) as ContactMessage[];
  }
  return db.prepare("SELECT * FROM ContactMessage ORDER BY id DESC").all() as ContactMessage[];
}

export function getMessageCount(): number {
  const row = db.prepare("SELECT COUNT(*) AS count FROM ContactMessage").get() as {
    count: number;
  };
  return row.count;
}

export function getNewMessageCount(): number {
  const row = db
    .prepare("SELECT COUNT(*) AS count FROM ContactMessage WHERE status = 'new'")
    .get() as { count: number };
  return row.count;
}

/**
 * Full-text-ish search across topics, projects, resources, glossary terms,
 * workflow steps and timeline events.
 */
export function searchContent(query: string, limit = 12): SearchResult[] {
  const q = `%${query.replace(/[%_]/g, "")}%`;
  const results: SearchResult[] = [];

  const topics = db
    .prepare(
      "SELECT name, slug, shortDefinition FROM AiTopic WHERE name LIKE ? OR shortDefinition LIKE ? ORDER BY featured DESC LIMIT ?"
    )
    .all(q, q, limit) as { name: string; slug: string; shortDefinition: string }[];
  for (const row of topics) {
    results.push({
      type: "topic",
      title: row.name,
      slug: row.slug,
      url: `/domains#${row.slug}`,
      excerpt: row.shortDefinition,
    });
  }

  const projects = db
    .prepare(
      "SELECT title, slug, summary FROM Project WHERE title LIKE ? OR summary LIKE ? ORDER BY featured DESC LIMIT ?"
    )
    .all(q, q, limit) as { title: string; slug: string; summary: string }[];
  for (const row of projects) {
    results.push({
      type: "project",
      title: row.title,
      slug: row.slug,
      url: `/projects/${row.slug}`,
      excerpt: row.summary,
    });
  }

  const resources = db
    .prepare("SELECT title, url, description FROM Resource WHERE title LIKE ? OR description LIKE ? LIMIT ?")
    .all(q, q, limit) as { title: string; url: string; description: string }[];
  for (const row of resources) {
    results.push({
      type: "resource",
      title: row.title,
      url: row.url,
      excerpt: row.description,
    });
  }

  const glossary = db
    .prepare(
      "SELECT term, slug, simpleDefinition FROM GlossaryTerm WHERE term LIKE ? OR simpleDefinition LIKE ? OR detailedDefinition LIKE ? LIMIT ?"
    )
    .all(q, q, q, limit) as { term: string; slug: string; simpleDefinition: string }[];
  for (const row of glossary) {
    results.push({
      type: "glossary",
      title: row.term,
      slug: row.slug,
      url: `/glossary#${row.slug}`,
      excerpt: row.simpleDefinition,
    });
  }

  const workflow = db
    .prepare(
      "SELECT title, description FROM WorkflowStep WHERE title LIKE ? OR description LIKE ? LIMIT ?"
    )
    .all(q, q, limit) as { title: string; description: string }[];
  for (const row of workflow) {
    results.push({
      type: "workflow",
      title: row.title,
      url: "/workflow",
      excerpt: row.description,
    });
  }

  const timeline = db
    .prepare("SELECT year, title, description FROM TimelineEvent WHERE title LIKE ? OR description LIKE ? LIMIT ?")
    .all(q, q, limit) as { year: string; title: string; description: string }[];
  for (const row of timeline) {
    results.push({
      type: "timeline",
      title: `${row.year} — ${row.title}`,
      url: "/timeline",
      excerpt: row.description,
    });
  }

  return results.slice(0, limit);
}