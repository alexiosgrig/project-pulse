import React, { memo } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stack,
  MenuItem,
} from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import type { ProjectItem } from "../../types/ProjectItem";
import type { AddProjectDialogProps } from "../../types/props/AddProjectDialogProps";
import { addProject } from "../../api/projectService";
import { FormTextField } from "../form-controlled-components/form-text-field/FormTextField";
import { FormTagInput } from "../form-controlled-components/form-tag-input/FormTagInput";
import { FormArrayField } from "../form-controlled-components/form-array-field/FormArrayField";

export const AddProjectDialog: React.FC<AddProjectDialogProps> = memo(
  ({ open, onClose }) => {
    const methods = useForm<ProjectItem>();

    const { handleSubmit, reset } = methods;

    const onSubmit = async (data: ProjectItem) => {
      try {
        await addProject(data);
        reset();
        onClose();
      } catch (error) {
        console.error(error);
      }
    };

    return (
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        <DialogTitle>Add New Project</DialogTitle>
        <DialogContent dividers>
          <FormProvider {...methods}>
            <Stack spacing={2} sx={{ mt: 1 }}>
              <FormTextField name="title" label="Title" required />
              <FormTextField
                name="description"
                label="Description"
                multiline
                required
              />
              <FormTextField
                name="summary"
                label="Summary"
                multiline
                required
              />
              <FormTextField name="owner" label="Owner" required />
              <FormTextField
                name="progress"
                label="Progress (%)"
                type="number"
                required
              />
              <FormTextField
                name="milestones"
                label="Milestones"
                type="number"
                required
              />

              <FormTextField name="health" label="Health" select required>
                <MenuItem value="Good">Good</MenuItem>
                <MenuItem value="Moderate">Moderate</MenuItem>
                <MenuItem value="Critical">Critical</MenuItem>
              </FormTextField>

              <FormTagInput name="tags" />
              <FormArrayField />
            </Stack>
          </FormProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit(onSubmit)}>
            Add Project
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
);
