export const authRoles = {
  phy: ["PHYSICIAN"],
  fac: ["FACILITY"],
  both: ["PHYSICIAN", "FACILITY"], // Everyone has access
  unauth: ["UNAUTH"],
};

// Check out app/views/dashboard/DashboardRoutes.js
// Only SA & Admin has dashboard access

// const dashboardRoutes = [
//   {
//     path: "/dashboard/analytics",
//     component: Analytics,
//     auth: authRoles.admin <----------------
//   }
// ];
