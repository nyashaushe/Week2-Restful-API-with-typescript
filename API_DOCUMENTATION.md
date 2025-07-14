# Project Documentation: TypeScript RESTful API

This document provides a comprehensive overview of the TypeScript RESTful API, including setup instructions, how to use the interactive API documentation, and how to connect it with a frontend application.

## 1. Project Overview

This project is a RESTful API built with Node.js, Express, and TypeScript. It serves as a backend for various resources, providing CRUD (Create, Read, Update, Delete) operations for each.

- **Tech Stack**: TypeScript, Node.js, Express
- **API Documentation**: Swagger UI
- **Package Manager**: pnpm

### Features

- **Strongly-Typed**: Built with TypeScript for robust and maintainable code.
- **Multi-Resource**: Supports multiple data resources including products, users, orders, and more.
- **Interactive Documentation**: Comes with pre-configured Swagger UI for easy testing and exploration of API endpoints.
- **Scalable Structure**: Organized into controllers, routes, and interfaces for clear separation of concerns.

## 2. Getting Started

Follow these steps to get the project running on your local machine.

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or later)
- [pnpm](https://pnpm.io/)
- [PostgreSQL](https://www.postgresql.org/) (Optional, for future database integration)

### Installation & Setup

1.  **Clone the repository** (if you haven't already):

    ```bash
    git clone <your-repository-url>
    cd <your-project-directory>
    ```

2.  **Install dependencies** using pnpm:

    ```bash
    pnpm install
    ```

3.  **(Optional) Set up the PostgreSQL Database**:
    The project is currently configured to use an in-memory data store, meaning all data will be lost upon server restart. The `init.sql` file is provided for future integration with a PostgreSQL database.

    - Create a PostgreSQL database (e.g., `week2_db`).
    - To connect it, you would need to implement the database logic in the controller files to replace the in-memory arrays.

4.  **Run the application in development mode**:

    ```bash
    pnpm dev
    ```

    The server will start on `http://localhost:3000` and will automatically restart when you make changes to the source code.

## 3. Interactive API Documentation (Swagger UI)

This project uses Swagger to provide interactive API documentation. This is the recommended way to explore and test the API endpoints.

### How to Access

1.  Make sure the server is running (`pnpm dev`).
2.  Open your web browser and navigate to:

    [**http://localhost:3000/api-docs**](http://localhost:3000/api-docs)

### How to Use

- The Swagger UI page lists all available API endpoints, grouped by resource (e.g., `products`, `users`).
- You can expand each endpoint to see detailed information, including:
    - The HTTP method (GET, POST, PUT, DELETE).
    - A description of what the endpoint does.
    - Required parameters (e.g., an ID in the URL).
    - The structure of the request body (for POST and PUT requests).
    - Example responses.
- You can use the "Try it out" button to send live API requests directly from your browser and see the responses.

## 4. Connecting with a Frontend Application

Any frontend application (e.g., React, Vue, Angular, or plain HTML/JavaScript) can connect to this API to fetch or send data.

### Base URL

The base URL for all API requests when running locally is:
`http://localhost:3000`

### Example: Fetching All Products

Here is a simple example of how to fetch the list of all products using the `fetch` API in JavaScript.

```javascript
async function getProducts() {
  try {
    const response = await fetch('http://localhost:3000/products');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const products = await response.json();
    console.log('Products:', products);
    // You can now use the 'products' array to display data in your UI
  } catch (error) {
    console.error('Failed to fetch products:', error);
  }
}

// Call the function
getProducts();
```

### Example: Creating a New Product

Here is an example of how to create a new product by sending a `POST` request.

```javascript
async function createProduct(productName) {
  try {
    const response = await fetch('http://localhost:3000/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: productName }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const newProduct = await response.json();
    console.log('New Product Created:', newProduct);
    return newProduct;
  } catch (error) {
    console.error('Failed to create product:', error);
  }
}

// Call the function with a product name
createProduct('My New Awesome Product');
```

### A Note on CORS

Cross-Origin Resource Sharing (CORS) is a security feature that may block requests from a frontend running on a different domain (e.g., `http://localhost:5173`) to your API server (`http://localhost:3000`).

If you encounter CORS errors in your browser's console, you will need to enable CORS on the server. You can do this by adding the `cors` middleware to your Express application in `src/index.ts`.

1.  Install the `cors` package:
    ```bash
    pnpm install cors
    pnpm install @types/cors -D
    ```

2.  Use it in `src/index.ts`:
    ```typescript
    import cors from 'cors';
    // ... other imports

    const app = express();

    app.use(cors()); // Add this line
    app.use(express.json());
    // ... rest of the file
    ```

## 5. API Endpoints Overview

Below is a summary of the available endpoints for each resource. For complete details and to try them out live, please refer to the [interactive API documentation](#3-interactive-api-documentation-swagger-ui).

Each resource generally follows standard RESTful conventions with the following operations:

- **`GET /`**: Retrieve a list of all items for the resource.
- **`POST /`**: Create a new item for the resource.
- **`PUT /:id`**: Update an existing item by its ID.
- **`DELETE /:id`**: Delete an item by its ID.

### Resources and Endpoints

*   **Products (`/products`)**
    *   `GET /products`: Get all products.
    *   `POST /products`: Create a new product.
    *   `PUT /products/:id`: Update a product.
    *   `DELETE /products/:id`: Delete a product.

*   **Orders (`/orders`)**
    *   `GET /orders`: Get all orders.
    *   `POST /orders`: Create a new order.
    *   `PUT /orders/:id`: Update an order.
    *   `DELETE /orders/:id`: Delete an order.

*   **Customers (`/customers`)**
    *   `GET /customers`: Get all customers.
    *   `POST /customers`: Create a new customer.
    *   `PUT /customers/:id`: Update a customer.
    *   `DELETE /customers/:id`: Delete a customer.

*   **Invoices (`/invoices`)**
    *   `GET /invoices`: Get all invoices.
    *   `POST /invoices`: Create a new invoice.
    *   `PUT /invoices/:id`: Update an invoice.
    *   `DELETE /invoices/:id`: Delete an invoice.

*   **Payments (`/payments`)**
    *   `GET /payments`: Get all payments.
    *   `POST /payments`: Create a new payment.
    *   `PUT /payments/:id`: Update a payment.
    *   `DELETE /payments/:id`: Delete a payment.

*   **Shipments (`/shipments`)**
    *   `GET /shipments`: Get all shipments.
    *   `POST /shipments`: Create a new shipment.
    *   `PUT /shipments/:id`: Update a shipment.
    *   `DELETE /shipments/:id`: Delete a shipment.

*   **Reviews (`/reviews`)**
    *   `GET /reviews`: Get all reviews.
    *   `POST /reviews`: Create a new review.
    *   `PUT /reviews/:id`: Update a review.
    *   `DELETE /reviews/:id`: Delete a review.

*   **Categories (`/categories`)**
    *   `GET /categories`: Get all categories.
    *   `POST /categories`: Create a new category.
    *   `PUT /categories/:id`: Update a category.
    *   `DELETE /categories/:id`: Delete a category.

*   **Tasks (`/tasks`)**
    *   `GET /tasks`: Get all tasks.
    *   `POST /tasks`: Create a new task.
    *   `PUT /tasks/:id`: Update a task.
    *   `DELETE /tasks/:id`: Delete a task.

*   **Users (`/users`)**
    *   `GET /users`: Get all users.
    *   `POST /users`: Create a new user.
    *   `PUT /users/:id`: Update a user.
    *   `DELETE /users/:id`: Delete a user.
