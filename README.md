# TypeScript RESTful API with Express and PostgreSQL

This project is a simple RESTful API built with TypeScript, Express, and PostgreSQL. It provides basic CRUD (Create, Read, Update, Delete) operations for a `tasks` resource.

## Features

- **TypeScript:** Strongly typed for better code quality and maintainability.
- **Express:** Fast, unopinionated, minimalist web framework for Node.js.
- **PostgreSQL:** Powerful, open-source object-relational database system.
- **CRUD Operations:** Endpoints for creating, reading, updating, and deleting tasks.
- **Middleware:** Logging middleware to trace requests.

## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or later)
- [pnpm](https://pnpm.io/)
- [PostgreSQL](https://www.postgresql.org/)

## Getting Started

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2.  **Install dependencies:**

    ```bash
    pnpm install
    ```

3.  **Set up the database:**

    - Create a PostgreSQL database named `week2_db`.
    - Create a `.env` file in the root of the project and add your database credentials:

      ```
      DB_USER=your_db_user
      DB_HOST=localhost
      DB_NAME=week2_db
      DB_PASSWORD=your_db_password
      DB_PORT=5432
      ```

    - Run the database initialization script:

      ```bash
      psql -U your_db_user -d week2_db -a -f init.sql
      ```

4.  **Run the application:**

    ```bash
    pnpm dev
    ```

    The server will start on `http://localhost:3000`.

## API Endpoints

- `GET /tasks`: Get all tasks.
- `POST /tasks`: Create a new task.
- `PUT /tasks/:id`: Update a task.
- `DELETE /tasks/:id`: Delete a task.