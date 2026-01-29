# Backend - Notes API

RESTful API for the Notes application built with Node.js, Express, and MongoDB.

## Architecture

This backend follows a **3-layer architecture** pattern:

```
├── controllers/   # HTTP handlers (request/response)
├── services/      # Business logic
├── repositories/  # Database operations
├── models/        # Data schemas (Mongoose)
├── routes/        # API route definitions
├── app.js         # Express application setup
└── server.js      # Server entry point
```

## Tech Stack

- **Runtime**: Node.js v24.13.0
- **Framework**: Express v5.2.1
- **Database**: MongoDB v8.2.4
- **ODM**: Mongoose v9.1.5
- **Environment**: dotenv v17.2.3

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Create a `.env` file in the backend directory:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/notes-app
NODE_ENV=development
```

### 3. Start MongoDB

Ensure MongoDB is running on your system.

### 4. Run the Server

**Production mode:**
```bash
npm start
```

**Development mode (with auto-reload):**
```bash
npm run dev
```

## API Documentation

### Base URL
```
http://localhost:3000/api
```

### Endpoints

#### Health Check
```http
GET /api/health
```

**Response:**
```json
{
  "success": true,
  "message": "Server is running"
}
```

#### Create Note
```http
POST /api/notes
Content-Type: application/json

{
  "title": "Note Title",
  "content": "Note content here"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Note Title",
    "content": "Note content here",
    "archived": false,
    "createdAt": "2026-01-28T10:30:00.000Z",
    "updatedAt": "2026-01-28T10:30:00.000Z"
  }
}
```

#### Get All Notes
```http
GET /api/notes
```

#### Get Active Notes
```http
GET /api/notes/active
```

#### Get Archived Notes
```http
GET /api/notes/archived
```

#### Get Note by ID
```http
GET /api/notes/:id
```

#### Update Note
```http
PUT /api/notes/:id
Content-Type: application/json

{
  "title": "Updated Title",
  "content": "Updated content"
}
```

#### Delete Note
```http
DELETE /api/notes/:id
```

#### Archive Note
```http
PATCH /api/notes/:id/archive
```

#### Unarchive Note
```http
PATCH /api/notes/:id/unarchive
```

## Error Handling

All endpoints return consistent error responses:

```json
{
  "success": false,
  "error": "Error message here"
}
```

### HTTP Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `404` - Not Found
- `500` - Internal Server Error

## Development

### Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm test` - Run tests (not implemented yet)

### Code Structure

**Controllers** (`src/controllers/`)
- Handle HTTP requests and responses
- Validate request data
- Call service layer methods
- Return appropriate status codes

**Services** (`src/services/`)
- Implement business logic
- Validate business rules
- Coordinate between controllers and repositories
- Handle errors

**Repositories** (`src/repositories/`)
- Direct database access
- CRUD operations
- Query building
- Data persistence

**Models** (`src/models/`)
- Define Mongoose schemas
- Set up validation rules
- Configure timestamps and indexes

## CORS

CORS is enabled for all origins in development. Update `src/app.js` for production use.

## Dependencies

### Production
- `express` - Web framework
- `mongoose` - MongoDB ODM
- `dotenv` - Environment variable management

### Development
- `nodemon` - Auto-restart server on file changes
