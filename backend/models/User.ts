import mongoose, { Types, type Model } from 'mongoose'
import jwt from 'jsonwebtoken'

interface Cart {
  _id: Types.ObjectId
  ref: string
}

interface IUser extends mongoose.Document {
  name: string
  email: string
  username: string
  password: string
  cart: Types.DocumentArray<Cart>
  role: string
  moneyBalance: number
  orderedItems: Types.Array<string>
}

interface IUserMethods {
  generateAuthToken: () => string | undefined
}

type UserModel = Model<IUser, Record<string, 'unknown'>, IUserMethods>

const userSchema = new mongoose.Schema<IUser, UserModel, IUserMethods>({
  name: { type: String },
  email: { type: String },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  cart: [{
    type: Types.ObjectId,
    ref: 'courses'
  }
  ],
  role: { type: String, default: 'user' }, // Role of User
  moneyBalance: { type: Number, default: 0 }, // Money balance of the user
  orderedItems: {
    type: [String],
    ref: 'Cart'
  }
}, {
  methods: {
    generateAuthToken () {
      try {
        const token = jwt.sign({ _id: this._id }, process.env.SECRET)
        return token
      } catch (err) {
        console.log(err)
      }
    }
  }
})

export default mongoose.model<IUser, UserModel>('users', userSchema)
