import { Paper, Typography } from "@mui/material";
import React from "react";
import type { BulkModeIndicatorProps } from "../../types/props/BulkModeIndicatorProps";

export const BulkModeIndicator: React.FC<BulkModeIndicatorProps> = ({
  bulkMode,
  selectedIds,
}) => {
  return (
    <>
      {bulkMode && selectedIds.length > 0 && (
        <Paper
          elevation={3}
          sx={{
            position: "fixed",
            bottom: 20,
            left: "50%",
            transform: "translateX(-50%)",
            p: 2,
            borderRadius: 3,
            minWidth: 300,
            textAlign: "center",
          }}
        >
          <Typography variant="body1">
            {selectedIds.length} project(s) selected
          </Typography>
        </Paper>
      )}
    </>
  );
};
