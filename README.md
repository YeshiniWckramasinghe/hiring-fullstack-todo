# TODO App — Full Stack

A full-stack TODO application built with React, Express.js, and MongoDB.

## Project Structure

```
hiring-fullstack-todo/
├── client/          # React frontend (Vite + Tailwind CSS)
│   └── README.md
├── server/          # Express.js backend
│   └── README.md
├── package.json     # Monorepo root (npm workspaces)
└── README.md
```

## Quick Start

### Prerequisites

- Node.js v18+
- MongoDB running locally **or** a MongoDB Atlas connection string

### 1. Install all dependencies

```bash
npm install
cd client && npm install && cd ..
cd server && npm install && cd ..
```

### 2. Configure the backend

```bash
cp server/.env.example server/.env
# Edit server/.env and set MONGODB_URI
```

### 3. Run both servers concurrently

```bash
npm run dev
```

This starts:
- **Frontend** → http://localhost:5173
- **Backend** → http://localhost:5000

Or run them separately:

```bash
# Terminal 1
cd server && npm run dev

# Terminal 2
cd client && npm run dev
```

---

## API Overview

| Method | Endpoint              | Description              |
|--------|-----------------------|--------------------------|
| GET    | `/api/todos`          | Get all TODOs            |
| POST   | `/api/todos`          | Create a new TODO        |
| PUT    | `/api/todos/:id`      | Update title/description |
| PATCH  | `/api/todos/:id/done` | Toggle done status       |
| DELETE | `/api/todos/:id`      | Delete a TODO            |

---

## Features

- ✅ Create, read, update, delete TODOs
- ✅ Toggle done/undone with animated UI
- ✅ Inline editing with keyboard shortcuts
- ✅ Filter by All / Pending / Done
- ✅ Optimistic UI updates (instant feedback)
- ✅ Loading skeletons and error handling
- ✅ Two-click delete confirmation
- ✅ Progress bar
- ✅ Form validation (client + server)
- ✅ Monorepo setup with npm workspaces

---

## Tech Choices

| Layer | Technology | Why |
|---|---|---|
| Frontend | React 18 + Vite | Fast dev experience, modern defaults |
| Styling | Tailwind CSS | Rapid, consistent UI without CSS bloat |
| HTTP client | Axios | Cleaner API than fetch, interceptor support |
| Backend | Node.js + Express | Minimal, flexible, widely supported |
| Database | MongoDB + Mongoose | Flexible schema, great DX with Mongoose |
| Monorepo | npm workspaces | Native, zero-config, no extra tooling needed |
