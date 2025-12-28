import { createBrowserRouter } from "react-router";
import App from "./App";
import AuthProtect from "./components/AuthProtect";
import GuestOnly from "./components/GuestOnly";
import { lazyLoader } from "./utilities/lazyLoader";

// Use utility function create lazy loader
const Login = lazyLoader('../pages/Login');
const Signup = lazyLoader('../pages/Signup');
const Home = lazyLoader('../pages/Home');

export const router = createBrowserRouter([{
  path: '/',
  element: <App/>,
  children: [
    {
      // Prevent authenticated user
      element: <GuestOnly/>,
      children: [
         { path: 'login',element: <Login/> },
          { path: 'signup',element: <Signup/> }
      ]
    },
    {
      // Prevent unauthenticated user
      element: <AuthProtect/>,
      children: [
         { index: true,element: <Home/> },
      ]
    }
  ]
}])