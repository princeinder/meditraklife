import React from "react";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    "& .sidenav": {
      "& .sidenav__hold": {
        opacity: "1 !important",
        "&::after": {
          background: theme.palette.tertiary.main,
          opacity: 0.96
        },
        "& .nav-item:not(.badge)": {
          color: theme.palette.text.primary
        },
        "& .nav-item": {
          "&.active, &.active:hover ": {
            // background: theme.palette.secondary.main

            color: `${theme.palette.secondary.main} !important`, // active nav-item changes
            background: theme.palette.tertiary.main,
            "& .item-icon &.item-text": {
              color: `${theme.palette.secondary.main} !important`
            }
          },
          "& .icon-text::after": {
            background: theme.palette.text.primary
          },
          "& button:focus": {
            outline: "0"
          }
        }
      }
    }
  }
});

const SidenavThemeStyles = ({ children, classes }) => {
  return <div className={classes.root}>{children}</div>;
};

export default withStyles(styles, { withTheme: true })(SidenavThemeStyles);
