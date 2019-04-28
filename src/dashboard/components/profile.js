import React from 'react';
import { Table, Segment } from 'semantic-ui-react';
import { Icon } from 'semantic-ui-react';

export default class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      load: false
    };
  }
  componentWillReceiveProps = (nextProps) => {
    this.toggleLoader();
    window.setTimeout(this.toggleLoader, 2000);
  };
  toggleLoader = () => {
    this.setState((prevState) => ({
      load: !prevState.load
    }));
  };
  render() {
    const { user, refresh } = this.props;
    const { load } = this.state;
    return (
      <div className="itemParent">
        <div className="item profile">
          <h2>Անձնական տվյալներ</h2>
          <Table textAlign="left" selectable unstackable celled>
            <Table.Body>
              <Table.Row>
                <Table.Cell>Անուն Ազգանուն</Table.Cell>
                <Table.Cell>{user.username}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Էլ-փոստ</Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Հաշվեհամար</Table.Cell>
                <Table.Cell>{user.uid}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Հաշվեկշիտ</Table.Cell>
                <Table.Cell className="spaceCell">
                  {`${user.balance} e`}
                  <Icon name="refresh" size="large" onClick={refresh} loading={load ? true : false} />
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </div>
      </div>
    );
  }
}
