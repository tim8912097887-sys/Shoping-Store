import { useReducer } from "react";
import { useUserAuth } from "../contexts/UserAuthProvider";
import ErrorMsg from "../utilities/ErrorMsg";
import type { SignupUser } from "../schemas/signupUser";

type Props = {
    isLogin: boolean
}

type Action = {
    type: 'username' | 'email' | 'password',
    value: string
} | { type: 'reset' }

const reducer = (state: SignupUser,action: Action) => {
     switch (action.type) {
        // Change one value in the state
        case 'username':
            return { ...state,username: action.value };
        case 'email':
            return { ...state,email: action.value };
        case 'password':
            return { ...state,password: action.value };
        case 'reset':
            return { username: "",email: "",password: "" };
        // If nothing match,just return state
        default:
            return state;
     }
}

const RegisterForm = ({ isLogin }: Props) => {

    const { login,signup,errorMsg,loading } = useUserAuth();
    const [state,dispatch] = useReducer(reducer,{ username: "",email: "",password: "" });
    // Utilities function for setting each field value
    const setUsername = (e: React.ChangeEvent<HTMLInputElement>) => dispatch({ type: 'username',value: e.target.value }); 
    const setEmail = (e: React.ChangeEvent<HTMLInputElement>) => dispatch({ type: 'email',value: e.target.value }); 
    const setPassword = (e: React.ChangeEvent<HTMLInputElement>) => dispatch({ type: 'password',value: e.target.value }); 

    const onLogin = (e: React.FormEvent<HTMLFormElement>) => {
        // Prevent default action
        e.preventDefault();
        const { email,...rest } = state;
        const loginInfo = rest
        login(loginInfo);
    }

    const onSignup = (e: React.FormEvent<HTMLFormElement>) => {
        // Prevent default action
        e.preventDefault();
        signup(state);
    }

  return (
    <div className="px-6 py-10 flex flex-col gap-4 border-4 rounded-2xl">
        <h2 className="text-3xl text-black font-bold">{isLogin?"Login Form":"Signup Form"}</h2>
        <form className="flex flex-col gap-3" onSubmit={isLogin?onLogin:onSignup}>
            <div className="flex flex-col gap-2">
            <label htmlFor="username">Username:</label>
            <input className="border-2 border-black py-1 px-3 rounded" value={state.username} type="text" id="username" onChange={setUsername}  />
            {/* Custom error message for specific field */}
            {errorMsg && errorMsg.includes("Username") && <ErrorMsg msg={errorMsg} />}
            </div>
            { 
            !isLogin && 
            <div className="flex flex-col gap-2">
            <label htmlFor="email">Email:</label>
            <input className="border-2 border-black py-1 px-3 rounded" value={state.email} type="email" id="email" onChange={setEmail}  />
            {/* Custom error message for specific field */}
            {errorMsg && errorMsg.includes("email") && <ErrorMsg msg={errorMsg} />}
            </div>
            }
            <div className="flex flex-col gap-2">
            <label htmlFor="password">Password:</label>
            <input className="border-2 border-black py-1 px-3 rounded" value={state.password} type="password" id="password" onChange={setPassword} />
            {/* Custom error message for specific field */}
            {errorMsg && errorMsg.includes("Password") && <ErrorMsg msg={errorMsg} />}
            </div>
            <button className="bg-blue-500 px-3 py-2 text-[1.25rem] text-white rounded hover:bg-blue-600 transition-all duration-200 cursor-pointer" type="submit">{loading?"Validating...":isLogin?"Login":"Signup"}</button>
            {errorMsg!=="" && <ErrorMsg msg={errorMsg} />}
        </form>
    </div>
  )
}

export default RegisterForm