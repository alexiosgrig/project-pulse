import React, { useState, memo, useCallback, useMemo } from "react";
import { Card, CardHeader, IconButton, Tooltip, Box } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { ProjectCardDetailsDialog } from "../project-card-details/ProjectCardDetailsDialog";
import type { ProjectCardProps } from "../../types/props/ProjectCardPros";
import { ProjectCardDelete } from "./ProjectCardDelete";
import { ProjectCardContent } from "./ProjectCardContent";

export const ProjectCard: React.FC<ProjectCardProps> = memo(
  ({ project, setOnReload }) => {
    const [open, setOpen] = useState(false);

    // Memoize handler to avoid recreating it every render
    const handleOpen = useCallback(() => setOpen(true), []);

    const cardSx = {
      maxWidth: 360,
      borderRadius: 3,
      boxShadow: 3,
      p: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      opacity: 1,
      "&:hover": { boxShadow: 6 },
      transition: "0.3s ease",
    };

    return (
      <>
        <Card sx={cardSx}>
          <Box>
            <CardHeader
              title={project.title}
              subheader={`Owner: ${project.owner}`}
              action={
                <Tooltip title="Details">
                  <IconButton onClick={handleOpen}>
                    <InfoOutlinedIcon />
                  </IconButton>
                </Tooltip>
              }
            />
          </Box>
          <ProjectCardContent project={project} />
        {/* Bottom-right delete/recover button */}
        <ProjectCardDelete project={project} setOnReload={setOnReload}/>
        </Card>

      {/* Details Dialog */}
        <ProjectCardDetailsDialog
          open={open}
          setOpen={setOpen}
          project={project}
        />
      </>
    );
  }
);
