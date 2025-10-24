import { useMemo } from "react";
import type { ProjectItem } from "../types/ProjectItem";

interface UseFilteredProjectsProps {
  projects: ProjectItem[];
  ownerFilter: string;
  healthFilter: string;
  tagFilter: string;
  sortBy: string;
  sortOrder: string;
}

export const useFilteredProjects = ({
  projects,
  ownerFilter,
  healthFilter,
  tagFilter,
  sortBy,
  sortOrder,
}: UseFilteredProjectsProps) => {
  const filteredProjects = useMemo(() => {
    const filtered = projects
      .filter((p) => !p.deleted)
      .filter((p) => (ownerFilter ? p.owner === ownerFilter : true))
      .filter((p) => (healthFilter ? p.health === healthFilter : true))
      .filter((p) => (tagFilter ? p.tags.includes(tagFilter) : true));

    return filtered.sort((a, b) => {
      let aValue: any;
      let bValue: any;

      switch (sortBy) {
        case "title":
          aValue = a.title.toLowerCase();
          bValue = b.title.toLowerCase();
          break;
        case "owner":
          aValue = a.owner.toLowerCase();
          bValue = b.owner.toLowerCase();
          break;
        case "progress":
          aValue = a.progress;
          bValue = b.progress;
          break;
        case "health":
          const healthOrder = { Good: 1, Moderate: 2, Critical: 3 };
          aValue = healthOrder[a.health] ?? 0;
          bValue = healthOrder[b.health] ?? 0;
          break;
        default:
          aValue = 0;
          bValue = 0;
      }

      if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
      if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  }, [projects, ownerFilter, healthFilter, tagFilter, sortBy, sortOrder]);

  return filteredProjects;
};
