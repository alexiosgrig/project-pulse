// ProjectList.tsx (Dashboard)
import { useCallback, useEffect, useMemo, useState } from "react";
import { Box, CircularProgress, Stack } from "@mui/material";
import type { ProjectItem } from "../types/ProjectItem";
import { Paginator } from "./pagination/Paginator";
import { TopAppBar } from "./top-app-bar/TopAppBar";
import { ProjectCardWrapper } from "./project-card-wrapper/ProjectCardWrapper";
import { FilteredSortingBar } from "./filterted-sorting-bar/FilteredSortingBar";
import { AddProjectDialog } from "./add-project-dialog/AddProjectDialog";
import { fetchProjectsByPage } from "../api/projectService";
import type { FetchProjectsParams } from "../types/FetchProjectsParams";
import { SearchComponent } from "./search-component/SearchComponent";

export const Dashboard = () => {
  const [projects, setProjects] = useState<ProjectItem[]>([{} as ProjectItem]);
  const [projectsCount, setProjectsCount] = useState(0);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [loading, setLoading] = useState(true); // loader state
  const [onReload, setOnReload] = useState(0);
  // Filters
  const [ownerFilter, setOwnerFilter] = useState("");
  const [healthFilter, setHealthFilter] = useState("");
  const [tagFilter, setTagFilter] = useState("");
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  // Sorting
  const [sortBy, setSortBy] = useState<string | undefined>(undefined);
  const [sortOrder, setSortOrder] = useState("asc");

  const params = useMemo<FetchProjectsParams>(
    () => ({
      page: currentPage || 1,
      owner: ownerFilter === "all" ? undefined : ownerFilter || undefined,
      health: healthFilter === "all" ? undefined : healthFilter || undefined,
      tag: tagFilter === "all" ? undefined : tagFilter || undefined,
      order: sortBy,
      dir: sortOrder,
    }),
    [currentPage, ownerFilter, healthFilter, tagFilter, sortBy, sortOrder]
  );

  // Pagination
  const totalPages = Math.ceil(projectsCount / pageSize);

  const fetchProjects = useCallback(async (params: FetchProjectsParams) => {
    setLoading(true);
    try {
      const data = await fetchProjectsByPage(params);
      setProjects(data?.results);
      setProjectsCount(data?.count);
    } catch (err) {
      console.error("Failed to fetch projects:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    console.log(onReload);
    fetchProjects(params);
  }, [
    currentPage,
    ownerFilter,
    healthFilter,
    tagFilter,
    sortOrder,
    sortBy,
    onReload,
    fetchProjects,
    params,
  ]);

  return (
    <Box sx={{ p: 2 }}>
      {/* Top Bar */}
      <TopAppBar
        setOpenAddDialog={setOpenAddDialog}
        loading={loading}
        setOnReload={setOnReload}
      />
      <SearchComponent setProjects={setProjects} />
      {/* Filters + Sorting */}
      <FilteredSortingBar
        ownerFilter={ownerFilter}
        setOwnerFilter={setOwnerFilter}
        projects={projects}
        healthFilter={healthFilter}
        setHealthFilter={setHealthFilter}
        tagFilter={tagFilter}
        setTagFilter={setTagFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
        setSortOrder={setSortOrder}
        sortOrder={sortOrder}
      />

      {/* Loader */}
      {loading ? (
        <Stack
          sx={{ mt: 4 }}
          alignItems="center"
          justifyContent="center"
          spacing={2}
        >
          <CircularProgress />
        </Stack>
      ) : (
        <>
          {/* Card Grid */}
          <ProjectCardWrapper
            projects={projects}
            setOnReload={setOnReload}
          />
          {/* Pagination */}
          <Paginator
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
          {/* Bulk mode indicator */}
        </>
      )}
      <AddProjectDialog
        open={openAddDialog}
        onClose={() => setOpenAddDialog(false)}
      />
    </Box>
  );
};
