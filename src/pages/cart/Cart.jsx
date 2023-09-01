
import { Button, Container, Paper, Rating, Typography } from "@mui/material";
import ResponsiveAppBar from "../../components/header/header"
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import Footer from "../../components/footer/footer";
import Divider from '@mui/material/Divider';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Product from "./product";
import CartCheckout from "./CartCheckout";
const env = import.meta.env;

function Cart() {

  const {productList, setProductList} = useState([]);

  useEffect(()=>{
    
  },[])

  return (
    <div>
      <ResponsiveAppBar/>
      <Box
      //display={{xs:'none'}}
      sx={{
        width:'auto',
        minHeight:'50vh',
        margin:{xs:'20px 50px 0 50px',md:'20px 100px 20px 100px',lg:'20px 200px 20px 200px'}//'20px 200px 0 200px'
      }}>
        <Typography variant="h4"
        sx={{
          fontWeight:'bold',
        }}>
          Shopping Cart
        </Typography>
        <Typography variant='subtitle1' fontWeight='bold' marginTop='20px'>
          {1} Course in Cart
        </Typography>
        <Divider/>
        <Box sx={{
          display:{md:'flex'},
          border:'1px solid black'
        }}>
          {/* Products inside cart */}
          <Box
          sx={{
            border:'1px solid black',
            width:'70%',
            height:'500px'
          }}>
            <Product/>
          </Box>
          {/* Checkout Cart Section */}
          <Box
          sx={{
            border:'1px solid black',
            width:'30%'
          }}>
            <CartCheckout/>
          </Box>
        </Box>
      </Box>
      <Footer/>
    </div>
  )
}

export default Cart;