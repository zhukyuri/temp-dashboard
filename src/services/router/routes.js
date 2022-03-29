import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import Notifications from "layouts/notifications";
import Profile from "layouts/profile";
import Icon from "@mui/material/Icon";

export class AppRoutes {
  static dashboard = "/dashboard";
  static tables = "/tables";
  static billing = "/billing";
  static notifications = "/notifications";
  static profile = "/profile";
  static signIn = "/authentication/sign-in";
  static signUp = "/authentication/sign-up";
}

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: AppRoutes.dashboard,
    component: <Dashboard />
  },
  {
    type: "collapse",
    name: "Tables",
    key: "tables",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: AppRoutes.tables,
    component: <Tables />
  },
  {
    type: "collapse",
    name: "Billing",
    key: "billing",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: AppRoutes.billing,
    component: <Billing />
  },
  {
    type: "collapse",
    name: "Notifications",
    key: "notifications",
    icon: <Icon fontSize="small">notifications</Icon>,
    route: AppRoutes.notifications,
    component: <Notifications />
  },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: AppRoutes.profile,
    component: <Profile />
  }
  // {
  //   type: "collapse",
  //   name: "Sign In",
  //   key: "sign-in",
  //   icon: <Icon fontSize="small">login</Icon>,
  //   route: AppRoutes.signIn,
  //   component: <SignIn />
  // },
  // {
  //   type: "collapse",
  //   name: "Sign Up",
  //   key: "sign-up",
  //   icon: <Icon fontSize="small">assignment</Icon>,
  //   route: AppRoutes.signUp,
  //   component: <SignUp />
  // }
];

export default routes;
