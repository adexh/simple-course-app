import { Outlet } from "react-router-dom";
import { useSessionContext } from "../contexts/auth_context";
import checkAuth from "../service/auth_service";
import { useNavigate } from "react-router-dom";

export const Privateroute = () => {
  const { isAuthenticated,setAuthenticated } = useSessionContext();
  const navigate = useNavigate();
  if(isAuthenticated){
    console.log("Is Authenticated from private route");
    return <Outlet />
  } else {
    checkAuth().then(isAuth=>{
      console.log("checking auth private route: ",isAuth);
      setAuthenticated(isAuth);
      if(isAuth){
        return <Outlet />
      }
      console.log("Navigating to login");
      return navigate('/login',{replace:true});
    })
  }  
}