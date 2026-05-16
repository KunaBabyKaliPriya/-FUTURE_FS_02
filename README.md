# Mini CRM — Client Lead Management System (MERN)

A production-ready, internship/portfolio-grade Mini CRM built with the **MERN stack** (MongoDB, Express, React, Node) + **JWT auth**, **bcrypt**, **Tailwind CSS**, and **Axios**.

> ✨ Features: admin auth, full lead CRUD, status workflow (New → Contacted → Converted), dashboard with stats, search & status filter, follow-up notes, pagination, sort by newest, toast notifications, responsive sidebar layout.

---

## 📁 Folder Structure

```
mini-crm/
├── backend/
│   ├── config/db.js                # MongoDB connection
│   ├── controllers/                # Request handlers (MVC)
│   │   ├── authController.js
│   │   └── leadController.js
│   ├── middleware/
│   │   ├── authMiddleware.js       # JWT protect
│   │   ├── errorMiddleware.js      # 404 + global errors
│   │   └── validate.js             # express-validator handler
│   ├── models/                     # Mongoose schemas
│   │   ├── User.js
│   │   └── Lead.js
│   ├── routes/                     # Express routers
│   │   ├── authRoutes.js
│   │   └── leadRoutes.js
│   ├── utils/
│   │   ├── generateToken.js
│   │   └── seedAdmin.js            # creates default admin
│   ├── .env.example
│   ├── package.json
│   └── server.js                   # App entry point
└── frontend/
    ├── src/
    │   ├── components/             # Reusable UI
    │   │   ├── DashboardLayout.jsx
    │   │   ├── LeadModal.jsx
    │   │   ├── ProtectedRoute.jsx
    │   │   ├── StatCard.jsx
    │   │   └── StatusBadge.jsx
    │   ├── context/AuthContext.jsx # Global auth state
    │   ├── pages/
    │   │   ├── Dashboard.jsx
    │   │   ├── LeadDetail.jsx
    │   │   ├── Leads.jsx
    │   │   └── Login.jsx
    │   ├── services/api.js         # Axios instance + JWT interceptor
    │   ├── App.jsx                 # Routes
    │   ├── main.jsx                # ReactDOM bootstrap
    │   └── index.css               # Tailwind directives
    ├── .env.example
    ├── index.html
    ├── package.json
    ├── postcss.config.js
    ├── tailwind.config.js
    └── vite.config.js
```

---

## ⚙️ Step-by-Step Setup

### 1. Prerequisites
- Node.js ≥ 18
- MongoDB running locally **or** a free MongoDB Atlas cluster

### 2. Backend

```bash
cd backend
cp .env.example .env       # then edit values
npm install
npm run seed               # creates admin@crm.com / admin123
npm run dev                # http://localhost:5000
```

Sample `.env`:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/mini-crm
JWT_SECRET=replace_with_a_long_random_secret
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
```

### 3. Frontend

```bash
cd frontend
cp .env.example .env
npm install
npm run dev                # http://localhost:5173
```

Sample `.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

Login with **admin@crm.com / admin123**.

---

## 🔌 API Reference

Base URL: `http://localhost:5000/api`

### Auth
| Method | Endpoint         | Body                                | Auth |
|--------|------------------|-------------------------------------|------|
| POST   | `/auth/register` | `{ name, email, password }`         | —    |
| POST   | `/auth/login`    | `{ email, password }`               | —    |
| GET    | `/auth/me`       | —                                   | ✅   |

### Leads (all require `Authorization: Bearer <token>`)
| Method | Endpoint               | Description                                  |
|--------|------------------------|----------------------------------------------|
| GET    | `/leads`               | Query: `search, status, page, limit`         |
| GET    | `/leads/stats`         | Dashboard counts + recent 5 leads            |
| GET    | `/leads/:id`           | Get one lead                                 |
| POST   | `/leads`               | Create lead                                  |
| PUT    | `/leads/:id`           | Update lead (status, notes, fields…)         |
| DELETE | `/leads/:id`           | Delete lead                                  |

### Example requests

**Login**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@crm.com","password":"admin123"}'
```

**Create lead**
```bash
curl -X POST http://localhost:5000/api/leads \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <TOKEN>" \
  -d '{
    "name":"Jane Doe","email":"jane@acme.com","phone":"555-1212",
    "company":"Acme","source":"Website","status":"New","notes":"Saw pricing page"
  }'
```

**List with search + filter**
```bash
curl "http://localhost:5000/api/leads?search=acme&status=New&page=1&limit=10" \
  -H "Authorization: Bearer <TOKEN>"
```

---

## 🗃️ MongoDB Schemas

**User**
```js
{ name, email (unique), password (bcrypt), role: 'admin', timestamps }
```

**Lead**
```js
{
  name, email, phone, company,
  source: 'Website',
  status: 'New' | 'Contacted' | 'Converted',
  notes, owner -> User,
  timestamps
}
```

---

## 🚀 Deployment

### Backend → Render
1. Push repo to GitHub.
2. On [Render](https://render.com) → **New Web Service** → connect repo → set **Root Directory** to `backend`.
3. Build command: `npm install`  ·  Start command: `npm start`
4. Add environment variables from `.env`.
5. Use a free **MongoDB Atlas** cluster for `MONGO_URI`. Whitelist `0.0.0.0/0` in Atlas Network Access.

### Frontend → Vercel
1. On [Vercel](https://vercel.com) → **New Project** → import repo → set **Root Directory** to `frontend`.
2. Framework: **Vite**. Build: `npm run build`. Output: `dist`.
3. Add env var `VITE_API_URL=https://<your-render-app>.onrender.com/api`
4. After deploy, update backend `CLIENT_URL` to your Vercel URL and redeploy backend (CORS).

---

## 🧑‍💻 Push to GitHub

```bash
cd mini-crm
git init
git add .
git commit -m "feat: mini CRM (MERN)"
git branch -M main
git remote add origin https://github.com/<your-username>/mini-crm.git
git push -u origin main
```

---

## 🧱 How It Was Built (module-by-module)

1. **Backend setup** — `server.js`, env, CORS, morgan, MongoDB connection.
2. **Models** — `User` (bcrypt hash hook + `matchPassword`) and `Lead` (status enum, text-search indexes).
3. **Auth** — `authController` + JWT (`generateToken`) + `protect` middleware.
4. **Lead CRUD** — `leadController` with pagination, sort by newest, search, filter, stats.
5. **Routes** — `authRoutes` and `leadRoutes` with `express-validator`.
6. **Error handling** — `notFound` + centralized `errorHandler`.
7. **Seed admin** — `npm run seed` for first run.
8. **Frontend bootstrap** — Vite + React + Tailwind + react-hot-toast.
9. **Auth context** — token stored in `localStorage`, axios interceptor attaches `Bearer`.
10. **Layout** — responsive sidebar + protected routes.
11. **Dashboard** — stat cards + recent leads table.
12. **Leads page** — search, status filter, pagination, create/edit modal, delete.
13. **Lead detail** — update status + follow-up notes.

Built to be clean, beginner-friendly, and easy to extend (add roles, multi-user, email notifications, file uploads, etc.).
