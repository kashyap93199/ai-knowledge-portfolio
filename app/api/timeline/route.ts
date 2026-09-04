import { ok } from "@/lib/api";
import { getTimeline } from "@/lib/queries";

export const dynamic = "force-dynamic";

export async function GET() {
  return ok({ events: getTimeline() });
}