import { Navigate, Outlet } from "react-router";
import { useUserAuth } from "../contexts/UserAuthProvider"

const GuestOnly = () => {

    const { isAuthenticated } = useUserAuth();
  
    if(isAuthenticated) return <Navigate to='/' replace />
   
    return <Outlet/>
}

export default GuestOnly