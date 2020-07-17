import FirebaseAuthService from "../../services/firebase/firebaseAuthService";
export const SET_NAVIGATION = "SET_NAVIGATION";
export const GET_NAVIGATION = "GET_NAVIGATION";
export const RESET_NAVIGATION = "RESET_NAVIGATION";

export function getNavigation(user) {
  return {
    type: GET_NAVIGATION,
  };
}

export function firebasaLogoutUser() {
  return (dispatch) => {
    FirebaseAuthService.signOut();

    history.push({
      pathname: "/session/signin",
    });

    dispatch({
      type: USER_LOGGED_OUT,
    });
  };
}

export function logoutUser() {
  return (dispatch) => {
    window.localStorage.removeItem("login_set");
    history.push({
      pathname: "/session/signin",
    });
    dispatch({
      type: USER_LOGGED_OUT,
    });
  };
}
