import type { Metadata } from "next";
import { Mail, MapPin, Timer } from "lucide-react";
import { ContactForm } from "@/components/contact/ContactForm";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { getSiteSettings } from "@/lib/queries";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch — send a message through the contact form. Messages are stored in the site database, no external email service required.",
};

export default function ContactPage() {
  const settings = getSiteSettings();

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
        <ScrollReveal>
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-cyan-soft">Contact</p>
            <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-slate-50 sm:text-5xl">
              Let’s build something intelligent
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-muted">
              Whether you have a project in mind, a question about AI, or just want to say hello —
              the form goes straight into the site database, and I read every message.
            </p>

            <ul className="mt-10 space-y-5">
              <li className="flex items-center gap-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan/10 text-cyan-soft">
                  <Mail size={20} aria-hidden="true" />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-dim">Email</p>
                  <a
                    href={`mailto:${settings.contactEmail}`}
                    className="text-sm font-medium text-slate-100 hover:text-cyan-soft"
                  >
                    {settings.contactEmail}
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet/10 text-violet-soft">
                  <Timer size={20} aria-hidden="true" />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-dim">Response time</p>
                  <p className="text-sm font-medium text-slate-100">Usually within 1–2 business days</p>
                </div>
              </li>
              <li className="flex items-center gap-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald/10 text-emerald">
                  <MapPin size={20} aria-hidden="true" />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-dim">Location</p>
                  <p className="text-sm font-medium text-slate-100">Remote · Worldwide</p>
                </div>
              </li>
            </ul>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <ContactForm />
        </ScrollReveal>
      </div>
    </div>
  );
}