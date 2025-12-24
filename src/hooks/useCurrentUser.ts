import { useState } from "react"

const useCurrentUser = () => {
    
    const [currentUser,setCurrentUser] = useState(() => {
        try {
            const savedUser = localStorage.getItem("currentUser");
            // Parse data if current user is not null
            return savedUser?savedUser:"";
        } catch (error: any) {
            console.error(`Current User Retreive Error: ${error.message}`)
            // Empty string stands for not found
            return "";
        }
    })

    const saveUser = (user: string) => {
        setCurrentUser(user);
        try {
            if(user) {
               localStorage.setItem("currentUser",user);  
            } else {
               // For logout usage
               localStorage.removeItem("currentUser"); 
            }
        } catch (error: any) {
            console.error(`User Setting Error: ${error.message}`);
        }
    }
    return [currentUser,saveUser] as const;
}

export default useCurrentUser