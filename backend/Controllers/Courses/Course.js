let Courses = require("../../models/Courses");

const CourseDetails = async (req, res)=>{
    try {
        console.log(req.headers);
        if(req.headers.id == undefined){
          return res.status(500).json({msg:"Id not present in header"});
        }
        const coursesdata = await Courses.findOne({_id:req.headers.id,published:true});
        if(coursesdata){
           return res.status(200).json({coursesdata});
        }
        else{
            return res.status(404).json({message:"Did not found any courses."});
        }
    } catch (error) {
        console.log("error : ",error);
        return res.status(500).json({ message: "Internal server error." });
    }
}
module.exports = CourseDetails;