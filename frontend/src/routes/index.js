import Home from "../pages/Home";
import Story from "../pages/Story"
import Read from "../pages/Read";
import Information from "../pages/Information";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import ForgotPassword from "../pages/ForgotPassword";

import { ReadLayout } from "../components/Layout";

// Routes will be used in public environment
const publicRoutes = [
  { path: "/", component: Home,},
  { path: "/stories/:domain/:name", component: Story},
  { path: "/read/:name/:id", component: Read, layout: ReadLayout },
  { path: "/information", component: Information, layout: null },
  { path: "/login", component: Login, layout: null},
  { path: "/signup", component: Signup, layout: null},
  {path: "/forgot-password", component: ForgotPassword, layout: null}
];

// Routes will be used in private environment
const privateRoutes = [];
export { publicRoutes, privateRoutes };
