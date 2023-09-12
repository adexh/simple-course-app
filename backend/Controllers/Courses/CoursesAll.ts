import { type Request, type Response } from 'express'
import Courses from '../../models/Courses'

const ViewAllCourses = async (req: Request, res: Response): Promise<void> => {
  try {
    const coursesdata = await Courses.find({ published: true })
    if (coursesdata !== undefined && coursesdata !== null) {
      res.status(200).json({ coursesdata })
    } else {
      res.status(404).json({ message: 'Did not found any courses.' })
    }
  } catch (error) {
    console.log('error : ', error)
    res.status(500).json({ message: 'Internal server error.' })
  }
}
export default ViewAllCourses
