import {
  CardContent,
  Typography,
  LinearProgress,
  Stack,
  Chip,
} from "@mui/material";
import { ProjectHealthEnum } from "../../enums/ProjectHealthEnum";
import type { ProjectCardContentProps } from "../../types/props/ProjectCardContentProps";

export const ProjectCardContent: React.FC<ProjectCardContentProps> = ({
  project,
}) => {
  return (
    <CardContent>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
        {project.description}
      </Typography>

      <Typography variant="body2" sx={{ mb: 1 }}>
        Progress: {project.progress}%
      </Typography>
      <LinearProgress
        variant="determinate"
        value={project.progress}
        sx={{ mb: 2, height: 8, borderRadius: 5 }}
      />

      <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 1 }}>
        {project.tags.map((tag) => (
          <Chip
            key={tag}
            label={tag}
            size="small"
            color="primary"
            variant="outlined"
          />
        ))}
      </Stack>

      <Typography
        variant="caption"
        color={
          project.health === ProjectHealthEnum.good
            ? "success.main"
            : project.health === ProjectHealthEnum.moderate
            ? "warning.main"
            : "error.main"
        }
        sx={{ display: "block", mt: 1 }}
      >
        Health: {project.health}
      </Typography>
    </CardContent>
  );
};
