import React from "react";
import CardImage from "../../assets/plastic-card.svg";
import { Input } from "semantic-ui-react";
import { Button } from "semantic-ui-react";
import { Icon } from "semantic-ui-react";
import "./addCardPopup.css";
export default class AddBankCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardInfo: {
        fullName: null,
        cardNumber: null,
        validDate: null,
        cv: null
      },
      succes: false
    };
  }
  formSubmit = e => {
    e.preventDefault();
    const { uid, firebase } = this.props;
    firebase.db
      .collection("cards")
      .doc(uid)
      .set(this.state.cardInfo)
      .then(msg => {
        // update reciever
        firebase.db
          .collection("users")
          .doc(uid)
          .update({ cards: 1 })
          .then(msg => {
            this.setState(
              {
                succes: true
              }
              // setTimeout(this.props.addCard, 1000)
            );
            // setTimeout(() => this.props.update(uid), 500);
          });
      });
  };

  handleInputChange = e => {
    let name = e.target.name;
    let value = e.target.value;
    this.setState(prevState => ({
      cardInfo: { ...prevState.cardInfo, [name]: value.toUpperCase() }
    }));
  };
  render() {
    const { succes } = this.state;

    return (
      <div id="overlay">
        {succes ? (
          <div className="overlayAlert">
            <h2>Card added to your account</h2>
            <Button secondary size="medium" onClick={this.props.addCard}>
              Close
            </Button>
          </div>
        ) : (
          <>
            <Icon
              name="close"
              size="large"
              className="closeModal"
              color="red"
              onClick={this.props.addCard}
            />

            <form onSubmit={this.formSubmit} className="addCardForm">
              <h2>Write Card Details</h2>
              <img src={CardImage} />
              <Input
                type="text"
                icon={{ name: "user square", circular: true, color: "black" }}
                placeholder="FULL NAME"
                size="small"
                iconPosition="left"
                onChange={this.handleInputChange}
                name="fullName"
                value={this.state.fullName}
                required
              />
              <Input
                type="number"
                icon={{
                  name: "numbered list",
                  circular: true,
                  color: "black",
                  bordered: true
                }}
                iconPosition="left"
                placeholder="CARD NUMBER"
                size="small"
                onChange={this.handleInputChange}
                name="cardNumber"
                value={this.state.cardNumber}
                required
              />
              <Input
                type="month"
                icon={{
                  name: "calendar",
                  circular: true,
                  color: "black",
                  bordered: true
                }}
                iconPosition="left"
                placeholder="VALID UNTIL"
                size="small"
                onChange={this.handleInputChange}
                name="validDate"
                value={this.state.validDate}
                required
              />
              <Input
                type="password"
                icon={{
                  name: "payment",
                  circular: true,
                  color: "black",
                  bordered: true
                }}
                iconPosition="left"
                placeholder="CVC2 / CVV2 / CID "
                size="small"
                onChange={this.handleInputChange}
                name="cv"
                value={this.state.cv}
                required
              />

              <Button secondary size="medium">
                Add Card
              </Button>
            </form>
          </>
        )}
      </div>
    );
  }
}
