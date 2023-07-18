import { Navigate, Outlet } from "react-router-dom";
import { useSessionContext } from "../contexts/auth_context";

export const Privateroute = () => {
  const { isAuthenticated } = useSessionContext();
  return isAuthenticated?<Outlet /> : <Navigate to="/login" />
}