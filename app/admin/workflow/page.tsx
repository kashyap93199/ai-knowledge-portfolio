import { CrudManager, type CrudField } from "@/components/admin/CrudManager";

export const dynamic = "force-dynamic";

const fields: CrudField[] = [
  { name: "title", label: "Title", type: "text", required: true },
  { name: "subtitle", label: "Subtitle", type: "text" },
  { name: "description", label: "Short description", type: "textarea", rows: 3, required: true },
  { name: "details", label: "Detailed explanation", type: "textarea", rows: 8, required: true },
  { name: "inputs", label: "Inputs (one per line)", type: "textarea", rows: 3 },
  { name: "outputs", label: "Outputs (one per line)", type: "textarea", rows: 3 },
  { name: "tools", label: "Tools (one per line)", type: "textarea", rows: 3 },
  { name: "bestPractices", label: "Best practices (one per line)", type: "textarea", rows: 4 },
  { name: "order", label: "Step order (1–100, unique)", type: "number", required: true, default: 1 },
  { name: "icon", label: "Icon name", type: "text", default: "circle", placeholder: "e.g. target, database, gauge" },
];

export default function AdminWorkflowPage() {
  return (
    <CrudManager
      apiPath="/api/admin/workflow-steps"
      title="Workflow Steps"
      description="Edit the ten-step AI workflow. Order must be unique — the slider sorts by it."
      fields={fields}
      displayName={(row) => `Step ${String(row.order ?? "?")} — ${String(row.title ?? "Untitled")}`}
    />
  );
}