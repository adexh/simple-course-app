import express, { type RequestHandler } from 'express'
import DisplayCart from '../Controllers/Cart/DisplayCart'
import AddCart from '../Controllers/Cart/AddtoCart'
import DeletefromCart from '../Controllers/Cart/DeletefromCart'
import DisplayCourses from '../Controllers/Courses/CoursesAll'
import CourseDetails from '../Controllers/Courses/Course'
import auth from '../middlewares/userAuth'
// const BuyItem = require("../Controllers/Users/BuyItem");

const Route = express.Router()

Route.get('/displayCart', auth, DisplayCart as RequestHandler)
Route.post('/addToCart', auth, AddCart as RequestHandler)
Route.post('/deleteFromcart', auth, DeletefromCart as RequestHandler)
// Route.post('/buyItem', BuyItem);
Route.get('/displayCourses', DisplayCourses as RequestHandler)
Route.get('/details', CourseDetails as RequestHandler)

export default Route
