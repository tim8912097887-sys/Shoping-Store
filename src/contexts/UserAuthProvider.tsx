import { createContext, useContext, useState, type PropsWithChildren } from "react"
import useToken from "../hooks/useToken";
import type { LoginUser } from "../schemas/loginUser";
import type { SignupUser } from "../schemas/signupUser";
import { loginUser, signupUser } from "../apis/user.api";
import useCurrentUser from "../hooks/useCurrentUser";

type ContextValue = {
   token: string
   login: (user: LoginUser) => void
   logout: () => void
   signup: (user: SignupUser) => void
   errorMsg: string
   currentUser: string
   isAuthenticated: boolean
   loading: boolean
}
// Create context
const UserAuthContext = createContext<ContextValue | null>(null);

const UserAuthProvider = ({ children }: PropsWithChildren) => {

    const [token,saveToken] = useToken();
    const [errorMsg,setErrorMsg] = useState("");
    const [currentUser,saveUser] = useCurrentUser();
    const [loading,setLoading] = useState(false);

    const login = async(user: LoginUser) => {
        setLoading(true);
        // Clear error message when start a new request
        setErrorMsg("");
        const result = await loginUser(user);
        if(!result.success && result.errorMsg) {
            setErrorMsg(result.errorMsg);
            setLoading(false);
            return;
        } 
        // if login success the username and accessToken must exist in the data
       saveUser(result.data!.username);
       saveToken(result.data!.accessToken);
       setLoading(false);
    }

    const logout = () => {
        // Clear token info
        setErrorMsg("");
        saveUser("");
        saveToken("");
    }

    // Derived state
    const isAuthenticated = token!=="";

    const signup = async(user: SignupUser) => {
        setLoading(true);
        // Clear error message when start a new request
        setErrorMsg("");
        const result = await signupUser(user);
        if(!result.success) {
            setErrorMsg(result.errorMsg);
            setLoading(false);
            return;
        } 
        return setLoading(false);
    }
    
    // Prevent flickering when token not retreive from localstorage yet
    // Because the token or currentUser retreive from localstorage almost immediatly so another component will cause flickering
    if(token === null || currentUser === null) return null;

  return (
    <UserAuthContext.Provider value={{ token,login,logout,signup,errorMsg,currentUser,isAuthenticated,loading }}>
       {children}
    </UserAuthContext.Provider>
  )
}

export default UserAuthProvider

// Custom hook for convenient access
export const useUserAuth = () => {
    const context = useContext(UserAuthContext);
    if(!context) throw new Error("Please use inside context provider");
    return context;
}