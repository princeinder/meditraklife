import jwtAuthService from "../../services/jwtAuthService";
import FirebaseAuthService from "../../services/firebase/firebaseAuthService";
import { setUserData } from "./UserActions";
import history from "history.js";

import { reGetNavigationByUser } from "./NavigationAction";
export const LOGIN_ERROR = "LOGIN_ERROR";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_LOADING = "LOGIN_LOADING";
export const RESET_PASSWORD = "RESET_PASSWORD";

export function loginWithEmailAndPassword({ email, password }) {
  return (dispatch) => {
    dispatch({
      type: LOGIN_LOADING,
    });

    jwtAuthService
      .loginWithEmailAndPassword(email, password)
      .then((user) => {
        dispatch(setUserData(user));

        history.push({
          pathname: "/",
        });

        return dispatch({
          type: LOGIN_SUCCESS,
        });
      })
      .catch((error) => {
        return dispatch({
          type: LOGIN_ERROR,
          payload: error,
        });
      });
  };
}

export function resetPassword({ email }) {
  return (dispatch) => {
    dispatch({
      payload: email,
      type: RESET_PASSWORD,
    });
  };
}

export function firebaseLoginEmailPassword({
  email,
  password,
  // UID,
  role,
  remember,
}) {
  return (dispatch) => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await FirebaseAuthService.signInWithEmailAndPassword(
          email,
          password
        );
        if (user) {
          dispatch(
            setUserData({
              userId: "1",
              role: "PHYSICIAN",
              displayName: "Testing Guy",
              email: "testing@gmail.com",
              photoURL: "/assets/images/face-7.jpg",
              age: 25,
              token: "faslkhfh423oiu4h4kj432rkj23h432u49ufjaklj423h4jkhkjh",
            })
          );

          history.push({
            pathname: "/patients",
          });

          dispatch({
            type: LOGIN_SUCCESS,
          });
          resolve("success");
        } else {
          // dispatch(
          //   setUserData({
          //     role: "UNAUTH"
          //   })
          // );
          return dispatch({
            type: LOGIN_ERROR,
            payload: "Login Failed",
          });
        }
      } catch (error) {
        dispatch({
          type: LOGIN_ERROR,
          payload: error,
        });
        reject("user not found.");
      }
    });
  };
}

export const firebaseSignUpEmailPassword = ({
  email,
  password,
  UID,
  fullname,
  role,
  remember,
}) => {
  return (dispatch) => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await FirebaseAuthService.signUpWithEmailAndPassword(
          email,
          password
        );
        if (user) {
          const { uid, email } = user;

          if (remember) {
            dispatch(
              setUserData({
                userId: "1",
                role: role,
                displayName: "Testing Guy",
                email: "testing@gmail.com",
                photoURL: "/assets/images/face-7.jpg",
                age: 25,
                token: "faslkhfh423oiu4h4kj432rkj23h432u49ufjaklj423h4jkhkjh",
              })
            );
            history.push({
              pathname: "/session/signin",
            });
            dispatch({
              type: LOGIN_SUCCESS,
            });
          } else {
            await FirebaseAuthService.signOut();
          }
          resolve("Registered Successfully.");
        } else {
          dispatch({
            type: LOGIN_ERROR,
            payload: "Login Failed",
          });
          reject("error");
        }
      } catch (error) {
        const { code } = error;
        if (code === "auth/email-already-in-use") {
          dispatch({
            type: LOGIN_ERROR,
            payload: "Use Another Email.",
          });
        }
        reject(code);
      }
    });
  };
};

export const testLogin = ({ email, password, role }) => {
  return (dispatch) => {
    window.localStorage.setItem("login_set", "" + `${role}`);
    dispatch(
      setUserData({
        userId: "1",
        role: role,
        displayName: "Testing Guy",
        email: email,
        photoURL: "/assets/images/face-7.jpg",
        age: 25,
      })
    );
    dispatch({
      type: LOGIN_SUCCESS,
    });
    dispatch(reGetNavigationByUser());
    history.push({
      pathname: "/patients",
    });
  };
};
