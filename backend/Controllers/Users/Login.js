const bcrypt = require("bcryptjs");
const UsersModel = require("../../models/User.js");

const login = async (req, res) => {
  try {
    const { username, password } = req.headers;

    if (!req.body) {
      return res.status(400).json({ message: "Please Fill the Data" }); // Bad Request
    }

    let UserData = await UsersModel.findOne({$or: [{'email': username}, {'username': username}]}).exec();

    console.log("User Login:", UserData);

    if (!UserData) {
      return res.status(404).json({ message: "User Not Found" });
    }

    if (UserData.Password === null) {
      res.status(401).json({ message: "Invalid Credentials" });
      return;
    }
    const isMatch = await bcrypt.compare(password, UserData.password); // Decrypt Password (Secutity Feature)
    const token = await UserData.generateAuthToken();
    console.log("Token", token);

    if (!isMatch) {
      console.log("Login failed");
      res.status(401).json({ message: "Invalid Credentials" });
    } else {
      res
        .status(200)
        .cookie("jwt", token, {
          maxAge: 900000,
          httpOnly: true,
        })
        .json({ token, role: UsersModel.role});
    }
  } catch (err) {
    console.log("error: ", err);
  }
};

module.exports = login;
