import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { loginService } from "../services/login";
import { useDispatch, useSelector } from "react-redux";
import { setOpen } from "../slice/loginPopupSlice";
import { setAuthenticated, unAuthenticate } from "../slice/userSlice";

export const Privateroute = () => {

  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(state=>state.user);

  const navigate = useNavigate();
  if(isAuthenticated){
    console.log("Is Authenticated from private route");
    return <Outlet />
  } else {
    checkAuth().then(isAuth=>{
      if(isAuth){
        dispatch(setAuthenticated());
        return <Outlet />
      }
      dispatch(unAuthenticate());
      localStorage.removeItem('user');
      dispatch(setOpen());
      return navigate('/',{replace:true});
    })
  }
}

async function checkAuth(){
  if(!localStorage.getItem('user')){
    return false;
  }
  return true;
}