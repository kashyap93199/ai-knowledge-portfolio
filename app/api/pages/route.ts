import { ok } from "@/lib/api";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  const pages = db
    .prepare("SELECT * FROM Page WHERE published = 1 ORDER BY \"order\" ASC")
    .all() as { id: number }[];

  const sectionsStmt = db.prepare(
    "SELECT * FROM Section WHERE pageId = ? AND visible = 1 ORDER BY \"order\" ASC"
  );

  const result = pages.map((page) => ({
    ...page,
    sections: sectionsStmt.all(page.id),
  }));

  return ok({ pages: result });
}