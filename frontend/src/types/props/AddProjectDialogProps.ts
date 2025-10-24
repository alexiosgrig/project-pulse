import type { ProjectItem } from "../ProjectItem";

export interface AddProjectDialogProps {
  open: boolean;
  onClose: () => void;
  onAdd: (project: ProjectItem) => void;
}