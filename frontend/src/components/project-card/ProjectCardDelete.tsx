import { Box, Button } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import type { ProjectCardDeleteProps } from "../../types/props/ProjectCardDeleteProps";
import { deleteProject } from "../../api/projectService";

export const ProjectCardDelete: React.FC<ProjectCardDeleteProps> = ({
  project,
  setOnReload,
}) => {
  const handleDelete = () => {
    deleteProject(project.id);
    setOnReload((prev) => prev + 1);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        px: 2,
        pb: 2,
      }}
    >
      <Button
        variant="outlined"
        color="error"
        size="small"
        startIcon={<DeleteOutlineIcon />}
        onClick={handleDelete}
      >
        Delete
      </Button>
    </Box>
  );
};
