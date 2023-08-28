const courses = require("../../Models/Courses");
const seller = require("../../Models/Seller");

async function CreateCourse(req, res) {
  console.log("Reached Inside Create Course");
  try {
    let { Title, Description, Price, ImageLink, Published, CreatedBy } = req.body; // input from user

    console.log(req.body);

    if (!req.body) {
      res.status(400);
      return res.send(JSON.stringify({ message: "all input required" }));
    }

    {
      const CreateCourse = await courses.create({
        title: Title,
        description: Description,
        price: Price,
        imageLink: ImageLink,
        published: Published,
        createdBy: CreatedBy,
      });

      if (CreateCourse) {
        console.log("Created the Data");
        // Update the ID of course into Seller profile.published Courses
        const sellerdata = await seller.findOne({id:CreatedBy});
        const updatecourse = await sellerdata.publishedCourses.push(CreateCourse._id);
        await sellerdata.save(); 
        if(!updatecourse){
          return res.status(500).json({ msg: "Problemm in storing course" });
        }

        return res.status(201).json({ msg: "Your Course Generate" });
      } else {
        return res.status(500).json({ msg: "Internal Server Error" });
      }
    }
  } catch (err) {
    console.log("Error in Register route:", err.message);
    return res.status(500);
  }
}

module.exports = CreateCourse;
