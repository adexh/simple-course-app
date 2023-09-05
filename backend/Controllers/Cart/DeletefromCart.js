const Courses = require("../../models/Courses");
const Users = require("../../models/User");

const deleteCart = async (req, res) => {
    try {
      if (!req.body) {
        return res.status(400).json({ message: "Data Not appropriate" }); // Bad Request
      }
        const id = req.user._id;
        const itemId = req.body.itemId;

        const User = await Users.findById({ _id:id });
      
        User.cart.pull(itemId);
        await User.save();
        res.json({ message: "Item removed from the cart successfully." });
    } catch (err) {
      console.log("Error: ", err);
      res.status(500).json({ message: "Something went wrong." });
    }
}

module.exports = deleteCart;