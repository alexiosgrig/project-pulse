import type { Dispatch, SetStateAction } from "react";
import type { MenuItem } from "../MenuItem";

export interface FilteredSortingBarHealthProps {
  menuItemList: MenuItem[];
  healthFilter: string;
  setHealthFilter: Dispatch<SetStateAction<string>>;
}
