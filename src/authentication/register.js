import React from "react";
import { Input } from "semantic-ui-react";
import { Button } from "semantic-ui-react";
import "./authentication.css";
// alerts
import { ErrorMessage } from "./alerts/errorMessage";
import { auth } from "firebase";

const INITIAL_STATE = {
  username: "",
  email: "",
  passwordOne: "",
  passwordTwo: "",
  error: null
};
export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...INITIAL_STATE
    };
  }
  toggleErrorMessage = () => {
    this.setState({
      error: null
    });
  };
  handleSubmit = event => {
    event.preventDefault();
    const { username, email, passwordOne } = this.state;
    const { firebase } = this.props;
    // add user in db
    firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        firebase.db
          .collection("users")
          .doc(authUser.user.uid)
          .set({
            username: username,
            email: email,
            password: passwordOne,
            balance: 0.0,
            uid: authUser.user.uid,
            friends: []
          });
        this.props.changeView();
      })
      .catch(error => {
        this.setState({ error });
      });
  };
  handleInputChange = event => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value
    });
  };
  render() {
    const { username, email, passwordOne, passwordTwo, error } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === "" ||
      email === "" ||
      username === "";
    return (
      <div className="main">
        <form onSubmit={this.handleSubmit}>
          <Input
            type="text"
            icon={{ name: "user", circular: true, color: "black" }}
            placeholder="Անուն Ազգանուն"
            size="big"
            iconPosition="left"
            name="username"
            onChange={this.handleInputChange}
            value={username}
            maxlength="10"
            required
          />

          <Input
            type="email"
            icon={{
              name: "mail square",
              circular: true,
              color: "black",
              bordered: true
            }}
            iconPosition="left"
            placeholder="Էլ-փոստ"
            size="big"
            name="email"
            onChange={this.handleInputChange}
            value={email}
            required
          />
          <Input
            type="password"
            icon={{ name: "lock", circular: true, color: "black" }}
            placeholder="Գաղտնաբառ"
            size="big"
            iconPosition="left"
            name="passwordOne"
            onChange={this.handleInputChange}
            value={passwordOne}
            required
          />
          <Input
            type="password"
            icon={{ name: "lock", circular: true, color: "black" }}
            placeholder="Գաղտնաբառի կրկնություն"
            size="big"
            iconPosition="left"
            name="passwordTwo"
            onChange={this.handleInputChange}
            value={passwordTwo}
            required
          />
          {error && ErrorMessage(error.message, this.toggleErrorMessage)}
          <Button secondary size="medium" disabled={isInvalid}>
            Գրանցվել
          </Button>
        </form>
      </div>
    );
  }
}
