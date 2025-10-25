import type { Dispatch, SetStateAction } from "react";
import type { ProjectItem } from "../ProjectItem";

export interface ProjectCardDeleteProps {
  project: ProjectItem;
  setOnReload: Dispatch<SetStateAction<number>>;
}
