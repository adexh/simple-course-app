import { type Request, type Response } from 'express'
import Courses from '../../models/Courses'
import User from '../../models/User'

const CourseDetails = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log(req.headers)
    if (req.headers.id === undefined) {
      res.status(500).json({ msg: 'Id not present in header' })
      return
    }
    const coursesdata = await Courses.findOne({ _id: req.headers.id, published: true })

    let inCart
    if (req.headers.userid !== undefined) {
      const added = await User.findOne({ _id: req.headers.userid, cart: req.headers.id })
      if (added !== undefined && added !== null) {
        inCart = true
      }
    }

    if (coursesdata !== undefined && coursesdata !== null) {
      res.status(200).json({ coursesdata, inCart })
    } else {
      res.status(404).json({ message: 'Did not found any courses.' })
    }
  } catch (error) {
    console.log('error : ', error)
    res.status(500).json({ message: 'Internal server error.' })
  }
}
export default CourseDetails
