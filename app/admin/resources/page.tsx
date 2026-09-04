import { CrudManager, type CrudField } from "@/components/admin/CrudManager";

export const dynamic = "force-dynamic";

const fields: CrudField[] = [
  { name: "title", label: "Title", type: "text", required: true },
  { name: "url", label: "URL", type: "text", required: true, placeholder: "https://…" },
  {
    name: "category",
    label: "Category",
    type: "select",
    options: [
      "Beginner Guides",
      "Machine Learning",
      "Deep Learning",
      "NLP",
      "Computer Vision",
      "Generative AI",
      "Ethics",
      "Datasets",
      "Research Papers",
      "Open-source Tools",
    ],
  },
  { name: "description", label: "Description", type: "textarea", rows: 3 },
  { name: "license", label: "License", type: "text", placeholder: "e.g. MIT, Apache-2.0, Free course" },
  {
    name: "level",
    label: "Level",
    type: "select",
    options: ["Beginner", "Intermediate", "Advanced"],
  },
];

export default function AdminResourcesPage() {
  return (
    <CrudManager
      apiPath="/api/admin/resources"
      title="Resources"
      description="Keep the list free-only: every resource must be accessible without payment."
      fields={fields}
      displayName={(row) => String(row.title ?? "Untitled")}
    />
  );
}