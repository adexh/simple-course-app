const express = require("express");
const Route = express.Router();

const DisplayCart = require("../Controllers/Cart/DisplayCart");
const AddCart = require("../Controllers/Cart/AddtoCart");
const DeletefromCart = require("../Controllers/Cart/DeletefromCart");
// const BuyItem = require("../Controllers/Users/BuyItem");
const DisplayCourses = require("../Controllers/Courses/CoursesAll");
const CourseDetails = require("../Controllers/Courses/Course");
const auth = require("../middlewares/userAuth");

Route.get('/displayCart', auth, DisplayCart);
Route.post('/addToCart',auth , AddCart);
Route.post('/deleteFromcart',auth ,DeletefromCart);
// Route.post('/buyItem', BuyItem);
Route.get('/displayCourses', DisplayCourses );
Route.get('/details', CourseDetails);

module.exports = Route;