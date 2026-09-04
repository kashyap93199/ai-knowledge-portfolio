import { fail, ok, requireAdmin } from "@/lib/api";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  const guard = requireAdmin();
  if (guard) return guard;

  const count = (table: string) =>
    (db.prepare(`SELECT COUNT(*) AS count FROM ${table}`).get() as { count: number }).count;
  const newMessages = (
    db.prepare("SELECT COUNT(*) AS count FROM ContactMessage WHERE status = 'new'").get() as {
      count: number;
    }
  ).count;

  return ok({
    stats: {
      topics: count("AiTopic"),
      workflowSteps: count("WorkflowStep"),
      timelineEvents: count("TimelineEvent"),
      projects: count("Project"),
      resources: count("Resource"),
      glossaryTerms: count("GlossaryTerm"),
      messages: count("ContactMessage"),
      newMessages,
    },
  });
}