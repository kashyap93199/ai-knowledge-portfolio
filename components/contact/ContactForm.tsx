"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2, Loader2, Send, XCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Field, Input, Textarea } from "@/components/ui/Fields";
import type { ContactPayload } from "@/types";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name (at least 2 characters).").max(80),
  email: z.string().trim().email("Please enter a valid email address.").max(120),
  subject: z.string().trim().min(3, "Please add a subject (at least 3 characters).").max(150),
  message: z.string().trim().min(10, "Please write a message of at least 10 characters.").max(5000),
  // Honeypot: real users never see this field.
  company: z.string().max(0, "Spam detected.").optional().or(z.literal("")),
});

type ContactFormValues = z.infer<typeof contactSchema>;

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", subject: "", message: "", company: "" },
  });

  async function onSubmit(values: ContactFormValues) {
    setStatus("submitting");
    setServerError("");
    try {
      const payload: ContactPayload = {
        name: values.name,
        email: values.email,
        subject: values.subject,
        message: values.message,
      };
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setStatus("error");
        setServerError(data.error ?? "Something went wrong. Please try again.");
        return;
      }
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
      setServerError("Network error — please check your connection and try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="card-surface mx-auto max-w-lg p-10 text-center" role="status" aria-live="polite">
        <CheckCircle2 className="mx-auto mb-4 h-12 w-12 text-emerald" aria-hidden="true" />
        <h2 className="font-display text-2xl font-bold text-slate-100">Message sent</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Thank you for reaching out. Your message was saved successfully and will be answered
          soon.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 rounded-lg border border-ink-line px-4 py-2 text-sm font-medium text-slate-200 hover:border-cyan/50 hover:text-cyan-soft"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="card-surface space-y-5 p-6 sm:p-8" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" htmlFor="contact-name" error={errors.name?.message} required>
          <Input
            id="contact-name"
            autoComplete="name"
            placeholder="Ada Lovelace"
            disabled={status === "submitting"}
            aria-invalid={!!errors.name}
            {...register("name")}
          />
        </Field>
        <Field label="Email" htmlFor="contact-email" error={errors.email?.message} required>
          <Input
            id="contact-email"
            type="email"
            autoComplete="email"
            placeholder="ada@example.com"
            disabled={status === "submitting"}
            aria-invalid={!!errors.email}
            {...register("email")}
          />
        </Field>
      </div>

      <Field label="Subject" htmlFor="contact-subject" error={errors.subject?.message} required>
        <Input
          id="contact-subject"
          placeholder="Project inquiry"
          disabled={status === "submitting"}
          aria-invalid={!!errors.subject}
          {...register("subject")}
        />
      </Field>

      <Field label="Message" htmlFor="contact-message" error={errors.message?.message} required>
        <Textarea
          id="contact-message"
          rows={6}
          placeholder="Tell me about your project or question…"
          disabled={status === "submitting"}
          aria-invalid={!!errors.message}
          {...register("message")}
        />
      </Field>

      {/* Honeypot field — hidden from humans */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="contact-company">
          Company <input id="contact-company" tabIndex={-1} autoComplete="off" {...register("company")} />
        </label>
      </div>

      {status === "error" && (
        <p role="alert" className="flex items-center gap-2 rounded-lg border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-danger">
          <XCircle size={16} aria-hidden="true" /> {serverError}
        </p>
      )}

      <div className="flex items-center justify-between gap-4">
        <p className="text-xs text-muted-dim">
          Messages are stored locally in the site database — no external service required.
        </p>
        <Button type="submit" disabled={status === "submitting"}>
          {status === "submitting" ? (
            <>
              <Loader2 size={16} className="animate-spin" aria-hidden="true" /> Sending…
            </>
          ) : (
            <>
              Send message <Send size={16} aria-hidden="true" />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}