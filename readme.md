# 📁 Project & Task Management System

A full-stack project and task management application built with **MERN Stack** featuring **JWT-based authentication**, **role-based access control**, and **admin/user dashboards**.

---

## 📌 Project Overview

This application helps teams and individuals track and manage projects and tasks efficiently.

### 👤 Roles

- **Admin**: Full access to create, update, delete, and manage all projects and tasks.
- **User**: Can view assigned projects/tasks and update the **task status** only.

### 🔐 Authentication

- JWT-based login and role-checking middleware.
- Admin and User have separate access rights.

---

## ⚙️ Tech Stack

- **Frontend**: React.js (with Context API / Redux), Tailwind CSS or Bootstrap, PrimeReact (for UI components)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (with Mongoose)
- **Authentication**: JWT, bcrypt

---

## 🚀 Features

### ✅ Admin

- Full CRUD for Projects and Tasks
- Assign tasks to users
- View dashboard with charts, user activity log, and completion stats

### ✅ User

- View assigned projects and tasks
- Update task status (e.g., Not Started, In Progress, Completed)
- Login/logout functionality

---

## 📡 API Design

### Auth

| Method | Endpoint               | Description               |
| ------ | ---------------------- | ------------------------- |
| POST   | /api/v1/users/login    | Login with email/password |
| POST   | /api/v1/users/register | Register a new user       |

### Project

| Method | Endpoint              | Description                       |
| ------ | --------------------- | --------------------------------- |
| GET    | /api/v1/projects      | Get all projects (Admin)          |
| POST   | /api/v1/projects      | Create a new project (Admin)      |
| PUT    | /api/v1/projects/:id  | Update project (Admin)            |
| DELETE | /api/v1/projects/:id  | Delete project (Admin)            |
| GET    | /api/v1/projects/user | Get user-specific projects (User) |

### Task

| Method | Endpoint           | Description                          |
| ------ | ------------------ | ------------------------------------ |
|        |                    |                                      |
| POST   | /api/v1/tasks      | Create new task (Admin)              |
| PUT    | /api/v1/tasks/:id  | Update task (Admin/User status only) |
| DELETE | /api/v1/tasks/:id  | Delete task (Admin)                  |
| GET    | /api/v1/tasks/user | Get user-specific tasks              |

---

## 🧪 Role Based User

| Role   | Email              | Password          |
| ------ | ------------------ | ----------------- |
| Admin  | admin@example.com  | admin             |
| member | manish@example.com | StrongPassword123 |

> You can change these in the database or via the register endpoint.

---

## 🛠️ Installation & Setupgit clone https://github.com/zoroworld/samarorbit-projetct-management-system.git

```bash
cd samarorbit-projetct-management-system

1. mongodb atlas online was there

2. for server setup
cd server
npm install
npm start

3.
env file setup in server
https://docs.google.com/document/d/1O9IQSOIEHaTFtu-CYBrvIF6ILb5lObf5VQ94bSPRHcA/edit?usp=sharing

3. for go client setup
cd client
npm install
npm dev run






```
