# 🧭 Project Pulse — Project Management Dashboard

## 📌 Overview
Project Pulse is a full-stack project management dashboard that enables CRUD operations, filtering, sorting, search, across projects.

Built with **React (Vite)** and **Django REST Framework**, it demonstrates an end-to-end workflow from data collection to containerized deployment.

## 🧩 Architecture

| Layer | Tech Stack | Purpose |
|-------|-------------|----------|
| Frontend | React + Vite + MUI + React Hook Form | SPA for project listing and management |
| Backend | Django REST Framework + PostgreSQL | API for CRUD, search |
| Infra | Docker + Docker Compose |
| CI/CD | GitHub Actions + Docker Hub |

**Frontend → Backend → Postgres**

---

## 🚀 Features
- 🗂️ Project listing as cards with filters, pagination, and sorting  
- ✏️ Full CRUD (Create, Read, Update, Delete)  
- 🔍 Full-text search (Postgre/Elasticsearch)  
- 🧑‍💻 Team members with role + capacity  
- 🏷️ Tags, progress, milestones, and health tracking  
- 🧱 Reusable form components published to NPM  
- 🐳 Dockerized backend & frontend  
- 🔁 CI/CD via GitHub Actions and Docker Hub  

---

## 🧰 Tech Stack
**Frontend:** React + Vite + TypeScript + Material UI + React Hook Form  
**Backend:** Django + DRF + PostgreSQL + django-filter  
**Infra:** Docker, Docker Compose  
**CI/CD:** GitHub Actions → Docker Hub  
**Packages:**  
- NPM: `@alexios.grig/form-controls`  
---
