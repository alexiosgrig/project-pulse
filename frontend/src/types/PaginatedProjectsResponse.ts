import type { ProjectItem } from "./ProjectItem";

export interface PaginatedProjectsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: ProjectItem[];
}