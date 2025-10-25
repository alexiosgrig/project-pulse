import type { Dispatch, SetStateAction } from "react";
import type { ProjectItem } from "../ProjectItem";

export interface ProjectCardWrapperProps {
  projects: ProjectItem[];
  setOnReload: Dispatch<SetStateAction<number>>;
}
