const express = require('express');
const isValid = require('./isValid');
const cookieParser = require("cookie-parser");
const { register } = require('./Controllers/register');
const { login } = require('./Controllers/login');
const { users } = require('./Controllers/users');
const { getUser } = require('./Controllers/getUser');
const { updateUser } = require('./Controllers/updateUser');
const { deleteUser } = require('./Controllers/deleteUser');

const app = express()
app.use(cookieParser())
app.use(express.json())

app.post("/api/users/register", register);

app.post("/api/users/login", login)

app.get("/api/users", isValid, users);

app.get('/api/users/:id', getUser);

app.put('/api/users/:id', updateUser)

app.delete('/api/users/:id', deleteUser);

app.listen(3000, () => {
    console.log("Running")
});
