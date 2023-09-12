import { type Request, type Response } from 'express'
import user from '../../models/User'
import bcrypt from 'bcryptjs'

const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { fullName: name, email, password, username } = req.body // input from user

    if (req.body === undefined) {
      res.status(400)
      res.send(JSON.stringify({ message: 'All input required' }))
      return
    }

    let oldUser = await user.findOne({ username })
    if (oldUser !== undefined && oldUser !== null) {
      res.status(409).json({ message: 'Username exists!' })
      return
    }

    oldUser = await user.findOne({ email })
    if (oldUser !== undefined && oldUser !== null) {
      res.status(409).json({ message: 'Email exists!' })
      return
    }

    const salt = bcrypt.genSaltSync(10)

    const hashedPassword = bcrypt.hashSync(password, salt) // created hashed Password for security
    {
      const Createduser = await user.create({
        name,
        email,
        username,
        password: hashedPassword
      })

      const token = Createduser.generateAuthToken()
      if (Createduser !== undefined && Createduser !== null) {
        res.status(201)
          .cookie('jwt', token, {
            maxAge: 900000,
            httpOnly: true,
            sameSite: 'none',
            secure: true
          })
          .json({ name: Createduser.name, role: Createduser.role, username: Createduser.username, email: Createduser.email, id: Createduser._id })
      } else {
        res.status(500).json({ msg: 'Internal Server Error' })
      }
    }
  } catch (err) {
    console.log('Error in Register route:', err.message)
    res.status(500)
  }
}

export default register
