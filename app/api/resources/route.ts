import { ok } from "@/lib/api";
import { getResources } from "@/lib/queries";

export const dynamic = "force-dynamic";

export async function GET() {
  return ok({ resources: getResources() });
}