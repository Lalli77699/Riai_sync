import Login from "authentication/login";
import Landing from "pages/landingpage";
import Signup from "authentication/signup";






export const routes = [
  {
    path: "/",
    component: <Login />,
    isHeader: false,
  },
  {
    path: "/landing",
    component: <Landing />,
    isHeader: true,
  },
  {
    path: "/signup",
    component: <Signup />,
    isHeader: false,
  },
 
 

]