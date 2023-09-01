import { Outlet } from "react-router-dom";
import { useSessionContext } from "../contexts/auth_context";
import { useNavigate } from "react-router-dom";
import { loginService } from "../services/login";
import { useDispatch } from "react-redux";
import { setOpen } from "../slice/loginPopupSlice";

export const Privateroute = () => {
  const { isAuthenticated,setAuthenticated } = useSessionContext();

  const dispatch = useDispatch();

  const navigate = useNavigate();
  if(isAuthenticated){
    console.log("Is Authenticated from private route");
    return <Outlet />
  } else {
    checkAuth().then(isAuth=>{
      setAuthenticated(isAuth);
      if(isAuth){
        return <Outlet />
      }
      //localStorage.removeItem('user');
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