import React, { memo, useMemo } from "react";
import {
  CardContent,
  Typography,
  LinearProgress,
  Stack,
  Chip,
} from "@mui/material";
import { ProjectHealthEnum } from "../../enums/ProjectHealthEnum";
import type { ProjectCardContentProps } from "../../types/props/ProjectCardContentProps";

export const ProjectCardContent: React.FC<ProjectCardContentProps> = memo(
  ({ project }) => {
    const healthColor = useMemo(() => {
      switch (project.health) {
        case ProjectHealthEnum.good:
          return "success.main";
        case ProjectHealthEnum.moderate:
          return "warning.main";
        default:
          return "error.main";
      }
    }, [project.health]);

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
              key={`${project.id}-${tag}`}
              label={tag}
              size="small"
              color="primary"
              variant="outlined"
            />
          ))}
        </Stack>

        <Typography
          variant="caption"
          color={healthColor}
          sx={{ display: "block", mt: 1 }}
        >
          Health: {project.health}
        </Typography>
      </CardContent>
    );
  }
);
