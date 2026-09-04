import { ok } from "@/lib/api";
import { getTopics } from "@/lib/queries";

export const dynamic = "force-dynamic";

export async function GET() {
  return ok({ topics: getTopics() });
}