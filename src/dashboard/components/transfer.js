import React from 'react';
import { Table, Form, Segment } from 'semantic-ui-react';
import { Icon } from 'semantic-ui-react';
import { Input } from 'semantic-ui-react';
import { Button } from 'semantic-ui-react';

const INITIAL_STATE = (uid) => {
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
      transferSucces: false
    };
  }
  formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }
  transferRequest = () => {
    let form = document.getElementsByTagName('form')[0];
    let input = form.querySelectorAll('input');
    const { firebase, uid, balance } = this.props;
    const transferData = {
      price: input[0].value,
      uid_to: input[1].value,
      uid_from: uid
    };

    let transaction_id = Math.floor(1000 + Math.random() * 9000);
    firebase.db
      .collection('payment_history')
      .doc(transaction_id.toString())
      .set({
        ...transferData,
        transaction_id: transaction_id,
        date: this.formatDate(new Date())
      })
      .then((msg) => {
        // update reciever
        this.updateBalance(firebase, transferData.uid_to, transferData.price, (a, b) => {
          return a + b;
        });
        // update sender
        this.updateBalance(firebase, uid, transferData.price, (a, b) => {
          return a - b;
        });
        this.setState({
          transferSucces: true
        });
      })
      .catch((error) => console.log(error));
  };
  updateBalance = (firebase, uid, price, operation) => {
    let currentBalance = firebase.db
      .collection('users')
      .doc(uid)
      .get()
      .then((doc) => {
        if (doc.exists) return doc.data().balance;
      });
    currentBalance.then((e) => {
      firebase.db
        .collection('users')
        .doc(uid)
        .update({ balance: operation(e, Number(price)) })
        .then((msg) => {
          // console.log(msg);
        })
        .catch((error) => console.log(error));
    });
  };
  toggelScreen = () => {
    this.setState((prevState) => ({
      transferSucces: !prevState.transferSucces
    }));
  };
  render() {
    const Succes = (
      <div className="succesTransfer">
        <h1>Փոխանցումը կատարված է</h1>
        <Button secondary size="medium" onClick={this.toggelScreen}>
          Փակել
        </Button>
      </div>
    );
    const { price, uid_to, date, transferSucces } = this.state;
    const { balance, friend_uid } = this.props;
    return (
      <Segment>
        <>
          <Form onSubmit={this.transferRequest}>
            <Table color="white" textAlign="center" fixed columns={5} basic celled>
              {transferSucces ? (
                Succes
              ) : (
                <Table.Body>
                  <Table.Row>
                    <p>Ձեր բալանսը:{`${balance} e`}</p>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <Input
                        type="number"
                        placeholder="Ներմուծեք գումարը"
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
                        placeholder="Ներմուծեք հաշվեհամարը"
                        defaultValue={uid_to}
                        value={uid_to}
                        onChange={this.handleOnChange}
                        required
                      />
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <Button secondary size="medium">
                        Փոխանցել
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              )}
            </Table>
          </Form>
        </>
      </Segment>
    );
  }
}
