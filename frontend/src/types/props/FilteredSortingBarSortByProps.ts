import type { Dispatch, SetStateAction } from "react";

type MenuItem = {
  label: string;
  value: string;
};

export interface FilteredSortingBarSortByProps {
  sortBy: string;
  setSortBy: Dispatch<SetStateAction<string>>;
  menuItemList: MenuItem[];
}
