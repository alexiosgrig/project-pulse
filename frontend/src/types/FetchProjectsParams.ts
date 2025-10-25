export interface FetchProjectsParams {
  page: number;
  order?: string;
  sortOrder?: "asc" | "desc";
  owner?: string;
  health?: string;
  tag?: string;
  dir?: string;
}
