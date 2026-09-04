import Link from "next/link";
import { getNewMessageCount, getMessageCount } from "@/lib/queries";
import { db } from "@/lib/db";
import { LogOutButton } from "@/components/admin/LogOutButton";

export const dynamic = "force-dynamic";

export default function AdminDashboardPage() {
  const count = (table: string) =>
    (db.prepare(`SELECT COUNT(*) AS count FROM ${table}`).get() as { count: number }).count;

  const stats = [
    { label: "AI Domains", value: count("AiTopic"), href: "/admin" },
    { label: "Workflow Steps", value: count("WorkflowStep"), href: "/admin/workflow" },
    { label: "Timeline Events", value: count("TimelineEvent"), href: "/admin" },
    { label: "Projects", value: count("Project"), href: "/admin/projects" },
    { label: "Resources", value: count("Resource"), href: "/admin/resources" },
    { label: "Glossary Terms", value: count("GlossaryTerm"), href: "/admin" },
    { label: "Contact Messages", value: getMessageCount(), href: "/admin/messages" },
    { label: "Unread Messages", value: getNewMessageCount(), href: "/admin/messages" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-muted">
          Manage content, workflow slides, resources, and incoming messages.
        </p>
        <LogOutButton />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="card-surface p-5 transition-all hover:-translate-y-0.5 hover:border-cyan/40"
          >
            <p className="font-display text-3xl font-bold text-cyan-soft">{stat.value}</p>
            <p className="mt-1 text-sm text-muted">{stat.label}</p>
          </Link>
        ))}
      </div>

      <div className="card-surface p-6">
        <h2 className="font-display text-lg font-semibold text-slate-100">Quick notes</h2>
        <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted">
          <li>
            · Content is stored in the local SQLite database and served to the public pages and
            API.
          </li>
          <li>
            · Re-seed anytime with <code className="font-mono text-cyan-soft">npm run seed</code> or{" "}
            <code className="font-mono text-cyan-soft">npm run db:reset</code> to wipe and reseed.
          </li>
          <li>
            · The public site renders dynamically, so edits here appear immediately after saving.
          </li>
        </ul>
      </div>
    </div>
  );
}