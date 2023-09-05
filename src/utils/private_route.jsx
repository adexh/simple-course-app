import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setOpen } from "../slice/loginPopupSlice";
import { unAuthenticate } from "../slice/userSlice";

export const Privateroute = () => {

  const dispatch = useDispatch();
  const location = useLocation();
  const { isAuthenticated } = useSelector(state=>state.user);

  if(isAuthenticated){
    return <Outlet />
  } else {
      console.debug("Unauthenticating from private route");
      dispatch(unAuthenticate());
      dispatch(setOpen());
      return <Navigate to={'/'} replace state={{from:{location}}}/>
  }
}