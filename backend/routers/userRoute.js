const express = require("express");
const Route = express.Router();

const Register = require("../Controllers/Users/Register");
const Login = require("../Controllers/Users/Login");

Route.post('/userRegister',Register);
Route.get('/userLogin',Login);

module.exports = Route;