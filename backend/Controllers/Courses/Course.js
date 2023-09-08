let Courses = require("../../models/Courses");
const User = require("../../models/User");

const CourseDetails = async (req, res)=>{
    try {
        console.log(req.headers);
        if(req.headers.id == undefined){
          return res.status(500).json({msg:"Id not present in header"});
        }
        let coursesdata = await Courses.findOne({_id:req.headers.id,published:true});

        let inCart;
        if(req.headers.userid){
          let added = await User.findOne({_id:req.headers.userid,cart:req.headers.id});
          if(added){
            inCart=true;
          }
        }

        if(coursesdata){
           return res.status(200).json({coursesdata,inCart});
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