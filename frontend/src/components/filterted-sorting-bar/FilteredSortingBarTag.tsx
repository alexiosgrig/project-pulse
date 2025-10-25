import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { memo } from "react";
import type { FilteredSortingBarTagProps } from "../../types/props/FilteredSortingBarTagProps";

export const FilteredSortingBarTag: React.FC<FilteredSortingBarTagProps> = memo(({
  tagFilter,
  setTagFilter,
  projects,
}) => {
  return (
    <FormControl sx={{ minWidth: 120 }}>
      <InputLabel>Tag</InputLabel>
      <Select
        value={tagFilter}
        label="Tag"
        onChange={(e) => setTagFilter(e.target.value)}
      >
        <MenuItem value="">All</MenuItem>
        {[...new Set(projects.flatMap((p) => p.tags))].map((tag) => (
          <MenuItem key={tag} value={tag}>
            {tag}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
});
