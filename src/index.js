import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { App } from "./app.js";
import * as serviceWorker from "./serviceWorker";
import "semantic-ui-css/semantic.min.css";
import { Router } from "react-router-dom";
import history from "./config/history";
import Firebase, { FirebaseContext } from "./firebase";

ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <Router history={history}>
      <App />
    </Router>
  </FirebaseContext.Provider>,
  document.getElementById("root")
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

