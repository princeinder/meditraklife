import React, { Fragment } from "react";

import { AppBar, Tabs, Tab, Icon } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "99%",
    maxHeight: "490px !important",
    flexGrow: 1,
    width: "100%",
    borderBottom: "0.5px solid #d0d1d2",
    marginBottom: "16px",
  },
  wrapper: { flexDirection: "row", justifyContent: "space-evenly" },
}));

export const DashboardTabs = (props) => {
  const classes = useStyles();
  const { value, handleChange, tabList = [] } = props;

  return (
    <div className={classes.root}>
      <AppBar
        position="static"
        color="transparent"
        style={{ boxShadow: "none" }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="secondary"
          // variant="fullWidth"
          scrollButtons="auto"
          aria-label=" auto tabs example"
        >
          {tabList.map((obj, index) => {
            return (
              <Tab
                key={index}
                classes={{ wrapper: classes.wrapper }}
                icon={<Icon>{obj.icon}</Icon>}
                label={obj.label}
                {...a11yProps(index)}
              />
            );
          })}
        </Tabs>
      </AppBar>
    </div>
  );
};

export const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  if (value === index) {
    return <Fragment>{children}</Fragment>;
  } else {
    return null;
  }
};
