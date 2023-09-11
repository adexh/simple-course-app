import jwt, { type Secret } from 'jsonwebtoken'
import { type RequestHandler } from 'express'

const SECRET: Secret = process.env.SECRET

const auth: RequestHandler = (req, res, next) => {
  if (req.cookies.jwt === undefined) { return res.sendStatus(401) }
  const token = req.cookies.jwt
  jwt.verify(token, SECRET, (err: any, decodedUser: any) => {
    if (err !== undefined) {
      return res.sendStatus(403)
    }
    if (decodedUser !== undefined) {
      req.user = decodedUser
      next()
    }
  })
}

export default auth
