import { type Request, type Response } from 'express'
import Users from '../../models/User'

const deleteCart = async (req: Request, res: Response): Promise<void> => {
  try {
    if (req.body === undefined) {
      res.status(400).json({ message: 'Data Not appropriate' })// Bad Request
      return
    }
    const id = req.user?._id
    const itemId = req.body.itemId

    const User = await Users.findById({ _id: id })

    if (User === null || User === undefined) {
      res.status(400).json({ message: 'User not found' })// Bad Request
      return
    }

    User.cart?.pull(itemId)
    await User.save()
    res.json({ message: 'Item removed from the cart successfully.' })
  } catch (err) {
    console.log('Error: ', err)
    res.status(500).json({ message: 'Something went wrong.' })
  }
}

export default deleteCart
