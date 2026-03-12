# eCommerce API

A RESTful eCommerce API built with **Express**, **TypeScript**, **MongoDB**, **Mongoose**, and **Zod**.

This project was created as part of a backend bootcamp project and includes full CRUD functionality for **users**, **categories**, **products**, and **orders**.

---

## Project Status Checklist

### Project & Workflow

- [x] **FR001** Solo Project
- [x] **FR002** Follow Group-Work Guidelines
- [x] **FR003** Single Public Repository
- [x] **FR004** PR-Only to main

### Setup & Architecture

- [x] **FR005** Express + TypeScript Bootstrap
- [x] **FR006** MongoDB (Atlas or local) with environment variables
- [x] **FR007** Mongoose Integration before server start
- [x] **FR008** Project Structure with TypeScript folders
- [x] **FR009** Zod Validation for body / params / query
- [x] **FR010** Common Middleware:
  - [x] JSON parsing
  - [x] CORS
  - [x] centralized error handling

### Data Models

- [x] **FR011** User Model  
      Fields: `name`, `email`, `password`  
      Email uniqueness handled

- [x] **FR012** Category Model  
      Field: `name`

- [x] **FR013** Product Model  
      Fields: `name`, `description`, `price`, `categoryId`

- [x] **FR014** Order Model  
      Fields: `userId`, `products`, `total`, timestamps

- [x] **FR015** Response Shaping
  - [x] `password` excluded from responses
  - [x] `_id` normalized to `id`

### Business Rules

- [x] **FR016** Product–Category Integrity  
      Product create/update fails if `categoryId` does not exist

- [x] **FR017** Order Integrity  
      Order create/update fails if `userId` or any `productId` does not exist

- [x] **FR018** Order Total Calculation  
      Order `total` is calculated on the server from product prices × quantity

### Endpoints (CRUD)

- [x] **FR019** Users CRUD

  - [x] `GET /users`
  - [x] `POST /users`
  - [x] `GET /users/:id`
  - [x] `PUT /users/:id`
  - [x] `DELETE /users/:id`

- [x] **FR020** Products CRUD

  - [x] `GET /products`
  - [x] `GET /products?categoryId=...`
  - [x] `POST /products`
  - [x] `GET /products/:id`
  - [x] `PUT /products/:id`
  - [x] `DELETE /products/:id`

- [x] **FR021** Categories CRUD

  - [x] `GET /categories`
  - [x] `POST /categories`
  - [x] `GET /categories/:id`
  - [x] `PUT /categories/:id`
  - [x] `DELETE /categories/:id`

- [x] **FR022** Orders CRUD
  - [x] `GET /orders`
  - [x] `POST /orders`
  - [x] `GET /orders/:id`
  - [x] `PUT /orders/:id`
  - [x] `DELETE /orders/:id`

---

## Features

- Express + TypeScript backend
- MongoDB connection with Mongoose
- CRUD endpoints for:
  - Users
  - Categories
  - Products
  - Orders
- Zod validation
- Centralized error handling
- CORS and JSON middleware
- Response shaping
- Product-category integrity checks
- Order integrity checks
- Server-side order total calculation

---

## Tech Stack

- Node.js
- Express
- TypeScript
- MongoDB
- Mongoose
- Zod
- dotenv
- CORS

---

## Project Structure

```bash
src/
├─ db/
│  └─ index.ts
├─ controllers/
│  ├─ index.ts
│  ├─ users.ts
│  ├─ categories.ts
│  ├─ products.ts
│  └─ orders.ts
├─ middleware/
│  ├─ errorHandler.ts
│  ├─ notFound.ts
│  └─ validate.ts
├─ models/
│  ├─ index.ts
│  ├─ User.ts
│  ├─ Category.ts
│  ├─ Product.ts
│  └─ Order.ts
├─ routes/
│  ├─ index.ts
│  ├─ userRoutes.ts
│  ├─ categoryRoutes.ts
│  ├─ productRoutes.ts
│  └─ orderRoutes.ts
├─ schemas/
│  ├─ userSchemas.ts
│  ├─ categorySchemas.ts
│  ├─ productSchemas.ts
│  └─ orderSchemas.ts
├─ types/
│  └─ index.ts
├─ utils/
│  ├─ appError.ts
│  ├─ asyncHandler.ts
│  └─ serializers.ts
└─ app.ts
```

---

## Installation

```bash
git clone https://github.com/southy404/eCommerce-api.git
cd eCommerce-api
npm install
```

---

## Environment Variables

Create a `.env` file in the project root:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/ecommerce-api
```

Example with MongoDB Atlas:

```env
PORT=5000
MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@cluster.mongodb.net/ecommerce-api?retryWrites=true&w=majority
```

---

## Running the Project

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Start production build

```bash
npm run start
```

---

## API Base URL

```txt
http://localhost:5000
```

---

## Endpoints

### Users

```http
GET    /users
POST   /users
GET    /users/:id
PUT    /users/:id
DELETE /users/:id
```

### Categories

```http
GET    /categories
POST   /categories
GET    /categories/:id
PUT    /categories/:id
DELETE /categories/:id
```

### Products

```http
GET    /products
GET    /products?categoryId=<categoryId>
POST   /products
GET    /products/:id
PUT    /products/:id
DELETE /products/:id
```

### Orders

```http
GET    /orders
POST   /orders
GET    /orders/:id
PUT    /orders/:id
DELETE /orders/:id
```

---

## Example Request Bodies

### Create User

```json
{
  "name": "Max",
  "email": "max@example.com",
  "password": "123456"
}
```

### Create Category

```json
{
  "name": "Electronics"
}
```

### Create Product

```json
{
  "name": "iPhone 15",
  "description": "Smartphone by Apple",
  "price": 999,
  "categoryId": "CATEGORY_ID_HERE"
}
```

### Create Order

```json
{
  "userId": "USER_ID_HERE",
  "products": [
    {
      "productId": "PRODUCT_ID_HERE",
      "quantity": 2
    }
  ]
}
```

---

## Validation

The API uses **Zod** to validate:

- request body
- route params
- query params

Examples:

- invalid MongoDB IDs are rejected
- missing required fields return validation errors
- invalid query values return `400 Bad Request`

---

## Business Rules

### Product–Category Integrity

A product can only be created or updated if the given `categoryId` exists.

### Order Integrity

An order can only be created or updated if:

- the given `userId` exists
- all referenced `productId`s exist

### Order Total Calculation

The `total` field is always calculated on the server based on:

```txt
product price × quantity
```

The client does not control the order total.

---

## Response Shaping

Sensitive data is excluded from responses:

- `password` is never returned
- MongoDB `_id` is transformed to `id`

Example response:

```json
{
  "success": true,
  "data": {
    "id": "67d14b7b2d6a8a1234567890",
    "name": "Max",
    "email": "max@example.com"
  }
}
```

---

## Error Handling

The API includes centralized error handling and consistent JSON error responses.

Example:

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email address"
    }
  ]
}
```
