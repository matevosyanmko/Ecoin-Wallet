import { Icon } from "semantic-ui-react";
import React from "react";
import "./alerts.css";

export const ErrorMessage = (msg, toggleErrorMessage) => (
  <div className="msg">
    <p className="errorMessage">
      <Icon
        name="close"
        size="small"
        color="black"
        className="closeIcon"
        onClick={toggleErrorMessage}
      />
      {msg}
    </p>
  </div>
);
