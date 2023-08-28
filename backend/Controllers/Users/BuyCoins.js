const UserModel = require("../../Models/User");

const BuyCoins = async (req, res) => {
  let ID = req.params.ID
  let CoinPrice  = req.paramms.CoinPrice;
  console.log(req.body);
  
  try {
    const user = await UserModel.findOne({ id: ID });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Razor pay setup
    const updatedUser = await user.updateOne({ moneyBalance: CoinPrice });

    if (updatedUser) {
      return res.status(200).json({ message: "Balance Increased Successfully" });
    } else {
      return res.status(400).json({ message: "Error, Please Contact" });
    }
  } catch (error) {
    console.log(error, "Something went wrong");
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = BuyCoins;
