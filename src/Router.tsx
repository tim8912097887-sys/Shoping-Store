import { createBrowserRouter } from "react-router";
import App from "./App";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AuthProtect from "./components/AuthProtect";
import GuestOnly from "./components/GuestOnly";

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