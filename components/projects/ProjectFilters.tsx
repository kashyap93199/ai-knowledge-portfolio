"use client";

import { useState } from "react";
import type { Project } from "@/types";
import { ProjectCard } from "./ProjectCard";
import { FilterTabs } from "@/components/ui/FilterTabs";
import { EmptyState } from "@/components/ui/Feedback";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

export function ProjectFilters({ projects }: { projects: Project[] }) {
  const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];
  const [active, setActive] = useState("All");
  const reduceMotion = useReducedMotion();

  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <div>
      <FilterTabs options={categories} active={active} onChange={setActive} label="Filter projects" />
      {filtered.length === 0 ? (
        <EmptyState title="No projects in this category" message="Try another filter." />
      ) : (
        <motion.div layout={reduceMotion ? false : true} className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                key={project.slug}
                layout
                initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduceMotion ? undefined : { opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25 }}
              >
                <ProjectCard project={project} className="h-full" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}