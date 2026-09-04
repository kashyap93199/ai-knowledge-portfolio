import { z } from "zod";
import { fail, ok, requireAdmin } from "@/lib/api";
import { db } from "@/lib/db";
import { getWorkflowSteps } from "@/lib/queries";

export const dynamic = "force-dynamic";

const stepSchema = z.object({
  title: z.string().trim().min(2).max(160),
  subtitle: z.string().trim().max(300).nullable().optional(),
  description: z.string().trim().max(1000).default(""),
  details: z.string().trim().max(6000).default(""),
  inputs: z.string().trim().max(2000).nullable().optional(),
  outputs: z.string().trim().max(2000).nullable().optional(),
  tools: z.string().trim().max(2000).nullable().optional(),
  bestPractices: z.string().trim().max(3000).nullable().optional(),
  order: z.number().int().min(1).max(100),
  icon: z.string().trim().max(40).default("circle"),
  animationType: z.string().trim().max(40).nullable().optional(),
});

type StepInput = z.infer<typeof stepSchema>;

export async function GET() {
  const guard = requireAdmin();
  if (guard) return guard;
  return ok({ steps: getWorkflowSteps() });
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

  const parsed = stepSchema.safeParse(body);
  if (!parsed.success) return fail(parsed.error.issues[0]?.message ?? "Validation failed", 422);

  const s = parsed.data;
  const conflict = db
    .prepare('SELECT id FROM WorkflowStep WHERE "order" = ?')
    .get(s.order) as { id: number } | undefined;
  if (conflict) {
    return fail(`Step order ${s.order} is already in use`, 409);
  }

  const result = db
    .prepare(
      `INSERT INTO WorkflowStep (title, subtitle, description, details, inputs, outputs, tools, bestPractices, "order", icon, animationType)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
    .run(
      s.title,
      s.subtitle ?? null,
      s.description,
      s.details,
      s.inputs ?? null,
      s.outputs ?? null,
      s.tools ?? null,
      s.bestPractices ?? null,
      s.order,
      s.icon,
      s.animationType ?? null
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

  const parsed = stepSchema.partial().safeParse(body);
  if (!parsed.success) return fail("Invalid request", 422);

  const current = db.prepare("SELECT * FROM WorkflowStep WHERE id = ?").get(id) as
    | Record<string, unknown>
    | undefined;
  if (!current) return fail("Step not found", 404);

  if (parsed.data.order !== undefined && parsed.data.order !== current.order) {
    const conflict = db
      .prepare('SELECT id FROM WorkflowStep WHERE "order" = ? AND id != ?')
      .get(parsed.data.order, id);
    if (conflict) return fail(`Step order ${parsed.data.order} is already in use`, 409);
  }

  const merged = { ...current, ...parsed.data };
  db.prepare(
    `UPDATE WorkflowStep SET
      title = ?, subtitle = ?, description = ?, details = ?, inputs = ?, outputs = ?,
      tools = ?, bestPractices = ?, "order" = ?, icon = ?, animationType = ?,
      updatedAt = datetime('now')
     WHERE id = ?`
  ).run(
    merged.title as string,
    (merged.subtitle as string | null) ?? null,
    merged.description as string,
    merged.details as string,
    (merged.inputs as string | null) ?? null,
    (merged.outputs as string | null) ?? null,
    (merged.tools as string | null) ?? null,
    (merged.bestPractices as string | null) ?? null,
    merged.order as number,
    merged.icon as string,
    (merged.animationType as string | null) ?? null,
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

  const result = db.prepare("DELETE FROM WorkflowStep WHERE id = ?").run(id);
  if (result.changes === 0) return fail("Step not found", 404);
  return ok({ success: true });
}