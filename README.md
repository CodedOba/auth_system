# 🔐 Authentication System (Node.js + Express + JWT)

## 📌 Overview

This project implements a secure **authentication system** for a backend application (e.g., hotel booking platform). It handles:

* User registration
* User login
* Logout
* Token-based authentication (JWT)
* Role-based authorization (optional)
* Refresh token system (for persistent sessions)

---

## 🧠 How It Works (Simple Explanation)

1. 👤 User registers → account is created
2. 🔑 User logs in → receives **Access Token + Refresh Token**
3. 🛡️ Access Token is used to access protected routes
4. 🔄 Refresh Token is used to get a new Access Token when it expires
5. 🚪 Logout → refresh token is removed (user is logged out)

---

## ⚙️ Technologies Used

* Node.js
* Express.js
* MongoDB (Mongoose)
* JSON Web Tokens (JWT)
* bcrypt (password hashing)

---

## 📁 Project Structure

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

## 🔐 Authentication Flow

### 1. 📝 Register

**Endpoint**

```http
POST /api/v1/auth/register
```

**Request Body**

```json
{
  "fullName": "John Doe",
  "email": "john@gmail.com",
  "password": "123456",
  "confirmPassword": "123456"
}
```

**What Happens**

* Password is hashed using bcrypt
* User is saved in the database

---

### 2. 🔑 Login

**Endpoint**

```http
POST /api/v1/auth/login
```

**Request Body**

```json
{
  "email": "john@gmail.com",
  "password": "123456"
}
```

**What Happens**

* Password is compared using bcrypt
* If valid:

  * Access Token is generated (short-lived)
  * Refresh Token is generated (long-lived)
* Tokens are sent to the user

---

### 3. 🔄 Refresh Token

**Endpoint**

```http
POST /api/v1/auth/refresh
```

**Request Body**

```json
{
  "refreshToken": "your_refresh_token"
}
```

**What Happens**

* Backend verifies refresh token
* Generates new access token

---

### 4. 🚪 Logout

**Endpoint**

```http
POST /api/v1/auth/logout
```

**What Happens**

* Refresh token is removed from database
* User session is invalidated

---

## 🛡️ Protected Routes

Use `authMiddleware` to protect routes:

```js
router.get("/profile", authMiddleware, getUserProfile);
```

### How It Works

* Reads token from header:

```txt
Authorization: Bearer <token>
```

* Verifies token
* Attaches user info to `req.user`

---

## 🧩 Role-Based Authorization

Optional middleware:

```js
router.post("/admin", authMiddleware, roleMiddleware("admin"), handler);
```

### What It Does

* Checks user role
* Allows access only if role matches

---

## 🔑 Token Structure

### Access Token

* Short lifespan (e.g., 15 minutes)
* Used for API requests

### Refresh Token

* Long lifespan
* Stored in DB
* Used to generate new access tokens

---

## ⚠️ Security Best Practices

* Hash passwords using bcrypt
* Never store plain passwords ❌
* Keep JWT secrets in `.env`
* Use HTTPS in production
* Validate user input

---

## 🧪 Testing (Postman)

### Headers

```txt
Authorization: Bearer YOUR_ACCESS_TOKEN
```

### Example Request

```http
GET /api/v1/user/profile
```

---

## 🚀 Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Setup environment variables

```env
PORT=5000
MONGO_URI=your_database_url
JWT_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
```

### 3. Run server

```bash
npm run dev
```

---

## 🎯 Summary

This authentication system provides:

* Secure login & registration
* Token-based authentication
* Session persistence using refresh tokens
* Protected routes with middleware
* Scalable structure for production apps

---

## 💡 Future Improvements

* Email verification 📧
* Forgot/reset password 🔁
* OAuth (Google login) 🔐
* Rate limiting & brute-force protection

---

**Built for scalable backend systems 🚀**
