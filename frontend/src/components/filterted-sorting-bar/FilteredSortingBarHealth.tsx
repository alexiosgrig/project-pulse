import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";
import type { FilteredSortingBarHealthProps } from "../../types/props/FilteredSortingBarHealthProps";

export const FilteredSortingBarHealth: React.FC<
  FilteredSortingBarHealthProps
> = ({ menuItemList, healthFilter, setHealthFilter }) => {
  return (
    <FormControl sx={{ minWidth: 120 }}>
      <InputLabel>Health</InputLabel>
      <Select
        value={healthFilter}
        label="Health"
        onChange={(e) => setHealthFilter(e.target.value)}
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
