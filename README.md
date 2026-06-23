# 🔐 Authentication System (Node.js + Express + JWT)

A secure authentication API built with **Node.js**, **Express**, **MongoDB**, and **JSON Web Tokens (JWT)**. This project provides user registration, login, token-based authentication, refresh token support, and protected routes, following best practices for scalable backend applications.

---

## 🚀 Features

- User Registration
- User Login
- JWT Authentication
- Access & Refresh Tokens
- Protected Routes with Middleware
- Secure Password Hashing with bcrypt
- User Logout
- Session Persistence
- Scalable Folder Structure
- Production-ready Authentication Flow

---

## 🛠️ Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB**
- **Mongoose**
- **JSON Web Token (JWT)**
- **bcrypt**
- **dotenv**

---

## 📂 Project Structure

```bash
src/
│
├── controllers/
│   └── authController.js
│
├── models/
│   └── user.js
│
├── routes/
│   └── authRoutes.js
│
├── middlewares/
│   ├── authMiddleware.js
│   └── roleMiddleware.js
│
├── config/
│   └── db.js
│
└── server.js
```

---

## 🔄 Authentication Flow

### 1. Register User

**Endpoint**

```http
POST /api/v1/auth/register
```

#### Request Body

```json
{
  "fullName": "John Doe",
  "email": "john@gmail.com",
  "password": "123456",
  "confirmPassword": "123456"
}
```

#### Process

- Password is hashed using bcrypt.
- User data is stored in MongoDB.

---

### 2. Login User

**Endpoint**

```http
POST /api/v1/auth/login
```

#### Request Body

```json
{
  "email": "john@gmail.com",
  "password": "123456"
}
```

#### Process

- Password is verified.
- Generates:
  - Access Token (short-lived)
  - Refresh Token (long-lived)
- Tokens are returned to the client.

---

### 3. Refresh Access Token

**Endpoint**

```http
POST /api/v1/auth/refresh
```

#### Request Body

```json
{
  "refreshToken": "your_refresh_token"
}
```

#### Process

- Refresh token is verified.
- A new access token is generated.

---

### 4. Logout User

**Endpoint**

```http
POST /api/v1/auth/logout
```

#### Process

- Refresh token is removed.
- User session is invalidated.

---

## 🔒 Protected Routes

Protect routes using the authentication middleware:

```javascript
router.get("/profile", authMiddleware, getUserProfile);
```

### Authorization Header

```text
Authorization: Bearer YOUR_ACCESS_TOKEN
```

### Middleware Workflow

1. Extract token from request header.
2. Verify JWT token.
3. Attach authenticated user to `req.user`.
4. Continue to protected route.

---

## 🎫 Token Structure

### Access Token

- Short lifespan (typically 15 minutes)
- Used for authenticated API requests

### Refresh Token

- Long lifespan
- Stored securely
- Used to generate new access tokens

---

## 📌 API Endpoints

| Method | Endpoint | Description |
|----------|----------|-------------|
| POST | `/api/v1/auth/register` | Register a new user |
| POST | `/api/v1/auth/login` | Login user |
| POST | `/api/v1/auth/refresh` | Generate new access token |
| POST | `/api/v1/auth/logout` | Logout user |
| GET | `/api/v1/user/profile` | Access protected profile |

---



### Headers

```text
Authorization: Bearer YOUR_ACCESS_TOKEN
```

### Example Request

```http
GET /api/v1/user/profile
```

---

## ⚙️ Installation

### Clone the repository

```bash
git clone https://github.com/yourusername/authentication-system.git
```

### Navigate into the project

```bash
cd authentication-system
```

### Install dependencies

```bash
npm install
```

---

##  Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
MONGO_URI=your_database_url
JWT_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
```

---

## ▶️ Running the Application

Development mode:

```bash
npm run dev
```

Production mode:

```bash
npm start
```

---

## 🔐 Security Best Practices

- Hash passwords using bcrypt.
- Never store plain-text passwords.
- Store secrets in environment variables.
- Validate user input.
- Use HTTPS in production.
- Use short-lived access tokens.
- Implement refresh token rotation for enhanced security.

