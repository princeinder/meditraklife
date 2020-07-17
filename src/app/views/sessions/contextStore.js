const SessionsContextReduxer = (state, { type, paylaod }) => {
  switch (type) {
    case "OPEN_SNACKBAR":
      return {
        ...state,
        sessionState: {
          open: true,
          message: paylaod
        }
      };
    case "CLOSE_SNACKBAR":
      return {
        ...state,
        sessionState: {
          open: false,
          message: ""
        }
      };
    default:
      return state;
  }
};

export default SessionsContextReduxer;
