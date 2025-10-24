import React from "react";
import { ProjectCard } from "../ProjectCard";
import type { ProjectCardWrapperProps } from "../../types/props/ProjectCardWrapperProps";
import { Grid } from "@mui/material";

export const ProjectCardWrapper: React.FC<ProjectCardWrapperProps> = ({
  projects,
  bulkMode,
  handleRecover,
  handleDelete,
  toggleSelect,
  selectedIds,
}) => {
  return (
    <Grid container spacing={2}>
      {projects.map((project, index) => (
        <ProjectCard
          key={index}
          project={project}
          bulkMode={bulkMode}
          selected={selectedIds.includes(project.id)}
          onSelect={() => toggleSelect(project.id)}
          onDelete={() =>
            project.deleted
              ? handleRecover(project.id)
              : handleDelete(project.id)
          }
        />
      ))}
    </Grid>
  );
};
