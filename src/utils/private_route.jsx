import { Route, Navigate } from "react-router-dom";
import { SessionContext } from "../contexts/auth_context";

export const Privateroute = ({path, ...props}) => {
  return <SessionContext.Consumer>
      {
        ({isAuthenticated}) =>{
          isAuthenticated ? 
            <Route {...props} path={path}/> : 
            <Navigate to="/login" replace state={{from: path}}/>
        }
      }
    </SessionContext.Consumer>
}
