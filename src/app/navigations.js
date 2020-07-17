import { authRoles } from "./auth/authRoles";
export const navigations = [
  {
    name: "Patients",
    path: "/patients",
    icon: "person",
  },
  {
    name: "Physicians",
    path: "/physician",
    icon: "person_outline",
    auth: authRoles.fac,
  },
  {
    name: "Calendar",
    path: "/calendar",
    icon: "calendar_today",
  },
  {
    name: "Settings",
    path: "/settings",
    icon: "settings",
  },
];
