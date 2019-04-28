import React from "react";
import { Input } from "semantic-ui-react";
import { Button } from "semantic-ui-react";
import { Icon } from "semantic-ui-react";
import "./ServicePaymentView.css";

export default class ServicePaymentView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.serviceObject.id,
      name: this.props.serviceObject.name,
      ammount: null,
      subscriberId: null
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
  formSubmit = e => {
    e.preventDefault();
    const { uid, firebase, balance } = this.props;
    let transaction_id = Math.floor(1000 + Math.random() * 9000);
    firebase.db
      .collection("services")
      .doc(transaction_id.toString())
      .set({
        ...this.state,
        uid,
        date: this.formatDate(new Date())
      })
      .then(msg => {
        // update reciever
        this.props.succes();
      });
    firebase.db
      .collection("users")
      .doc(uid)
      .update({ balance: Number(balance - this.state.ammount) })
      .then(msg => {
        // update reciever
        this.props.succes();
      });
  };

  handleInputChange = e => {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({ [name]: value });
  };
  render() {
    const { serviceObject, balance } = this.props;
    const { id, name, ammount, subscriberId } = this.state;

    return (
      <>
        <>
          <Icon
            name="close"
            size="large"
            className="closeModal"
            color="red"
            onClick={this.props.initialView}
          />

          <form onSubmit={this.formSubmit} className="servicePayment">
            <h2>{name}</h2>
            <h3>Ներմուծեք տվյալները</h3>
            <img src={serviceObject.img} />
            <p>Ձեր բալանսը {balance}</p>
            <Input
              type="number"
              icon={{ name: "user square", circular: true, color: "black" }}
              placeholder="Բաժանորդի համարը"
              size="small"
              iconPosition="left"
              onChange={this.handleInputChange}
              name="subscriberId"
              value={subscriberId}
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
              placeholder="Գումարը"
              size="small"
              onChange={this.handleInputChange}
              name="ammount"
              value={ammount}
              max={balance}
              required
            />

            <Button secondary size="medium">
              Վճարել
            </Button>
          </form>
        </>
      </>
    );
  }
}
