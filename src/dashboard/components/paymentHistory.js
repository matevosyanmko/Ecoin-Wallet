import React from "react";
import { Button } from "semantic-ui-react";
import { Table } from "semantic-ui-react";
import { Icon } from "semantic-ui-react";
import Gears from "../../assets/gears.svg";

export default class PaymentHistory extends React.Component {
  constructor() {
    super();
    this.state = {
      history: [],
      loading: true,
      load: false,
      view: "output"
    };
  }
  rotate = () => {
    this.toggleLoader();
    window.setTimeout(this.toggleLoader, 2000);
  };
  toggleLoader = () => {
    this.setState(prevState => ({
      load: !prevState.load
    }));
  };

  componentDidMount = () => {
    this.getHistory();
  };
  getHistory = () => {
    const { firebase, uid } = this.props;
    const { view } = this.state;
    let query = "";
    view === "output" ? (query = "uid_from") : (query = "uid_to");
    console.log("view", query);
    firebase.db
      .collection("payment_history")
      .where(query, "==", uid)
      .get()
      .then(history => {
        this.setState(
          {
            history: history.docs.map(el => el.data()),
            loading: false
          },
          this.rotate
        );
      });
  };
  changeView = e => {
    this.setState(
      {
        view: e,
        loading: true
      },
      this.getHistory
    );
  };
  render() {
    const { history, loading, load, view } = this.state;
    if (loading) {
      return <img src={Gears} width={50} className="itemLoader" />;
    }
    return (
      <Table unstackable striped celled inverted textAlign="center">
        <Icon
          name="refresh"
          size="large"
          onClick={this.getHistory}
          className="ico"
          loading={load ? true : false}
        />
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell colspan={4}>
              <ul className="historyState">
                <li
                  onClick={() => this.changeView("input")}
                  className={view === "input" ? "activeView" : "passiveView"}
                >
                  INCOMING
                </li>
                <li
                  onClick={() => this.changeView("output")}
                  className={view === "output" ? "activeView" : "passiveView"}
                >
                  OUTGOING
                </li>
              </ul>
            </Table.HeaderCell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell>Price</Table.HeaderCell>
            <Table.HeaderCell>uID</Table.HeaderCell>
            <Table.HeaderCell colspan={2}>Date</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {history.map((item, key) => {
            return (
              <Table.Row key={key}>
                <Table.Cell>{item.price}</Table.Cell>
                <Table.Cell>{item.uid_to}</Table.Cell>
                <Table.Cell colspan={2}>{item.date}</Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    );
  }
}
