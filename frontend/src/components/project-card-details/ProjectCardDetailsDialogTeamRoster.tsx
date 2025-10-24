import { Box, Typography } from "@mui/material";
import React from "react";
import type { ProjectCardDetailsDialogChildProps } from "../../types/props/ProjectCardDetailsDialogChildProps";

export const ProjectCardDetailsDialogTeamRoster: React.FC<
  ProjectCardDetailsDialogChildProps
> = ({ project }) => {
  return (
    <>
        <Typography variant="subtitle1" sx={{ mb: 1 }}>
          Team Roster:
        </Typography>
        <Box sx={{ mb: 2 }}>
          {project.team.map((member, index) => (
            <Typography key={index} variant="body2">
              • {member.role} ({member.capacity} FTE)
            </Typography>
          ))}
        </Box>
    </>
  );
};
