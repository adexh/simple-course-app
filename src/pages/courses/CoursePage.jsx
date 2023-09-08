
import { Button, Paper, Rating, Typography } from "@mui/material";
import ResponsiveAppBar from "../../components/header/header"
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import Footer from "../../components/footer/footer";
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { useEffect, useState } from "react";
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate, useParams } from "react-router-dom";
import addToCart from "../../services/addToCart";
import { setOpen } from "../../slice/loginPopupSlice";
import { useDispatch, useSelector } from "react-redux";
const env = import.meta.env;

function CoursePage() {

  const [courseData, setCourseData ]= useState({});
  const [hasLoaded, setHasLoaded] = useState();
  const [inCart , setIncart] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated } = useSelector(state=>state.user);

  const handleAddToCart = (id) => {
    if(!isAuthenticated){
      alert("Please login to Add to Cart !");
      dispatch(setOpen());
    } else {
      setIncart(true);
      addToCart(id);
    }
  }

  const setCourseDetails = ()=>{
    let userDetails = null;
    userDetails = JSON.parse(localStorage.getItem("user"));
    console.log("getting user Details",userDetails);
    axios.get(env.VITE_API + '/courses/details',{
      headers : {
        id,
        userId:userDetails?.id
      }
    }).then(resp => {
      setCourseData(resp.data.coursesdata);
      if(resp.data.inCart){
        setIncart(true);
      } else {
        setIncart(false);
      }
      setHasLoaded(true);
    })
  }

  useEffect(() => {
    setCourseDetails();
  },[])

  useEffect(()=>{
    setCourseDetails();
  },[isAuthenticated])

  return (hasLoaded? <>
    <ResponsiveAppBar />
    <Box sx={{
      width: 1,
      backgroundColor: '#2d2f31'
    }}>
      <Box
        sx={{
          padding: '20px 0 20px 200px'
        }}>
        <Typography
          variant="h4"
          sx={{
            color: 'white',
            fontWeight: 'bold'
          }}>
            {courseData.title}
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: 'white'
          }}>
          {courseData.short_description}
        </Typography>
        <Box sx={{
          display: 'flex',
          alignItems: 'center'
        }}>
          <Typography component="legend" sx={{
            color: '#faaf00',
            marginRight: '10px',
            fontWeight: 'bold'
          }}>3.5</Typography>
          <Rating
            name="course-rating"
            size="small"
            precision={0.5}
            value={3.5}
            emptyIcon={<StarIcon style={{ borderColor: 'gold', color: 'gold', opacity: 0.25 }} fontSize="inherit" />}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            sx={{
              borderColor: "gold"
            }}
          />
        </Box>
        <Typography
          variant="subtitle1"
          sx={{
            color: 'white'
          }}>
          460,085 students
        </Typography>
        <Box display={{ md: 'flex', alignItems: 'center' }}>
          <Typography
            variant="subtitle2"
            sx={{
              color: 'white',
              marginRight: '5px'
            }}>
            Created By
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              color: 'white',
              fontStyle: 'italic'
            }}>
            {courseData.created_by}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            marginTop:'10px'
          }}>
          <CurrencyRupeeIcon
            sx={{
              color: 'white'
            }} />
          <Typography
            variant="h5"
            sx={{
              color: 'white'
            }}>
            {courseData.price}
          </Typography>
        </Box>
        {inCart?        <Button
        sx={{
          width: '150px',
          marginTop:'10px',
          backgroundColor: '#a435f0',
          '&:hover': {
            backgroundColor: '#551582',
          },
        }}
    onClick={()=>navigate('/user/cart')}>
        Go to Cart
        </Button>:
        <Button
            sx={{
              width: '150px',
              marginTop:'10px',
              backgroundColor: '#a435f0',
              '&:hover': {
                backgroundColor: '#551582',
              },
            }}
        onClick={()=>handleAddToCart(courseData._id)}>
            Add to Cart
        </Button>}
      </Box>
    </Box>
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      margin: { md: '10px 200px 20px 200px' },
      width: 'auto'
    }}>
      <Paper variant="outlined"
        sx={{
          padding: 2,
          width:1,
        }}>
        <Typography
          variant="h5">
          What you'll learn
        </Typography>
        <Typography
          variant="body1"
          component={'div'}
          sx={{
            margin: 2,
            columnCount: 2
          }}>
          <ul>
            {courseData?.learn_points.map(el => <li key={el}>{el}</li>)}
          </ul>
        </Typography>
      </Paper>
      <Box
        sx={{
          width: 1
        }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 'bold',
            padding: 1
          }}>
          Description
        </Typography>
        <Typography
          variant="body1"
          sx={{
            padding: 2
          }}>
          {courseData.description}
        </Typography>
      </Box>
    </Box>
    <Footer />
    </>:
    <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>)
}

export default CoursePage;