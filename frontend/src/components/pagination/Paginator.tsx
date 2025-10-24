import { Pagination, Stack } from "@mui/material";
import React from "react";
import type { PaginatorProps } from "../../types/props/PaginatorProps";

export const Paginator: React.FC<PaginatorProps> = ({
  totalPages,
  setPage,
  page,
}) => {
  return (
    <>
      {totalPages > 1 && (
        <Stack alignItems="center" sx={{ mt: 3 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(e, value) => setPage(value)}
            color="primary"
          />
        </Stack>
      )}
    </>
  );
};
