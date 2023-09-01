import { Box, Typography, Rating } from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import SellIcon from '@mui/icons-material/Sell';
import CancelTwoToneIcon from '@mui/icons-material/CancelTwoTone';

export default function Product() {
  return (
    <Box sx={{
      width: 'auto',
      height: '200px',
      margin: '10px',
      border: '1px solid black',
      display: 'flex',
    }}>
      <img src='https://picsum.photos/128/68' style={{
        height: '68px',
        width: '128px'
      }} />
      <Box
        sx={{
          marginLeft: '10px',
        }}>
        <Typography variant="body1" fontWeight='bold'>
          Part 1: AWS Certified Solutions Architect SAA C03 [2023]
        </Typography>
        <Typography variant='subtitle2'>
          By Adesh Tamrakar
        </Typography>
        <Box sx={{
          display: 'flex',
          alignItems: 'center'
        }}>
          <Typography component="legend" sx={{
            marginRight: '10px',
            fontWeight: 'bold'
          }}>3.5</Typography>
          <Rating
            name="course-rating"
            size="small"
            precision={0.5}
            value={3.5}
            emptyIcon={<StarIcon sx={{ color: '#aa6c39', opacity: 0.25 }} fontSize="inherit" />}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            sx={{
              color: '#aa6c39'
            }}
          />
        </Box>
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          justifyContent: 'right'
        }}>
        <Typography variant='h6' fontWeight='bold' color='#4a148c'>
          ₹429
        </Typography>
        <SellIcon fontSize='small' sx={{ marginTop: '7px', color: '#4a148c' }} />
      </Box>
      <Box
      sx={{
        marginLeft:'10px'
      }}>
        <CancelTwoToneIcon/>
      </Box>
    </Box>
  )
}