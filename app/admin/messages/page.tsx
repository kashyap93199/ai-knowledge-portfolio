import { AdminMessages } from "@/components/admin/AdminMessages";

export const dynamic = "force-dynamic";

export default function AdminMessagesPage() {
  return (
    <section>
      <h2 className="mb-6 font-display text-xl font-semibold text-slate-100">Inbox</h2>
      <AdminMessages />
    </section>
  );
}