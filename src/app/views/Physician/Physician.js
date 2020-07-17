import React, { Fragment } from "react";
import { Grid, Card, Avatar, Typography, Icon } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
const physicianList = [
  {
    name: "Megan Wckowdhoti",
    uid: "2354736587",
    avatarUrl: "/assets/images/faces/2.jpg",
  },
  {
    name: "Torle Unberxr",
    uid: "144736587",
    avatarUrl: "/assets/images/faces/3.jpg",
  },
  {
    name: "Torle Unberxr",
    uid: "144736587",
    avatarUrl: "/assets/images/faces/3.jpg",
  },
  {
    name: "Torle Unberxr",
    uid: "144736587",
    avatarUrl: "",
  },
  {
    name: "Megan Wckowdhoti",
    uid: "2354736587",
    avatarUrl: "",
  },
  {
    name: "Torle Unberxr",
    uid: "144736587",
    avatarUrl: "/assets/images/faces/3.jpg",
  },
  {
    name: "Torle Unberxr",
    uid: "144736587",
    avatarUrl: "/assets/images/faces/15.jpg",
  },
  {
    name: "Torle Unberxr",
    uid: "144736587",
    avatarUrl: "",
  },
];

const useStyles = makeStyles((theme) => ({
  avatar: {
    [theme.breakpoints.down("md")]: {
      height: "75px !important",
      width: "75px !important",
    },
  },
  title: {
    [theme.breakpoints.down("md")]: {
      fontSize: "0.8rem",
    },
  },
  subTitle: {
    fontSize: "1.1rem ",
    [theme.breakpoints.down("md")]: {
      fontSize: "0.7rem",
    },
  },
}));
const Physician = (props) => {
  const classes = useStyles();
  return (
    <Fragment>
      <div className="analytics m-sm-30 amt--18">
        <Grid container spacing={5}>
          {physicianList.map((obj, index) => {
            return (
              <Grid key={index} item lg={3} md={4} sm={4} xs={6}>
                <Card className="bg-paper py-8 flex flex-col justify-center items-center">
                  <Avatar
                    classes={{ root: classes.avatar }}
                    className="w-100 h-100"
                    src={obj.avatarUrl}
                  >
                    <span className="text-30 font-bold"> {obj.name[0]}</span>
                  </Avatar>
                  <Typography
                    variant="h6"
                    classes={{ root: classes.title }}
                    className="mt-4 font-bold leading-relaxed capitalize"
                  >
                    {obj.name}
                  </Typography>
                  <Typography
                    classes={{ root: classes.subTitle }}
                    className="text-gray-500 "
                  >
                    UID-{obj.uid}
                  </Typography>
                </Card>
              </Grid>
            );
          })}
          <Grid item lg={3} md={4} sm={4} xs={6}>
            <Card className="bg-paper py-8 flex flex-col justify-center items-center">
              <Avatar className="w-100 h-100">
                <Icon className="text-30 font-bold">add</Icon>
              </Avatar>
              <Typography
                classes={{ root: classes.title }}
                className="mt-4 leading-relaxed text-gray-500 capitalize"
              >
                add new clinician
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </div>
    </Fragment>
  );
};

export default Physician;
