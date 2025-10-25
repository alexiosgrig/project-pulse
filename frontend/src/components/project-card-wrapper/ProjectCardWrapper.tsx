import React from "react";
import { ProjectCard } from "../project-card/ProjectCard";
import type { ProjectCardWrapperProps } from "../../types/props/ProjectCardWrapperProps";
import { Grid } from "@mui/material";

export const ProjectCardWrapper: React.FC<ProjectCardWrapperProps> = ({
  projects,
  bulkMode,
  toggleSelect,
  selectedIds,
  setOnReload
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
          setOnReload={setOnReload}
        />
      ))}
    </Grid>
  );
};
