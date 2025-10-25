import React, { memo, useCallback } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  DialogActions,
  Button,
} from "@mui/material";
import type { ProjectCardDetailsDialogProps } from "../../types/props/ProjectCardDetailsDialogProps";
import { ProjectCardDetailsDialogRecentActivities } from "./ProjectCardDetailsDialogRecentActivities";
import { ProjectCardDetailsDialogTeamRoster } from "./ProjectCardDetailsDialogTeamRoster";
import { ProjectCardDetailsDialogMilestones } from "./ProjectCardDetailsDialogMilestones";

export const ProjectCardDetailsDialog: React.FC<ProjectCardDetailsDialogProps> =
  memo(({ project, setOpen, open }) => {
    // Stable callback for closing the dialog
    const handleClose = useCallback(() => setOpen(false), [setOpen]);

    return (
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{project.title} Summary</DialogTitle>
        <DialogContent dividers>
          {/* Summary */}
          <Typography variant="body1" sx={{ mb: 2 }}>
            {project.summary}
          </Typography>
          {/* Milestone Progress */}
          <ProjectCardDetailsDialogMilestones project={project} />
          {/* Team Roster */}
          <ProjectCardDetailsDialogTeamRoster project={project} />
          {/* Recent Activities */}
          <ProjectCardDetailsDialogRecentActivities project={project} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    );
  });
