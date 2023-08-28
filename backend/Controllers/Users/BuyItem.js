const Courses = require("../../Models/Courses");
const Users = require("../../Models/User");

const BuyCourse = async (req, res) => {

  let id = req.query.id;
  let cid = req.query.cid;

  console.log(id, cid);

  try {
    const user = await Users.findOne({ id: id });
    const course = await Courses.findOne({ id: cid });
    const AlreadyBuyed = user.orderedItems.some(item => item.cid === cid);

    if(AlreadyBuyed){
      return res.status(403).json({ message: "You have already purchased the course" });
    }

    const price = course.price;
    const balance = user.moneyBalance;

    if (balance < price) {
      return res.status(402).json({ message: "Please add money to your Wallet" });
    }

    if (!user) {
      return res.status(404).json({ message: "No such User Found" });
    }
    if (!course) {
      return res.status(404).json({ message: "No such Course Found" });
    }

    user.orderedItems.push(cid); // Add the course ID to orderedItems array
    user.moneyBalance -= price; // Reduce the balance by the course price

    await user.save(); // Save the updated user data

    res.status(200).json({ message: "Congratulation for Buying a new Course" });

  } catch (err) {
    console.log("error: ", err);
    res.status(500).json({ message: "Something Went Wrong" });
  }
};

module.exports = BuyCourse;
