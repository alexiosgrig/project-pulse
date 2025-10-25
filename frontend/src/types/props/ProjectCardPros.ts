import type { Dispatch, SetStateAction } from "react";
import type { ProjectItem } from "../ProjectItem";

export interface ProjectCardProps {
  project: ProjectItem;
  setOnReload: Dispatch<SetStateAction<number >>;
}
