import type { ProjectItem } from "../ProjectItem";

export interface ProjectCardProps {
  project: ProjectItem;
  bulkMode: boolean;
  selected: boolean;
  onSelect: () => void;
  onDelete: () => void;
}
