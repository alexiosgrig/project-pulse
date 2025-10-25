import React, { memo } from "react";
import { Box, Typography } from "@mui/material";
import type { ProjectCardDetailsDialogChildProps } from "../../types/props/ProjectCardDetailsDialogChildProps";

export const ProjectCardDetailsDialogRecentActivities: React.FC<ProjectCardDetailsDialogChildProps> =
  memo(({ project }) => {
    const activities = project.recentActivities ?? [];

    if (activities.length === 0) return null;

    return (
      <>
        <Typography variant="subtitle1" sx={{ mb: 1 }}>
          Recent Activities:
        </Typography>

        <Box>
          {activities.map((activity, index) => (
            <Typography key={index} variant="body2">
              • {activity}
            </Typography>
          ))}
        </Box>
      </>
    );
  });
