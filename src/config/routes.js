// components
import Dashboard from "../dashboard/dashboard";
import Authentication from "../authentication/authentication";

export const routes = [
  {
    id: 0,
    path: "/",
    component: Authentication
  },
  {
    id: 1,
    path: "/dashboard",
    component: Dashboard
  }
];
