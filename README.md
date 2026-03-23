# Fastify Sales API

## Overview

This project is a simple REST API built with **Fastify** and **SQLite** that allows users to retrieve sales data filtered by month.
It was developed as part of a backend coding challenge to demonstrate REST API design, database integration, and modular project structure.

The API joins data from **customers**, **products**, and **sales** tables to return structured sales records.

---

## Tech Stack

* Node.js
* Fastify
* SQLite
* JavaScript (CommonJS)

---

## Project Structure

```
fastify-sales-api
│
├── src
│   ├── controllers
│   │   └── salesController.js
│   │
│   ├── routes
│   │   └── salesRoutes.js
│   │
│   ├── database
│   │   ├── db.js
│   │   └── sales.db
│   │
│   └── server.js
│
├── package.json
├── .gitignore
└── README.md
```

The project follows a modular architecture:

* **Routes** define API endpoints
* **Controllers** handle business logic
* **Database layer** manages SQLite connection

---

## Installation

1. Clone the repository

```
git clone https://github.com/YOUR_USERNAME/fastify-sales-api.git
```

2. Navigate to the project directory

```
cd fastify-sales-api
```

3. Install dependencies

```
npm install
```

---

## Running the Server

Start the API server:

```
npm start
```

The server will run at:

```
http://localhost:3000
```

---

## API Endpoints

### Health Check

```
GET /
```

Response

```json
{
  "message": "Sales API is running"
}
```

---

### Get Sales by Month

```
GET /sales?month=YYYY-MM
```

Example

```
GET /sales?month=2026-03
```

Response

```json
[
  {
    "customer": "John Doe",
    "product": "Laptop",
    "quantity": 1,
    "sale_date": "2026-03-10"
  }
]
```

This endpoint performs SQL joins across:

* customers
* products
* sales

---

### Get All Customers

```
GET /customers
```

Response

```json
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  }
]
```

---

## Database Schema

The SQLite database contains three tables:

### Customers

* id
* name
* email

### Products

* id
* name
* price

### Sales

* id
* customer_id
* product_id
* quantity
* sale_date

---

## Features

* RESTful API design
* Fastify schema validation
* SQL joins for relational data
* Modular project architecture
* SQLite local database

---

## Future Improvements

Possible enhancements include:

* Authentication (JWT)
* Pagination for large datasets
* Docker containerization
* Unit and integration testing

