// ProjectList.tsx (Dashboard)
import { useCallback, useEffect, useState } from "react";
import { Box, CircularProgress, Stack } from "@mui/material";
import type { ProjectItem } from "../types/ProjectItem";
import { Paginator } from "./pagination/Paginator";
import { TopAppBar } from "./top-app-bar/TopAppBar";
import { ProjectCardWrapper } from "./project-card-wrapper/ProjectCardWrapper";
import { FilteredSortingBar } from "./filterted-sorting-bar/FilteredSortingBar";
import { BulkModeIndicator } from "./bulk-mode-indicator/BulkModeIndicator";
import { AddProjectDialog } from "./add-project-dialog/AddProjectDialog";
import { fetchProjectsByPage } from "../api/projectService";
import type { FetchProjectsParams } from "../types/FetchProjectsParams";
import { SearchComponent } from "./search-component/SearchComponent";

export const Dashboard = () => {
  const [projects, setProjects] = useState<ProjectItem[]>([{} as ProjectItem]);
  const [projectsCount, setProjectsCount] = useState(0);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [bulkMode, setBulkMode] = useState(false);
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

  const params: FetchProjectsParams = {
    page: currentPage || 1,
    owner: ownerFilter === "all" ? undefined : ownerFilter || undefined,
    health: healthFilter === "all" ? undefined : healthFilter || undefined,
    tag: tagFilter === "all" ? undefined : tagFilter || undefined,
    order: sortBy,
    dir: sortOrder,
  };

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
  console.log(onReload, "onReload");

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
  ]);

  return (
    <Box sx={{ p: 2 }}>
      {/* Top Bar */}
      <TopAppBar
        bulkMode={bulkMode}
        setBulkMode={setBulkMode}
        handleBulkDelete={handleBulkDelete}
        selectedIds={selectedIds}
        setOpenAddDialog={setOpenAddDialog}
        loading={loading}
        setOnReload={setOnReload}
      />
      <SearchComponent setProjects={setProjects}/>
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
            setOnReload={setOnReload}
          />
          {/* Pagination */}
          <Paginator
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
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
