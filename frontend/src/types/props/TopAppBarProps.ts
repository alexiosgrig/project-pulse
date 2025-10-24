import type { Dispatch, SetStateAction } from "react";

export interface TopAppBarProps {
  bulkMode: boolean;
  setBulkMode: Dispatch<SetStateAction<boolean>>;
  setOpenAddDialog: Dispatch<SetStateAction<boolean>>;
  handleBulkDelete: any;
  selectedIds: number[];
  loadProjects: () => void;
  loading: boolean;
}
