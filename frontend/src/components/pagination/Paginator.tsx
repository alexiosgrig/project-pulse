import { Pagination, Stack } from "@mui/material";
import React from "react";
import type { PaginatorProps } from "../../types/props/PaginatorProps";

export const Paginator: React.FC<PaginatorProps> = ({
  totalPages,
  setCurrentPage,
  currentPage,
}) => {
  const onChange = (page: number) => {
    setCurrentPage(page);
  };
  return (
    <>
      <Stack alignItems="center" sx={{ mt: 3 }}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(e, value) => onChange(value)}
          color="primary"
        />
      </Stack>
    </>
  );
};
