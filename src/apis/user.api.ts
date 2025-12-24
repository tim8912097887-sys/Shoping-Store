import axios from "axios";
import { baseConfig } from "./instance";
import { LoginUserSchema, type LoginUser } from "../schemas/loginUser";
import { SignupUserSchema, type SignupUser } from "../schemas/signupUser";

type LoginInfo = LoginUser & {
    accessToken: string
}

type LoginUserRespond = {
    data: LoginInfo,
    status: number
}

const userRequest = axios.create({
    ...baseConfig,
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    }
})

export const loginUser = async(user: LoginUser) => {
     try {
        const validateResult = LoginUserSchema.safeParse(user);
        if(!validateResult.success) return { success: false,errorMsg: validateResult.error.issues[0].message }
        const respond = await userRequest({
            data: user,
            url: "/user/login"
        }) as LoginUserRespond;
        return { success: true, data: respond.data};
     } catch (error: any) {
            if (error.response) {
        // If server response with invalid credential,stands for invalid username or password
        // Otherwise don't leak the error info directly to clien
        console.log(error.response.data);
        if(error.response.data?.message && error.response.data?.message.includes("Invalid credentials")) {
           return { success: false,errorMsg: "Invalid email or password"};
        } else {
           return { success: false,errorMsg: "Something went wrong" };
        }
        
        } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
        return { success: false,errorMsg: "Request fail" };
        } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
        return { success: false,errorMsg: "Something went wrong" };
        }
     }
}

export const signupUser = async(user: SignupUser) => {
     try {
        const validateResult = SignupUserSchema.safeParse(user);
        if(!validateResult.success) return { success: false,errorMsg: validateResult.error.issues[0].message }
        const respond = await userRequest({
            data: user,
            url: "/users/add"
        }) as LoginUserRespond;
        return { success: true, data: respond.data};
     } catch (error: any) {
            if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        return { success: false,errorMsg: error.response.data.message };
        } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
        return { success: false,errorMsg: "Request fail" };
        } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
        return { success: false,errorMsg: "Something went wrong" };
        }
     }
}
