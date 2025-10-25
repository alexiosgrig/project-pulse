import type { Dispatch, SetStateAction } from "react";
import type { ProjectItem } from "../ProjectItem";

export interface SearchComponentProps {
  setProjects: Dispatch<SetStateAction<ProjectItem[]>>;
}
