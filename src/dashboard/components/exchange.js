import React from "react";
import { Table } from "semantic-ui-react";
import { Select } from "semantic-ui-react";
import { Icon } from "semantic-ui-react";
import { Input } from "semantic-ui-react";
const currencyobj = [
  { key: "AMD", value: 0, text: "AMD", relativePrice: 655 },
  { key: "RUR", value: 1, text: "RUR", relativePrice: 90.53 },
  { key: "USD", value: 2, text: "USD", relativePrice: 1.35 }
];

export default class Exchange extends React.Component {
  constructor() {
    super();
    this.state = {
      currency: currencyobj[0],
      price: 1
    };
  }
  changeCurrency = (e, data) => {
    this.setState({
      currency: currencyobj[data.value]
    });
  };
  changePrice = e => {
    const price = e.target.value;
    this.setState({ price });
  };
  render() {
    const { currency, price } = this.state;
    let currentPrice = (price * currency.relativePrice).toFixed(2);
    return (
      <Table  textAlign="center" color="white">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>eCoin</Table.HeaderCell>
            <Table.HeaderCell>
              <Icon name="exchange" size="large" />
            </Table.HeaderCell>
            <Table.HeaderCell>
              <Select
                options={{ floating: true, scrolling: false }}
                fluid
                selection
                placeholder="Select currency"
                options={currencyobj}
                onChange={this.changeCurrency}
                value={this.state.currency.value}
              />
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell>
              <Input
                placeholder="eCoin"
                value={price}
                onChange={this.changePrice}
                maxLength={4}
                type="number" 
              />
            </Table.Cell>
            <Table.Cell />
            <Table.Cell>{currentPrice}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );
  }
}
