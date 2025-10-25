import type { Dispatch, SetStateAction } from "react";

export interface TeamMember {
  role: string;
  capacity: number; // full-time equivalent
}

export interface PaginatorProps {
  totalPages: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  currentPage: number;
  fetchProjects: (value: number) => void;
}
