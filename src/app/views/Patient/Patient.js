import React, { useState, Fragment } from "react";
import { useDispatch } from "react-redux";
import PatientTable from "./PatientTable";
import { Grid } from "@material-ui/core";
import history from "history.js";
import { addPatientChildNavigation } from "./../../redux/actions/NavigationAction";

const PatientComp = (props) => {
  const dispatch = useDispatch();
  const onPatientClick = ({ id, name }) => {
    history.push(`/patients/${id}`);
    // dispatch(
    //   addPatientChildNavigation({ name, path: "/patients/", icon: "person" })
    // );
  };
  return (
    <Grid container className="justify-center items-center py-12">
      <Grid item lg={10} md={10} sm={12} className="px-4">
        <PatientTable rowClickHandler={onPatientClick} />
      </Grid>
    </Grid>
  );
};

export default PatientComp;
