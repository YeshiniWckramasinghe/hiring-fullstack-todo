# TODO App — Frontend

React.js frontend for the TODO app, built with Vite and Tailwind CSS.

## Tech Stack

- **React 18** — UI library
- **Vite** — Build tool and dev server
- **Tailwind CSS** — Utility-first styling
- **Axios** — HTTP client for API requests

## Getting Started

### Prerequisites

- Node.js v18+
- Backend server running on `http://localhost:5000` (see `server/README.md`)

### Setup

```bash
# From the client directory
cd client

# Install dependencies
npm install

# Start development server
npm run dev
```

App runs at: `http://localhost:5173`

The Vite dev server proxies `/api/*` requests to `http://localhost:5000` — no CORS issues in development.

### Build for Production

```bash
npm run build
```

Output is in `dist/`.

---

## Features

- **View todos** — listed newest first
- **Add todo** — expandable form with title + optional description
- **Edit todo** — inline edit with keyboard shortcuts (Enter to save, Escape to cancel)
- **Toggle done** — checkbox with animated strikethrough
- **Delete todo** — two-click confirmation to prevent accidents
- **Filter** — All / Pending / Done tabs
- **Progress bar** — visual completion percentage
- **Optimistic UI** — changes reflected instantly before the server responds
- **Loading skeleton** — while initial data fetches
- **Error banners** — user-friendly API error messages

---

## Architecture Decisions

| Decision | Rationale |
|---|---|
| Vite over CRA | Faster HMR, modern ESM defaults, simpler config |
| Custom hook (`useTodos`) | Separates data logic from presentation; easy to test |
| Service layer (`todoService`) | Single place for API calls; easy to mock in tests |
| Optimistic updates | Instant feedback; rollback on failure |
| Tailwind CSS | Rapid styling without context switching |
| Two-click delete | Prevent accidental deletions |

---

## Assumptions & Limitations

- No authentication — single-user app
- Todos are loaded all at once (no pagination) — suitable for personal task lists
- No offline support
- Tested on Chrome and Firefox; IE not supported
