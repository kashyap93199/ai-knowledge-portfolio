"use client";

import { useCallback, useEffect, useState } from "react";
import { Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ErrorState, Loader } from "@/components/ui/Feedback";
import { Field, Input, Textarea } from "@/components/ui/Fields";

const settingFields: { key: string; label: string; textarea?: boolean; hint?: string }[] = [
  { key: "siteTitle", label: "Site title" },
  { key: "siteDescription", label: "Site description", textarea: true },
  { key: "heroTitle", label: "Hero title", textarea: true },
  { key: "heroSubtitle", label: "Hero subtitle", textarea: true },
  { key: "heroEyebrow", label: "Hero eyebrow label" },
  { key: "contactEmail", label: "Contact email" },
  { key: "footerNote", label: "Footer note", textarea: true },
  { key: "socialGithub", label: "GitHub URL", hint: "Leave blank to hide the icon." },
  { key: "socialLinkedin", label: "LinkedIn URL", hint: "Leave blank to hide the icon." },
  { key: "socialTwitter", label: "Twitter / X URL", hint: "Leave blank to hide the icon." },
];

export function AdminSettings() {
  const [values, setValues] = useState<Record<string, string> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState(false);

  const load = useCallback(async () => {
    setError(null);
    try {
      const res = await fetch("/api/admin/site-settings");
      if (!res.ok) throw new Error();
      const data = (await res.json()) as { settings: Record<string, string> };
      setValues(data.settings);
    } catch {
      setError("Could not load site settings.");
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (!values) return;
    setBusy(true);
    setSaved(false);
    setError(null);
    try {
      const res = await fetch("/api/admin/site-settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ settings: values }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        setError(data.error ?? "Save failed");
        return;
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      setError("Network error while saving.");
    } finally {
      setBusy(false);
    }
  }

  if (error && !values) return <ErrorState message={error} onRetry={() => load()} />;
  if (values === null) return <Loader label="Loading settings…" />;

  return (
    <form onSubmit={save} className="card-surface max-w-2xl space-y-5 p-6 sm:p-8">
      {settingFields.map((field) => (
        <Field
          key={field.key}
          label={field.label}
          htmlFor={`setting-${field.key}`}
          hint={field.hint}
        >
          {field.textarea ? (
            <Textarea
              id={`setting-${field.key}`}
              rows={3}
              value={values[field.key] ?? ""}
              onChange={(e) =>
                setValues((prev) => (prev ? { ...prev, [field.key]: e.target.value } : prev))
              }
            />
          ) : (
            <Input
              id={`setting-${field.key}`}
              value={values[field.key] ?? ""}
              onChange={(e) =>
                setValues((prev) => (prev ? { ...prev, [field.key]: e.target.value } : prev))
              }
            />
          )}
        </Field>
      ))}

      {error && (
        <p role="alert" className="text-sm text-danger">
          {error}
        </p>
      )}
      {saved && (
        <p role="status" className="text-sm text-emerald">
          Settings saved — the public site now reflects your changes.
        </p>
      )}

      <Button type="submit" disabled={busy}>
        {busy ? <Loader2 size={16} className="animate-spin" aria-hidden="true" /> : <Save size={16} aria-hidden="true" />}
        Save settings
      </Button>
    </form>
  );
}