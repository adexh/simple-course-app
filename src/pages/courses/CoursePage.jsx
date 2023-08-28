
import { Button, Paper, Rating, Typography } from "@mui/material";
import ResponsiveAppBar from "../../components/header/header"
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import Footer from "../../components/footer/footer";
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { useEffect, useState } from "react";
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';
import { useParams } from "react-router-dom";
const env = import.meta.env;

function CoursePage() {

  const [courseData, setCourseData ]= useState({});
  const [hasLoaded, setHasLoaded] = useState();
  const { id } = useParams();

  useEffect(() => {
    axios.get(env.VITE_API + '/courses/details',{
      headers : {
        id
      }
    }).then(resp => {
      setCourseData(resp.data.coursesdata);
      setHasLoaded(true);
    })
  }, [])

  return (hasLoaded? <div>
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
        <Button
            sx={{
              width: '150px',
              marginTop:'10px',
              backgroundColor: '#a435f0',
              '&:hover': {
                backgroundColor: '#551582',
              },
            }}>
            Buy Now
          </Button>
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
    </div>:
    <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>)
}

export default CoursePage;