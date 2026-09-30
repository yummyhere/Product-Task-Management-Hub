# Product & Task Management Hub

A full-stack, production-quality web application built for the **Level 4 – Frameworks & Architecture** academic assignment. This hub seamlessly unifies product catalog management and project task tracking within a single, responsive dashboard backed by a REST API and persistent MongoDB database.

---

## 1. Overview

The **Product & Task Management Hub** allows teams to track physical/digital products and operational tasks side-by-side. Users can:
* View all products and tasks in an interactive, responsive grid
* Search items by name or description in real time
* Filter items by item type (`Product` or `Task`), status, and priority level
* Create new items with dynamic status options tailored to the selected item type
* View individual item details including prices, creation timestamps, and priority tags
* Edit existing items with instant validation
* Delete items with a safety confirmation modal dialog
* Receive immediate visual feedback through loading indicators, error alerts, and toast notifications
* Persist all data changes permanently to a MongoDB database (local or MongoDB Atlas)

---

## 2. Architecture

The application strictly implements a multi-tiered separation of concerns:

```text
React Client (Frontend UI & State)
       ↓  (Axios HTTP Requests)
 REST API (Express Router)
       ↓
Controllers (HTTP Input/Output & Status Codes)
       ↓
 Services (Business Logic & Data Querying)
       ↓
  Models (Mongoose Schema & Validations)
       ↓
 MongoDB (Atlas / Local Persistent Database)
```

### Architectural Highlights:
* **Client Layer:** Modular React components with custom hooks (`useItems`), centralized API layer (`itemApi.js`), and responsive CSS design system.
* **Routing Layer (`routes/`):** Pure endpoint definitions mapping URLs to controller functions.
* **Controller Layer (`controllers/`):** Request extraction, ID validation, status code assignment (`200`, `201`, `400`, `404`, `500`), and delegation to services.
* **Service Layer (`services/`):** Business logic, query filtering (`type`, `status`, `priority`, `search`), data sanitation, and database transactions.
* **Data Layer (`models/`):** Mongoose schemas enforcing required fields, enum validation, type-dependent statuses, and timestamps.

---

## 3. Technology Stack

### Frontend
* **React 18**: UI component library with Hooks (`useState`, `useEffect`, `useCallback`)
* **Vite**: Ultra-fast build tool and development server
* **Axios**: Centralized asynchronous HTTP client with timeout handling
* **Lucide React**: Modern iconography for badges, controls, and states
* **Modern CSS**: Custom responsive design system featuring glassmorphism, CSS variables, flexbox, and CSS grid

### Backend
* **Node.js**: Asynchronous event-driven JavaScript runtime
* **Express.js**: RESTful API framework
* **Mongoose**: Object Data Modeling (ODM) for MongoDB
* **CORS**: Cross-Origin Resource Sharing locked down to `FRONTEND_URL`
* **dotenv**: Zero-dependency environment variable management
* **Nodemon**: Development auto-reloading utility

### Database
* **MongoDB**: Document database compatible with both local MongoDB instances and cloud-hosted MongoDB Atlas clusters.

---

## 4. Project Structure

```text
product-task-hub/
│
├── client/                               # Frontend React + Vite Application
│   ├── public/                           # Static assets
│   ├── src/
│   │   ├── components/                   # Reusable UI components
│   │   │   ├── DeleteConfirmModal.jsx    # Deletion confirmation modal
│   │   │   ├── EmptyState.jsx            # Zero-results & empty list view
│   │   │   ├── ErrorMessage.jsx          # User-friendly error alert banner
│   │   │   ├── ItemCard.jsx              # Individual product/task card
│   │   │   ├── ItemFormModal.jsx         # Create & Edit modal with validation
│   │   │   ├── ItemList.jsx              # Grid container for item cards
│   │   │   ├── LoadingSpinner.jsx        # Animated loading spinner
│   │   │   ├── Navbar.jsx                # App header with connection badge
│   │   │   ├── SearchFilterBar.jsx       # Real-time search & filter bar
│   │   │   ├── StatsCards.jsx            # Dynamic counts & metrics banner
│   │   │   └── Toast.jsx                 # Dismissible feedback alerts
│   │   ├── hooks/
│   │   │   └── useItems.js               # State management & API integration hook
│   │   ├── pages/
│   │   │   └── Dashboard.jsx             # Main dashboard view
│   │   ├── services/
│   │   │   └── itemApi.js                # Centralized Axios API service
│   │   ├── utils/
│   │   │   └── formatters.js             # Date, price, and badge styling helpers
│   │   ├── App.jsx                       # Root application orchestrator
│   │   ├── index.css                     # Global CSS tokens & design system
│   │   └── main.jsx                      # Vite React entry point
│   ├── index.html                        # HTML template with Google Fonts
│   ├── package.json                      # Client dependencies & scripts
│   └── vite.config.js                    # Vite configuration (port 5173)
│
├── server/                               # Backend Node.js + Express REST API
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js                     # MongoDB connection module
│   │   ├── controllers/
│   │   │   └── itemController.js         # HTTP request/response handlers
│   │   ├── middleware/
│   │   │   ├── errorMiddleware.js        # Centralized error handler
│   │   │   └── notFoundMiddleware.js     # 404 route handler
│   │   ├── models/
│   │   │   └── Item.js                   # Mongoose Item schema & validation
│   │   ├── routes/
│   │   │   └── itemRoutes.js             # RESTful endpoint routes
│   │   ├── services/
│   │   │   └── itemService.js            # Business & data access logic
│   │   ├── utils/
│   │   │   ├── seed.js                   # Database seeding utility
│   │   │   └── testApi.js                # Automated backend test suite
│   │   └── server.js                     # Express entry point & middleware setup
│   ├── .env                              # Active environment variables (gitignored)
│   ├── .env.example                      # Template environment variables
│   └── package.json                      # Server dependencies & scripts
│
├── .gitignore                            # Git ignore configuration
└── README.md                             # Complete project documentation
```

---

## 5. Prerequisites

Before running the application locally, ensure you have:
* **Node.js**: v18.0.0 or higher (Tested with Node.js v24)
* **npm**: v9.0.0 or higher
* **MongoDB**: A running local MongoDB service (`mongodb://127.0.0.1:27017`) or a free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster connection URI
* **Git**: Installed and configured

---

## 6. Environment Variables

The backend relies on environment variables defined in `server/.env`.

### `server/.env.example`
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
FRONTEND_URL=http://localhost:5173
```

### Active `server/.env` (Example for Local MongoDB)
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/product_task_hub
FRONTEND_URL=http://localhost:5173
```

> **Security Note:** `server/.env` is added to `.gitignore` and is never committed to version control. Passwords and credentials are automatically masked in server logs.

---

## 7. Installation & Running Locally

### Step 1: Clone the repository
```bash
git clone <repository-url>
cd "Product & Task Management Hub"
```

### Step 2: Configure Backend Environment
Navigate to the server directory and create the `.env` file from the example:
```bash
cd server
cp .env.example .env
# Edit .env with your MongoDB connection string if different from default
```

### Step 3: Install Server Dependencies & Start Backend
```bash
npm install

# Optional: Seed initial sample products and tasks into MongoDB
npm run seed

# Run the Express server in development mode (using Nodemon)
npm run dev
```
* The backend will start on **`http://localhost:5000`**
* You should see:
  ```text
  MongoDB connected successfully to host: 127.0.0.1
  Server running on port 5000
  Accepting requests from frontend at: http://localhost:5173
  ```

### Step 4: Install Client Dependencies & Start Frontend
Open a new terminal window:
```bash
cd client
npm install
npm run dev
```
* The React application will be available at **`http://localhost:5173`**

---

## 8. REST API Documentation

Base URL: `http://localhost:5000/api`

### Endpoints Summary

| Method | Endpoint | Description | Status Code |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/health` | Service health check | `200 OK` |
| `GET` | `/api/items` | Retrieve items with optional query filters | `200 OK` |
| `GET` | `/api/items/:id` | Retrieve an item by MongoDB ObjectId | `200 OK` / `404 Not Found` / `400 Bad Request` |
| `POST` | `/api/items` | Create a new product or task | `201 Created` / `400 Bad Request` |
| `PUT` | `/api/items/:id` | Update an existing item by ID | `200 OK` / `404 Not Found` / `400 Bad Request` |
| `DELETE`| `/api/items/:id` | Remove an item by ID | `200 OK` / `404 Not Found` / `400 Bad Request` |

---

### Detailed Endpoint Specifications

#### 1. `GET /api/items`
Retrieves all items from the database. Supports flexible query filtering.

**Query Parameters:**
* `type` *(optional)*: `Product` | `Task`
* `status` *(optional)*: `Available` | `Out of Stock` | `Discontinued` | `Pending` | `In Progress` | `Completed`
* `priority` *(optional)*: `Low` | `Medium` | `High`
* `search` *(optional)*: Case-insensitive search on `name` or `description`

**Example Request:**
```http
GET /api/items?type=Product&priority=High
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "_id": "6abcae5951234821c2b24ebd",
      "name": "Ergonomic Mechanical Keyboard",
      "description": "Custom split mechanical keyboard with hot-swappable switches",
      "type": "Product",
      "status": "Available",
      "priority": "High",
      "price": 149.99,
      "createdAt": "2026-09-30T06:36:28.120Z",
      "updatedAt": "2026-09-30T06:36:28.120Z"
    }
  ]
}
```

---

#### 2. `GET /api/items/:id`
Retrieves a single item by its 24-character hex MongoDB ObjectId.

**Success Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "_id": "6abcae5951234821c2b24ebd",
    "name": "Ergonomic Mechanical Keyboard",
    "description": "Custom split mechanical keyboard",
    "type": "Product",
    "status": "Available",
    "priority": "High",
    "price": 149.99,
    "createdAt": "2026-09-30T06:36:28.120Z",
    "updatedAt": "2026-09-30T06:36:28.120Z"
  }
}
```

**Error Response - Invalid ID (400 Bad Request):**
```json
{
  "success": false,
  "message": "Invalid item ID format"
}
```

**Error Response - Not Found (404 Not Found):**
```json
{
  "success": false,
  "message": "Item not found"
}
```

---

#### 3. `POST /api/items`
Creates a new product or task record.

**Request Body (JSON):**
```json
{
  "name": "Implement JWT Refresh Tokens",
  "description": "Add silent token refresh rotation on HTTP-only cookie endpoint",
  "type": "Task",
  "status": "In Progress",
  "priority": "High",
  "price": null
}
```

**Success Response (201 Created):**
```json
{
  "success": true,
  "message": "Item created successfully",
  "data": {
    "_id": "6abcb00251234821c2b24eca",
    "name": "Implement JWT Refresh Tokens",
    "description": "Add silent token refresh rotation on HTTP-only cookie endpoint",
    "type": "Task",
    "status": "In Progress",
    "priority": "High",
    "price": null,
    "createdAt": "2026-09-30T06:45:15.541Z",
    "updatedAt": "2026-09-30T06:45:15.541Z"
  }
}
```

**Validation Error Response (400 Bad Request):**
```json
{
  "success": false,
  "message": "Missing required fields: name, description"
}
```

---

#### 4. `PUT /api/items/:id`
Updates an existing item. Validates enum values and cross-checks status against item type.

**Request Body (JSON):**
```json
{
  "status": "Completed",
  "priority": "Low"
}
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "message": "Item updated successfully",
  "data": {
    "_id": "6abcb00251234821c2b24eca",
    "name": "Implement JWT Refresh Tokens",
    "status": "Completed",
    "priority": "Low",
    "updatedAt": "2026-09-30T06:48:22.100Z"
  }
}
```

---

#### 5. `DELETE /api/items/:id`
Permanently deletes an item from MongoDB.

**Success Response (200 OK):**
```json
{
  "success": true,
  "message": "Item deleted successfully"
}
```

---

## 9. Automated Testing & Verification

An automated verification test script is included in `server/src/utils/testApi.js`.

To run the verification suite:
```bash
cd server
npm run test:api
```

This verifies:
1. API Health Check (`GET /api/health`)
2. Collection retrieval & counts (`GET /api/items`)
3. Multi-attribute filtering (`GET /api/items?type=...&status=...`)
4. Item creation (`POST /api/items` -> `201 Created`)
5. Item lookup by ID (`GET /api/items/:id` -> `200 OK`)
6. Item updates (`PUT /api/items/:id` -> `200 OK`)
7. Schema validation enforcement (invalid status for type -> `400 Bad Request`)
8. Malformed MongoDB ID detection (`400 Bad Request`)
9. Nonexistent ID handling (`404 Not Found`)
10. Item deletion (`DELETE /api/items/:id` -> `200 OK`)
11. Confirmation of deletion (`GET /api/items/:id` -> `404 Not Found`)
12. 404 handler for undefined API routes

---

## 10. Git Workflow & Commit History

This project adheres to conventional commits:

```text
chore: initialize project structure
chore: setup React frontend
chore: setup Express backend
feat: connect MongoDB database
feat: create item model
feat: implement item CRUD API
feat: add request validation
feat: add centralized error handling
feat: configure CORS
feat: build dashboard UI
feat: add item creation form
feat: add item editing
feat: add delete confirmation
feat: connect frontend to backend API
feat: add loading and error states
feat: add search and filtering
style: improve responsive layout
docs: add README documentation
```

---

## 11. Academic Assignment Checklist (Level 4 Rubric)

- [x] **Separation of Concerns:** Strict `React Client → REST API Router → Controllers → Services → Models → MongoDB` flow.
- [x] **Database Persistence:** Real MongoDB connection; zero permanently hardcoded data; optional seed utility.
- [x] **RESTful Endpoints:** Complete CRUD with standard HTTP status codes (`200`, `201`, `400`, `404`, `500`).
- [x] **CORS & Security:** CORS locked to `FRONTEND_URL`; credentials masked in logs; `.env` strictly gitignored.
- [x] **Client Architecture:** Modular components, custom `useItems` hook, centralized `itemApi.js`.
- [x] **UX Polish:** Real-time search, multi-filter dropdowns, responsive grid, dynamic type-status binding, loading spinners, error alerts, and toast notifications.
