import { Navigate, Outlet } from "react-router";
import { useUserAuth } from "../contexts/UserAuthProvider"

const AuthProtect = () => {

    const { isAuthenticated } = useUserAuth();
    // Redirect user to login route if not authenticated
    // Replace the history prevent the user go back and forth login and protected page
    if(!isAuthenticated) return <Navigate to='/login' />
  
    return <Outlet/>;
}

export default AuthProtect