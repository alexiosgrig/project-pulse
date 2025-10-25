import React, { memo, useCallback } from "react";
import { Button, Stack } from "@mui/material";
import type { FilteredSortingBarProps } from "../../types/props/FilteredSortingBarProps";
import { FilteredSortingBarSortBy } from "./FilteredSortingBarSortBy";
import { sortByMenuItemList } from "../../constants/sortByMenuItemList";
import { FilteredSortingBarTag } from "./FilteredSortingBarTag";
import { FilteredSortingBarHealth } from "./FilteredSortingBarHealth";
import { healthMenuItemList } from "../../constants/healthMenuItemList";
import { FilteredSortingBarOwner } from "./FilteredSortingBarOwner";
import { SortOrderEnum } from "../../enums/SortOrderEnum";

export const FilteredSortingBar: React.FC<FilteredSortingBarProps> = memo(
  ({
    ownerFilter,
    setOwnerFilter,
    projects,
    healthFilter,
    setHealthFilter,
    tagFilter,
    setTagFilter,
    sortBy,
    setSortBy,
    setSortOrder,
    sortOrder,
  }) => {
    // ✅ Stable callback for toggling sort order
    const handleSortOrderToggle = useCallback(() => {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    }, [setSortOrder]);

    return (
      <Stack direction="row" spacing={2} sx={{ mb: 2 }} alignItems="center">
        <FilteredSortingBarOwner
          ownerFilter={ownerFilter}
          setOwnerFilter={setOwnerFilter}
          projects={projects}
        />
        <FilteredSortingBarHealth
          menuItemList={healthMenuItemList}
          healthFilter={healthFilter}
          setHealthFilter={setHealthFilter}
        />
        <FilteredSortingBarTag
          tagFilter={tagFilter}
          setTagFilter={setTagFilter}
          projects={projects}
        />
        <FilteredSortingBarSortBy
          setSortBy={setSortBy}
          sortBy={sortBy}
          menuItemList={sortByMenuItemList}
        />

        <Button variant="outlined" onClick={handleSortOrderToggle}>
          Order:{" "}
          {sortOrder === "asc" ? SortOrderEnum.asc : SortOrderEnum.desc}
        </Button>
      </Stack>
    );
  },
);
