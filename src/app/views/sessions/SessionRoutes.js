import SignUp from "./SignUp";
import SignIn from "./Login";
import NotFound from "./NotFound";
import ForgotPassword from "./ForgotPassword";
import Session from "./SessionLayout";
import { authRoles } from "../../auth/authRoles";

const settings = {
  activeLayout: "layout1",
  layout1Settings: {
    topbar: {
      show: false
    },
    leftSidebar: {
      show: false,
      mode: "close"
    }
  },
  layout2Settings: {
    mode: "full",
    topbar: {
      show: false
    },
    navbar: { show: false }
  },
  secondarySidebar: { show: false },
  footer: { show: false }
};

const sessionRoutes = [
  {
    path: "/session/signup",
    component: SignUp,
    settings,
    auth: []
  },
  {
    path: "/session/signin",
    component: SignIn,
    settings,
    auth: []
  },
  {
    path: "/session/forgot-password",
    component: Session,
    settings,
    auth: []
  },
  {
    path: "/session/404",
    component: NotFound,
    settings
  }
];

export default sessionRoutes;
