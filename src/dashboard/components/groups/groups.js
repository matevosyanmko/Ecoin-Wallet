import React from 'react';
import Avatar1 from '../../../assets/groups/avatar_1.svg';
import AddFriend from './addFriend';
import { UserCard } from './card';
import { Button } from 'semantic-ui-react';
import Gears from '../../../assets/gears.svg';
const avatarObj = [Avatar1];
export default class Groups extends React.Component {
  constructor() {
    super();
    this.state = {
      userList: null,
      group: null,
      showPopup: false,
      loading: true
    };
  }
  componentDidMount = () => {
    const { firebase, uid } = this.props;
    this.getFriendList(firebase, uid);
  };
  getUserList = (firebase) => {
    let userList = [];
    firebase.db
      .collection('users')
      .get()
      .then((user) => {
        user.docs.map((us) => {
          userList = [...userList, us.data()];
        });
        return userList;
      })
      .then((userList) => this.setState({ userList, loading: false }));
  };
  // get current user friend list
  getFriendList = (firebase, uid) => {
    firebase.db
      .collection('users')
      .doc(uid)
      .onSnapshot((user) => {
        this.setState(
          {
            group: user.data().friends
          },
          () => {
            this.getUserList(firebase);
          }
        );
      });
  };
  deleteCard = (e) => {
    const { group } = this.state;
    const { firebase, uid } = this.props;
    let filteredGroup = group.filter((item, key) => {
      return key !== e;
    });
    firebase.db
      .collection('users')
      .doc(uid)
      .update({ friends: filteredGroup });
  };
  render() {
    const { group, showPopup, userList, loading } = this.state;
    const { firebase, uid } = this.props;
    if (loading) return <img src={Gears} />;
    return (
      <div className="groups">
        <div className="groupsHeading">Իմ խմբերը</div>
        <div className="groupsBody mygroup">
          {showPopup && <AddFriend toggle={() => this.setState({ showPopup: !showPopup })} firebase={firebase} uid={uid} />}
          {group.length ? (
            <>
              {group.map((item, key) => {
                return <>{UserCard(item.fullName, item.uid, item.avatar.src, () => this.deleteCard(key), null, null)}</>;
              })}
              <Button secondary size="medium" onClick={() => this.setState({ showPopup: !showPopup })}>
                Ավելացնել ընկերը
              </Button>
            </>
          ) : (
            <>
              <Button secondary size="medium" onClick={() => this.setState({ showPopup: !showPopup })}>
                Ավելացնել ընկեր
              </Button>
            </>
          )}
        </div>
        <div>
          <div className="groupsHeading">Բոլոր օգտատերերը</div>
          <div className="groupsBody allusers">
            {userList.map((item, key) => {
              return <>{UserCard(item.username, item.uid, Avatar1, null, null, item.balance)}</>;
            })}
          </div>
        </div>
      </div>
    );
  }
}
