import { z } from "zod";
import { fail, ok, requireAdmin } from "@/lib/api";
import { db } from "@/lib/db";
import { getProjects } from "@/lib/queries";
import { slugify } from "@/lib/utils";

export const dynamic = "force-dynamic";

const projectSchema = z.object({
  title: z.string().trim().min(2).max(160),
  summary: z.string().trim().min(2).max(600),
  problem: z.string().trim().max(4000).default(""),
  solution: z.string().trim().max(4000).default(""),
  features: z.string().trim().max(4000).default(""),
  techStack: z.string().trim().max(500).default(""),
  category: z.string().trim().min(1).max(80).default("General"),
  tags: z.string().trim().max(500).default(""),
  imageUrl: z.string().trim().url().max(500).nullable().optional(),
  demoUrl: z.string().trim().url().max(500).nullable().optional(),
  repositoryUrl: z.string().trim().url().max(500).nullable().optional(),
  order: z.number().int().min(0).default(0),
  featured: z.boolean().default(false),
});

type ProjectInput = z.infer<typeof projectSchema>;

export async function GET() {
  const guard = requireAdmin();
  if (guard) return guard;
  return ok({ projects: getProjects() });
}

export async function POST(request: Request) {
  const guard = requireAdmin();
  if (guard) return guard;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return fail("Invalid JSON body", 400);
  }

  const parsed = projectSchema.safeParse(body);
  if (!parsed.success) {
    return fail(parsed.error.issues[0]?.message ?? "Validation failed", 422);
  }

  const p = parsed.data;
  const slug = slugify(p.title);
  const existing = db.prepare("SELECT id FROM Project WHERE slug = ?").get(slug) as
    | { id: number }
    | undefined;
  if (existing) return fail("A project with this title already exists", 409);

  const result = db
    .prepare(
      `INSERT INTO Project (title, slug, summary, problem, solution, features, techStack, category, tags, imageUrl, demoUrl, repositoryUrl, "order", featured)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
    .run(
      p.title,
      slug,
      p.summary,
      p.problem,
      p.solution,
      p.features,
      p.techStack,
      p.category,
      p.tags,
      p.imageUrl ?? null,
      p.demoUrl ?? null,
      p.repositoryUrl ?? null,
      p.order,
      p.featured ? 1 : 0
    );

  return ok({ success: true, id: result.lastInsertRowid }, 201);
}

export async function PATCH(request: Request) {
  const guard = requireAdmin();
  if (guard) return guard;

  const { searchParams } = new URL(request.url);
  const id = Number(searchParams.get("id"));
  if (!Number.isInteger(id) || id <= 0) return fail("Invalid id", 422);

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return fail("Invalid JSON body", 400);
  }

  const parsed = projectSchema.partial().safeParse(body);
  if (!parsed.success) return fail("Invalid request", 422);

  const fields: Record<string, unknown> = { ...parsed.data };
  if (fields.featured !== undefined) fields.featured = fields.featured ? 1 : 0;
  if (fields.order !== undefined) fields.order = fields.order;

  const current = db.prepare("SELECT * FROM Project WHERE id = ?").get(id) as
    | Record<string, unknown>
    | undefined;
  if (!current) return fail("Project not found", 404);

  const merged = { ...current, ...fields };
  const result = db
    .prepare(
      `UPDATE Project SET
        title = ?, summary = ?, problem = ?, solution = ?, features = ?, techStack = ?,
        category = ?, tags = ?, imageUrl = ?, demoUrl = ?, repositoryUrl = ?,
        "order" = ?, featured = ?, updatedAt = datetime('now')
       WHERE id = ?`
    )
    .run(
      merged.title as string,
      merged.summary as string,
      merged.problem as string,
      merged.solution as string,
      merged.features as string,
      merged.techStack as string,
      merged.category as string,
      merged.tags as string,
      (merged.imageUrl as string | null) ?? null,
      (merged.demoUrl as string | null) ?? null,
      (merged.repositoryUrl as string | null) ?? null,
      merged.order as number,
      merged.featured as number,
      id
    );

  if (result.changes === 0) return fail("Nothing to update", 400);
  return ok({ success: true });
}

export async function DELETE(request: Request) {
  const guard = requireAdmin();
  if (guard) return guard;

  const { searchParams } = new URL(request.url);
  const id = Number(searchParams.get("id"));
  if (!Number.isInteger(id) || id <= 0) return fail("Invalid id", 422);

  const result = db.prepare("DELETE FROM Project WHERE id = ?").run(id);
  if (result.changes === 0) return fail("Project not found", 404);
  return ok({ success: true });
}