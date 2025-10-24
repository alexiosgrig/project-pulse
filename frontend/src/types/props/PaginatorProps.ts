import type { Dispatch, SetStateAction } from "react";

export interface TeamMember {
  role: string;
  capacity: number; // full-time equivalent
}

export interface PaginatorProps {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  totalPages: number;
}