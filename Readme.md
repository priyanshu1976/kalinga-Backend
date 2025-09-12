# Setup (local)

1. Install PostgreSQL and create a DB:

- Example (Linux / psql):
- `sudo -u postgres psql`
- `CREATE DATABASE school_db;`
- `CREATE USER postgres WITH PASSWORD 'postgres';` (or use your user)
- `GRANT ALL PRIVILEGES ON DATABASE school_db TO postgres;`

2. Clone / create project directory and place files.

3. Create a `.env` file based on the example and set DATABASE_URL.

4. Install dependencies:

- `npm install`

5. Initialize Prisma (if you didn't already):

- `npx prisma generate`
- `npx prisma migrate dev --name init` # applies migrations and creates tables

6. Start dev server:

- `npm run dev`

7. API endpoints (examples):

- POST /api/circular -> body { url, className: 'JUNIOR'|'PRIMARY'|'SENIOR', subject }
- GET /api/circular/:className
- DELETE /api/circular/:id

- POST /api/timetable -> body { url, className, section }
- GET /api/timetable/:className/:section
- DELETE /api/timetable/:id

- POST /api/homework -> body { className, section, subject, teacher }
- GET /api/homework/teacher/:teacher
- GET /api/homework/student/:className/:section
- DELETE /api/homework/:id

Notes:

- `className` must be one of `JUNIOR`, `PRIMARY`, `SENIOR` (case-insensitive input is converted to uppercase in routes)
- No authentication is added. If you want teacher vs student access control we can add JWT-based auth.
