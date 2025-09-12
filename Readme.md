# Kalinga Backend 🏫

A comprehensive RESTful API for school management system built with modern technologies. This backend service handles circulars, timetables, and homework management for educational institutions.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Running the Application](#running-the-application)
- [Testing](#testing)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

- **Circular Management**: Create, retrieve, and delete school circulars by class
- **Timetable Management**: Handle class-wise and section-wise timetables
- **Homework Management**: Manage homework assignments with teacher and student views
- **CORS Support**: Cross-origin resource sharing enabled
- **Data Validation**: Comprehensive input validation and error handling
- **Type Safety**: Full TypeScript implementation
- **Database Integration**: PostgreSQL with Prisma ORM
- **Automatic Timestamps**: CreatedAt timestamps for all records
- **Case-Insensitive**: Flexible class name handling

## 🛠 Tech Stack

<div align="center">

### 🖥️ Backend Technologies

| Technology                                                                                                      | Description                    | Version |
| --------------------------------------------------------------------------------------------------------------- | ------------------------------ | ------- |
| ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white)        | JavaScript runtime environment | 18.x+   |
| ![Express.js](https://img.shields.io/badge/Express.js-000000?style=flat-square&logo=express&logoColor=white)    | Fast web application framework | 4.x     |
| ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white) | Type-safe JavaScript superset  | 5.x     |

### 🗄️ Database & ORM

| Technology                                                                                                      | Description                   | Version |
| --------------------------------------------------------------------------------------------------------------- | ----------------------------- | ------- |
| ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=flat-square&logo=postgresql&logoColor=white) | Advanced open source database | 14.x+   |
| ![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=flat-square&logo=Prisma&logoColor=white)             | Next-generation ORM toolkit   | 5.x     |

### 📦 Key Dependencies

| Package | Purpose                         | Badge                                                                        |
| ------- | ------------------------------- | ---------------------------------------------------------------------------- |
| CORS    | Cross-origin resource sharing   | ![CORS](https://img.shields.io/badge/CORS-Enabled-green?style=flat-square)   |
| dotenv  | Environment variable management | ![dotenv](https://img.shields.io/badge/dotenv-Config-blue?style=flat-square) |
| Axios   | HTTP client for API requests    | ![Axios](https://img.shields.io/badge/Axios-HTTP-red?style=flat-square)      |

</div>

## 🚀 Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd kalinga-backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Install development dependencies**
   ```bash
   npm install -D typescript @types/node @types/express ts-node nodemon
   ```

## 🔧 Environment Setup

1. **Create a `.env` file** in the root directory:

   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/kalinga_db"
   PORT=3001
   ```

2. **Setup PostgreSQL database**

   - Install PostgreSQL on your system
   - Create a new database named `kalinga_db`
   - Update the `DATABASE_URL` with your credentials

3. **Run Prisma migrations**
   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

## 📚 API Documentation

### Base URL

```
http://localhost:3001/api
```

### 📢 Circulars Endpoints

#### Create Circular

```http
POST /api/circular
Content-Type: application/json

{
  "url": "https://example.com/circular.pdf",
  "className": "JUNIOR"
}
```

#### Get Circulars by Class

```http
GET /api/circular/JUNIOR
```

**Response:**

```json
[
  {
    "id": 1,
    "url": "https://example.com/circular.pdf",
    "className": "JUNIOR",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
]
```

#### Delete Circular

```http
DELETE /api/circular/1
```

### 📅 Timetable Endpoints

#### Create Timetable

```http
POST /api/timetable
Content-Type: application/json

{
  "url": "https://example.com/timetable.pdf",
  "className": "Class 5",
  "section": "A"
}
```

#### Get Timetable by Class and Section

```http
GET /api/timetable/Class%205/A
```

**Response:**

```json
{
  "id": 1,
  "url": "https://example.com/timetable.pdf",
  "className": "Class 5",
  "section": "A",
  "createdAt": "2024-01-15T10:30:00.000Z"
}
```

#### Delete Timetable

```http
DELETE /api/timetable/1
```

### 📝 Homework Endpoints

#### Create Homework

```http
POST /api/homework
Content-Type: application/json

{
  "className": "JUNIOR",
  "section": "A",
  "subject": "Mathematics",
  "teacher": "John Doe"
}
```

#### Get Homework by Teacher

```http
GET /api/homework/teacher/John%20Doe
```

#### Get Homework for Students

```http
GET /api/homework/student/JUNIOR/A
```

**Response:**

```json
[
  {
    "id": 1,
    "className": "JUNIOR",
    "section": "A",
    "subject": "Mathematics",
    "teacher": "John Doe",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
]
```

#### Delete Homework

```http
DELETE /api/homework/1
```

### Error Responses

All endpoints return appropriate HTTP status codes:

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `404` - Not Found
- `500` - Internal Server Error

Error response format:

```json
{
  "error": "Error message description"
}
```

## 🗄 Database Schema

### Circular Table

```sql
CREATE TABLE Circular (
  id SERIAL PRIMARY KEY,
  url TEXT NOT NULL,
  className ClassType NOT NULL,
  createdAt TIMESTAMP DEFAULT NOW()
);
```

### Timetable Table

```sql
CREATE TABLE Timetable (
  id SERIAL PRIMARY KEY,
  url TEXT NOT NULL,
  className TEXT NOT NULL,
  section TEXT NOT NULL,
  createdAt TIMESTAMP DEFAULT NOW()
);
```

### Homework Table

```sql
CREATE TABLE Homework (
  id SERIAL PRIMARY KEY,
  className ClassType NOT NULL,
  section TEXT NOT NULL,
  subject TEXT NOT NULL,
  teacher TEXT NOT NULL,
  createdAt TIMESTAMP DEFAULT NOW()
);
```

### ClassType Enum

```sql
CREATE TYPE ClassType AS ENUM ('JUNIOR', 'PRIMARY', 'SENIOR');
```

## 🏃‍♂️ Running the Application

### Development Mode

```bash
npm run dev
```

The server will start on `http://localhost:3001` with auto-reload enabled.

### Production Build

```bash
npm run build
npm start
```

### Available Scripts

- `npm run dev` - Run development server with auto-reload
- `npm run build` - Build TypeScript to JavaScript
- `npm run test` - Run test suite
- `npm start` - Start production server

## 🧪 Testing

Run the comprehensive test suite:

```bash
npm run test
```

### Test Coverage

- ✅ All API endpoints functionality
- ✅ Data validation and error handling
- ✅ Database operations
- ✅ Edge cases and boundary conditions
- ✅ HTTP status code validation

## 📁 Project Structure

```
kalinga-backend/
├── src/
│   ├── routes/
│   │   ├── circular.ts
│   │   ├── timetable.ts
│   │   └── homework.ts
│   ├── types/
│   │   └── index.ts
│   ├── utils/
│   │   └── database.ts
│   └── app.ts
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── tests/
│   ├── circular.test.ts
│   ├── timetable.test.ts
│   └── homework.test.ts
├── dist/ (generated)
├── .env
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

## 🤝 Contributing

We welcome contributions to the Kalinga Backend project! Here's how you can help:

### Getting Started

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests (`npm run test`)
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Write comprehensive tests for new features
- Update documentation for API changes
- Use meaningful commit messages
- Ensure code passes all existing tests

### Code Style

- Use TypeScript for all new code
- Follow existing naming conventions
- Add appropriate error handling
- Include JSDoc comments for functions

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support, please contact:

- Email: support@kalinga-backend.com
- Issues: [GitHub Issues](https://github.com/username/kalinga-backend/issues)

---

**Made with ❤️ for educational institutions**
