const User = require("../../Models/User");
const Courses = require("../../Models/Courses");

const cart = async (req, res) => {
  try {
    let ID = req.query.ID;

    if (!ID) {
      return res.status(400).json({ message: "No user ID found in the request body." }); // Bad Request
    }

    const userData = await User.findOne({ id: ID });

    if (!userData) {
      return res.status(404).json({ message: "User not found." });
    }

    const cartItems = userData.cart; // Assuming `cart` is an array of course IDs

    if (cartItems.length === 0) {
      return res.status(404).json({ message: "No items found in the cart." });
    }

    // Fetch the courses based on the IDs in the cart
    const coursesInCart = await Courses.find({ id: { $in: cartItems } });

    // Send the cart items in JSON format
    res.json(coursesInCart);

  } catch (err) {
    console.log("Error: ", err.message);
    res.status(500).json({ message: "Something went wrong." });
  }
}

module.exports = cart;
