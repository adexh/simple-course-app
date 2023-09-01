const mongoose = require("mongoose");
const { Schema } = mongoose;
const jwt = require(`jsonwebtoken`);

const userSchema = mongoose.Schema({
  name: { type: String },
  email: { type: String },
  username: { type: String, required: true, unique: true },
  password: { type: String },
  cart: [{
    type: Schema.Types.ObjectId,
    ref: "courses"}
  ],
  role: { type: String, default: "user" }, // Role of User
  moneyBalance: { type: Number, default: 0 }, // Money balance of the user
  orderedItems: {
    type: [String],
    ref: "Cart",
    default: [0],
  },
});

// Generate Auth Token
userSchema.methods.generateAuthToken = async function () {
  try {
    let token = jwt.sign({ _id: this._id }, process.env.SECRET);
    return token;
  } catch (err) {
    console.log(err);
  }
};

module.exports = mongoose.model("users", userSchema);