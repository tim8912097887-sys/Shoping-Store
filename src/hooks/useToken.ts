import { useState } from "react";

// Custom hook for store and retreive token from localstorage
const useToken = () => {
  
    const [token,setToken] = useState(() => {
        try {
            const savedToken = localStorage.getItem("auth_token");
            // Parse data if token is not null
            return savedToken?savedToken:"";

        } catch (error: any) {
            console.error(`Token Retrieve Error: ${error.message}`);
            // Empty string stands for not found
            return "";
        }
    });

    const saveToken = (newToken: string) => {
 
        setToken(newToken);
        try {
            if(newToken) {
                localStorage.setItem("auth_token",newToken);
            } else {
                // For logout usage
                localStorage.removeItem("auth_token");
            }
        } catch (error: any) {
            console.error(`Token Setting Error: ${error.message}`);
        }
    }
    return [token,saveToken] as const;
}

export default useToken