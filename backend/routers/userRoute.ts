import express, { type RequestHandler, Request, Response } from 'express'
import auth from '../middlewares/userAuth'

import Register from '../Controllers/Users/Register'
import Login from '../Controllers/Users/Login'
import Logout from '../Controllers/Users/Logout'
const Route = express.Router()

Route.post('/userRegister', Register as RequestHandler)
Route.get('/userLogin', Login as RequestHandler)
Route.get('/userLogout', Logout as RequestHandler)
Route.get('/auth', auth, (req: Request, res: Response) => {
  res.sendStatus(200)
})
export default Route
