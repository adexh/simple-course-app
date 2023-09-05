
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
import getCartItems from "../../services/cartItems";
const env = import.meta.env;

function Cart() {

  const [productList, setProductList] = useState([]);
  const [totalAmt, setTotalAmt] = useState(0);

  useEffect(()=>{
    getCartItems().then((resp)=>{
      setProductList(resp.cartItems);
      let amt = 0;
      resp.cartItems.forEach(el=>{
        amt = amt + el.price;
        console.log("amt ",amt);
      })
      setTotalAmt(amt);
    })
  },[])

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh'
    }}>
      <ResponsiveAppBar/>
      <Box
      sx={{
        width:'auto',
        margin:{xs:'20px 50px 0 50px',md:'20px 100px 20px 100px',lg:'20px 200px 20px 200px'},
        flexGrow:1//'20px 200px 0 200px'
      }}>
        <Typography variant="h4"
        sx={{
          fontWeight:'bold',
        }}>
          Shopping Cart
        </Typography>
        <Typography variant='subtitle1' fontWeight='bold' marginTop='20px'>
          {productList.length} Course{productList.length>1 && 's'} in Cart
        </Typography>
        <Divider/>
        <Box sx={{
          display:{md:'flex'},
        }}>
          {/* Products inside cart */}
          <Box
          sx={{
            width:'70%'
          }}>
            {productList.map((prod,idx)=>{
              if(idx>0 && idx!=productList.length-1){
                return(<>
                  <Divider/>
                  <Product key={prod._id} product={prod}/>
                </>
                )
              }
              return(<Product key={prod._id} product={prod}/>)
            })}
          </Box>
          {/* Checkout Cart Section */}
          <Box
          sx={{
            width:'30%'
          }}>
            <CartCheckout Amt={totalAmt}/>
          </Box>
        </Box>
      </Box>
      <Footer/>
    </div>
  )
}

export default Cart;