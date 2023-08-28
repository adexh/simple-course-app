const user = require("../../models/User");
const bcrypt = require("bcryptjs");

async function register(req, res) {
  console.log("Reached Inside Register Route");
  try {
    let { name, email, password, username } = req.body; // input from user
    console.log(req.body );

    if (!req.body) {
      res.status(400);
      return res.send(JSON.stringify({ message: "all input required" }));
    }

    var oldUser = await user.findOne({ username });
    if(oldUser){
      return (
        res.status(409).json({
            message: "Username exists!",
          }
        )
      );
    } 

    var oldUser = await user.findOne({ email });
    if (oldUser) {
      return (
        res.status(409).json({
            message: "Email exists!",
          }
        )
      );
    }

    const salt = bcrypt.genSaltSync(10);

    const hashedPassword = bcrypt.hashSync(password, salt); // created hashed Password for security
    {
      const Createuser = await user.create({
        name,
        email,
        username,
        password: hashedPassword,
      });

      if(Createuser){
        console.log("Created the Data");
        return res.status(201).json({msg:"Your ID Generate"});
      }
      else{
        return res.status(500).json({msg:"Internal Server Error"});
      }
    }

  } catch (err) {
    console.log("Error in Register route:", err.message);
    return res.status(500);
  }
}

module.exports = register;