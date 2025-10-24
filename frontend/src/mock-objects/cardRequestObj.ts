import { ProjectHealthEnum } from "../enums/ProjectHealthEnum";
import type { ProjectItem } from "../types/ProjectItem";

export const initialProjects: ProjectItem[] = Array.from(
  { length: 50 },
  (_, i) => ({
    id: i + 1,
    title: `Project ${i + 1} - Website Redesign`,
    description: `A complete redesign of project ${
      i + 1
    } website to improve UX and performance.`,
    summary: `Redesign project ${
      i + 1
    } website with new UI, faster load times, and responsive layout.`,
    owner: `Owner ${i + 1}`,
    lastUpdated: new Date(2025, 9, 24 - (i % 30), 12, 0, 0).toISOString(), // Varying dates
    progress: Math.floor(Math.random() * 101), // 0–100%
    milestones: Math.floor(Math.random() * 10) + 1, // 1–10 milestones
    team: [
      { role: "Project Manager", capacity: 1 },
      { role: "Frontend Developer", capacity: 0.8 },
      { role: "Backend Developer", capacity: 0.5 },
      { role: "UX Designer", capacity: 0.6 },
    ],
    tags: ["UI", "UX", "Web", "Redesign"].slice(
      0,
      Math.floor(Math.random() * 4) + 1
    ),
    health: [
      ProjectHealthEnum.good,
      ProjectHealthEnum.moderate,
      ProjectHealthEnum.critical,
    ][Math.floor(Math.random() * 3)] as "Good" | "Moderate" | "Critical",
    recentActivities: [
      `Activity 1 for project ${i + 1}`,
      `Activity 2 for project ${i + 1}`,
      `Activity 3 for project ${i + 1}`,
    ],
    deleted: false,
    version: Math.floor(Math.random() * 5) + 1, // 1–5
  })
);
