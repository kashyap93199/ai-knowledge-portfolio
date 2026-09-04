import { CrudManager, type CrudField } from "@/components/admin/CrudManager";

export const dynamic = "force-dynamic";

const fields: CrudField[] = [
  { name: "title", label: "Title", type: "text", required: true },
  { name: "summary", label: "Summary", type: "textarea", rows: 3, required: true },
  { name: "problem", label: "Problem", type: "textarea", rows: 4 },
  { name: "solution", label: "Solution", type: "textarea", rows: 4 },
  { name: "features", label: "Features (one per line)", type: "textarea", rows: 5 },
  { name: "techStack", label: "Tech stack", type: "text" },
  { name: "category", label: "Category", type: "text", required: true, default: "General" },
  { name: "tags", label: "Tags (pipe-separated, e.g. NLP|Chat)", type: "text" },
  { name: "demoUrl", label: "Demo URL", type: "text", placeholder: "https://…" },
  { name: "repositoryUrl", label: "Repository URL", type: "text", placeholder: "https://github.com/…" },
  { name: "order", label: "Order", type: "number", default: 0 },
  { name: "featured", label: "Featured", type: "checkbox" },
];

export default function AdminProjectsPage() {
  return (
    <CrudManager
      apiPath="/api/admin/projects"
      title="Projects"
      description="Create, edit, and delete portfolio projects. Order controls their position."
      fields={fields}
      displayName={(row) => String(row.title ?? "Untitled")}
    />
  );
}