// ProjectList.tsx (Dashboard)
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import type { ProjectItem } from "../types/ProjectItem";
import { Paginator } from "./pagination/Paginator";
import { TopAppBar } from "./top-app-bar/TopAppBar";
import { ProjectCardWrapper } from "./project-card-wrapper/ProjectCardWrapper";
import { useFilteredProjects } from "../hooks/useFilteredProjects";
import { FilteredSortingBar } from "./filterted-sorting-bar/FilteredSortingBar";
import { BulkModeIndicator } from "./bulk-mode-indicator/BulkModeIndicator";
import { AddProjectDialog } from "./add-project-dialog/AddProjectDialog";
import { fetchProjects } from "../api/projectService";

export const Dashboard = () => {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [bulkMode, setBulkMode] = useState(false);
  const [openAddDialog, setOpenAddDialog] = useState(false);

  // Filters
  const [ownerFilter, setOwnerFilter] = useState("");
  const [healthFilter, setHealthFilter] = useState("");
  const [tagFilter, setTagFilter] = useState("");

  // Pagination
  const [page, setPage] = useState(1);
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

  // Bulk soft delete
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
  const totalPages = Math.ceil(filteredProjects.length / pageSize);
  const paginatedProjects = filteredProjects.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <Box sx={{ p: 2 }}>
      {/* Top Bar */}
      <TopAppBar
        bulkMode={bulkMode}
        setBulkMode={setBulkMode}
        handleBulkDelete={handleBulkDelete}
        selectedIds={selectedIds}
        setOpenAddDialog={setOpenAddDialog}
      />

      {/* Filters + Sorting */}
      <FilteredSortingBar
        ownerFilter={ownerFilter}
        setOwnerFilter={setOwnerFilter}
        projects={paginatedProjects}
        healthFilter={healthFilter}
        setHealthFilter={setHealthFilter}
        tagFilter={tagFilter}
        setTagFilter={setTagFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
        setSortOrder={setSortOrder}
        sortOrder={sortOrder}
      />

      {/* Card Grid */}
      <ProjectCardWrapper
        projects={paginatedProjects}
        handleDelete={handleDelete}
        handleRecover={handleRecover}
        toggleSelect={toggleSelect}
        bulkMode={bulkMode}
        selectedIds={selectedIds}
      />
      {/* Pagination */}
      <Paginator page={page} setPage={setPage} totalPages={totalPages} />
      {/* Bulk mode indicator */}
      <BulkModeIndicator bulkMode={bulkMode} selectedIds={selectedIds} />
      <AddProjectDialog
        open={openAddDialog}
        onClose={() => setOpenAddDialog(false)}
        onAdd={(newProject) => setProjects((prev) => [...prev, newProject])}
      />
    </Box>
  );
};
