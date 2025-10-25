import type { Dispatch, SetStateAction } from "react";
import type { ProjectItem } from "../ProjectItem";

export interface ProjectCardWrapperProps {
  projects: ProjectItem[];
  bulkMode: boolean;
  handleRecover: (id: any) => void;
  handleDelete: (id: any) => void;
  toggleSelect: (id: any) => void;
  selectedIds: number[];
  setOnReload: Dispatch<SetStateAction<number>>;
}
