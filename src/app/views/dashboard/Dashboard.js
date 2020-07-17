import React, { useState, Fragment } from "react";
import { DashboardTabs, TabPanel } from "./DashboardTabs";

import Overview from "./TabsMenuItems/Overview";
import Trends from "./TabsMenuItems/Trend/Trends";

const tabList = [
  { label: "Overview", icon: "home" },
  { label: "Trends", icon: "trending_up" },
  { label: "EHR Review", icon: "dashboard" },
  { label: "E-Perscribe", icon: "ballot" },
  { label: "Notes", icon: "note" },
 // { label: "Facility Details", icon: "" },
];
const Dashboard = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  return (
    <Fragment>
      <div className="analytics m-sm-30 amt--18">
        <DashboardTabs
          value={tabValue}
          handleChange={handleTabChange}
          tabList={tabList}
        />
        <TabPanel value={tabValue} index={0}>
          <Overview />
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <Trends />
        </TabPanel>
      </div>
    </Fragment>
  );
};

export default Dashboard;
