import React, { memo } from "react";
import { Grid } from "@mui/material";
import { ProjectCard } from "../project-card/ProjectCard";
import type { ProjectCardWrapperProps } from "../../types/props/ProjectCardWrapperProps";

export const ProjectCardWrapper: React.FC<ProjectCardWrapperProps> = memo(
  ({ projects, setOnReload }) => {
    return (
      <Grid container spacing={2}>
        {projects.map((project) => (
          <ProjectCard
            key={project.id} // ✅ use a unique, stable key
            project={project}
            setOnReload={setOnReload}
          />
        ))}
      </Grid>
    );
  },
);
