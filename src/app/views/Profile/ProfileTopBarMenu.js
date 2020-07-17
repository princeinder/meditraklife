import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MatxMenu } from "matx";
import { Icon, IconButton, MenuItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { logoutUser } from "./../../redux/actions/UserActions";

const useStyles = makeStyles((them) => ({
  menuItem: {
    display: "flex",
    alignItems: "center",
    minWidth: 185,
  },
}));

const ProfileMenuTopbar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector(({ user }) => user);

  const logoutHandler = () => {
    dispatch(logoutUser());
  };

  return (
    <Fragment>
      <MatxMenu
        menuButton={
          <div className="flex items-center cursor-pointer">
            <img
              className="mx-2 align-middle circular-image-small cursor-pointer"
              src={user.photoURL || "/assets/images/face-6.jpg"}
              alt={user.displayName || "user"}
            />
            {user.displayName}
          </div>
        }
      >
        {/* <MenuItem>
          <Link className={classes.menuItem} to="/">
            <Icon> home </Icon>
            <span className="pl-4"> Home </span>
          </Link>
        </MenuItem>
        <MenuItem>
          
          <Icon> person </Icon>
          <span className="pl-4"> Profile </span>
        </MenuItem>
        <MenuItem className={classes.menuItem}>
          <Icon> settings </Icon>
          <span className="pl-4"> Settings </span>
        </MenuItem> */}
        <MenuItem onClick={logoutHandler} className={classes.menuItem}>
          <Icon> power_settings_new </Icon>
          <span className="pl-4"> Logout </span>
        </MenuItem>
      </MatxMenu>
    </Fragment>
  );
};

export default ProfileMenuTopbar;
