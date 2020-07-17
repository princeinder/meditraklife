// import "babel-polyfill";
import "react-app-polyfill/stable";
// import cssVars from "css-vars-ponyfill";

import React from "react";
import ReactDOM from "react-dom";
import "./styles/tailwind.css";
import "./_index.scss";

import * as serviceWorker from "./serviceWorker";
import App from "./app/App";

// cssVars();
const rootEl = document.getElementById("root");
ReactDOM.render(<App />, rootEl);

// for IE-11 support un-comment cssVars() and it's import in this file
// and in MatxTheme file

// Are we in development mode?
if (module.hot) {
  // Whenever a new version of App.js is available
  module.hot.accept()
  // module.hot.accept("./app/App", function() {
  //   // Require the new version and render it instead
  //   var NextApp = require("./app/App");
  //   ReactDOM.render(<NextApp />, rootEl);
  // });
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
