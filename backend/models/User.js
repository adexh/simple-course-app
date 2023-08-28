const mongoose = require("mongoose");
const jwt = require(`jsonwebtoken`);

const userSchema = mongoose.Schema({
  name: { type: String },
  email: { type: String },
  username: { type: String, required: true, unique: true },
  password: { type: String },
  token: String,
  cart: {
    type: [String],
    ref: "Cart",
    default: [0],
  },
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
    this.token = token;
    await this.save();
    return token;
  } catch (err) {
    console.log(err);
  }
};

module.exports = mongoose.model("users", userSchema);