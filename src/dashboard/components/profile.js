import React from "react";
import { Table } from "semantic-ui-react";
import { Icon } from "semantic-ui-react";

export default class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      load: false
    };
  }
  componentWillReceiveProps = nextProps => {
    this.toggleLoader();
    window.setTimeout(this.toggleLoader, 2000);
  };
  toggleLoader = () => {
    this.setState(prevState => ({
      load: !prevState.load
    }));
  };
  render() {
    const { user, refresh } = this.props;
    const { load } = this.state;
    return (
      <div className="item profile">
        {console.log("profile")}
        <h2>Profile Details</h2>
        <Table textAlign="left" inverted selectable unstackable celled color="">
          <Table.Body>
            <Table.Row>
              <Table.Cell>Full Name</Table.Cell>
              <Table.Cell>{user.username}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Email</Table.Cell>
              <Table.Cell>{user.email}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>UID</Table.Cell>
              <Table.Cell>{user.uid}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Balance</Table.Cell>
              <Table.Cell className="spaceCell">
                {`${user.balance} e`}
                <Icon
                  name="refresh"
                  size="large"
                  onClick={refresh}
                  loading={load ? true : false}
                />
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    );
  }
}
