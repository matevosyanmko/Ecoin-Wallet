import React from "react";
import { Button, Card } from "semantic-ui-react";
import Gears from "../assets/gears.svg";
import Logout from "../assets/logout.svg";
import "./dashboard.css";
// components
import Profile from "./components/profile";
import Services from "./components/services";
import Exchange from "./components/exchange";
import BankCard from "./components/card";
import PaymentHistory from "./components/paymentHistory";
import Transfer from "./components/transfer";
import Groups from "./components/groups/groups";
// add card
import AddBankCard from "./addCardPopup/addCardPopup";
import history from "../config/history";
// actions
// import * as Actions from "./actions/actions";
// firebase store
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
    // Actions.setBalance(uid);
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
    const { user, addCardModal, loading, toFriend } = this.state;
    if (loading) {
      return <img src={Gears} width={100} />;
    }
    return (
      <FirebaseContext.Consumer>
        {firebase => (
          <div className="dashboard">
            <div className="dashboardHeader shadow">
              <div className="dashboardHeaderName">Անձնական էջ</div>
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
                  <h2>Բանկային Քարտ</h2>
                  <BankCard
                    addCard={this.addCard}
                    firebase={firebase}
                    uid={user.uid}
                  />
                </div>
              </div>
              <div className="itemParent col-2">
                <div className="item payment rel">
                  <h2>Գործարքների Պատմություն</h2>
                  <PaymentHistory firebase={firebase} uid={user.uid} />
                </div>
                <div className="item services shadow">
                  <h2>Կոմունալ վճարումներ</h2>
                  <Services
                    firebase={firebase}
                    uid={user.uid}
                    balance={user.balance}
                  />
                </div>
              </div>
              <div className="itemParent col-1">
                <div className="item transfer">
                  <h2>Փոխանցել eCoin</h2>
                  <Transfer
                    firebase={firebase}
                    uid={user.uid}
                    balance={user.balance}
                    friend_uid={toFriend}
                  />
                </div>
                <div className="item exchange">
                  <h2>Փոխարժեք</h2>
                  <div className="exchangeBody">
                    <Exchange />
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <Groups
                firebase={firebase}
                uid={user.uid}
                transferto={e =>
                  this.setState({ toFriend: e }, () => {
                    document
                      .getElementsByClassName("transfer")[0]
                      .scrollIntoView({ block: "end", behavior: "smooth" });
                  })
                }
              />
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
