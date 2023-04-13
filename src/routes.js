
import { Icon } from "@chakra-ui/react";
import { GiArcheryTarget } from 'react-icons/gi';
import { HiOutlineDocumentReport } from 'react-icons/hi';
import {
  MdHome, MdLogout,
  MdPostAdd
} from "react-icons/md";

// Auth Imports
// import SignInCentered from "views/auth/signIn";
import { lazy } from "react";

const MainDashboard = lazy(() => import("views/admin/default"));
const NewGoalForm = lazy(() => import("views/admin/forms/Goal"));
const NewTaskForm = lazy(() => import("views/admin/forms/Task"));
const Report = lazy(() => import("views/admin/report/task"));
const TaskDetails = lazy(() => import("views/admin/itemdetails/task"));
const SignIn = lazy(() => import("views/auth/signIn/index.jsx"));





const sidebarRoutes = [
  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "/default",
    icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
    component: MainDashboard,
  },
  {
    name: "New Task",
    layout: "/admin",
    path: "/task/new",
    icon: <Icon as={MdPostAdd} width='20px' height='20px' color='inherit' />,
    component: NewTaskForm,
  },
  {
    name: "New Goal",
    layout: "/admin",
    path: "/goal/new",
    icon: <Icon as={GiArcheryTarget} width='20px' height='20px' color='inherit' />,
    component: NewGoalForm,
  },
  {
    name: "Report",
    layout: "/admin",
    path: "/report",
    icon: <Icon as={HiOutlineDocumentReport} width='20px' height='20px' color='inherit' />,
    component: Report,
  },
  {
    name: "Edit Task",
    layout: "/admin",
    path: "/task",
    component: NewTaskForm,
  },
  {
    name: "Edit Goal",
    layout: "/admin",
    path: "/goal",
    component: NewGoalForm,
  },
  {
    name:"Task Details",
    layout:'/admin',
    path:'/view/task',
    component:TaskDetails
  },
  {
    name: "Signin",
    layout: "/auth",
    path: "/sign-in",
    component: SignIn,
    hide: true
  },
  
];
export const pageRoutes = [
  ...sidebarRoutes,
]
export const Logout = [
  {
    name: "Log Out",
    layout: "/auth",
    path: "/sign-out",
    icon: (
      <Icon as={MdLogout} width='16px' height='16px' color='inherit' />
    ),
    component: SignIn,
  }
];
export default sidebarRoutes;
