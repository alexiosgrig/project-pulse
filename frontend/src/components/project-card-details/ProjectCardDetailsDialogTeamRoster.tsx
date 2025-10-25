import React, { memo } from "react";
import { Box, Typography } from "@mui/material";
import type { ProjectCardDetailsDialogChildProps } from "../../types/props/ProjectCardDetailsDialogChildProps";

export const ProjectCardDetailsDialogTeamRoster: React.FC<ProjectCardDetailsDialogChildProps> =
  memo(({ project }) => {
    const team = project.team ?? [];

    if (team.length === 0) return null;

    return (
      <>
        <Typography variant="subtitle1" sx={{ mb: 1 }}>
          Team Roster:
        </Typography>

        <Box sx={{ mb: 2 }}>
          {team.map((member, index) => (
            <Typography key={index} variant="body2">
              • {member.role} ({member.capacity} FTE)
            </Typography>
          ))}
        </Box>
      </>
    );
  });
