import axios from "axios";
import type { ProjectItem } from "../types/ProjectItem";

const api = axios.create({
  baseURL: "http://localhost:4000/api/projects", // change to your backend URL
  headers: { "Content-Type": "application/json" },
});

export const fetchProjects = async (): Promise<ProjectItem[]> => {
  const response = await api.get("/");
  return response.data;
};

export const addProject = async (project: ProjectItem): Promise<ProjectItem> => {
  const response = await api.post("/", project);
  return response.data;
};

export const updateProject = async (project: ProjectItem): Promise<ProjectItem> => {
  const response = await api.put(`/${project.id}`, project, {
    headers: { "If-Match": project.version.toString() }, // optimistic concurrency
  });
  return response.data;
};

export const deleteProject = async (id: number): Promise<void> => {
  await api.delete(`/${id}`);
};
