import { ok } from "@/lib/api";
import { getProjects } from "@/lib/queries";

export const dynamic = "force-dynamic";

export async function GET() {
  return ok({ projects: getProjects() });
}