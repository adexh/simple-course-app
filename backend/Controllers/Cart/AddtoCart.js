const Courses = require("../../models/Courses");
const Users = require("../../models/User");

const cart = async (req, res) => {
    try {

      if (!req.body) {
        return res.status(400).json({ message: "Data Not appropriate" }); // Bad Request
      }
        const id = req.user._id;
        const itemId = req.body.itemId;

        const Course = await Courses.findOne({ _id:itemId });
        const User = await Users.findOne({ _id:id })
      
        if (!Course) {
          return res.status(404).json({ message: "No Such Product Found." });
        }
        if(!User){
            return res.status(404).json({ message: "No Such User Found." });
        }
      
        // Add the ID of this course, to user's data->cart->id array.
        User.cart.push(itemId);
        await User.save();
    
        res.json({ message: "Item added to the cart successfully." });
      
      } catch (err) {
        console.log("Error: ", err);
        res.status(500).json({ message: "Something went wrong." });
      }
      
      
}

module.exports = cart;
