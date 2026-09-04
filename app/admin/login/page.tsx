import { redirect } from "next/navigation";
import { AdminLoginForm } from "@/components/admin/AdminLoginForm";
import { isAuthenticated } from "@/lib/auth";

export const metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  if (isAuthenticated()) {
    redirect("/admin");
  }

  return (
    <div className="mx-auto max-w-md px-4 py-20">
      <div className="card-surface p-8">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-cyan-soft">Restricted area</p>
        <h1 className="mt-2 font-display text-2xl font-bold text-slate-50">Admin login</h1>
        <p className="mt-2 text-sm text-muted">
          Use the credentials from your <code className="font-mono text-cyan-soft">.env</code> file
          (<code className="font-mono text-muted">ADMIN_USERNAME</code> /{" "}
          <code className="font-mono text-muted">ADMIN_PASSWORD</code>).
        </p>
        <div className="mt-6">
          <AdminLoginForm />
        </div>
      </div>
    </div>
  );
}