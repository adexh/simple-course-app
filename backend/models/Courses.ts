import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'

const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  imageLink: { type: String, required: true },
  published: { type: Boolean, default: false, required: true },
  createdBy: { type: String, required: true }
})

// Generate Auth Token
CourseSchema.methods.generateAuthToken = async function () {
  try {
    const token = jwt.sign({ _id: this._id }, process.env.SECRET)
    this.token = token
    await this.save()
    return token
  } catch (err) {
    console.log(err)
  }
}

export default mongoose.model('courses', CourseSchema)
