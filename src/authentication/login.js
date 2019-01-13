import React from "react";
// semantic components
import { Input } from "semantic-ui-react";
import { Button } from "semantic-ui-react";

//
import "./authentication.css";
import history from "../config/history";
import { auth } from "firebase";
// alerts
import { ErrorMessage } from "./alerts/errorMessage";

const INITIAL_STATE = {
  email: "",
  password: "",
  error: null
};
export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...INITIAL_STATE
    };
  }
  handleInputChange = event => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value
    });
  };
  toggleErrorMessage = () => {
    this.setState({
      error: null
    });
  };
  checkUser = e => {
    e.preventDefault();
    const { email, password } = this.state;
    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(authUser => {
        localStorage.setItem("session", JSON.stringify(authUser));
        history.push("./dashboard");
      })
      .catch(error => {
        this.setState({ error });
      });
      
  };
  render() {
    const { error } = this.state;

    return (
      <div className="main">
        <img src={this.props.logo} />
        <form onSubmit={this.checkUser}>
          <Input
            type="text"
            icon={{ name: "mail square", circular: true, color: "black" }}
            placeholder="Email..."
            size="big"
            iconPosition="left"
            onChange={this.handleInputChange}
            name="email"
            value={this.state.email}
          />
          <Input
            type="password"
            icon={{
              name: "lock",
              circular: true,
              color: "black",
              bordered: true
            }}
            iconPosition="left"
            placeholder="Password..."
            size="big"
            onChange={this.handleInputChange}
            name="password"
            value={this.state.password}
          />
          {error && ErrorMessage(error.message, this.toggleErrorMessage)}
          <Button secondary size="medium">
            Log in
          </Button>
        </form>
      </div>
    );
  }
}
