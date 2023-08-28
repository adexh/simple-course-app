import React, { useEffect } from "react";
import { useSessionContext } from "../../contexts/auth_context";
const env = import.meta.env;
import axios from "axios";
import { Box, Container, Paper, Typography, Card, CardMedia, CardActions, CardContent, Button, Grid, useTheme } from '@mui/material';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { Link } from "react-router-dom";

function Course(props) {
  const theme = useTheme();
  return <div>
    <Card sx={{ margin: 2, height: '360px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <CardMedia
        component="img"
        image="https://picsum.photos/200/300"
        alt="course"
        height="140"
      />
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          paddingBottom: '0',
          flexGrow: 1,
        }}>
        <Link style={{textDecoration:'none'}} to={"/course/"+props.data._id}>
          <Typography gutterBottom variant="h5" component="div"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: "2",
              WebkitBoxOrient: "vertical",
              textDecoration: 'none',
              color: 'black'
            }}>
            {props.data.title}
          </Typography>
        </Link>
        <Typography variant="body2" color="text.secondary"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: "2",
            WebkitBoxOrient: "vertical",
          }}>
          {props.data.description}
        </Typography>
        <Typography component={'div'} variant="h5" color="text.secondary" flexGrow={1} sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <CurrencyRupeeIcon sx={{ marginBottom: '5px', color: 'black' }} />{props.data.price}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: 'flex', justifyContent: 'center', alignItems: 'end', marginBottom: '10px' }}>
        <Button variant="contained" >Add to Cart</Button>
      </CardActions>
    </Card>
  </div>
}

function ShowCourses() {
  const [courses, setCourses] = React.useState([]);

  useEffect(() => {
    axios.get(env.VITE_API + '/courses/displayCourses').then(resp => {
      setCourses(resp.data.coursesdata);
    })
  }, [])

  return <div>
    <Grid container spacing={2}>
      {courses.map(c => <Grid key={c._id} item xs={12} md={6} lg={4}><Course data={c} key={c._id} /></Grid>)}
    </Grid>
  </div>
}

export default ShowCourses;