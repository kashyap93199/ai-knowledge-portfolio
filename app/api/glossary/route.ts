import { ok } from "@/lib/api";
import { getGlossaryTerms } from "@/lib/queries";

export const dynamic = "force-dynamic";

export async function GET() {
  return ok({ terms: getGlossaryTerms() });
}