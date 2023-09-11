import { type Request, type Response } from 'express'
import Courses from '../../models/Courses'
import Users from '../../models/User'

const cart = async (req: Request, res: Response): Promise<void> => {
  try {
    if (req.body === undefined) {
      res.status(400).json({ message: 'Data Not appropriate' }) // Bad Request
      return
    }
    const id = req.user?._id
    const itemId = req.body.itemId

    const Course = await Courses.findOne({ _id: itemId })
    const User = await Users.findOne({ _id: id })
    const cartItem = await Users.findOne({ _id: id, cart: itemId })

    if (Course === undefined || Course === null) {
      res.status(404).json({ message: 'No Such Product Found.' })
      return
    }
    if (User === undefined || User === null) {
      res.status(404).json({ message: 'No Such User Found.' })
      return
    }
    if (cartItem !== undefined && cartItem !== null) {
      res.status(200).json({ message: 'Item already present in the Cart' })
      return
    }

    // Add the ID of this course, to user's data->cart->id array.
    User.cart.push(itemId)
    await User.save()

    res.json({ message: 'Item added to the cart successfully.' })
  } catch (err) {
    console.log('Error: ', err)
    res.status(500).json({ message: 'Something went wrong.' })
  }
}

export default cart
