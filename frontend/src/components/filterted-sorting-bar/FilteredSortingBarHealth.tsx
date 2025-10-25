import React, { memo, useCallback } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent,
} from "@mui/material";
import type { FilteredSortingBarHealthProps } from "../../types/props/FilteredSortingBarHealthProps";

export const FilteredSortingBarHealth: React.FC<FilteredSortingBarHealthProps> =
  memo(({ menuItemList, healthFilter, setHealthFilter }) => {
    // Stable handler to avoid recreating the function on every render
    const handleChange = useCallback(
      (event: SelectChangeEvent<string>) => {
        setHealthFilter(event.target.value);
      },
      [setHealthFilter]
    );

    return (
      <FormControl sx={{ minWidth: 120 }}>
        <InputLabel>Health</InputLabel>
        <Select value={healthFilter} label="Health" onChange={handleChange}>
          {menuItemList.map((menuItem) => (
            <MenuItem key={menuItem.value} value={menuItem.value}>
              {menuItem.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  });
