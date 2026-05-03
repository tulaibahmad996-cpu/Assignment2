# Express + PostgreSQL + TypeORM Example

A minimal Node.js backend project demonstrating an Express `POST /users` endpoint with PostgreSQL, TypeORM migrations, and integration tests using Jest and Supertest.

## Project Structure

```
├── src/
│   ├── app.js              # Express app setup
│   ├── data-source.js      # TypeORM DataSource configuration
│   ├── entity/
│   │   └── User.js         # User entity
│   └── routes/
│       └── userRoutes.js   # User routes
├── migrations/
│   └── 1690000000000-CreateUsersTable.js  # Migration to create users table
├── tests/
│   └── users.test.js       # Integration test
├── .env                    # Environment variables
├── package.json            # Dependencies and scripts
└── README.md               # This file
```

## Requirements

- Node.js 18+ installed
- PostgreSQL installed and running

## Setup

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Create the PostgreSQL database:**

   ```bash
   psql -c "CREATE DATABASE testdb;"
   ```

3. **Configure environment variables:**

   Edit `.env` with your PostgreSQL connection string:

   ```env
   DATABASE_URL=postgresql://postgres:postgres@localhost:5432/testdb
   ```

   Replace with your actual database credentials if different.

4. **Run migrations to create tables:**

   ```bash
   npm run migration:run
   ```

   This will create the `users` table in the database.

## Running the Project

1. **Start the server:**

   ```bash
   npm start
   ```

   The server will run on `http://localhost:3000`.

2. **Test the API:**

   You can test the `POST /users` endpoint using curl or Postman:

   ```bash
   curl -X POST http://localhost:3000/users \
     -H "Content-Type: application/json" \
     -d '{"name": "John Doe", "email": "john@example.com"}'
   ```

## Running Tests

Run the integration test:

```bash
npm test
```

The test will:

- Send a `POST /users` request
- Verify the response status is `201`
- Verify the response body contains the created user
- Query the database using TypeORM to confirm the user was saved
- Clean up by deleting the test user
- Close the database connection

## Scripts

- `npm start` — Start the Express server
- `npm test` — Run Jest tests
- `npm run migration:generate` — Generate a new migration (after changing entities)
- `npm run migration:run` — Run pending migrations

## Notes

- TypeORM is configured without `synchronize: true`; tables are created only through migrations.
- The integration test uses a real database connection and does not mock anything.
- Use `DATABASE_URL` in `.env` to configure your database connection.
- The project uses CommonJS (`require`) instead of ES modules.

- send a `POST /users` request to the Express app
- verify the response status is `201`
- verify the response body contains the created user
- query PostgreSQL directly to confirm the user was inserted
- delete the inserted test user
- close the database connection

## Notes

- The Express app exports the app from `app.js`; there is no standalone server file included.
- `users.test.js` uses a real database connection and does not mock PostgreSQL.
- Use `DATABASE_URL` in `.env` to point to your test database.
