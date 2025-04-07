import Login from "authentication/login";
import Landing from "pages/landingpage";
import Signup from "authentication/signup";
import Logsheet from "logsheet";
import DashboardScreen from "designeg";
import LeaveRequestEmail from "leave/leaverequest";
import LeaveForm from "leave/leaveform";
import Practice from "practice";
import Expenses from "pages/expense/expenses";
import Tabs from "profile/Tabs";
import Onboardingform from "Admin/Pages/onboarding";


export const routes = [
  {
    path: "/",
    component: <Login />,
    isHeader: false,
    isSidenav:false
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
    isSidenav:false
  },
  {
    path: "/onboard",
    component: <Onboardingform />,
    isHeader: true,
    
  },
  
  {
    path: "/logsheet",
    component: <Logsheet />,
    isHeader: true,
  },
  {
    path: "/leaveform",
    component: <LeaveForm />,
    isHeader: true,
  },
  {
    path: "/leaverequest",
    component: <LeaveRequestEmail />,
    isHeader: false,
  },
  {
    path: "/dashboardscreen",
    component: <DashboardScreen />,
    isHeader: false,
  },
  {
    path:'/Tabs',
    component:<Tabs/>,
    isHeader:true,
  },
  {
    path:'/expenses',
    component:<Expenses/>,
    isHeader:true,
  },
  {
    path:'/practice',
    component:<Practice/>,
    isHeader:false,
  },  
  
 

]