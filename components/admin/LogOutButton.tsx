"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export function LogOutButton() {
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <button
      onClick={() => void logout()}
      className="inline-flex items-center gap-2 rounded-lg border border-danger/40 px-4 py-2 text-sm font-medium text-danger transition-colors hover:bg-danger/10"
    >
      <LogOut size={15} aria-hidden="true" /> Log out
    </button>
  );
}