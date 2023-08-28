const Courses = require('../../Models/Courses') ;

const UnpublishCourse = async (req, res) => {
  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ message: "Course ID is missing in the request" });
    }

    const course = await Courses.findOne({ _id: id });

    if (course) {
      course.publish = false;
      await course.save(); // Save the updated course to the database
      return res.status(200).json({ message: "Course unpublished successfully" });
    } else {
      return res.status(404).json({ message: "Course not found" });
    }

  } catch (err) {
    console.log("Error: ", err.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = UnpublishCourse;
