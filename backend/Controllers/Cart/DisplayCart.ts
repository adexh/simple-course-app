import User from '../../models/User'
import { type Request, type Response } from 'express'

const cart = async (req: Request, res: Response): Promise<void> => {
  try {
    const ID = req.user?._id

    const userData = await User.findOne({ _id: ID }).populate({ path: 'cart' }).exec()

    if (userData === undefined || userData === null) {
      res.status(404).json({ message: 'User not found.' })
      return
    }

    const cartItems = userData.cart

    // Send the cart items in JSON format
    res.json({ cartItems })
  } catch (err) {
    console.log('Error:', err)
    res.status(500).json({ message: 'Something went wrong.' })
  }
}

export default cart
