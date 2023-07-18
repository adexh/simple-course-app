import React, { useEffect } from "react";
const env = import.meta.env;

function Course(props) {
  return <div>
      <h2>{props.title}</h2>
  </div>
}

 function ShowCourses() {
    const [courses, setCourses] = React.useState([]);
    useEffect(()=>{
      let options = {
        method : 'GET',
        headers: {
          "Authorization" : "Bearer " + localStorage.getItem('token')
        }
      }
      fetch(env.VITE_API + '/admin/courses/',options).then(d=>d.json()).then(resp=>{
        if(resp){
            console.log("data :",resp);
            setCourses(resp);
        }
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