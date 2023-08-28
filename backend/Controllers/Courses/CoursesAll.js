let Courses = require("../../models/Courses");

const ViewAllCourses = async (req, res)=>{
    try {
        const coursesdata = await Courses.find({published:true});
        if(coursesdata){
            res.status(200).json({coursesdata});
        }
        else{
            res.status(404).json({message:"Did not found any courses."});
        }
    } catch (error) {
        console.log("error : ",error);
        res.status(500).json({ message: "Internal server error." });
    }
}
module.exports = ViewAllCourses;

