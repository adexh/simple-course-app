import React, { useEffect } from "react";
import { useSessionContext } from "../contexts/auth_context";
const env = import.meta.env;
import axios from "axios";

function Course(props) {
  return <div>
      <h2>{props.title}</h2>
  </div>
}

 function ShowCourses() {
    const [courses, setCourses] = React.useState([]);
    const { isAuthenticated } = useSessionContext();
    
    useEffect(()=>{
      let options = {
        headers: {
          "Authorization" : "Bearer " + localStorage.getItem('token')
        }
      }
      axios.get(env.VITE_API + '/admin/courses/',options).then(resp=>{
        console.log("Setting Courses");
        setCourses(resp.data);
      })
    },[])
    // Add code to fetch courses from the server
    // and set it in the courses state variable.
    return <div>
        <h1>Create Course Page</h1>
        {courses.map(c => <Course title={c.title} key={c._id} listId={c._id}/>)}
    </div>
}



export default ShowCourses;