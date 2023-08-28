const user = require("../../Models/Seller");
const bcrypt = require("bcryptjs");

async function register(req, res) {
  console.log("Reached Inside Register Route");
  try {
    let {
      Name,
      Email,
      Username,
      Password,
      ProfilePicture,
      Shortbio,
      Contactinfo,
      Subject,
      Qualification,
      Website,
      Paymentdetails,
    } = req.body; // input from user

    console.log(
      Name,
      Email,
      Username,
      Password,
      ProfilePicture,
      Shortbio,
      Contactinfo,
      Subject,
      Qualification,
      Website,
      Paymentdetails,
    );

    if (!(Email && Username && Password)) {
      res.status(400);
      return res.send(
        JSON.stringify({ message: "Atleast Fill Email and Username" })
      );
    }

    const oldUser = await user.findOne({ email : Email });

    if (oldUser) {
      return (
        res.status(409),
        res.send(
          JSON.stringify({
            message:
              "Already Register as User, please Use different Username and Email",
          })
        )
      );
    }

    const salt = bcrypt.genSaltSync(10);

    const hashedPassword = bcrypt.hashSync(Password, salt); // created hashed Password for security
    const EncypriptedPayment = bcrypt.hashSync(Paymentdetails, salt); // created hashed Password for security
    {
      const Createuser = await user.create({
        email : Email,
        username : Username,
        password: hashedPassword,
        name : Name,
        profilePicture : ProfilePicture,
        shortbio : Shortbio,
        contactinfo : Contactinfo,
        subject : Subject,
        qualification : Qualification,
        website : Website,
        paymentdetails : EncypriptedPayment
      });

      if (Createuser) {
        console.log("Created the Data");
        return res.status(201).json({ msg: "Created the Data" });
      } else {
        return res.status(500).json({ msg: "Internal Server Error" });
      }
    }
    
  } catch (err) {
    console.log("Error in Register route:", err.message);
    return res.status(500);
  }
}

module.exports = register;
