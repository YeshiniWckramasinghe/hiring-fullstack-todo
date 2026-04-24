# TODO App — Backend

Express.js REST API server for the TODO application, connected to MongoDB.

## Tech Stack

- **Node.js** + **Express.js** — REST API framework
- **MongoDB** + **Mongoose** — Database and ODM
- **dotenv** — Environment variable management
- **cors** — Cross-origin request support

## Getting Started

### Prerequisites

- Node.js v18+
- MongoDB (local or Atlas)

### Setup

```bash
# From the server directory
cd server

# Install dependencies
npm install

# Copy environment file
cp .env.example .env
```

### Environment Variables

Edit `.env` and set the following:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/todo-app
NODE_ENV=development
```

**Using MongoDB Atlas?** Replace `MONGODB_URI` with your Atlas connection string:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/todo-app?retryWrites=true&w=majority
```

### Running the Server

```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

Server starts on: `http://localhost:5000`

---

## API Endpoints

| Method | Endpoint              | Description              |
|--------|-----------------------|--------------------------|
| GET    | `/api/todos`          | Get all TODO items       |
| POST   | `/api/todos`          | Create a new TODO        |
| PUT    | `/api/todos/:id`      | Update title/description |
| PATCH  | `/api/todos/:id/done` | Toggle done status       |
| DELETE | `/api/todos/:id`      | Delete a TODO            |

### Example Requests

**Create a TODO**
```bash
POST /api/todos
Content-Type: application/json

{
  "title": "Buy groceries",
  "description": "Milk, eggs, bread"
}
```

**Response**
```json
{
  "success": true,
  "data": {
    "_id": "665f...",
    "title": "Buy groceries",
    "description": "Milk, eggs, bread",
    "done": false,
    "createdAt": "2024-06-04T10:00:00.000Z",
    "updatedAt": "2024-06-04T10:00:00.000Z"
  },
  "message": "Todo created successfully"
}
```

---

## Database Schema

```js
{
  title:       String  (required, max 200 chars),
  description: String  (optional, max 1000 chars),
  done:        Boolean (default: false),
  createdAt:   Date    (auto),
  updatedAt:   Date    (auto)
}
```

---

## Assumptions & Limitations

- Authentication is out of scope — this is a single-user app.
- All todos are shared globally (no user accounts).
- MongoDB must be accessible before starting the server; the process exits on connection failure.
- The CORS origin is configured for `http://localhost:5173` (Vite default). Update `CLIENT_URL` in `.env` for other ports or production.
