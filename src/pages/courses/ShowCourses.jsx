import React, { useEffect } from "react";
import { useSessionContext } from "../../contexts/auth_context";
const env = import.meta.env;
import axios from "axios";
import { Box, Container, Paper, Typography, Card, CardMedia, CardActions, CardContent, Button, Grid } from '@mui/material';

const courses = [
  {
    title: 'Full Stack',
    _id : Math.random()
  },
  {
    title: 'Frontend',
    _id : Math.random()
  },
  {
    title: 'Backend',
    _id : Math.random()
  }
]


function Course(props) {
  return <div>
    <Card sx={{ maxWidth: 345, m: 5 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions sx={{display : 'flex', justifyContent : 'center'}}>
        <Button variant="contained" >Add to Cart</Button>
      </CardActions>
    </Card>
  </div>
}

function ShowCourses() {
  const [courses, setCourses] = React.useState(['FullStack', 'Frontend']);
  const { isAuthenticated } = useSessionContext();

  useEffect(() => {
    let options = {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem('token')
      }
    }

    axios.get(env.VITE_API + '/admin/courses/', options).then(resp => {
      console.log("Setting Courses");
      setCourses(resp.data);
    })
  }, [])

  // Add code to fetch courses from the server
  // and set it in the courses state variable.
  return <div>
    <Grid container spacing={2}>
        {courses.map(c => <Grid item xs={12} md={6} lg={3}><Course title={c.title} key={c._id} listId={c._id} /></Grid>)}
    </Grid>
  </div>
}



export default ShowCourses;