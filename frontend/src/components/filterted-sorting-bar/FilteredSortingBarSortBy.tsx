import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";
import type { FilteredSortingBarSortByProps } from "../../types/props/FilteredSortingBarSortByProps";

export const FilteredSortingBarSortBy: React.FC<
  FilteredSortingBarSortByProps
> = ({ sortBy, setSortBy, menuItemList }) => {
  return (
    <FormControl sx={{ minWidth: 150 }}>
      <InputLabel>Sort By</InputLabel>
      <Select
        value={sortBy}
        label="Sort By"
        onChange={(e) => setSortBy(e.target.value as any)}
      >
        {menuItemList.map((menuItem) => (
          <MenuItem key={menuItem.value} value={menuItem.value}>
            {menuItem.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
