import type { ProjectHealthEnum } from "../enums/ProjectHealthEnum";

export interface TeamMember {
  role: string;
  capacity: number; // full-time equivalent
}

export type Health = ProjectHealthEnum.good | ProjectHealthEnum.moderate | ProjectHealthEnum.critical

export interface ProjectItem {
  id?: number;
  title: string;
  description: string;
  summary: string;
  owner: string;
  last_updated: string;
  progress: number; // derived from milestones
  milestones: number;
  team: TeamMember[];
  tags: string[];
  health: Health;
  recentActivities: string[];
}
