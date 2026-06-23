# Task Management API

A RESTful API for managing tasks with user authentication. Built using **Node.js**, **Express**, **Prisma ORM**, and **MySQL**.

The API provides:

* User registration and login
* JWT authentication
* Task CRUD operations
* Pagination
* Activity logging

---

## Table of Contents

* Overview
* Architecture
* Project Structure
* API Endpoints
* Database
* Authentication
* Future Improvements

---

## Overview

This project is a backend API for managing user tasks.

Users can:

* Create an account
* Login securely using JWT
* Create, update, view, and delete tasks
* Track task activities

The goal is to provide a simple and scalable task management backend.

---

# Architecture

The project follows a **Layered Architecture***.

### Technologies Used

* Node.js - Backend runtime
* Express.js - API framework
* Prisma ORM - Database management
* MySQL - Database
* JWT - Authentication
* bcrypt - Password hashing

### Application Flow

```
Client Request
      |
      v
Routes
      |
      v
Controllers
      |
      v
Services
      |
      v
Prisma ORM
      |
      v
MySQL Database
```

### Components

**Routes**

* Define API endpoints.
* Handle incoming requests.

**Controllers**

* Receive requests from routes.
* Validate data.
* Send responses.

**Services**

* Contains business logic.
* Handles database operations.

**Middleware**

* Authentication
* Error handling
* Rate limiting

---

# Installation

## Requirements

* Node.js v18+
* MySQL Database
* npm

# Project Structure

```
src
|
├── controllers
|     ├── auth.controller.js
|     └── task.controller.js
|
├── services
|     ├── auth.service.js
|     └── task.service.js
|
├── routes
|     ├── auth.route.js
|     └── task.route.js
|
├── middleware
|     ├── auth.middleware.js
|     └── error.middleware.js
|
├── config
|     └── prisma.js
|
├── utils
|     └── jwt.js
|
├── app.js
└── server.js
```

---

# API Documentation

Base URL:

```
http://localhost:3000
```

## Authentication

### Register User

**POST**

```
/api/auth/register
```

Request:

```json
{
  "name": "John Doe",
  "email": "john@email.com",
  "password": "password123"
}
```

Response:

```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@email.com"
  }
}
```

---

### Login User

**POST**

```
/api/auth/login
```

Request:

```json
{
  "email": "john@email.com",
  "password": "password123"
}
```

Response:

```json
{
  "token": "jwt_token",
  "user": {
    "id":1,
    "email":"john@email.com"
  }
}
```

---

# Task Endpoints

All task endpoints require:

```
Authorization: Bearer <token>
```

---

## Get Tasks

**GET**

```
/api/tasks
```

Query:

```
?page=1&limit=10
```

Returns user tasks with pagination.

---

## Get Task

**GET**

```
/api/tasks/:id
```

Returns a specific task.

---

## Create Task

**POST**

```
/api/tasks
```

Body:

```json
{
  "title":"Finish project",
  "description":"Complete API documentation",
  "dueDate":"2026-01-01"
}
```

Creates a new task and activity log.

---

## Update Task

**PUT**

```
/api/tasks/:id
```

Updates task information.

---

## Delete Task

**DELETE**

```
/api/tasks/:id
```

Soft deletes a task and creates an activity log.

---

# Database Design

The database contains three main models.

## User

Stores user information.

Fields:

* id
* name
* email
* passwordHash
* createdAt

## Task

Stores user tasks.

Fields:

* id
* userId
* title
* description
* status
* dueDate
* createdAt

## ActivityLog

Stores task activities.

Fields:

* id
* userId
* taskId
* action
* createdAt

---

# Authentication and Security

The API uses JWT authentication.

Security features:

* Password hashing using bcrypt
* Protected routes using JWT middleware
* Environment variables for secrets
* Rate limiting
* Centralized error handling

---

# Main Functions

## Authentication Service

### register()

Creates a new user.

Process:

1. Validate user information.
2. Hash password.
3. Save user to database.

---

### login()

Authenticates users.

Process:

1. Check email and password.
2. Generate JWT token.
3. Return user information.

---

## Task Service

### getAllTasks()

Returns user tasks with pagination.

### createTask()

Creates a task and saves activity history.

### updateTask()

Updates task information and records changes.

### deleteTask()

Soft deletes tasks and logs activity.

---

# Future Improvements

Possible improvements:

* Add request validation using Zod
* Add automated testing
* Add Docker support
* Add CI/CD pipeline
* Add API documentation using Swagger
* Improve logging system
* Add role-based permissions
* Improve monitoring and performance

---

# Troubleshooting

## Database Connection Error

Check:

```
DATABASE_URL
```

and ensure MySQL is running.

## Authentication Error

Make sure requests include:

```
Authorization: Bearer TOKEN
```

## Prisma Error

Run:

```bash
npx prisma generate
```

---

