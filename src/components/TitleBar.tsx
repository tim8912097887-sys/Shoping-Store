import { Link } from "react-router"
import { useUserAuth } from "../contexts/UserAuthProvider"

const TitleBar = () => {
  
    const { isAuthenticated,logout } = useUserAuth();
    

  return (
    <header className="w-dvw bg-black">
        <div className="w-full flex justify-between p-5">
            <div>
               <h1 className="text-3xl text-white">Shopping Store</h1>
            </div>
            <div className="flex gap-3 text-white">
                {
                    !isAuthenticated?
                    <>
                      <Link to='/login'>Login</Link>
                      <Link to='/signup'>Signup</Link>
                    </>
                    :<button onClick={logout}>Logout</button>
                }
            </div>
        </div>
    </header>
  )
}

export default TitleBar