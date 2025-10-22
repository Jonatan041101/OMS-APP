# 🧾 Order Management System API

> A scalable and well-structured REST API built with **Node.js**, **Express**, and **TypeScript**, following **Clean Architecture** principles.  
> It provides full CRUD operations for managing customer orders, including data validation and E2E tests.

---

## 🚀 Features

- ✅ CRUD endpoints for orders (`/api/v1/order`)
- ✅ Request validation using **Yup**
- ✅ Built with **TypeScript** for full type safety
- ✅ ORM integration with **Sequelize**
- ✅ **PostgreSQL** for production, **SQLite** for tests
- ✅ Unit & E2E tests using **Jest** + **Supertest**
- ✅ Clean Architecture: maintainable and scalable structure
- ✅ Consistent code style enforced with ESLint and Prettier
- ✅ Ready for Docker deployment

---

## 🧱 Project Structure
```
src/
├── common/ # Shared types and base interfaces
├── config/ # Environment and DB configuration
├── modules/
│ └── order/
│ ├── application/ # Services and use cases
│ ├── domain/ # Entities and interfaces
│ ├── infrastructure/ # Database and repositories
│ └── interface/ # Controllers and routes
├── main.ts # Application entry point
└── tests/ # E2E and integration tests
```
## ⚙️ Setup & Installation

### 1️⃣ Clone the repository
```bash
git clone https://github.com/Jonatan041101/order-management-system-api.git
cd order-management-system-api
2️⃣ Install dependencies
npm install
3️⃣ Configure environment variables
Create a .env file based on .env.example:

.env

PORT=3000
NODE_ENV=development
DB_DIALECT=postgres
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=secret
DB_NAME=orders_db
4️⃣ Run the API
Development
npm run dev

Production
npm run build && npm start
The API will be available at 👉 http://localhost:3000/api/v1

🧪 Testing
This project includes both unit and end-to-end tests.

Run E2E tests
npm run test:e2e
All E2E tests use an in-memory SQLite database for isolation.
```
📘 API Reference
## 🩺 Health Check
### GET /api/v1/health

**Response:**

```json
{
  "success": true,
  "message": "API is running",
  "environment": "automated_tests",
  "timestamp":"2025-10-17T20:00:00.000Z"
}
```
## 🧾 Orders
### ➕ Create Order
### POST /api/v1/order


**Request:**
```json
{
  "customerName": "John Doe",
  "item": "3D Printer",
  "quantity": 2,
  "status": "pending"
}
```

**Response:**

```json
{
  "success": true,
  "message": "The order was created successfully.",
  "data": {
    "id": "uuid",
    "customerName": "John Doe",
    "item": "3D Printer",
    "quantity": 2,
    "status": "pending",
    "createdAt": "2025-10-17T20:00:00.000Z",
    "updatedAt": "2025-10-17T20:00:00.000Z"
  }
}
```

## 📦 Retrieve All Orders
### GET /api/v1/order

**Response:**

```json
{
  "success": true,
  "message":"Orders retrieved successfully.",
  "data": [
    {
      "id": "uuid",
      "customerName": "John Doe",
      "item": "3D Printer",
      "quantity": 2,
      "status": "pending",
      "createdAt": "2025-10-17T20:00:00.000Z",
      "updatedAt": "2025-10-17T20:00:00.000Z"
    }
  ]
}
```
## 🔍 Retrieve Order by ID
### GET /api/v1/order/:id

**Response:**

```json
{
  "success": true,
  "message": "Order with ID ${id} retrieved successfully",
  "data": {
    "id": "uuid",
    "customerName": "John Doe",
    "item": "3D Printer",
    "quantity": 2,
    "status": "pending",
    "createdAt": "2025-10-17T20:00:00.000Z",
    "updatedAt": "2025-10-17T20:00:00.000Z"
  }
}
```

## ✏️ Update Order
### PATCH /api/v1/order/:id

**Request:**

```json
{ "status": "completed" }
```
**Response:**

```json
{
  "success": true,
  "message": "The order with ID ${id} was successfully updated.",
  "data": {
    "id": "uuid",
    "customerName": "John Doe",
    "item": "3D Printer",
    "quantity": 2,
    "status": "completed",
    "createdAt": "2025-10-17T20:00:00.000Z",
    "updatedAt": "2025-10-17T20:00:00.000Z"
  }
}
```
## 🗑️ Delete Order
### DELETE /api/v1/order/:id

**Response:**

```json
{
  "success": true,
  "message": "The order with ID ${id}$ was deleted."
}
```

🧩 Architecture Overview
This project follows the Clean Architecture pattern.

Request Flow

Controller → Service → Repository → Database
Domain → Core business logic (entities, interfaces)

Application → Use cases and service logic

Infrastructure → Repositories (Sequelize)

Interface → HTTP controllers and routes

Common → Shared types and pagination utilities

This separation makes the project:

Testable 🧪

Scalable 📈

Maintainable 🧠

☁️ Deployment
🐳 Docker (recommended)
bash
```bash
🔧 Scripts
Command	Description
npm run build	Compile TypeScript
npm run start:dev	Start in development mode (ts-node)
npm start:prod	Run compiled JS in production
npm run lint	Run ESLint
npm run format	Format with Prettier
npm run test:e2e	Run E2E tests with Supertest
```
👨‍💻 Author
Jonatan Valdiviezo
Software Engineer | Full Stack Developer
📧 Email
🔗 LinkedIn
💻 GitHub
