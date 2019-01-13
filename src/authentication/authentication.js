import React from "react";
import "./authentication.css";
import { Button } from "semantic-ui-react";
import Login from "./login";
import Register from "./register";
import Logo from "../assets/logo.png";
import Dashboard from "../dashboard/dashboard";
import { FirebaseContext } from "../firebase";
// import Logo from "./logo.svg";

const USER = {
  email: "ando",
  password: "ando"
};

export default class Authentication extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: "login"
    };
  }
  changeView = () => {
    this.setState({
      view: "login"
    });
  };
  render() {
    return (
      <div className="wrapper">
        <div className="auth">
          <img src={Logo} style={{ opacity: 0.8 }} />
          <Button.Group>
            <Button
              secondary
              onClick={() => {
                this.setState({ view: "login" });
              }}
            >
              Sign In
            </Button>
            <Button.Or />
            <Button
              secondary
              onClick={() => {
                this.setState({ view: "register" });
              }}
            >
              Register
            </Button>
          </Button.Group>
          <FirebaseContext.Consumer>
            {firebase => (
              <>
                {this.state.view === "login" && <Login firebase={firebase} />}
                {this.state.view === "register" && (
                  <Register firebase={firebase} changeView={this.changeView} />
                )}
              </>
            )}
          </FirebaseContext.Consumer>
        </div>
      </div>
    );
  }
}
{
  /*  */
}
{
  /*  */
}
