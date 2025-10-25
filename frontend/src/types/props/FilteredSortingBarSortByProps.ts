import type { Dispatch, SetStateAction } from "react";

type MenuItem = {
  label: string;
  value: string;
};

export interface FilteredSortingBarSortByProps {
  sortBy: string | undefined;
  setSortBy: Dispatch<SetStateAction<string | undefined>>;
  menuItemList: MenuItem[];
}
