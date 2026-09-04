import type { Metadata } from "next";
import { FallbackVisual } from "@/components/three/FallbackVisual";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "404 — Page Not Found",
};

export default function NotFound() {
  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden">
      <div className="bg-grid absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" aria-hidden="true" />
      <div className="relative z-10 mx-auto max-w-2xl px-4 py-20 text-center">
        <div className="mx-auto h-52 max-w-xs">
          <FallbackVisual variant="network" />
        </div>
        <p className="mt-4 font-mono text-xs uppercase tracking-[0.3em] text-danger">
          Error 404 — No such neuron
        </p>
        <h1 className="mt-3 font-display text-5xl font-bold tracking-tight text-slate-50 sm:text-6xl">
          Page not found
        </h1>
        <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-muted">
          This page doesn’t exist in my training data. The link may be outdated, or the URL may
          have a typo. Let’s get you back to known territory.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button href="/" size="lg">
            Return home
          </Button>
          <Button href="/glossary" size="lg" variant="outline">
            Browse the glossary
          </Button>
        </div>
      </div>
    </section>
  );
}