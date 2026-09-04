import type { Metadata } from "next";
import { DomainCard } from "@/components/ai/DomainCard";
import { SectionHeading } from "@/components/ui/Feedback";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { getTopics } from "@/lib/queries";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "AI Domains",
  description:
    "Ten major fields of artificial intelligence explained: machine learning, deep learning, NLP, computer vision, robotics, generative AI, and more.",
};

export default function DomainsPage() {
  const topics = getTopics();

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
      <ScrollReveal>
        <SectionHeading
          eyebrow="AI Domains"
          title="The Major Fields of Artificial Intelligence"
          subtitle="Each card expands into a full explanation — definitions, real-world examples, common tools, and free learning resources. Click a card to open it."
        />
      </ScrollReveal>

      <div className="space-y-4">
        {topics.map((topic, i) => (
          <ScrollReveal key={topic.slug} delay={Math.min(i * 0.04, 0.3)}>
            <DomainCard topic={topic} />
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}