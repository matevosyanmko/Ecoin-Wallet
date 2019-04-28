import React from "react";
import { Route } from "react-router-dom";
// route  object
import { routes } from "./config/routes";
import { FirebaseContext } from "./firebase";

export const App = () => {
  return (
    <FirebaseContext.Consumer>
      {firebase => (
        <>
          {routes.map((route, key) => (
            <Route
              exact
              path={route.path}
              key={key}
              render={() => <route.component firebase={firebase} />}
            />
          ))}
        </>
      )}
    </FirebaseContext.Consumer>
  );
};
