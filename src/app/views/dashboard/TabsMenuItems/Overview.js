import React, { useState, Fragment } from "react";
import { Grid, Card } from "@material-ui/core";
import StatCards from "../shared/PatientStatCards";
import LivePatientDashboard from "../shared/LivePatientDashboard";
import ChatBox from "../shared/ChatBox/ChatBox";
import { withStyles } from "@material-ui/styles";

const OverviewComp = (props) => {
  const { theme } = props;
  return (
    <Fragment>
      {/* <div className="analytics m-sm-30 amt--18"> */}
      <Grid container spacing={3}>
        {/* This is the profile & device connect */}
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <StatCards />
        </Grid>
        {/* Live patient dashboard */}
        <Grid item lg={8} md={8} sm={12} xs={12}>
          <LivePatientDashboard />
        </Grid>

        <Grid
          item
          lg={4}
          md={4}
          sm={12}
          xs={12}
          style={{
            minHeight: "490px !important",
            height: "490px !important",
          }}
        >
          <ChatBox />
        </Grid>
      </Grid>
      {/* </div> */}
    </Fragment>
  );
};

// export default Dashboard;
export default withStyles({}, { withTheme: true })(OverviewComp);
