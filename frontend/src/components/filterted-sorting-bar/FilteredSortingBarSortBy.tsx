import { FormControl, InputLabel, MenuItem, Select, type SelectChangeEvent } from "@mui/material";
import React, { memo, useCallback } from "react";
import type { FilteredSortingBarSortByProps } from "../../types/props/FilteredSortingBarSortByProps";

export const FilteredSortingBarSortBy: React.FC<
  FilteredSortingBarSortByProps
> = memo(({ sortBy, setSortBy, menuItemList }) => {

   const handleChange = useCallback(
    (event: SelectChangeEvent<string>) => {
      setSortBy(event.target.value);
    },
    [setSortBy],
  );
  
  return (
    <FormControl sx={{ minWidth: 150 }}>
      <InputLabel>Sort By</InputLabel>
      <Select
        value={sortBy}
        label="Sort By"
        onChange={handleChange}
      >
        {menuItemList.map((menuItem) => (
          <MenuItem key={menuItem.value} value={menuItem.value}>
            {menuItem.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
});
