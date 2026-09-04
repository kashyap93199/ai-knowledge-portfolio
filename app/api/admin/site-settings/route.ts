import { z } from "zod";
import { fail, ok, requireAdmin } from "@/lib/api";
import { db } from "@/lib/db";
import { getSiteSettings } from "@/lib/queries";

export const dynamic = "force-dynamic";

const allowedKeys = new Set([
  "siteTitle",
  "siteDescription",
  "heroTitle",
  "heroSubtitle",
  "heroEyebrow",
  "contactEmail",
  "footerNote",
  "socialGithub",
  "socialLinkedin",
  "socialTwitter",
]);

export async function GET() {
  const guard = requireAdmin();
  if (guard) return guard;
  return ok({ settings: getSiteSettings() });
}

export async function PATCH(request: Request) {
  const guard = requireAdmin();
  if (guard) return guard;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return fail("Invalid JSON body", 400);
  }

  const parsed = z
    .object({
      settings: z.record(z.string().max(64), z.string().max(2000)),
    })
    .safeParse(body);
  if (!parsed.success) return fail("Invalid request", 422);

  const update = db.prepare(
    `INSERT INTO SiteSetting (key, value) VALUES (?, ?)
     ON CONFLICT(key) DO UPDATE SET value = excluded.value, updatedAt = datetime('now')`
  );

  let updated = 0;
  for (const [key, value] of Object.entries(parsed.data.settings)) {
    if (!allowedKeys.has(key)) continue;
    update.run(key, value);
    updated++;
  }

  return ok({ success: true, updated });
}