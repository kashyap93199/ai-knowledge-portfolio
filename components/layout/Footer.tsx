import Link from "next/link";
import { BrainCircuit, Github, Linkedin, Mail, Twitter } from "lucide-react";
import { getSiteSettings } from "@/lib/queries";

const footerLinks = [
  { href: "/overview", label: "AI Overview" },
  { href: "/domains", label: "AI Domains" },
  { href: "/workflow", label: "AI Workflow" },
  { href: "/timeline", label: "Timeline" },
  { href: "/projects", label: "Projects" },
  { href: "/resources", label: "Resources" },
  { href: "/glossary", label: "Glossary" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  const settings = getSiteSettings();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-ink-line bg-ink-raised/60">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <Link href="/" className="flex items-center gap-2 font-display text-lg font-bold text-slate-100">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan to-violet text-ink">
                <BrainCircuit size={20} aria-hidden="true" />
              </span>
              AI Knowledge Portfolio
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
              {settings.siteDescription}
            </p>
            <div className="mt-4 flex gap-2">
              {settings.socialGithub && (
                <a
                  href={settings.socialGithub}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub profile"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-ink-line text-muted transition-colors hover:border-cyan/40 hover:text-cyan-soft"
                >
                  <Github size={16} aria-hidden="true" />
                </a>
              )}
              {settings.socialLinkedin && (
                <a
                  href={settings.socialLinkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profile"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-ink-line text-muted transition-colors hover:border-cyan/40 hover:text-cyan-soft"
                >
                  <Linkedin size={16} aria-hidden="true" />
                </a>
              )}
              {settings.socialTwitter && (
                <a
                  href={settings.socialTwitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter profile"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-ink-line text-muted transition-colors hover:border-cyan/40 hover:text-cyan-soft"
                >
                  <Twitter size={16} aria-hidden="true" />
                </a>
              )}
              {settings.contactEmail && (
                <a
                  href={`mailto:${settings.contactEmail}`}
                  aria-label="Send an email"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-ink-line text-muted transition-colors hover:border-cyan/40 hover:text-cyan-soft"
                >
                  <Mail size={16} aria-hidden="true" />
                </a>
              )}
            </div>
          </div>

          <nav aria-label="Footer navigation">
            <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-slate-200">
              Explore
            </h2>
            <ul className="mt-4 grid grid-cols-2 gap-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted transition-colors hover:text-cyan-soft">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-slate-200">
              About this site
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              {settings.footerNote}
            </p>
            <p className="mt-4 text-xs leading-relaxed text-muted-dim">
              All content is original and educational. All software, fonts, and assets are
              free and open source. See the{" "}
              <Link href="/about" className="underline decoration-cyan/50 hover:text-cyan-soft">
                About
              </Link>{" "}
              page and README for details.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-ink-line pt-6 text-xs text-muted-dim sm:flex-row">
          <p>© {year} AI Knowledge Portfolio. Built with free and open-source tools.</p>
          <p className="font-mono">
            <Link href="/contact" className="hover:text-cyan-soft">
              Contact
            </Link>{" "}
            ·{" "}
            <Link href="/admin" className="hover:text-cyan-soft">
              Admin
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}