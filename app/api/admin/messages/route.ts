import { z } from "zod";
import { fail, ok, requireAdmin } from "@/lib/api";
import { db } from "@/lib/db";
import { getContactMessages } from "@/lib/queries";

export const dynamic = "force-dynamic";

const statusSchema = z.object({ status: z.enum(["new", "read", "archived"]) });

export async function GET(request: Request) {
  const guard = requireAdmin();
  if (guard) return guard;
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  return ok({ messages: getContactMessages(status ?? undefined) });
}

export async function PATCH(request: Request) {
  const guard = requireAdmin();
  if (guard) return guard;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return fail("Invalid JSON body", 400);
  }

  const parsed = z
    .object({ id: z.number().int().positive(), ...statusSchema.shape })
    .safeParse(body);
  if (!parsed.success) return fail("Invalid request", 422);

  const result = db
    .prepare("UPDATE ContactMessage SET status = ?, updatedAt = datetime('now') WHERE id = ?")
    .run(parsed.data.status, parsed.data.id);

  if (result.changes === 0) return fail("Message not found", 404);
  return ok({ success: true });
}

export async function DELETE(request: Request) {
  const guard = requireAdmin();
  if (guard) return guard;

  const { searchParams } = new URL(request.url);
  const id = Number(searchParams.get("id"));
  if (!Number.isInteger(id) || id <= 0) return fail("Invalid id", 422);

  const result = db.prepare("DELETE FROM ContactMessage WHERE id = ?").run(id);
  if (result.changes === 0) return fail("Message not found", 404);
  return ok({ success: true });
}