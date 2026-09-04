"use client";

import { useCallback, useEffect, useState } from "react";
import { Check, Trash2 } from "lucide-react";
import type { ContactMessage } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { ErrorState, Loader } from "@/components/ui/Feedback";
import { formatDate } from "@/lib/utils";

const statusTone: Record<ContactMessage["status"], "danger" | "cyan" | "neutral"> = {
  new: "danger",
  read: "cyan",
  archived: "neutral",
};

export function AdminMessages() {
  const [messages, setMessages] = useState<ContactMessage[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    setError(null);
    try {
      const res = await fetch("/api/admin/messages");
      if (!res.ok) throw new Error();
      const data = (await res.json()) as { messages: ContactMessage[] };
      setMessages(data.messages);
    } catch {
      setError("Could not load messages.");
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function setStatus(id: number, status: ContactMessage["status"]) {
    setBusy(true);
    await fetch("/api/admin/messages", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    setBusy(false);
    await load();
  }

  async function remove(id: number) {
    if (!window.confirm("Delete this message permanently?")) return;
    setBusy(true);
    await fetch(`/api/admin/messages?id=${id}`, { method: "DELETE" });
    setBusy(false);
    await load();
  }

  if (error) return <ErrorState message={error} onRetry={() => load()} />;
  if (messages === null) return <Loader label="Loading messages…" />;

  if (messages.length === 0) {
    return (
      <p className="card-surface p-8 text-center text-sm text-muted">
        No messages yet. Submissions from the contact form will appear here.
      </p>
    );
  }

  return (
    <ul className="space-y-4">
      {messages.map((message) => (
        <li key={message.id} className="card-surface p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="font-display font-semibold text-slate-100">{message.subject}</h2>
              <Badge tone={statusTone[message.status]}>{message.status}</Badge>
            </div>
            <div className="flex items-center gap-2">
              {message.status !== "read" && (
                <button
                  onClick={() => void setStatus(message.id, "read")}
                  disabled={busy}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-ink-line px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:border-cyan/50 hover:text-cyan-soft"
                >
                  <Check size={13} aria-hidden="true" /> Mark read
                </button>
              )}
              {message.status !== "archived" && (
                <button
                  onClick={() => void setStatus(message.id, "archived")}
                  disabled={busy}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-ink-line px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:border-violet/50 hover:text-violet-soft"
                >
                  Archive
                </button>
              )}
              <button
                onClick={() => void remove(message.id)}
                disabled={busy}
                aria-label={`Delete message from ${message.name}`}
                className="inline-flex items-center gap-1.5 rounded-lg border border-ink-line px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:border-danger/50 hover:text-danger"
              >
                <Trash2 size={13} aria-hidden="true" /> Delete
              </button>
            </div>
          </div>
          <p className="mt-3 text-sm leading-relaxed whitespace-pre-line text-slate-300">
            {message.message}
          </p>
          <p className="mt-3 font-mono text-xs text-muted-dim">
            {message.name} · {message.email} · {formatDate(message.createdAt)}
          </p>
        </li>
      ))}
    </ul>
  );
}