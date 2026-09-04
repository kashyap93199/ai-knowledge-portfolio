import { ok } from "@/lib/api";
import { getSiteSettings } from "@/lib/queries";

export const dynamic = "force-dynamic";

export async function GET() {
  return ok({ settings: getSiteSettings() });
}