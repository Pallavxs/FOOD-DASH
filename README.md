# FOOD DASH – Full Stack Project

## 📖 Overview
This repository contains a **full‑stack** Zomato‑like food delivery application. The **backend** provides a robust RESTful API built with **Node.js**, **Express**, **MongoDB**, **Redis**, and **Socket.io** for real‑time updates. The **frontend** (not detailed here) consumes these APIs to deliver a seamless user experience.

---

## 🚀 Backend Features Implemented
### Authentication & Security
- **User Registration** (`/auth/register`): Secure password hashing & input validation.
- **User Login** (`/auth/login`): Issues JWTs stored in http‑only cookies.
- **Get Current User** (`/auth/get-me`): Protected route returning the authenticated profile.
- **Logout** (`/auth/logout`): JWT token blacklisting using **Redis (Upstash)**.
- **Authentication Middleware** (`authenticateUser`): Verifies JWT, checks blacklist, protects private routes.

### Restaurant Management
- **Create**, **Read**, **Update**, **Delete** restaurant profiles.
- **Search** restaurants by name or cuisine.
- **Pagination** support for listing.

### Menu System
- Full CRUD for menu items tied to restaurants.
- Ability to filter menu items by restaurant.

### Order Processing
- **Create Order**, **List Orders**, **Get Order by ID**.
- **Update Order Status** (placed, preparing, out_for_delivery, delivered).
- **Rider Location Tracking** (real‑time latitude & longitude updates).

### File Uploads
- Secure image upload endpoint (`/upload`) using **Multer** and **Cloudinary**.

### Real‑time Communication
- **Socket.io** integration for order status updates and rider location broadcasting.

---

## 🛠️ Technology Stack
- **Node.js** & **Express.js** – server & routing
- **MongoDB** & **Mongoose** – data persistence
- **Redis (Upstash)** – JWT blacklist & session caching
- **JWT** – authentication tokens
- **Multer + Cloudinary** – image uploads
- **Socket.io** – real‑time events
- **Morgan** – request logging
- **Dotenv** – environment variable management

---

## 📁 Project Structure
```
project-root/
├─ .env                # Environment variables (DB URI, JWT secret, etc.)
├─ README.md           # This file
├─ backend/            # Backend source code
│   ├─ README.md       # Backend‑specific documentation
│   ├─ server.js       # Entry point – DB connection, HTTP server, socket init
│   └─ src/
│       ├─ index.js         # Express app configuration & route registration
│       ├─ config/          # DB, Redis, Cloudinary configuration
│       ├─ controllers/    # Business logic for auth, restaurants, menus, orders
│       ├─ middleware/     # Auth, role‑based access control, etc.
│       ├─ models/         # Mongoose schemas (User, Restaurant, Menu, Order)
│       ├─ routes/         # Route definitions – thin layer to controllers
│       ├─ socket/         # Socket.io setup & helpers
│       └─ validator/      # Request validation schemas
├─ frontend/          # (If present) React/Vue/… source code
└─ package.json       # Dependencies & npm scripts
```

---

## 🔄 Request Flow (Backend)
1. **Incoming HTTP request** → `src/index.js` (Express app).
2. **Middleware** runs (authentication, role checks, validation).
3. Request reaches the appropriate **router** (`src/routes/*.route.js`).
4. Router forwards to the corresponding **controller** (`src/controllers/*.controller.js`).
5. Controller interacts with **Mongoose models** to read/write MongoDB.
6. Controller may emit **Socket.io events** for real‑time updates.
7. A JSON response is sent back to the client.

---

## ▶️ How to Run the Backend Locally
```bash
# 1. Install dependencies
npm install

# 2. Create a .env file (copy from .env.example) and set:
#    - MONGODB_URI
#    - JWT_SECRET
#    - REDIS_URL (Upstash)
#    - CLOUDINARY_* variables

# 3. Start the development server
npm run dev   # runs server.js with nodemon (if configured) or `node server.js`
```
The API will be reachable at `http://localhost:3000`.

---

## ✅ What’s Done So Far
- Clean **router‑controller‑service** architecture.
- Role‑based access control (`role.middleware.js`).
- Comprehensive request validation.
- Real‑time order status & rider tracking using **Socket.io**.
- Centralised error handling & request logging (`morgan`).
- Structured project layout for easy feature expansion.

---

