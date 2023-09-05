import { Box, Typography, Rating, IconButton} from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import SellIcon from '@mui/icons-material/Sell';
import CancelTwoToneIcon from '@mui/icons-material/CancelTwoTone';
import removeFromCart from "../../services/removeFromCart";

export default function Product(props) {
  const product = props.product;

  const handleRemoveFromCart = (id)=> {
    removeFromCart(id);
    const filteredList = props.allProducts.filter(e=>e._id != id);
    props.removeProduct(filteredList);
  }

  return (
    <Box sx={{
      width: 'auto',
      margin: '10px',
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
          {product.title}
        </Typography>
        <Typography variant='subtitle2'>
          By {product.created_by}
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
          ₹{product.price}
        </Typography>
        <SellIcon fontSize='small' sx={{ marginTop: '7px', color: '#4a148c' }} />
      </Box>
      <Box
      sx={{
        marginLeft:'10px'
      }}>
        <IconButton size="small" onClick={()=>handleRemoveFromCart(product._id)}>
          <CancelTwoToneIcon/>
        </IconButton>
      </Box>
    </Box>
  )
}