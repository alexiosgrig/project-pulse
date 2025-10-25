import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
  MenuItem,
  Box,
  Chip,
  IconButton,
  Typography,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import type { ProjectItem, TeamMember } from "../../types/ProjectItem";
import type { AddProjectDialogProps } from "../../types/props/AddProjectDialogProps";
import { addProject } from "../../api/projectService";

export const AddProjectDialog: React.FC<AddProjectDialogProps> = ({
  open,
  onClose,
}) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    summary: "",
    owner: "",
    progress: 0,
    milestones: 0,
    team: [{ role: "Project Manager", capacity: 1 }],
    tags: [] as string[],
    health: "Good" as "Good" | "Moderate" | "Critical",
    recentActivities: [] as string[],
    deleted: false,
    version: 1,
  });

  // --- Team Handlers ---
  const handleTeamChange = (
    index: number,
    key: keyof TeamMember,
    value: any
  ) => {
    const newTeam = [...form.team];
    newTeam[index][key] = value;
    setForm({ ...form, team: newTeam });
  };

  const handleAddTeamMember = () => {
    setForm({ ...form, team: [...form.team, { role: "", capacity: 1 }] });
  };

  const handleRemoveTeamMember = (index: number) => {
    const newTeam = form.team.filter((_, i) => i !== index);
    setForm({ ...form, team: newTeam });
  };

  // --- Tags Handlers ---
  const handleAddTag = (tag: string) => {
    if (tag && !form.tags.includes(tag)) {
      setForm({ ...form, tags: [...form.tags, tag] });
    }
  };

  const handleRemoveTag = (tag: string) => {
    setForm({ ...form, tags: form.tags.filter((t) => t !== tag) });
  };

  // --- Generic field change ---
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : name === "progress" || name === "milestones" || name === "version"
          ? +value
          : value,
    }));
  };

  const handleSubmit = async () => {
    const newProject: ProjectItem = {
      title: form.title,
      description: form.description,
      summary: form.summary || `New project: ${form.title}`,
      owner: form.owner,
      lastUpdated: new Date().toISOString(),
      progress: form.progress,
      milestones: form.milestones,
      team: form.team,
      tags: form.tags.length ? form.tags : ["Manual"],
      health: form.health,
      recentActivities:
        form.recentActivities.length > 0
          ? form.recentActivities
          : [`Project ${form.title} created`],
      deleted: form.deleted,
      version: form.version,
    };

    try {
      await addProject(newProject);
    } catch (error) {
      console.log(error);
    }
    onClose();
    setForm({
      title: "",
      description: "",
      summary: "",
      owner: "",
      progress: 0,
      milestones: 0,
      team: [{ role: "Project Manager", capacity: 1 }],
      tags: [],
      health: "Good",
      recentActivities: [],
      deleted: false,
      version: 1,
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Add New Project</DialogTitle>
      <DialogContent dividers>
        <Stack spacing={2} sx={{ mt: 1 }}>
          {/* Basic Fields */}
          <TextField
            label="Title"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
          />
          <TextField
            label="Description"
            name="description"
            value={form.description}
            onChange={handleChange}
            multiline
          />
          <TextField
            label="Summary"
            name="summary"
            value={form.summary}
            onChange={handleChange}
            multiline
          />
          <TextField
            label="Owner"
            name="owner"
            value={form.owner}
            onChange={handleChange}
            required
          />

          {/* Progress / Milestones */}
          <TextField
            label="Progress (%)"
            name="progress"
            type="number"
            inputProps={{ min: 0, max: 100 }}
            value={form.progress}
            onChange={handleChange}
          />
          <TextField
            label="Milestones"
            name="milestones"
            type="number"
            inputProps={{ min: 0 }}
            value={form.milestones}
            onChange={handleChange}
          />

          {/* Health */}
          <TextField
            select
            label="Health"
            name="health"
            value={form.health}
            onChange={handleChange}
          >
            <MenuItem value="Good">Good</MenuItem>
            <MenuItem value="Moderate">Moderate</MenuItem>
            <MenuItem value="Critical">Critical</MenuItem>
          </TextField>

          {/* Tags */}
          <TextField
            label="Add Tag"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddTag((e.target as HTMLInputElement).value);
                (e.target as HTMLInputElement).value = "";
              }
            }}
          />
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {form.tags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                onDelete={() => handleRemoveTag(tag)}
              />
            ))}
          </Box>

          {/* Team Members */}
          <Typography variant="subtitle1">Team Members</Typography>
          {form.team.map((member, idx) => (
            <Box key={idx} sx={{ display: "flex", gap: 1, mb: 1 }}>
              <TextField
                label="Role"
                value={member.role}
                onChange={(e) => handleTeamChange(idx, "role", e.target.value)}
                fullWidth
              />
              <TextField
                label="Capacity"
                type="number"
                value={member.capacity}
                onChange={(e) =>
                  handleTeamChange(idx, "capacity", +e.target.value)
                }
                sx={{ width: 120 }}
              />
              <IconButton onClick={() => handleRemoveTeamMember(idx)}>
                <Delete />
              </IconButton>
            </Box>
          ))}
          <Button
            variant="outlined"
            startIcon={<Add />}
            onClick={handleAddTeamMember}
          >
            Add Member
          </Button>

          {/* Deleted / Version */}
          <FormControlLabel
            control={
              <Checkbox
                checked={form.deleted}
                onChange={handleChange}
                name="deleted"
              />
            }
            label="Deleted"
          />
          <TextField
            label="Version"
            name="version"
            type="number"
            value={form.version}
            onChange={handleChange}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Add Project
        </Button>
      </DialogActions>
    </Dialog>
  );
};
