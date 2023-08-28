const mongoose = require("mongoose");
const jwt = require(`jsonwebtoken`);

const CourseSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  imageLink: { type: String, required: true },
  published: { type: Boolean, default: false, required: true },
  createdBy: { type: String, required: true },
});

// Generate Auth Token
CourseSchema.methods.generateAuthToken = async function () {
  try {
    let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
    this.token = token;
    await this.save();
    return token;
  } catch (err) {
    console.log(err);
  }
};

module.exports = mongoose.model("courses", CourseSchema);
