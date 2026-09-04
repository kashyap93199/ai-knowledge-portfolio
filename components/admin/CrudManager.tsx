"use client";

import { useCallback, useEffect, useState } from "react";
import { Loader2, Pencil, Plus, Save, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ErrorState, Loader } from "@/components/ui/Feedback";
import { Input, Select, Textarea } from "@/components/ui/Fields";
import { cn } from "@/lib/utils";

export interface CrudField {
  name: string;
  label: string;
  type: "text" | "textarea" | "number" | "checkbox" | "select";
  required?: boolean;
  options?: string[];
  rows?: number;
  placeholder?: string;
  default?: string | number | boolean;
}

interface CrudManagerProps {
  apiPath: string;
  fields: CrudField[];
  title: string;
  description?: string;
  /** Map a list row to the display name used in the table. */
  displayName: (row: Record<string, unknown>) => string;
}

type Row = Record<string, unknown>;

export function CrudManager({ apiPath, fields, title, description, displayName }: CrudManagerProps) {
  const [rows, setRows] = useState<Row[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<Row | null>(null);
  const [creating, setCreating] = useState(false);
  const [formValues, setFormValues] = useState<Row | null>(null);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  const load = useCallback(async () => {
    setError(null);
    try {
      const res = await fetch(apiPath);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = (await res.json()) as { [key: string]: Row[] };
      const list = data[Object.keys(data)[0] ?? ""] ?? [];
      setRows(list);
    } catch {
      setError("Could not load content from the server.");
    }
  }, [apiPath]);

  useEffect(() => {
    load();
  }, [load]);

  function defaultValue(field: CrudField): string | number | boolean {
    return field.default ?? (field.type === "checkbox" ? false : field.type === "number" ? 0 : "");
  }

  function emptyForm(): Row {
    return Object.fromEntries(fields.map((f) => [f.name, defaultValue(f)]));
  }

  function startCreate() {
    setCreating(true);
    setEditing(null);
    setFormValues(emptyForm());
    setNotice(null);
    setError(null);
  }

  function startEdit(row: Row) {
    setEditing(row);
    setCreating(false);
    setFormValues({ ...row });
    setNotice(null);
    setError(null);
  }

  function cancelForm() {
    setEditing(null);
    setCreating(false);
    setFormValues(null);
    setNotice(null);
  }

  function setValue(name: string, value: string | number | boolean) {
    setFormValues((prev) => (prev ? { ...prev, [name]: value } : prev));
  }

  async function submit() {
    if (!formValues) return;
    setBusy(true);
    setNotice(null);
    setError(null);
    try {
      const res = await fetch(apiPath, {
        method: editing ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formValues),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        setError(data.error ?? "Save failed");
        return;
      }
      setNotice(editing ? "Changes saved." : "Created successfully.");
      cancelForm();
      await load();
    } catch {
      setError("Network error while saving.");
    } finally {
      setBusy(false);
    }
  }

  async function remove(id: number) {
    if (!window.confirm("Delete this item? This cannot be undone.")) return;
    setBusy(true);
    setError(null);
    try {
      const res = await fetch(`${apiPath}?id=${id}`, { method: "DELETE" });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        setError(data.error ?? "Delete failed");
        return;
      }
      setNotice("Deleted.");
      await load();
    } catch {
      setError("Network error while deleting.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-100">{title}</h1>
          {description && <p className="mt-1 text-sm text-muted">{description}</p>}
        </div>
        <Button onClick={startCreate} disabled={creating || !!editing}>
          <Plus size={16} aria-hidden="true" /> Add new
        </Button>
      </div>

      {notice && (
        <p role="status" className="rounded-lg border border-emerald/30 bg-emerald/10 px-4 py-2.5 text-sm text-emerald">
          {notice}
        </p>
      )}

      {formValues && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            void submit();
          }}
          className="card-surface space-y-4 p-6"
          aria-label={editing ? `Edit ${title} item` : `New ${title} item`}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            {fields.map((field) => {
              const value = formValues[field.name];
              const labelId = `field-${field.name}`;
              return (
                <div
                  key={field.name}
                  className={cn(field.type === "textarea" && "sm:col-span-2")}
                >
                  <label htmlFor={labelId} className="mb-1.5 block text-sm font-medium text-slate-200">
                    {field.label}
                    {field.required && <span className="ml-0.5 text-cyan-soft">*</span>}
                  </label>
                  {field.type === "textarea" ? (
                    <Textarea
                      id={labelId}
                      rows={field.rows ?? 4}
                      value={String(value ?? "")}
                      placeholder={field.placeholder}
                      onChange={(e) => setValue(field.name, e.target.value)}
                    />
                  ) : field.type === "checkbox" ? (
                    <input
                      id={labelId}
                      type="checkbox"
                      checked={Boolean(value)}
                      onChange={(e) => setValue(field.name, e.target.checked)}
                      className="h-5 w-5 accent-cyan"
                    />
                  ) : field.type === "select" ? (
                    <Select
                      id={labelId}
                      value={String(value ?? "")}
                      onChange={(e) => setValue(field.name, e.target.value)}
                    >
                      {(field.options ?? []).map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </Select>
                  ) : (
                    <Input
                      id={labelId}
                      type={field.type === "number" ? "number" : "text"}
                      value={String(value ?? "")}
                      placeholder={field.placeholder}
                      required={field.required}
                      onChange={(e) =>
                        setValue(
                          field.name,
                          field.type === "number" ? Number(e.target.value) : e.target.value
                        )
                      }
                    />
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <Button type="submit" disabled={busy}>
              {busy ? (
                <Loader2 size={16} className="animate-spin" aria-hidden="true" />
              ) : (
                <Save size={16} aria-hidden="true" />
              )}
              {editing ? "Save changes" : "Create"}
            </Button>
            <Button type="button" variant="ghost" onClick={cancelForm}>
              <X size={16} aria-hidden="true" /> Cancel
            </Button>
          </div>
        </form>
      )}

      {error && <ErrorState message={error} onRetry={() => setError(null)} />}

      {rows === null ? (
        <Loader label="Loading content…" />
      ) : rows.length === 0 ? (
        <p className="card-surface p-8 text-center text-sm text-muted">
          Nothing here yet — add the first item.
        </p>
      ) : (
        <ul className="card-surface divide-y divide-ink-line overflow-hidden">
          {rows.map((row) => {
            const id = Number(row.id);
            return (
              <li key={id} className="flex items-center justify-between gap-4 p-4">
                <div className="min-w-0">
                  <p className="truncate font-medium text-slate-100">{displayName(row)}</p>
                  <p className="truncate font-mono text-xs text-muted-dim">
                    #{id}
                    {row.order !== undefined && ` · order ${String(row.order)}`}
                    {row.category !== undefined && ` · ${String(row.category)}`}
                  </p>
                </div>
                <div className="flex shrink-0 gap-2">
                  <button
                    onClick={() => startEdit(row)}
                    aria-label={`Edit ${displayName(row)}`}
                    className="rounded-lg p-2 text-muted transition-colors hover:bg-cyan/10 hover:text-cyan-soft"
                  >
                    <Pencil size={15} aria-hidden="true" />
                  </button>
                  <button
                    onClick={() => void remove(id)}
                    aria-label={`Delete ${displayName(row)}`}
                    className="rounded-lg p-2 text-muted transition-colors hover:bg-danger/10 hover:text-danger"
                  >
                    <Trash2 size={15} aria-hidden="true" />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}