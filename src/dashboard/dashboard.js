import React from "react";
import { Button, Card } from "semantic-ui-react";
import Gears from "../assets/gears.svg";
import Logout from "../assets/logout.svg";
import "./dashboard.css";
// components
import Profile from "./components/profile";
import { Services } from "./components/services";
import Exchange from "./components/exchange";
import BankCard from "./components/card";
import PaymentHistory from "./components/paymentHistory";
import Transfer from "./components/transfer";
// add card
import AddBankCard from "./addCardPopup/addCardPopup";
import history from "../config/history";

import { FirebaseContext } from "../firebase";
const INITIAL_STATE = {
  username: "",
  email: "",
  password: "",
  balance: 0,
  uid: "",
  cards: 0
};
export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: INITIAL_STATE,
      loading: true,
      addCardModal: false
    };
  }
  getCurrentUser = uid => {
    const { firebase } = this.props;
    firebase.db
      .collection("users")
      .doc(uid)
      .onSnapshot(user => {
        this.setState({
          user: user.data(),
          loading: false
        });
      });
  };
  componentDidMount = () => {
    const { uid } = JSON.parse(localStorage.getItem("session")).user;
    if (uid) {
      this.getCurrentUser(uid);
    } else {
      this.logOut();
    }
  };

  logOut = () => {
    history.push("./");
    localStorage.removeItem("session");
  };
  addCard = () => {
    this.setState({
      addCardModal: !this.state.addCardModal
    });
  };
  render() {
    const { user, addCardModal, loading } = this.state;
    if (loading) {
      return <img src={Gears} width={100} />;
    }
    return (
      <FirebaseContext.Consumer>
        {firebase => (
          <div className="dashboard">
            <div className="dashboardHeader shadow">
              <div className="dashboardHeaderName">Dashboard</div>
              <div className="dashboardHeaderMenu">
                <img src={Logout} onClick={this.logOut} />
              </div>
            </div>
            <div className="dashboardBody ">
              <div className="itemParent col-1">
                <Profile
                  user={user}
                  refresh={() => this.getCurrentUser(user.uid)}
                />
                <div className="item card shadow rel">
                  <h2>Bank Cards</h2>
                  <BankCard
                    addCard={this.addCard}
                    firebase={firebase}
                    uid={user.uid}
                  />
                </div>
              </div>
              <div className="itemParent col-2">
                <div className="item payment rel">
                  <h2>Payment History</h2>
                  <PaymentHistory firebase={firebase} uid={user.uid} />
                </div>
                <div className="item services shadow">
                  <h2>Services</h2>
                  {Services}
                </div>
              </div>
              <div className="itemParent col-1">
                <div className="item transfer">
                  <Transfer
                    firebase={firebase}
                    uid={user.uid}
                    balance={user.balance}
                  />
                </div>
                <div className="item exchange">
                  <h2>Exchange rate</h2>
                  <div className="exchangeBody">
                    <Exchange />
                  </div>
                </div>
              </div>
            </div>
            {this.state.addCardModal && (
              <AddBankCard
                addCard={this.addCard}
                update={this.getCurrentUser}
                modalState={addCardModal}
                firebase={firebase}
                uid={user.uid}
              />
            )}
          </div>
        )}
      </FirebaseContext.Consumer>
    );
  }
}
