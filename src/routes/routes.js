import Login from "authentication/login";
import Landing from "pages/landingpage";
import Signup from "authentication/signup";
import DashboardScreen from "designeg";
import LeaveRequestEmail from "leave/leaverequest";
import LeaveForm from "leave/leaveform";
import Expenses from "pages/expense/expenses";
import Tabs from "profile/Tabs";
import Onboardingform from "Admin/Pages/onboarding";
import Verification from "Admin/Pages/verfication";
import Usersonboard from "Admin/usersonboard";
import Sheet from "clockin/sheet";
import One from "practice/one";
import Second from "practice/second";
import Third from "practice/third";
import Project from "pages/Project/project";
import Timetracker from "Admin/Pages/Timesheets/Timetracker";
import Timesheet from "Admin/Pages/Timesheets/timesheet";
import Data from "Admin/Pages/Timesheets/Timesheetdata";
import Timesheetdata from "Admin/Pages/Timesheets/Timesheetdata";



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
    path: "/verify",
    component: <Verification/>,
    isHeader: false,
  },
  {
    path: "/usersonboard",
    component: <Usersonboard/>,
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
    path: "/timetracker",
    component: <Timetracker />,
    isHeader: true,
  },
  {
    path: "/timesheet",
    component: <Timesheet />,
    isHeader: true,
  },
  {
    path: "/timesheetdata",
    component: <Timesheetdata />,
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
    path: "/sheet",
    component: <Sheet/>,
    isHeader: true,
    isSidenav:true
  },
  {
    path: "/project",
    component: <Project/>,
    isHeader: true,
    isSidenav:true
  },
  {
    path: "/one",
    component: <One />,
    isHeader: true,
  },
  {
    path: "/second",
    component: <Second/>,
    isHeader: true,
  },
  {
    path: "/third",
    component: <Third/>,
    isHeader: true,
  },
]