import type { Metadata } from "next";
import { ResourceFilters } from "@/components/resources/ResourceFilters";
import { SectionHeading } from "@/components/ui/Feedback";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { getResources } from "@/lib/queries";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "A curated list of free AI learning resources: beginner guides, machine learning, deep learning, NLP, computer vision, generative AI, ethics, datasets, and research papers.",
};

export default function ResourcesPage() {
  const resources = getResources();

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
      <ScrollReveal>
        <SectionHeading
          eyebrow="Learning"
          title="Free AI Resources"
          subtitle="Every resource listed here is free to access — courses, documentation, datasets, papers, and open-source tools. Nothing behind a paywall."
        />
      </ScrollReveal>
      <ResourceFilters resources={resources} />
    </div>
  );
}