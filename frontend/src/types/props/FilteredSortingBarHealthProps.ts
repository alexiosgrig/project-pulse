import type { Dispatch, SetStateAction } from "react";

export interface FilteredSortingBarHealthProps {
  menuItemList: any[];
  healthFilter: string;
  setHealthFilter: Dispatch<SetStateAction<string>>;
}
