import { Box,Typography,Button } from "@mui/material";

export default function CartCheckout(props){
  return (
    <Box>
      <Typography variant='body1'>
        Total:
      </Typography>
      <Typography variant='h3'>
        ₹{props.Amt}
      </Typography>
      <Button>
        Checkout
      </Button>
    </Box>
  )
}