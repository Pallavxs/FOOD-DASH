# Zomato Clone Backend

This repository contains the backend for a Zomato-like food delivery platform. It provides a robust RESTful API built with Express.js, MongoDB, and Redis.

## 🚀 Features Implemented

### 1. Authentication & Security

* **User Registration (`/auth/register`)**: Register new users with password hashing and input validation.
* **User Login (`/auth/login`)**: Authenticate users and issue JSON Web Tokens (JWT).
* **Get Current User (`/auth/get-me`)**: Protected route to fetch the authenticated user's profile using JWT cookies.
* **Secure Logout (`/auth/logout`)**: Implemented token blacklisting using Redis (Upstash). Logged-out JWTs are stored with expiration so they cannot be reused.
* **Authentication Middleware (`authenticateUser`)**:
  
  * Verifies JWT tokens
  * Checks Redis blacklist
  * Protects private routes

### 2. Restaurant Management

* **Create Restaurant (`/restaurant/create`)**: Create restaurant profiles with validation.
* **Fetch Restaurants (`/restaurant`)**: Retrieve all restaurants with pagination support.
* **Fetch Restaurant by ID (`/restaurant/:id`)**: Retrieve details for a specific restaurant.
* **Search Restaurants (`/restaurant/search`)**: Search restaurants by name or cuisine.
* **Delete Restaurant (`/restaurant/:id`)**: Delete a restaurant by ID.

### 3. Menu System

* **Create Menu Item (`/menu/create`)**: Add new menu items to a restaurant.
* **Fetch All Menus (`/menu`)**: Retrieve all menu items with optional restaurant filtering.
* **Fetch Menu by Restaurant (`/menu/restaurant/:restaurantId`)**: Retrieve menu items for a specific restaurant.
* **Update Menu Item (`/menu/:id`)**: Update existing menu details.
* **Delete Menu Item (`/menu/:id`)**: Remove a menu item.

### 4. Order Processing

* **Create Order (`/order/create`)**: Place new food orders.
* **Fetch Orders (`/order`)**: Retrieve all placed orders.
* **Fetch Order by ID (`/order/:id`)**: Retrieve order details.
* **Update Order Status (`/order/:id/status`)**: Update order status (placed, preparing, out_for_delivery, delivered).
* **Update Rider Location (`/order/:id/location`)**: Track rider's real‑time location (latitude & longitude) during delivery.

### 5. File Uploads

* **Image Upload (`/upload`)**:
  
  * Secure authenticated upload endpoint
  * Uses Multer middleware for `multipart/form-data`
  * Integration with Cloudinary for cloud‑based storage
  * Returns accessible image URLs

## 📌 Current Flow & Achievements

- **Authentication**: Users can register, login, fetch profile, and logout securely with JWT and Redis token blacklist.
- **Restaurant Management**: Endpoints for creating, listing, fetching by ID, and searching restaurants are functional.
- **Menu System**: Full CRUD operations for menu items linked to restaurants.
- **Order Processing**: Create orders, list them, get by ID, update order status, and track rider location.
- **File Uploads**: Images are now uploaded to Cloudinary for scalable cloud storage.
- **Environment Setup**: `.env` configured for MongoDB, Cloudinary, and Redis connections.
- **Error Handling & Validation**: Consistent error responses and request validation across routes.

## 🛠️ Technology Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* Redis (Upstash)
* JSON Web Tokens (JWT)
* Multer
* Cloudinary
* Dotenv

## 📁 Directory Structure

* `src/controllers` → Business logic
* `src/models` → Mongoose schemas
* `src/routes` → API route definitions
* `src/middleware` → Custom middleware
* `src/validator` → Request validation logic
* `src/config` → Configuration setup (Redis, DB, Cloudinary, etc.)

## ✅ Backend Concepts Covered

* REST APIs
* Authentication & Authorization
* JWT Cookies
* Redis Token Blacklisting
* Protected Routes
* MongoDB Relationships
* Pagination
* Search APIs
* Cloud File Upload Handling (Cloudinary)
* Middleware Architecture
* MVC Pattern
* Input Validation
* Error Handling
