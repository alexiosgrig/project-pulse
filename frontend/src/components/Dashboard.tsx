// ProjectList.tsx (Dashboard)
import { useCallback, useEffect, useState } from "react";
import { Box, CircularProgress, Stack } from "@mui/material";
import type { ProjectItem } from "../types/ProjectItem";
import { Paginator } from "./pagination/Paginator";
import { TopAppBar } from "./top-app-bar/TopAppBar";
import { ProjectCardWrapper } from "./project-card-wrapper/ProjectCardWrapper";
import { useFilteredProjects } from "../hooks/useFilteredProjects";
import { FilteredSortingBar } from "./filterted-sorting-bar/FilteredSortingBar";
import { BulkModeIndicator } from "./bulk-mode-indicator/BulkModeIndicator";
import { AddProjectDialog } from "./add-project-dialog/AddProjectDialog";
import { fetchProjectsByPage } from "../api/projectService";

export const Dashboard = () => {
  const [projects, setProjects] = useState<ProjectItem[]>([{} as ProjectItem]);
  const [projectsCount, setProjectsCount] = useState(0);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [bulkMode, setBulkMode] = useState(false);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [loading, setLoading] = useState(true); // loader state

  // Filters
  const [ownerFilter, setOwnerFilter] = useState("");
  const [healthFilter, setHealthFilter] = useState("");
  const [tagFilter, setTagFilter] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Sorting
  const [sortBy, setSortBy] = useState("title");
  const [sortOrder, setSortOrder] = useState("asc");

  // Toggle selection for bulk actions
  const toggleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  // Soft delete
  const handleDelete = (id: number) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, deleted: true } : p))
    );
    setSelectedIds((prev) => prev.filter((pid) => pid !== id));
  };

  // Recover soft-deleted project
  const handleRecover = (id: number) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, deleted: false } : p))
    );
  };

  const handleBulkDelete = () => {
    setProjects((prev) =>
      prev.map((p) =>
        selectedIds.includes(p.id) ? { ...p, deleted: true } : p
      )
    );
    setSelectedIds([]);
    setBulkMode(false);
  };

  // Apply filters + sorting
  const filteredProjects = useFilteredProjects({
    projects,
    ownerFilter,
    healthFilter,
    tagFilter,
    sortBy,
    sortOrder,
  });

  // Pagination
  const totalPages = Math.ceil(projectsCount / pageSize);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchProjectsByPage(currentPage);
      setProjects(data?.results);
      setProjectsCount(data?.count);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error("Failed to fetch projects:", err);
    } finally {
      setLoading(false);
    }
  }, [currentPage]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return (
    <Box sx={{ p: 2 }}>
      {/* Top Bar */}
      <TopAppBar
        bulkMode={bulkMode}
        setBulkMode={setBulkMode}
        handleBulkDelete={handleBulkDelete}
        selectedIds={selectedIds}
        setOpenAddDialog={setOpenAddDialog}
        loadProjects={fetchProjects}
        loading={loading}
      />

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
            handleDelete={handleDelete}
            handleRecover={handleRecover}
            toggleSelect={toggleSelect}
            bulkMode={bulkMode}
            selectedIds={selectedIds}
          />
          {/* Pagination */}
          <Paginator
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            fetchProjects={fetchProjects}
          />
          {/* Bulk mode indicator */}
          <BulkModeIndicator bulkMode={bulkMode} selectedIds={selectedIds} />
        </>
      )}
      <AddProjectDialog
        open={openAddDialog}
        onClose={() => setOpenAddDialog(false)}
      />
    </Box>
  );
};
