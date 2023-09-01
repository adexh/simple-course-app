import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../slice/userSlice';
import axios from 'axios';
import { loginService } from '../../services/login';

export default function Loginpop() {
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const error = true;

  //const {loading, error} = useSelector(state=>state.user);

  // const dispatch = useDispatch();

  const handleSignin = (e) => {
    // e.preventDefault();
    let userCredentials = {
      email,password
    }
    // dispatch(loginUser(userCredentials)).then((result)=>{
    //   if(result.payload){
    //     setEmail('');
    //     setPassword('');
    //   }
    // })

    loginService(userCredentials).then(d=>{
      console.log("data ",d);
    })
  }
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };



  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen} sx={{
              marginLeft:'5px',
              color:'black',
              fontWeight:'bold',
              backgroundColor:'#caa2fc',
              '&:hover':{
                bgcolor:'#a179d1'
              }
            }}>
              Login
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Login</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address / Username"
            type="email"
            fullWidth
            variant="outlined"
            color="secondary"
            InputLabelProps={{
              style:{color:'secondary'}
            }}
            sx={{
              color:'black'
            }}
            onChange={e=>setEmail(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="pass"
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
            color="secondary"
            InputLabelProps={{
              style:{color:'secondary'}
            }}
            sx={{
              color:'black'
            }}
            onChange={e=>setPassword(e.target.value)}
          />
          {error && <Typography color='error' sx={{
            bgcolor:'pink',
            marginTop:'6px',
            padding:'10px',
            borderRadius:'5px'
          }}>
            Incorrect Email/Passowrd !
          </Typography> }
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSignin} sx={{
              marginLeft:'5px',
              color:'black',
              fontWeight:'bold',
              backgroundColor:'#caa2fc',
              '&:hover':{
                bgcolor:'#a179d1'
              },
              width:'100px'
            }}>Signin</Button>
          <Button onClick={handleClose} sx={{
              marginLeft:'5px',
              marginRight:'15px',
              color:'black',
              fontWeight:'bold',
              backgroundColor:'#caa2fc',
              '&:hover':{
                bgcolor:'#a179d1'
              },
              width:'100px'
            }}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}