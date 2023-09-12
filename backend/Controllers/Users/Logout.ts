import { type Request, type Response } from 'express'

const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    res
      .status(200)
      .cookie('jwt', '', {
        maxAge: 0,
        httpOnly: true,
        sameSite: 'none',
        secure: true
      }).send()
  } catch (err) {
    console.log('error: ', err)
    res.status(500)
  }
}

export default logout
