import React from "react";

import { FirebaseContext } from "./firebase";

const SomeComponent = () => (
  <FirebaseContext.Consumer>
    {firebase => {
      console.log(firebase);
      return <div>I've access to Firebase and render something.</div>;
    }}
  </FirebaseContext.Consumer>
);

export default SomeComponent;
