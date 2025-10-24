// ProjectCard.jsx
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Chip,
  LinearProgress,
  IconButton,
  Stack,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import type { ProjectCardProps } from "../types/props/ProjectCardPros";
import { ProjectCardDetailsDialog } from "./project-card-details/ProjectCardDetailsDialog";
import { ProjectHealthEnum } from "../enums/ProjectHealthEnum";

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Card
        sx={{
          maxWidth: 360,
          borderRadius: 3,
          boxShadow: 3,
          p: 1,
          "&:hover": { boxShadow: 6 },
        }}
      >
        <CardHeader
          title={project.title}
          subheader={`Owner: ${project.owner}`}
          action={
            <IconButton onClick={() => setOpen(true)}>
              <InfoOutlinedIcon />
            </IconButton>
          }
        />
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

          <Stack direction="row" spacing={1} flexWrap="wrap">
            {project?.tags.map((tag) => (
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
      </Card>

      {/* Dialog for details */}
      <ProjectCardDetailsDialog
        open={open}
        setOpen={setOpen}
        project={project}
      />
    </>
  );
};
