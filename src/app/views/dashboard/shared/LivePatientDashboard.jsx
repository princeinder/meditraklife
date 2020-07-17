import React, { useState } from "react";
import { Card, Grid, Typography, Badge } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Graph } from "./Graph/Graph";

const useStyles = makeStyles(theme => ({
  
  greenClr: {
    color: "#A2F01E",
    stroke: "#A2F01E"
  },
  lightBlueClr:{
    color:"#78C6C6"
  },
  purpleLgClr:{
    color:"#F01EE4"
  },
  redClr: {
    color: "#F01E9A",
    stroke: "#F01E9A"
  },
  sblueClr:{
    color:"#3FD0C7"
  },
  pinkBgClr: {
    backgroundColor: "#e31d93",
    stroke: "#e31d93"
  },
  pinkClr: {
    color: "#e31d93"
  },
  purpleBgClr: {
    backgroundColor: "#5f1de3"
  },
  purpleClr: {
    color: "#5f1de3",
    stroke: "#5f1de3"
  },
  blueBgClr: {
    backgroundColor: "#1dcae3"
  },
  blueClr: {
    color: "#1dcae3",
    stroke:"#1dcae3"
  },
  redClr: {
    color: "#e31d1d"
  },
  orngBgClr: {
    backgroundColor: "red"
  },
  orngClr: {
    color: "red"
  }
}));

const TableCard = props => {
  const [avgRps, setAvgRps] = useState(13)
  const [avgSpo, setAvgSpo] = useState(91)
  const [avgPulse, setAvgPulse] = useState(121)
  const [avgTemp, setAvgTemp] = useState(96.4)
  const [avgBPlow, setAvgBPlow] = useState(76)
  const [avgBPhigh, setAvgBPhigh] = useState(105)
  const [avgHRM, setAvgHRM] = useState(89)
  const { RESP, SPO,PULSE } = Graph(setAvgRps,setAvgSpo,setAvgPulse,setAvgTemp,setAvgBPlow,setAvgBPhigh,setAvgHRM)
  const classes = useStyles();
  // const avgRps = 13;
  //  const avgSpo = 91;
  //  const avgPulse = 82;
  //  const avgTemp = 98.6;
  return (
    <Card elevation={3} className="h-full pt-5 mb-6">
      <div className="card-title px-6 mb-8">live patient dashboard</div>
      <div className="p-2">
        <Grid container spacing={3}>
          {/* left line graph */}
          <Grid item sm={1} className="p-0">
            
            <Grid container spacing={0}>
            <Grid
                item
                sm={12}
                className="flex flex-col justify-center items-center relative h-100"
              >
                <small
                className={`${classes.greenClr} p-3 font-bold`}>
                  Pleth
                </small>
              </Grid>
              <Grid
                item
                sm={12}
                className="flex flex-col justify-center items-center relative h-100 p-2"
              >
                <small className={`${classes.sblueClr} p-3 font-bold`}>
                Resp
                </small>
              </Grid>
              <Grid
                item
                sm={12}
                className="flex flex-col justify-center items-center relative h-100 p-2"
              >
                <small className={`${classes.redClr} p-3 font-bold`}>
                NPB
                mmHg
                </small>
              </Grid>
            </Grid>
          </Grid>
          <Grid item sm={7} className="p-0 ">
            <Grid container spacing={0} className="pl-11 pr-2">
              <Grid
                item
                sm={12}
                className="flex flex-col justify-center items-center relative h-100 p-2 "
              >
                <div
                  className={`${classes.greenClr} text-32 font-bold font-black`}
                  style={{ height: "inherit", width: "100%" }}
                >
                  <SPO style={classes.greenClr} />
                </div>
              </Grid>
              <Grid
                item
                sm={12}
                className="flex flex-col justify-center items-center relative h-100 p-2 "
              >
                <div className={`${classes.blueClr} text-32 font-black`} style={{height:"inherit",width:"100%"}}>
                  <PULSE style={classes.blueClr} />
                </div>
              </Grid>
              <Grid
                item
                sm={12}
                className="flex flex-col justify-center items-center relative h-100 p-2 "
              >
                <div className={`${classes.orngClr} text-32 font-black`}>
                  {avgBPhigh}  /  {avgBPlow}
                </div>
              </Grid>
            </Grid>
          </Grid>
          {/* Avg box  */}
          <Grid item sm={2} className="p-0">
            
            <Grid container spacing={0}>
            <Grid
                item
                sm={12}
                className="flex flex-col justify-center items-center relative h-100"
              >
                <small style={{left:'18px'}} className={`${classes.greenClr} p-3 font-bold absolute top-0`}>
                  Sp02
                </small>
                <div className={`${classes.greenClr} text-32 font-black`}>
                  {avgSpo}
                </div>
              </Grid>
              {/* <Grid
                item
                sm={12}
                className="flex flex-col justify-center items-center relative h-100 border p-2"
              >
                <small className="p-3 font-bold">
                  RR
                </small>
                <div className={`${classes.pinkClr} text-32 font-black`}>
                  {avgRps}
                </div>
              </Grid>
              */}
              <Grid
                item
                sm={12}
                className="flex flex-col justify-center items-center relative h-100  p-2"
              >
                <small style={{left:'18px'}} className={`${classes.lightBlueClr} p-3 absolute font-bold top-0`}>
                RR
                </small>
                <div className={`${classes.lightBlueClr} text-32 font-black`}>
                  {avgRps}
                </div>
              </Grid>
              <Grid
                item
                sm={12}
                className="flex  flex-col justify-center items-center relative h-100  p-2"
              >
                <div className={`${classes.redClr} text-32 font-red font-bold`}>
                {` (${83})`}
                </div>
              </Grid>
            </Grid>
          </Grid>

          <Grid item sm={2} className="p-0">
            <Grid container spacing={0}>
              <Grid
                item
                sm={12}
                className="flex flex-col justify-center items-center relative h-100 p-2"
              >
                <small style={{left:'18px'}} className={`${classes.greenClr} p-3 font-bold absolute top-0`}>
                  HR
                </small>
                <div className={`${classes.greenClr} text-32 font-black`}>
                  {avgPulse}
                </div>
              </Grid>
              <Grid
                item
                sm={12}
                className="flex  flex-col justify-center items-center relative h-100 p-2"
              >
                <small style={{left:'18px'}} className={`${classes.purpleLgClr} p-3 font-red absolute top-0 font-bold`}>
                  Temp
                </small>
                <div className={`${classes.purpleLgClr} text-32 font-red font-bold`}>
                  {avgTemp}
                </div>
              </Grid>
              {/* <Grid
                item
                sm={12}
                className="flex flex-col justify-center items-center relative h-100 border p-2"
              >
                <small className="p-3 font-bold absolute top-0 left-0">
                  PULSE
                </small>
                <div className={`${classes.blueClr} text-32 font-black`}>
                  {avgPulse}
                </div>
                <small
                  className={`p-3 font-bold absolute bottom-0 right-0 ${classes.blueClr} `}
                >
                  BPM
                </small>
              </Grid> */}
              <Grid
                item
                sm={12}
                className="flex  flex-col justify-center items-center relative h-100 p-2"
              >
                <div className={`${classes.redClr}  font-bold`}>
                  {/* <button className="font-bold border-2 text-left" style={{borderColor:'red',color:'red',padding:'5px'}}>READ</button> */}
                </div>
         
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </Card>
  );
};

export default TableCard;
