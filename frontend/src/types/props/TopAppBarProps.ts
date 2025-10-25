import type { Dispatch, SetStateAction } from "react";

export interface TopAppBarProps {
  setOpenAddDialog: Dispatch<SetStateAction<boolean>>;
  loading: boolean;
  setOnReload: Dispatch<SetStateAction<number>>;
}
