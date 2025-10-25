import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import type { FilteredSortingBarOwnerProps } from "../../types/props/FilteredSortingBarOwnerProps";
import { memo } from "react";

export const FilteredSortingBarOwner: React.FC<
  FilteredSortingBarOwnerProps
> = memo(({ ownerFilter, setOwnerFilter, projects }) => {
  return (
    <FormControl sx={{ minWidth: 120 }}>
      <InputLabel>Owner</InputLabel>
      <Select
        value={ownerFilter}
        label="Owner"
        onChange={(e) => setOwnerFilter(e.target.value)}
      >
        <MenuItem value="">All</MenuItem>
        {[...new Set(projects.map((p) => p.owner))].map((owner) => (
          <MenuItem key={owner} value={owner}>
            {owner}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
});
