import React from "react";
import { Table, Form } from "semantic-ui-react";
import { Icon } from "semantic-ui-react";
import { Input } from "semantic-ui-react";
import { Button } from "semantic-ui-react";

const INITIAL_STATE = uid => {
  return {
    price: null,
    uid_to: null,
    uid_from: uid
  };
};
export default class Transfer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transferData: INITIAL_STATE(this.props.uid),
      transferSucces: false
    };
  }
  formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }
  transferRequest = () => {
    const { firebase, uid, balance } = this.props;
    const { transferData } = this.state;
    let transaction_id = Math.floor(1000 + Math.random() * 9000);
    firebase.db
      .collection("payment_history")
      .doc(transaction_id.toString())
      .set({
        ...transferData,
        transaction_id: transaction_id,
        date: this.formatDate(new Date())
      })
      .then(msg => {
        // update reciever
        this.updateBalance(
          firebase,
          transferData.uid_to,
          transferData.price,
          (a, b) => {
            return a + b;
          }
        );
        // update sender
        this.updateBalance(firebase, uid, transferData.price, (a, b) => {
          return a - b;
        });
        this.setState({
          transferData: INITIAL_STATE(uid),
          transferSucces: true
        });
      })
      .catch(error => console.log(error));
  };
  updateBalance = (firebase, uid, price, operation) => {
    let currentBalance = firebase.db
      .collection("users")
      .doc(uid)
      .get()
      .then(doc => {
        if (doc.exists) return doc.data().balance;
      });
    currentBalance.then(e => {
      firebase.db
        .collection("users")
        .doc(uid)
        .update({ balance: operation(e, Number(price)) })
        .then(msg => {
          // console.log(msg);
        })
        .catch(error => console.log(error));
    });
  };
  handleOnChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    const { transferData } = this.state;
    this.setState(prevState => ({
      transferData: {
        ...prevState.transferData,
        [name]: value
      }
    }));
  };
  toggelScreen = () => {
    this.setState(prevState => ({
      transferSucces: !prevState.transferSucces
    }));
  };
  render() {
    console.log("rend");
    const Succes = (
      <div className="succesTransfer">
        <h1>Succes transfer</h1>
        <Button secondary size="medium" onClick={this.toggelScreen}>
          close
        </Button>
      </div>
    );
    const { price, uid_to, date, transferSucces } = this.state;
    const { balance } = this.props;
    return (
      <>
        <Form onSubmit={this.transferRequest}>
          <h2>Transfer eCoin</h2>
          <Table inverted textAlign="center" fixed columns={5}>
            {transferSucces ? (
              Succes
            ) : (
              <Table.Body>
                <Table.Row>
                  <p>Your Balance:{`${balance} e`}</p>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <Input
                      type="number"
                      placeholder="Enter ammount"
                      name="price"
                      value={price}
                      onChange={this.handleOnChange}
                      maxLength={4}
                      max={balance}
                      required
                    />
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell>
                    <Input
                      name="uid_to"
                      placeholder="Enter UID"
                      value={uid_to}
                      onChange={this.handleOnChange}
                      required
                    />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <Button secondary size="medium">
                      Transfer
                    </Button>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            )}
          </Table>
        </Form>
      </>
    );
  }
}
