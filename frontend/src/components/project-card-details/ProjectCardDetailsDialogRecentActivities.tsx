import { Box, Typography } from "@mui/material";
import React from "react";
import type { ProjectCardDetailsDialogChildProps } from "../../types/props/ProjectCardDetailsDialogChildProps";

export const ProjectCardDetailsDialogRecentActivities: React.FC<
  ProjectCardDetailsDialogChildProps
> = ({ project }) => {
  return (
    <>
      {project.recentActivities?.length > 0 && (
        <>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            Recent Activities:
          </Typography>
          <Box>
            {project.recentActivities.map((activity, idx) => (
              <Typography key={idx} variant="body2">
                • {activity}
              </Typography>
            ))}
          </Box>
        </>
      )}
    </>
  );
};
