import { LinearProgress, Typography } from "@mui/material";
import React from "react";
import type { ProjectCardDetailsDialogChildProps } from "../../types/props/ProjectCardDetailsDialogChildProps";

export const ProjectCardDetailsDialogMilestones: React.FC<
  ProjectCardDetailsDialogChildProps
> = ({ project }) => {
  return (
    <>
      <Typography variant="subtitle1" sx={{ mb: 1 }}>
        Milestone Progress: {project.milestones}%
      </Typography>
      <LinearProgress
        variant="determinate"
        value={project.milestones}
        sx={{ mb: 3, height: 8, borderRadius: 5 }}
      />
    </>
  );
};
