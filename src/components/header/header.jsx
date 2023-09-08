import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import DeveloperBoardIcon from '@mui/icons-material/DeveloperBoard';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useTheme } from '@mui/material/styles';
import Loginpop from '../../pages/login/login_popup';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthenticated, unAuthenticate } from '../../slice/userSlice';
import { setOpen } from '../../slice/loginPopupSlice';
import { authService } from '../../services/auth';
import { logoutService } from '../../services/logout';
import SignupPop from '../signup/signuppop';

const pages = ['Explore', 'Blog', 'Contact Us'];
const settings = ['Profile', 'Dashboard', 'Logout'];

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: '20px',
  border: '1px solid black',
  backgroundColor: alpha(theme.palette.primary.light, 0.25),
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.light, 0.15),
  },
  marginRight: theme.spacing(3),
  marginLeft: 0,
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
      '&:focus': {
        width: '40ch',
      },
    },
  },
}));

function ResponsiveAppBar() {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const dispatch = useDispatch();

  const { isAuthenticated, loading, error } = useSelector(state => state.user);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCartClick = ()=> {
    navigate('/user/cart');
    // if(isAuthenticated){
    //   navigate('/user/cart');
    // } else {
    //   dispatch(setOpen());
      
    // }
  }

  const handleCloseUserMenu = (idx) => {
    if (Number.isInteger(idx) && settings[idx] == 'Logout') {
      logoutService().then(()=> dispatch(unAuthenticate()));
    }
    setAnchorElUser(null);
  };
  React.useEffect(() => {
    if(!isAuthenticated){
      authService().then(auth=>{
        if(auth){
          settings.forEach(e => { if (e.name == 'Logout') e.show = false });
          console.log("Setting Authenticated from header");
          dispatch(setAuthenticated());
        } else {
          dispatch(unAuthenticate());
        }
      })
    }
  }, []);

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <DeveloperBoardIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h8"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Coursed
          </Typography>

          <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              justifyContent: 'center',
              alignItems: 'center',
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <DeveloperBoardIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            Coursed
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'right', alignItems: 'center', mr: 1 }}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'inherit', display: 'block' }}
              >
                {page}
              </Button>
            ))}
            {!isAuthenticated && <Loginpop />}
            {!isAuthenticated && <SignupPop />}
            <Button onClick={handleCartClick} sx={{ color: 'inherit', display: 'flex', '&:hover': { color: theme.palette.primary.light } }} disableRipple>
              {/*Shopping Cart Button Icon*/}
              <Badge badgeContent={4} color="error" >
                <ShoppingCartIcon />
              </Badge>
            </Button>
          </Box>
          <Box sx={{ flexGrow: 0, display: 'flex' }}>
            <Button sx={{ color: 'inherit', display: { xs: 'block', md: 'none' }, '&:hover': { color: theme.palette.primary.light } }} disableRipple>
              <Badge badgeContent={4} color="error" >
                <ShoppingCartIcon />
              </Badge>
            </Button>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Adesh Tamrakar" src="undraw_pic_profile_re_7g2h.svg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <Typography sx={{
                marginLeft:'10px',
                marginRight:'5px'
              }}>Hi {isAuthenticated?'':'Guest'} !</Typography>
              {isAuthenticated && settings.map((setting, idx) => (
                <MenuItem key={setting} onClick={() => handleCloseUserMenu(idx)}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;