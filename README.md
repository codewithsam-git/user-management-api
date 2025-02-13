# User Management API

This project is a RESTful API for user management built using **Node.js, Express.js, and MySQL**. It allows users to register, log in, fetch user details, update information, and delete accounts.

## Features
- User Registration & Login (with JWT authentication)
- Secure Password Hashing (bcrypt.js)
- Authentication via HTTP-only Cookies
- CRUD Operations for Users
- Protected Routes using Middleware
- Proper Error Handling & Status Codes

## Tech Stack
- **Node.js** (Backend)
- **Express.js** (Routing & API Handling)
- **MySQL** (Database)
- **bcrypt.js** (Password Hashing)
- **jsonwebtoken** (JWT Authentication)
- **dotenv** (Environment Variables Management)
- **cookie-parser** (Handling HTTP Cookies)

## Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/)
- [MySQL](https://www.mysql.com/)
- [Postman](https://www.postman.com/) (Optional for testing API endpoints)

## Installation
### 1. Clone the repository
```sh
git clone https://github.com/codewithsam-git/user-management-api.git
cd user-management-api
```
### 2. Install dependencies
```sh
npm install
```
### 3. Configure Environment Variables
Create a `.env` file in the project root and add the following:
```
JWT_KEY = e5b0f983765c8f7698c4e82b12a5f6e3a7b6c4f097b2d8f1c7f9a0b3a5f8e2d3
DB_HOST= localhost
DB_USER= root
DB_PASS=
DB_NAME= task

```

### 4. Setup MySQL Database
Run the following SQL query to create the required `users` table:
```sql
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 5. Start the Server
```sh
npm start
```
The API will be running at `http://localhost:3000`.

## API Endpoints

### **1. Register a User**
**POST** `/api/users/register`
```json
{
  "name": "Samarth",
  "email": "samarth@example.com",
  "password": "password123"
}
```

### **2. Login User**
**POST** `/api/users/login`
```json
{
  "email": "samarth@example.com",
  "password": "password123"
}
```

### **3. Get All Users (Protected Route)**
**GET** `/api/users`
Requires authentication.
User must be Logged In.

### **4. Get User by ID**
**GET** `/api/users/:id`

### **5. Update User**
**PUT** `/api/users/:id`
```json
{
  "name": "Samarth Updated",
  "email": "samarthupdated@example.com",
  "password": "password123"
}
```

### **6. Delete User**
**DELETE** `/api/users/:id`

## Testing the API
You can use **Postman** to test the API endpoints.

