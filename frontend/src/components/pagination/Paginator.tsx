import React, { memo, useCallback } from "react";
import { Pagination, Stack } from "@mui/material";
import type { PaginatorProps } from "../../types/props/PaginatorProps";

export const Paginator: React.FC<PaginatorProps> = memo(
  ({ totalPages, setCurrentPage, currentPage }) => {
    // ✅ Stable callback — prevents re-creating function each render
    const handleChange = useCallback(
      (_: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
      },
      [setCurrentPage]
    );

    return (
      <Stack alignItems="center" sx={{ mt: 3 }}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handleChange}
          color="primary"
        />
      </Stack>
    );
  }
);
