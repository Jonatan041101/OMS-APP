# 🧩 Frontend - Order Management System (OMS)

## 📘 Overview

This project is the **frontend interface** of the Order Management System (OMS).
It is built with **React + TypeScript** and consumes the REST API from the Orders backend.
The architecture follows **SOLID** principles, with clean, reusable, and strongly typed code.

---

## ⚙️ Main Technologies

| Technology | Purpose |
|-------------|----------|
| **React + TypeScript** | Core of the application |
| **TailwindCSS** | Utility-first styling framework for responsive and modern design |
| **TanStack Query** | Server state management (fetching, caching, revalidation) |
| **Axios** | HTTP client for API communication |
| **Formik + Yup** | Form handling and validation |
| **TailwindCSS** | Responsive and modern styling |
| **Custom Hooks** | Encapsulation of reusable logic |
| **ESLint + Prettier** | Code style and consistency |
| **Cypress** | End-to-end testing |

---

## 🏗️ Project Structure
```bash
src/
├── components/        # Reusable components (UI, forms, etc.)
├── configs/           # Global configurations (envs, endpoints, etc.)
├── constants/         # Global constants and enums
├── errors/            # Custom error handling
├── hooks/             # Custom hooks (useGetOrders, useCreateOrder, etc.)
├── interfaces/        # Type and interface definitions (DTOs, entities)
├── mapper/            # Mapping between API structures and internal models
├── pages/
│   ├── home/          # Main page (order listing)
│   └── order/
│       ├── OrderCreatePage.tsx   # Order creation page
│       ├── OrderDetailPage.tsx   # Order detail page
│       └── Root.tsx              # Root layout of the "order" section
├── services/          # API communication (Axios + TanStack Query)
├── main.tsx           # Application entry point
└── index.css          # Global styles


## ⚙️ Setup & Installation

### 1️⃣ Clone the repository
```bash
git clone https://github.com/Jonatan041101/order-management-system-api.git
cd app-ui
```
### 2️⃣ Install dependencies
```bash
npm install
```
### 3️⃣ Configure environment variables
Create a .env file based on .env.dist:

```bash
PORT=3000
VITE_API_URL=http://localhost:3000/api/v1
```

### 4️⃣ Run the App

```bash
npm run start:dev # Development
npm run start:prod # Production
```

## 🧭 General Application Flow

1. **Home Page (`/`)**
   - Displays all orders with pagination.
   - Allows filtering by status (`pending`, `completed`, `cancelled`).
   - Contains the order cards for each item.
   - Includes **Next / Prev** buttons and a button to create new orders.

2. **Order Create Page (`/order/create`)**
   - Allows users to create a new order.
   - Uses **Formik + Yup** for form validation.
   - Fields: `customerName`, `item`, `quantity`, `status`.
   - Displays success or error notifications using toasts.

3. **Order Detail Page (`/order/:id`)**
   - Shows complete details of a specific order.
   - Allows editing or deleting the order.
   - Uses `useGetOrderById` to dynamically fetch order data.

---

## 🧱 Architecture and SOLID Principles

- **S**ingle Responsibility → Each hook, component, and service has a single, well-defined purpose.  
- **O**pen/Closed → Behaviors can be extended without modifying base implementations.  
- **L**iskov Substitution → Consistent use of types between entities and DTOs.  
- **I**nterface Segregation → Well-defined types and contracts in the `/interfaces` folder.  
- **D**ependency Inversion → Services depend on abstractions rather than concrete implementations.  

---

## 🧩 Main Features

✅ Order listing with pagination  
✅ Filtering by status  
✅ Order creation, editing, and deletion  
✅ Full detail visualization  
✅ Error and loading state handling  
✅ Strong typing with TypeScript  
✅ Reusable hooks for business logic  
✅ End-to-end testing with Cypress  
✅ Consistent code styling with ESLint + Prettier  

---

## 🎨 Code Styling

The project maintains a **clean and consistent code style** using:

- **ESLint** → Detects errors and enforces TypeScript + React best practices.  
- **Prettier** → Automatically formats the code to ensure visual consistency.  

### 🧰 Useful Scripts
```bash
npm run lint

npm run format
```
---

## 🧪 Testing

The project uses Cypress for end-to-end (E2E) testing.
The tests validate the following flows:

- ✅ Rendering of the main order list
- ✅ Filtering and pagination
- ✅ Order creation, editing, and deletion
- ✅ Error handling and form validation

### Example of Execution:
```bash
npm run test:e2e
```

---

### 🚀 Workflow

```
- The user accesses the Home Page and views existing orders.
- Orders can be created, edited, or deleted directly from the interface.
- Each operation updates the state in real time using TanStack Query.
- Data is persisted and retrieved from the backend API.
- Forms are managed and validated using Formik + Yup.
- Status messages (success/error) are displayed through toasts.
```

---

### 🧠 Conclusion
```
This frontend offers a scalable, clean, and maintainable architecture.
Thanks to the use of TypeScript, TanStack Query, and SOLID principles,
the project ensures code reliability and an excellent development experience.
```