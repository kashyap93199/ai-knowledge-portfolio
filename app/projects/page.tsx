import type { Metadata } from "next";
import { ProjectFilters } from "@/components/projects/ProjectFilters";
import { SectionHeading } from "@/components/ui/Feedback";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { getProjects } from "@/lib/queries";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "A portfolio of AI projects: chatbots, computer vision tools, sentiment dashboards, neural network visualizers, and more.",
};

export default function ProjectsPage() {
  const projects = getProjects();

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
      <ScrollReveal>
        <SectionHeading
          eyebrow="Portfolio"
          title="AI Projects"
          subtitle="Hands-on explorations that turn the concepts on this site into working software. Every project is open source and built with free tools."
        />
      </ScrollReveal>
      <ProjectFilters projects={projects} />
    </div>
  );
}