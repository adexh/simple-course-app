const User = require("../../models/User");

const cart = async (req, res) => {
  try {
    let ID = req.user._id;

    const userData = await User.findOne({ _id: ID }).populate({path:'cart'}).exec();

    if (!userData) {
      return res.status(404).json({ message: "User not found." });
    }

    const cartItems = userData.cart;

    // Send the cart items in JSON format
    res.json({cartItems});

  } catch (err) {
    console.log("Error: ", err);
    res.status(500).json({ message: "Something went wrong." });
  }
}

module.exports = cart;
