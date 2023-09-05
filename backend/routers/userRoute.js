const express = require("express");
const Route = express.Router();
const auth = require("../middlewares/userAuth");

const Register = require("../Controllers/Users/Register");
const Login = require("../Controllers/Users/Login");
const Logout = require("../Controllers/Users/Logout");

Route.post('/userRegister',Register);
Route.get('/userLogin',Login);
Route.get('/userLogout',Logout);
Route.get('/auth',auth,(req,res)=>{
  res.sendStatus(200);
});
module.exports = Route;