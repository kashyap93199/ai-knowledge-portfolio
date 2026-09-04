import type { Metadata } from "next";
import { GlossaryBrowser } from "@/components/glossary/GlossaryBrowser";
import { SectionHeading } from "@/components/ui/Feedback";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { getGlossaryTerms } from "@/lib/queries";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Glossary",
  description:
    "An AI glossary with plain-language definitions of essential terms — from neural networks and transformers to overfitting and generative AI.",
};

export default function GlossaryPage() {
  const terms = getGlossaryTerms();

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
      <ScrollReveal>
        <SectionHeading
          eyebrow="Reference"
          title="AI Glossary"
          subtitle="Every term gets a one-line definition plus a deeper explanation, its category, and related terms. Search or filter to find what you need."
        />
      </ScrollReveal>
      <GlossaryBrowser terms={terms} />
    </div>
  );
}