import React, { useState, createContext, useReducer } from "react";
import { Tabs, Tab, Card, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { MatxSnackbar } from "matx";
import sessionReducer from "./contextStore";

const useStyles = makeStyles(theme => ({
  topbar: {
    width: "100%",
    // boxShadow: theme.shadows[1],
    minHeight: "64px",
    height: "64px",
    marginBottom: "8px"
  },
  card: {
    minWidth: "220px",
    maxWidth: "410px !important"
  }
}));

const initialSnackbar = {
  open: false,
  message: ""
};
export const MyContext = createContext(null);
const SessionLayout = props => {
  const classes = useStyles();
  const [sessionState, dispatch] = useReducer(sessionReducer, {
    other: null,
    snackbarObj: initialSnackbar
  });
  const { snackbarObj } = sessionState;
  const handleClose = () => {
    dispatch({ type: "CLOSE_SNACKBAR" });
  };

  return (
    <div className="bg-gray-100 w-full-screen h-full-screen flex-column justify-centers items-center">
      <div className={`${classes.topbar} px-6 flex items-center`}>
        <Typography className="font-bold ">Meditrak Life</Typography>
      </div>
      <div className="flex-grow w-full ">
        <Card
          elevation={3}
          className={`max-w-2xl mx-auto mb-16 p-8 pb-24 relative ${classes.card}`}
        >
          <MyContext.Provider value={{ sessionState, dispatch }}>
            {props.children}
          </MyContext.Provider>
        </Card>
      </div>
      <MatxSnackbar {...snackbarObj} handleClose={handleClose} />
    </div>
  );
};

export default SessionLayout;
