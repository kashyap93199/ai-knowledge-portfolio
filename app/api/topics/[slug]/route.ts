import { fail, ok } from "@/lib/api";
import { getTopicBySlug } from "@/lib/queries";

export const dynamic = "force-dynamic";

export async function GET(_request: Request, { params }: { params: { slug: string } }) {
  const topic = getTopicBySlug(params.slug);
  if (!topic) return fail("Topic not found", 404);
  return ok({ topic });
}