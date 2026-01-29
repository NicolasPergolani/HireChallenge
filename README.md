# Notes Application - Full Stack SPA

S single-page web application for creating, managing, archiving, categorizing, and filtering notes with JWT authentication.

## Requirements
   - Readme done with AI help it applies a local host for the data base .env which I will leave you right here, 
   - PORT=3000
   - MONGODB_URI=mongodb+srv://nicopergo_db_user:tbdwVfb6CveueogE@notesspadb.ihoxyn4.mongodb.net/?appName=NotesSpaDB
   - NODE_ENV=development
   - JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-12345
   - JWT_EXPIRE=7d

### Required Software and Versions

- **Node.js**: v24.13.0 or higher
- **npm**: v11.6.2 or higher
- **MongoDB**: v8.2.4 or higher (MongoDB Atlas cloud or local installation)

### Installation

#### 1. Install Node.js
Download and install from [nodejs.org](https://nodejs.org/)

#### 2. Install MongoDB

**Option A: MongoDB Atlas (Cloud - Recommended)**
1. Create a free account at [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get your connection string
4. Whitelist your IP address in Network Access

**Option B: Local Installation**
- **Windows**: `winget install MongoDB.Server`
- **macOS**: `brew tap mongodb/brew && brew install mongodb-community@8.2`
- **Linux**: Follow [MongoDB installation guide](https://docs.mongodb.com/manual/installation/)

## Project Structure

```
.
├── Backend/          # Backend REST API
│   ├── src/
│   │   ├── controllers/   # HTTP request handlers
│   │   ├── services/      # Business logic layer
│   │   ├── repositories/  # Data access layer
│   │   ├── models/        # Mongoose schemas
│   │   ├── routes/        # API routes
│   │   ├── app.js         # Express app setup
│   │   └── server.js      # Server entry point
│   ├── .env               # Environment variables
│   └── package.json
├── Frontend/         # Frontend SPA (React + Vite)
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── services/      # API service layer
│   │   ├── App.jsx        # Main App component
│   │   └── main.jsx       # Entry point
│   ├── index.html         # HTML template
│   └── package.json
├── start.sh          # Startup script (Linux/macOS)
├── start.bat         # Startup script (Windows)
└── README.md
```

## Backend Architecture

The backend follows a **layered architecture** pattern:

- **Controllers**: Handle HTTP requests/responses
- **Services**: Implement business logic
- **Repositories**: Manage database operations
- **Models**: Define data schemas

## Quick Start

### Option 1: Automated Setup

**Linux/macOS:**
```bash
chmod +x start.sh
./start.sh
```

**Windows:**
```cmd
start.bat
```

This will:
- Check and start MongoDB
- Install dependencies for both backend and frontend
- Start both servers

### Option 2: Manual Setup

#### 1. Start MongoDB Service

**Windows:**
```powershell
net start MongoDB
```

**macOS:**
```bash
brew services start mongodb-community
```

**Linux:**
```bash
sudo systemctl start mongod
```

#### 2. Install Dependencies

**Backend:**
```bash
cd Backend
npm install
```

**Frontend:**
```bash
cd Frontend
npm install
```

#### 3. Configure Environment Variables

**IMPORTANT:** The `.env` file is not included in the repository for security reasons (it's in `.gitignore`).

Copy the example file and configure it:

```bash
cd Backend
cp .env.example .env
```

Then edit `Backend/.env` with your configuration:

```env
PORT=3000
MONGODB_URI=mongodb+srv://nicopergo_db_user:tbdwVfb6CveueogE@notesspadb.ihoxyn4.mongodb.net/?appName=NotesSpaDB
NODE_ENV=development
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-12345
JWT_EXPIRE=7d
```

**Configuration Options:**

- **MONGODB_URI**: 
  - **MongoDB Atlas**: `mongodb+srv://<username>:<password>@<cluster>.mongodb.net/?appName=<appName>`
  - **Local MongoDB**: `mongodb://localhost:27017/notes-app`
  
- **JWT_SECRET**: A strong secret key for JWT token signing (change in production!)

- **JWT_EXPIRE**: Token expiration time (e.g., '7d', '24h', '30m')

#### 4. Start the Servers

**Terminal 1 - Backend:**
```bash
cd Backend
npm start
```
Backend will run on `http://localhost:3000`

**Terminal 2 - Frontend:**
```bash
cd Frontend
npm run dev
```
Frontend will run on `http://localhost:5173`

#### 5. Access the Application

Open your browser and navigate to `http://localhost:5173`

## Default Login Credentials

The application includes JWT authentication. You can register a new account or use test accounts if they were seeded.

**To create a new account:**
1. Open the application at `http://localhost:5173`
2. Click on the "Register" tab
3. Fill in username, email, and password
4. Submit to create your account

**User Roles:**
- `user` - Can create, edit, delete, archive, and filter their own notes
- `admin` - Can view all notes from all users (with user badges showing note ownership)

## API Endpoints

### Authentication

#### Register a New User
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <your-jwt-token>
```

### Notes Management (All endpoints require authentication)

**Note:** All note endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

#### Create a Note
```http
POST /api/notes
Authorization: Bearer <your-jwt-token>
Content-Type: application/json

{
  "title": "My Note",
  "content": "Note content here",
  "categories": ["work", "important"]
}
```

#### Get All Notes
```http
GET /api/notes
Authorization: Bearer <your-jwt-token>
```

#### Get Active Notes
```http
GET /api/notes/active
Authorization: Bearer <your-jwt-token>
```

#### Get Archived Notes
```http
GET /api/notes/archived
Authorization: Bearer <your-jwt-token>
```

#### Get Notes by Category
```http
GET /api/notes/category/:category
Authorization: Bearer <your-jwt-token>
```

#### Update a Note
```http
PUT /api/notes/:id
Authorization: Bearer <your-jwt-token>
Content-Type: application/json

{
  "title": "Updated Title",
  "content": "Updated content",
  "categories": ["personal", "todo"]
}
```

#### Delete a Note
```http
DELETE /api/notes/:id
Authorization: Bearer <your-jwt-token>
```

#### Archive a Note
```http
PATCH /api/notes/:id/archive
Authorization: Bearer <your-jwt-token>
```

#### Unarchive a Note
```http
PATCH /api/notes/:id/unarchive
Authorization: Bearer <your-jwt-token>
```

## Development

### Run in Development Mode (with auto-reload)

```bash
cd backend
npm run dev
```

### Environment Variables
### REAL VARIABLES:
PORT=3000
MONGODB_URI=mongodb+srv://nicopergo_db_user:tbdwVfb6CveueogE@notesspadb.ihoxyn4.mongodb.net/?appName=NotesSpaDB
NODE_ENV=development
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-12345
JWT_EXPIRE=7d
----------------------------------

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `PORT` | Backend server port | 3000 | No |
| `MONGODB_URI` | MongoDB connection string | mongodb://localhost:27017/notes-app | Yes |
| `NODE_ENV` | Environment mode | development | No |
| `JWT_SECRET` | Secret key for JWT token signing | - | Yes |
| `JWT_EXPIRE` | JWT token expiration time | 7d | No |

## Testing the API

You can test the API using:

- **cURL**
- **Postman**
- **Thunder Client** (VS Code extension)
- **REST Client** (VS Code extension)

### Example cURL Commands

```bash

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Save the token from login response, then use it for authenticated requests:

# Create a note with categories
curl -X POST http://localhost:3000/api/notes \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{"title":"Test Note","content":"This is a test","categories":["work","important"]}'

# Get all active notes
curl http://localhost:3000/api/notes/active \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"

# Get notes by category
curl http://localhost:3000/api/notes/category/work \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"

# Archive a note (replace {id} with actual note ID)
curl -X PATCH http://localhost:3000/api/notes/{id}/archive \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Troubleshooting

### MongoDB Connection Issues

If you get connection errors:

**For Local MongoDB:**
1. Ensure MongoDB service is running:
   ```bash
   # Windows
   net start MongoDB
   
   # macOS
   brew services list
   
   # Linux
   sudo systemctl status mongod
   ```

2. Check MongoDB is listening on port 27017:
   ```bash
   netstat -an | grep 27017
   ```

3. Verify `.env` file has: `MONGODB_URI=mongodb://localhost:27017/notes-app`

**For MongoDB Atlas:**
1. Check your internet connection
2. Verify IP address is whitelisted in Network Access
3. Ensure connection string is correct in `.env`
4. Try using Google DNS (8.8.8.8) if you have DNS resolution issues

### Authentication Issues

- **"Token expired" or "Invalid token"**: Login again to get a new token
- **"Unauthorized"**: Make sure you're sending the `Authorization: Bearer <token>` header
- **Token not persisting**: Check browser localStorage or cookies

### Port Already in Use

If port 3000 is already in use:

1. Change the `PORT` in `.env` file
2. Or kill the process using port 3000:
   ```bash
   # Windows
   netstat -ano | findstr :3000
   taskkill /PID <PID> /F
   
   # Linux/macOS
   lsof -ti:3000 | xargs kill -9
   ```

## Phase Implementation Status

### Phase 1 ✅ COMPLETE
**Backend:**
- ✅ Create, edit, and delete notes
- ✅ Archive/unarchive notes
- ✅ List active notes
- ✅ List archived notes
- ✅ Layered architecture (Controller → Service → Repository)
- ✅ REST API with Express
- ✅ MongoDB persistence with Mongoose

**Frontend:**
- ✅ React SPA with Vite
- ✅ Note creation form
- ✅ Note list with edit/delete/archive actions
- ✅ Active/Archived tabs
- ✅ Responsive design

### Phase 2 ✅ COMPLETE
**Backend:**
- ✅ Add/remove categories to notes
- ✅ Filter notes by category
- ✅ Category support in all note operations

**Frontend:**
- ✅ Category input with add/remove functionality
- ✅ Category badges on note cards
- ✅ Category filter buttons
- ✅ Real-time category filtering

### Additional Features ✅
**Authentication:**
- ✅ JWT-based authentication
- ✅ User registration and login
- ✅ Password hashing with bcrypt
- ✅ Protected API routes
- ✅ User/Admin roles
- ✅ Admin can view all users' notes with ownership badges

**Architecture:**
- ✅ 3-layer backend architecture (Controllers, Services, Repositories)
- ✅ Separate frontend and backend applications
- ✅ RESTful API design
- ✅ Environment-based configuration
- ✅ Error handling and validation

## Technologies Used

### Backend
- **Node.js** v24.13.0 - JavaScript runtime
- **Express** v5.2.1 - Web framework
- **Mongoose** v9.1.5 - MongoDB ODM
- **bcryptjs** v2.4.3 - Password hashing
- **jsonwebtoken** v9.0.2 - JWT authentication
- **dotenv** v17.2.3 - Environment variables
- **cors** v2.8.5 - Cross-origin resource sharing

### Frontend
- **React** v18.2.0 - UI library
- **Vite** v5.0.8 - Build tool and dev server
- **JavaScript ES6+** - Programming language

### Database
- **MongoDB** v8.2.4 - NoSQL database (Atlas or local)

## License

ISC
