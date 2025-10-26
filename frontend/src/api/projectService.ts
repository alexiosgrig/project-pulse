import axios from "axios";
import type { ProjectItem } from "../types/ProjectItem";
import type { PaginatedProjectsResponse } from "../types/PaginatedProjectsResponse";
import type { FetchProjectsParams } from "../types/FetchProjectsParams";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/", // change to your backend URL
  headers: { "Content-Type": "application/json" },
});

export const fetchProjects = async (
  params: FetchProjectsParams
): Promise<PaginatedProjectsResponse> => {
  const response = await api.get("/projects", {
    params,
  });
  return response.data;
};

export const fetchProjectsByPage = async (
  params: FetchProjectsParams
): Promise<PaginatedProjectsResponse> => {
  const response = await api.get("/projects", { params });
  return response.data;
};

export const addProject = async (
  project: ProjectItem
): Promise<ProjectItem> => {
  const response = await api.post("/projects", project);
  return response.data;
};

export const updateProject = async (
  project: ProjectItem
): Promise<ProjectItem> => {
  const response = await api.put(`/projects/${project.id}`, project, {
    headers: { "If-Match": project.version.toString() },
  });
  return response.data;
};

export const deleteProject = async (id: number | undefined): Promise<void> => {
  await api.delete(`/${id}/`);
};

export const searchProject = async (
  query: string
): Promise<PaginatedProjectsResponse> => {
  const response = await api.get(`/search/?q=${query}`);
  return response.data;
};
