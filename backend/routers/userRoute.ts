import express, { type RequestHandler } from 'express'
import auth from '../middlewares/userAuth'

import Register from '../Controllers/Users/Register'
import Login from '../Controllers/Users/Login'
import Logout from '../Controllers/Users/Logout'
const Route = express.Router()

Route.post('/userRegister', Register as RequestHandler)
Route.get('/userLogin', Login as RequestHandler)
Route.get('/userLogout', Logout as RequestHandler)
Route.get('/auth', auth, (req, res) => {
  res.sendStatus(200)
})
export default Route
