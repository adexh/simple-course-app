import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, setAuthenticated } from '../../slice/userSlice';
import { setOpen, setClose } from '../../slice/signupPopupSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import SuccessPopup from './sucessPopup';
import { singupService } from '../../services/signup';

export default function SignupPop() {
  const [successPopupOpen, setSuccessPopupOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  });

  const navigate = useNavigate();
  const location = useLocation();

  const { loading, error: userError } = useSelector(state => state.user);
  const popupState = useSelector(state => state.signupPopup.value);

  const dispatch = useDispatch();

  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  }

  const validatePassword = (value) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(value);
  }

  const validateConfirmPassword = (value) => {
    if( value === formData.password ){
      return true;
    }
    return false;
  }

  const handleBlur = (e) => {
    const { name, value } = e.target;
    let newErrors = { ...errors };

    switch (name) {
      case 'email':
        newErrors.email = validateEmail(value) ? '' : 'Invalid email address';
        break;
      case 'password':
        newErrors.password = validatePassword(value) ? '' : 'Invalid password';
        break;
      case 'confirmPassword':
        newErrors.confirmPassword = validateConfirmPassword(value) ? '' : `Passwords don't match`;
      default:
        break;
    }

    setErrors(newErrors);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  const validateInputs = () => {
    const { fullName, email, username, password, confirmPassword } = formData;

    let newErrors = {};

    if (!fullName || !email || !username || !password || !confirmPassword) {
      newErrors.allFields = 'All fields are required';
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!validateEmail(email)) {
      newErrors.email = 'Invalid email address';
    }

    if (!validatePassword(password)) {
      newErrors.password = 'Invalid password';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  const handleCancel = () => {
    clearForm();
    dispatch(setClose());
  }
  const clearForm = () => {
    setFormData({
      fullName: '',
      email: '',
      username: '',
      password: '',
      confirmPassword: ''
    });

    setErrors({
      fullName: '',
      email: '',
      username: '',
      password: '',
      confirmPassword: ''
    });

  }


  const handleSignup = (e) => {
    e.preventDefault();
    let newErrors = { ...errors };

    if (validateInputs()) {
      let userCredentials = {
        ...formData
      }
      singupService(userCredentials).then(data=>{
        dispatch(setClose());
        localStorage.setItem("user",JSON.stringify(data));
        clearForm();
        setSuccessPopupOpen(true);
      }).catch(err=>{
        newErrors.submit = err.message;
        setErrors(newErrors);
      })
    }
  }

  const handleSuccessPopupClose = ()=>{
    dispatch(setAuthenticated());
    setSuccessPopupOpen(false);
  }

  return (
    <>
      <Button variant="outlined" onClick={() => dispatch(setOpen())} sx={{
        marginLeft: '5px',
        color: 'black',
        fontWeight: 'bold',
        backgroundColor: '#caa2fc',
        '&:hover': {
          bgcolor: '#a179d1'
        }
      }}>
        Signup
      </Button>
      <Dialog open={popupState} onClose={() => dispatch(setClose())}
      maxWidth='xs'>
        <DialogTitle>Signup</DialogTitle>
        <DialogContent >
          <TextField
            required
            margin="dense"
            id="fullName"
            name="fullName"
            label="Full Name"
            type="text"
            fullWidth
            variant="outlined"
            color="secondary"
            InputLabelProps={{
              style: { color: 'secondary' }
            }}
            sx={{
              color: 'black'
            }}
            value={formData.fullName}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.fullName && <Typography color='error'>{errors.fullName}</Typography>}
          <TextField
            required
            margin="dense"
            id="email"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="outlined"
            color="secondary"
            InputLabelProps={{
              style: { color: 'secondary' }
            }}
            sx={{
              color: 'black'
            }}
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.email?true:false}
            helperText={errors.email}
          />
          <TextField
            required
            autoComplete='off'
            margin="dense"
            id="username"
            name="username"
            label="Username"
            type="text"
            fullWidth
            variant="outlined"
            color="secondary"
            InputLabelProps={{
              style: { color: 'secondary' }
            }}
            sx={{
              color: 'black'
            }}
            value={formData.username}
            onChange={handleChange}
          />
          <TextField
            required
            autoComplete='new-password'
            margin="dense"
            id="password"
            name="password"
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
            color="secondary"
            InputLabelProps={{
              style: { color: 'secondary' }
            }}
            sx={{
              color: 'black'
            }}
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.password?true:false}
            helperText={errors.password}
          />
          <TextField
            required
            margin="dense"
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            fullWidth
            variant="outlined"
            color="secondary"
            InputLabelProps={{
              style: { color: 'secondary' }
            }}
            sx={{
              color: 'black'
            }}
            value={formData.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.confirmPassword?true:false}
            helperText={errors.confirmPassword}
          />
          {errors.allFields && <Typography color='error'>{errors.allFields}</Typography>}
          {errors.submit && <Typography color='error'>{errors.submit}</Typography>}
          {userError && <Typography color='error' sx={{
            bgcolor: 'pink',
            marginTop: '6px',
            padding: '10px',
            borderRadius: '5px'
          }}>
            {userError}
          </Typography>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSignup} sx={{
            marginLeft: '5px',
            color: 'black',
            fontWeight: 'bold',
            backgroundColor: '#caa2fc',
            '&:hover': {
              bgcolor: '#a179d1'
            },
            width: '100px'
          }}>Signup</Button>
          <Button onClick={handleCancel} sx={{
            marginLeft: '5px',
            marginRight: '15px',
            color: 'black',
            fontWeight: 'bold',
            backgroundColor: '#caa2fc',
            '&:hover': {
              bgcolor: '#a179d1'
            },
            width: '100px'
          }}>Cancel</Button>
        </DialogActions>
      </Dialog>
      <SuccessPopup open={successPopupOpen} handleClose={handleSuccessPopupClose} />
    </>
  );
}

function successPopup (){

}