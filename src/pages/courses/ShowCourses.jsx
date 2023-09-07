import React, { useEffect } from "react";
const env = import.meta.env;
import axios from "axios";
import { Box, Container, Paper, Typography, Card, CardMedia, CardActions, CardContent, Button, Grid, useTheme } from '@mui/material';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { Link } from "react-router-dom";
import addToCart from "../../services/addToCart";
import { useDispatch, useSelector } from "react-redux";
import { setOpen } from "../../slice/loginPopupSlice";
import CircularIndeterminate from "../../components/spinner";

function Course(props) {
  const theme = useTheme();
  const { isAuthenticated } = useSelector(state => state.user);
  const dispatch = useDispatch();

  return <>
    <Link style={{ textDecoration: 'none' }} to={"/course/" + props.data._id}>
      <Card sx={{ margin: 2, height: '310px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
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
      </Card>
    </Link>
  </>
}

function ShowCourses() {
  const [courses, setCourses] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);

  useEffect(() => {
    axios.get(env.VITE_API + '/courses/displayCourses').then(resp => {
      setCourses(resp.data.coursesdata);
      setLoading(false);
    })
  }, [])

  return <>
    {isLoading ? <CircularIndeterminate /> :
      <Grid container spacing={2}>
        {courses.map(c => <Grid key={c._id} item xs={12} md={6} lg={4}><Course data={c} key={c.title} /></Grid>)}
      </Grid>}
  </>
}

export default ShowCourses;