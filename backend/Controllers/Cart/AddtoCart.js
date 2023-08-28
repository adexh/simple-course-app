const CartItem = require("../../Models/Courses");
const Users = require("../../Models/User");

const cart = async (req, res) => {
    try {
        const { id } = req.query.id;
        const { itemId } = req.query.itemId;
        console.log(JSON.stringify(req.body));
      
        if (!req.body) {
          return res.status(400).json({ message: "Data Not appropriate" }); // Bad Request
        }

        const Course = await CartItem.findOne({ itemId });
        const user = await Users.findOne({ _id:id });
      
        if (!Course) {
          return res.status(404).json({ message: "No Such Product Found." });
        }
        if(!user){
            return res.status(404).json({ message: "No Such User Found." });
        }
      
        // Add the ID of this course, to user's data->cart->id array.
        user.cart.push(itemId);
        await user.save();
    
        res.json({ message: "Item added to the cart successfully." });
      
      } catch (err) {
        console.log("Error: ", err.message);
        res.status(500).json({ message: "Something went wrong." });
      }
      
      
}

module.exports = cart;
