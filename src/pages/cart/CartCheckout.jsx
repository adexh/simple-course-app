import { Box,Typography,Button } from "@mui/material";

export default function CartCheckout(){
  return (
    <Box>
      <Typography variant='subtitle1'>
        Total:
      </Typography>
      <Typography variant='h3'>
        ₹429
      </Typography>
      <Button>
        Checkout
      </Button>
    </Box>
  )
}