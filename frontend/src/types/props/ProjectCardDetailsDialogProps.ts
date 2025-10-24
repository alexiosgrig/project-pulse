import type { Dispatch, SetStateAction } from "react";
import type { ProjectItem } from "../ProjectItem";

export interface ProjectCardDetailsDialogProps {
  project: ProjectItem;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}
