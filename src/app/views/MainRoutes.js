import React from "react";
import { authRoles } from "./../auth/authRoles";

const mainRoutes = [
  {
    path: "/patients/:id",
    component: React.lazy(() => import("./dashboard/Dashboard")),
    auth: authRoles.both,
    exact: true,
  },
  {
    path: "/patients",
    component: React.lazy(() => import("./Patient/Patient")),
    auth: authRoles.both,
  },
  {
    path: "/physician",
    component: React.lazy(() => import("./Physician/Physician")),
    auth: authRoles.fac,
  },
];

export default mainRoutes;
