import type { Dispatch, SetStateAction } from "react";
import type { ProjectItem } from "../ProjectItem";

export interface FilteredSortingBarTagProps {
  tagFilter: string;
  setTagFilter: Dispatch<SetStateAction<string>>;
  projects: ProjectItem[];
}
