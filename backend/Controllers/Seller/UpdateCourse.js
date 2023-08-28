const Courses = require("../../Models/Courses");

const UpdateCourse = async (req, res) => {
  try {
    let { Title, Description, Price, ImageLink, Published, id } = req.body;
    if (!req.body) {
      return res.status(400).json({ message: "Data missing" });
    }

    const course = await Courses.findOne({ id : id });
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    course.title = Title;
    course.description = Description;
    course.price = Price;
    course.imageLink = ImageLink;
    course.published = Published;

    await course.save();

    res.status(200).json({ message: "Successfully Updated" });
  } catch (error) {
    console.log(error, "Something went Wrong");
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = UpdateCourse;
