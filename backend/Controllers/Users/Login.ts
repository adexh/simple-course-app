import { type Request, type Response } from 'express'
import bcrypt from 'bcryptjs'
import UsersModel from '../../models/User.js'

const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const username = req.headers.username as string
    const password = req.headers.password as string

    if (req.body === undefined) {
      res.status(400)
      res.json({ message: 'Please Fill the Data' }) // Bad Request
      return
    }

    const UserData = await UsersModel.findOne({ $or: [{ email: username }, { username }] }).exec()

    if (UserData === undefined || UserData === null) {
      res.status(404).json({ message: 'User Not Found' })
      return
    }

    if (UserData.password === null) {
      res.status(401).json({ message: 'Invalid Credentials' })
      return
    }
    const isMatch = await bcrypt.compare(password, UserData.password) // Decrypt Password (Secutity Feature)
    const token = UserData.generateAuthToken()

    if (!isMatch) {
      console.log('Login failed')
      res.status(401).json({ message: 'Invalid Credentials' })
    } else {
      res
        .status(200)
        .cookie('jwt', token, {
          maxAge: 900000,
          httpOnly: true,
          sameSite: 'none',
          secure: true
        })
        .json({ name: UserData.name, role: UserData.role, username: UserData.username, email: UserData.email, id: UserData._id })
    }
  } catch (err) {
    console.log('error: ', err)
    res.status(500)
  }
}

export default login
