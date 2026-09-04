import Link from "next/link";
import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { cn } from "@/lib/utils";

const adminLinks = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/messages", label: "Messages" },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/workflow", label: "Workflow" },
  { href: "/admin/resources", label: "Resources" },
  { href: "/admin/settings", label: "Site Settings" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  // Guard everything except the login page itself.
  if (!isAuthenticated()) {
    redirect("/admin/login");
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-cyan-soft">Admin area</p>
          <h1 className="mt-1 font-display text-3xl font-bold text-slate-50">Content Management</h1>
        </div>
        <Link href="/" className="text-sm text-muted hover:text-cyan-soft">
          ← Back to site
        </Link>
      </div>

      <nav aria-label="Admin navigation" className="mb-10 flex flex-wrap gap-2">
        {adminLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "rounded-lg border px-4 py-2 text-sm font-medium transition-colors",
              "border-ink-line text-muted hover:border-cyan/40 hover:text-cyan-soft"
            )}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      {children}
    </div>
  );
}