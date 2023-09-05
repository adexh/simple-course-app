import { Box, Typography, Button } from "@mui/material";

export default function CartCheckout(props) {
  return (
    <>
      <Typography variant='body1' fontWeight='bold' color='gray'>
        Total:
      </Typography>
      <Typography variant='h4' fontWeight='bold'>
        ₹{props.Amt}
      </Typography>
      <Button sx={{
              marginLeft:'5px',
              marginTop:'10px',
              color:'black',
              fontWeight:'bold',
              backgroundColor:'#caa2fc',
              '&:hover':{
                bgcolor:'#a179d1'
              },
              width:1
        }}>
        Checkout
      </Button>
    </>
  )
}