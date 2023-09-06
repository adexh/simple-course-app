import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setOpen } from "../slice/loginPopupSlice";
import { setAuthenticated, unAuthenticate } from "../slice/userSlice";
import { authService } from "../services/auth";


export const Privateroute = () => {

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector(state=>state.user);

  if(isAuthenticated){
    return <Outlet />
  } 
  else {
      authService().then(auth=>{
        if(auth){
          console.debug("Setting authenticated from private route");
          dispatch(setAuthenticated());
          return <Outlet/>
        } else {
          console.debug("Unauthenticating from private route");
          dispatch(unAuthenticate());
          dispatch(setOpen());
          // return window.history.length > 1?<Navigate to={'/'} replace state={{from:{location}}}/>:<Navigate to={'/'} state={{from:{location}}}/>
          navigate('/',{ replace: true, state: { from: {location} }});
        }
      })
  }
}