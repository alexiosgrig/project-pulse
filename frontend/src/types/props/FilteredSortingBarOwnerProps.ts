import type { Dispatch, SetStateAction } from "react";
import type { ProjectItem } from "../ProjectItem";

export interface FilteredSortingBarOwnerProps {
  ownerFilter: string;
  setOwnerFilter: Dispatch<SetStateAction<string>>;
  projects: ProjectItem[];
}
