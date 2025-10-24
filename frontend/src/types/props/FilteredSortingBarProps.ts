import type { Dispatch, SetStateAction } from "react";
import type { ProjectItem } from "../ProjectItem";

export interface FilteredSortingBarProps {
  ownerFilter: string;
  setOwnerFilter: Dispatch<SetStateAction<string>>;
  projects: ProjectItem[];
  healthFilter: string;
  setHealthFilter: Dispatch<SetStateAction<string>>;
  tagFilter: string;
  setTagFilter: Dispatch<SetStateAction<string>>;
  sortBy: string;
  setSortBy: Dispatch<SetStateAction<string>>;
  setSortOrder: Dispatch<SetStateAction<string>>;
  sortOrder: string;
}
