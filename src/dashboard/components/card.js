import React from "react";
import CardImage from "../../assets/plastic-card.svg";
import { Button } from "semantic-ui-react";
import Gears from "../../assets/gears.svg";
import { Table } from "semantic-ui-react";
import { Icon } from "semantic-ui-react";

export default class BankCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true
    };
  }
  componentDidMount = () => {
    this.getCardInfo();
  };

  getCardInfo = () => {
    const { uid, firebase } = this.props;
    firebase.db
      .collection("cards")
      .doc(uid)
      .get()
      .then(cardDetails => {
        let cd = null;
        if (cardDetails.exists) {
          cd = cardDetails.data();
        }
        this.setState({
          card: cd,
          loading: false
        });
      });
  };
  deleteCard = () => {
    const { uid, firebase } = this.props;
    firebase.db
      .collection("cards")
      .doc(uid)
      .delete()
      .then(() => {
        this.setState(
          {
            loading: true
          },
          this.getCardInfo
        );
      })
      .catch(function(error) {
        console.error("Error removing document: ", error);
      });
  };
  render() {
    const { card, loading } = this.state;
    if (loading) {
      return <img src={Gears} width={50} className="itemLoader" />;
    }
    let view = null;
    if (!card) {
      view = (
        <div className="cardComponent">
          <Icon
            name="refresh"
            size="large"
            onClick={this.getCardInfo}
            className="ico"
          />
          <img src={CardImage} />
          <Button secondary size="medium" onClick={this.props.addCard}>
            Ավելացնել քարտ
          </Button>
        </div>
      );
    } else {
      view = (
        <Table inverted celled textAlign="center" fixed columns={5}>
          <Table.Body>
            <Table.Row>
              <Table.Cell>Name</Table.Cell>
              <Table.Cell>{card.fullName}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Card Number</Table.Cell>
              <Table.Cell>{card.cardNumber}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Valid Date</Table.Cell>
              <Table.Cell>{card.validDate}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell colspan={2}>
                <Button secondary size="medium" onClick={this.deleteCard}>
                  Delete card
                </Button>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      );
    }

    return <> {view}</>;
  }
}
