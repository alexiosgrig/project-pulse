import { Button, Stack, Typography } from "@mui/material";
import type { TopAppBarProps } from "../../types/props/TopAppBarProps";

export const TopAppBar: React.FC<TopAppBarProps> = ({
  bulkMode,
  setBulkMode,
  handleBulkDelete,
  selectedIds,
  setOpenAddDialog,
  loading,
}) => {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ mb: 2 }}
    >
      <Typography variant="h5">Projects</Typography>
      <Stack direction="row" spacing={1}>
        <Button variant="contained" onClick={() => setOpenAddDialog(true)}>
          + Add Project
        </Button>
        {!bulkMode ? (
          <Button variant="outlined" onClick={() => setBulkMode(true)}>
            Enable Bulk Actions
          </Button>
        ) : (
          <>
            <Button
              variant="contained"
              color="error"
              onClick={handleBulkDelete}
              disabled={selectedIds.length === 0}
            >
              Delete Selected
            </Button>
            <Button variant="outlined" onClick={() => setBulkMode(false)}>
              Cancel
            </Button>
          </>
        )}
        <Button
          variant="contained"
          onClick={() => console.log('')}
          disabled={loading}
        >
          Reload
        </Button>
      </Stack>
    </Stack>
  );
};
