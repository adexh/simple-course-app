const seller = require("../../Models/Seller");

async function SellerProfileForm(req, res) {
  console.log("Reached Inside Register Route");
  try {
    let {
      Name,
      Email,
      Username,
      ProfilePicture,
      Shortbio,
      Contactinfo,
      Subject,
      Qualification,
      Website,
      userId,
    } = req.body; // input from user

    console.log(req.body);

    if (!req.body) {
      res.status(400);
      return res.send(
        JSON.stringify({ message: "Please fill all the details" })
      );
    }

    const oldUser = await seller.findOne({ id: userId });

    if (!oldUser) {
      return (
        res.status(404),
        res.send(
          JSON.stringify({
            message: "We can't able to find your ID, Please contact",
          })
        )
      );
    }

    const UpdateSeller = await seller.updateMany({
      email: Email,
      name: Name,
      profilePicture: ProfilePicture,
      shortbio: Shortbio,
      contactinfo: Contactinfo,
      subject: Subject,
      qualification: Qualification,
      website: Website,
    });

    if (UpdateSeller) {
      console.log("Updated the Data");
      return res.status(201).json({ msg: "Updated Successfully" });
    } else {
      return res.status(500).json({ msg: "Internal Server Error" });
    }
  } catch (err) {
    console.log("Error in Register route:", err.message);
    return res.status(500);
  }
}

module.exports = SellerProfileForm;
