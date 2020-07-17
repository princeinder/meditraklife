/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { setUserData } from "../redux/actions/UserActions";
import { getNavigationByUser } from "../redux/actions/NavigationAction";
import jwtAuthService from "../services/jwtAuthService";
import localStorageService from "../services/localStorageService";
import firebaseAuthService from "../services/firebase/firebaseAuthService";
import history from "history.js";
import { CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((them) => {
  return {
    topLoadingLayer: {
      zIndex: 999999,
    },
  };
});
// const checkJwtAuth = async setUserData => {
//   // You need to send token to your server to check token is valid
//   // modify loginWithToken method in jwtService
//   let user = await jwtAuthService.loginWithToken();
//   if (user) setUserData(user);
//   else
//     history.push({
//       pathname: "/session/signin"
//     });
//   return user;
// };

const checkFirebaseAuth = (setUserData, setLoading, getNavigationByUser) => {
  firebaseAuthService.checkAuthStatus((user) => {
    if (user) {
      setUserData({
        userId: "1",
        role: "PHYSICIAN",
        displayName: "Testing Guy",
        email: "testing@gmail.com",
        photoURL: "/assets/images/face-7.jpg",
        age: 25,
        token: "faslkhfh423oiu4h4kj432rkj23h432u49ufjaklj423h4jkhkjh",
      });
      setLoading(false);
      history.push({
        pathname: "/patients",
      });
    } else {
      setLoading(false);
      history.push({
        pathname: "/session/signin",
      });
    }
    getNavigationByUser();
  });
};

const checkTestAuth = (setUserData, setLoading, getNavigationByUser) => {
  const check = window.localStorage.getItem("login_set");
  if (check && check.length > 0) {
    setUserData({
      userId: "1",
      role: check,
      displayName: "Testing Guy",
      email: "testing@gmail.com",
      photoURL: "/assets/images/face-7.jpg",
      age: 25,
      token: "faslkhfh423oiu4h4kj432rkj23h432u49ufjaklj423h4jkhkjh",
    });
    history.push({
      pathname: "/patients",
    });
  } else {
    history.push({
      pathname: "/session/signin",
    });
  }
  setLoading(false);
  getNavigationByUser();
};
const Auth = ({ children, setUserData, getNavigationByUser }) => {
  // setUserData(localStorageService.getItem("auth_user"));
  const classes = useStyles();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // checkJwtAuth(setUserData);
    setLoading(true);
    // checkFirebaseAuth(setUserData, setLoading, getNavigationByUser);
    checkTestAuth(setUserData, setLoading, getNavigationByUser);
  }, [setUserData, getNavigationByUser]);

  return (
    <Fragment>
      {loading && (
        <div
          className={`absolute top-0 left-0 w-full h-full bg-white flex flex-col items-center justify-center ${classes.topLoadingLayer}`}
        >
          <CircularProgress />
        </div>
      )}
      {children}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  setUserData: PropTypes.func.isRequired,
  getNavigationByUser: PropTypes.func.isRequired,
  login: state.login,
});

export default connect(mapStateToProps, { setUserData, getNavigationByUser })(
  Auth
);
