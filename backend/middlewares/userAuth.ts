import jwt, { type Secret } from 'jsonwebtoken'
import { type RequestHandler } from 'express'

const SECRET: Secret = process.env.SECRET

const auth: RequestHandler = (req, res, next) => {
  if (req.cookies.jwt === undefined) { 
    res.sendStatus(401)
    return
  }
  const token = req.cookies.jwt
  jwt.verify(token, SECRET, (err: any, decodedUser: any) => {
    if (err !== undefined && err !== null) {
      console.log("err : ",err, typeof err, JSON.stringify(err));
      res.sendStatus(403)
      return
    }
    if (decodedUser !== undefined) {
      req.user = decodedUser
      next()
    }
  })
}

export default auth
