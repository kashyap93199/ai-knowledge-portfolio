import { ok } from "@/lib/api";
import { searchContent } from "@/lib/queries";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = (searchParams.get("q") ?? "").trim();

  if (q.length < 2) {
    return ok({ results: [], query: q });
  }

  return ok({ results: searchContent(q), query: q });
}