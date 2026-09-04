import { z } from "zod";
import { fail, ok, requireAdmin } from "@/lib/api";
import { db } from "@/lib/db";
import { getResources } from "@/lib/queries";

export const dynamic = "force-dynamic";

const resourceSchema = z.object({
  title: z.string().trim().min(2).max(160),
  url: z.string().trim().url().max(600),
  category: z.string().trim().min(1).max(80).default("Beginner"),
  description: z.string().trim().max(1000).default(""),
  license: z.string().trim().max(200).nullable().optional(),
  level: z.enum(["Beginner", "Intermediate", "Advanced"]).nullable().optional(),
});

export async function GET() {
  const guard = requireAdmin();
  if (guard) return guard;
  return ok({ resources: getResources() });
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

  const parsed = resourceSchema.safeParse(body);
  if (!parsed.success) return fail(parsed.error.issues[0]?.message ?? "Validation failed", 422);

  const r = parsed.data;
  const existing = db.prepare("SELECT id FROM Resource WHERE url = ?").get(r.url);
  if (existing) return fail("A resource with this URL already exists", 409);

  const result = db
    .prepare(
      "INSERT INTO Resource (title, url, category, description, license, level) VALUES (?, ?, ?, ?, ?, ?)"
    )
    .run(r.title, r.url, r.category, r.description, r.license ?? null, r.level ?? null);

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

  const parsed = resourceSchema.partial().safeParse(body);
  if (!parsed.success) return fail("Invalid request", 422);

  const current = db.prepare("SELECT * FROM Resource WHERE id = ?").get(id) as
    | Record<string, unknown>
    | undefined;
  if (!current) return fail("Resource not found", 404);

  if (parsed.data.url && parsed.data.url !== current.url) {
    const conflict = db.prepare("SELECT id FROM Resource WHERE url = ? AND id != ?").get(parsed.data.url, id);
    if (conflict) return fail("A resource with this URL already exists", 409);
  }

  const merged = { ...current, ...parsed.data };
  db.prepare(
    "UPDATE Resource SET title = ?, url = ?, category = ?, description = ?, license = ?, level = ?, updatedAt = datetime('now') WHERE id = ?"
  ).run(
    merged.title as string,
    merged.url as string,
    merged.category as string,
    merged.description as string,
    (merged.license as string | null) ?? null,
    (merged.level as string | null) ?? null,
    id
  );

  return ok({ success: true });
}

export async function DELETE(request: Request) {
  const guard = requireAdmin();
  if (guard) return guard;

  const { searchParams } = new URL(request.url);
  const id = Number(searchParams.get("id"));
  if (!Number.isInteger(id) || id <= 0) return fail("Invalid id", 422);

  const result = db.prepare("DELETE FROM Resource WHERE id = ?").run(id);
  if (result.changes === 0) return fail("Resource not found", 404);
  return ok({ success: true });
}