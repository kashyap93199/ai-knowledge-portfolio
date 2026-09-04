import { ok } from "@/lib/api";
import { getWorkflowSteps } from "@/lib/queries";

export const dynamic = "force-dynamic";

export async function GET() {
  return ok({ steps: getWorkflowSteps() });
}