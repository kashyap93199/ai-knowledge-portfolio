import { AdminSettings } from "@/components/admin/AdminSettings";

export const dynamic = "force-dynamic";

export default function AdminSettingsPage() {
  return (
    <section>
      <h2 className="mb-2 font-display text-xl font-semibold text-slate-100">Site settings</h2>
      <p className="mb-6 text-sm text-muted">
        Edit the site title, hero copy, footer note, and social links. Changes appear on the
        public site immediately.
      </p>
      <AdminSettings />
    </section>
  );
}