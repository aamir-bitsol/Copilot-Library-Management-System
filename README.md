# Library Management System

This is a Library Management System built with Next.js, PostgreSQL, and Sequelize. The application provides basic authentication features and allows users to manage books efficiently.

## Features

- User registration and login
- JWT-based authentication
- CRUD operations for books
- User dashboard to view and manage books

## Technologies Used

- **Next.js**: A React framework for server-side rendering and static site generation.
- **PostgreSQL**: A powerful, open-source relational database.
- **Sequelize**: A promise-based Node.js ORM for PostgreSQL.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.

## Getting Started

### Prerequisites

- Node.js
- PostgreSQL
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd library-management-system
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up your environment variables in the `.env` file:
   ```
   DATABASE_URL=your_database_url
   JWT_SECRET=your_jwt_secret
   ```

4. Run the database migrations (if applicable):
   ```
   npx sequelize-cli db:migrate
   ```

5. Start the development server:
   ```
   npm run dev
   ```

### API Endpoints

- **POST** `/api/auth/register`: Register a new user.
- **POST** `/api/auth/login`: Log in an existing user.
- **GET** `/api/books`: Retrieve all books.
- **GET** `/api/books/:id`: Retrieve a single book by ID.

### Running Tests

To run tests, use the following command:
```
npm test
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.