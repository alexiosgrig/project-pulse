import type { Dispatch, SetStateAction } from "react";
import type { ProjectItem } from "../ProjectItem";

export interface ProjectCardProps {
  project: ProjectItem;
  bulkMode: boolean;
  selected: boolean;
  onSelect: () => void;
  setOnReload: Dispatch<SetStateAction<number >>;
}
