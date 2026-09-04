import { fail, ok } from "@/lib/api";
import { getProjectBySlug } from "@/lib/queries";

export const dynamic = "force-dynamic";

export async function GET(_request: Request, { params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug);
  if (!project) return fail("Project not found", 404);
  return ok({ project });
}