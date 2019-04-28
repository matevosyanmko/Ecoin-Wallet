import React from "react";
import { Input } from "semantic-ui-react";
import { Button } from "semantic-ui-react";
import { Icon } from "semantic-ui-react";
import { Select } from "semantic-ui-react";
// avatars
import Avatar1 from "../../../assets/groups/avatar_1.svg";
import Avatar2 from "../../../assets/groups/avatar_2.svg";
import Avatar3 from "../../../assets/groups/avatar_3.svg";
import Avatar4 from "../../../assets/groups/avatar_4.svg";
import Avatar5 from "../../../assets/groups/avatar_5.svg";
const avatars = [
  {
    value: 0,
    src: Avatar1,
    text: "Avatar1"
  },
  {
    value: 1,
    src: Avatar2,
    text: "Avatar2"
  },
  {
    value: 2,
    src: Avatar3,
    text: "Avatar3"
  },
  {
    value: 3,
    src: Avatar4,
    text: "Avatar4"
  },
  {
    value: 4,
    src: Avatar5,
    text: "Avatar5"
  }
];
export default class AddFriend extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      friendInfo: {
        fullName: null,
        uid: null,
        avatar: avatars[0]
      },
      succes: false
    };
  }
  changeAvatar = (e, data) => {
    this.setState(prevState => ({
      friendInfo: { ...prevState.friendInfo, avatar: avatars[data.value] }
    }));
  };
  formSubmit = e => {
    const { uid, firebase } = this.props;
    const { friendInfo } = this.state;
    e.preventDefault();

    firebase.db
      .collection("users")
      .doc(uid)
      .get()
      .then(user => {
        firebase.db
          .collection("users")
          .doc(uid)
          .update({ friends: [...user.data().friends, friendInfo] })
          .then(msg => {
            this.setState({
              succes: true
            });
          });
        console.log(user.data());
      });
  };

  handleInputChange = e => {
    let name = e.target.name;
    let value = e.target.value;
    this.setState(prevState => ({
      friendInfo: { ...prevState.friendInfo, [name]: value.toUpperCase() }
    }));
  };
  render() {
    const { succes, friendInfo } = this.state;

    return (
      <div id="overlay">
        {succes ? (
          <div className="overlayAlert ">
            <h2>Ընկերը ավելացված է</h2>
            <h3>{friendInfo.fullName}</h3>
            <img src={friendInfo.avatar.src} />
            <Button secondary size="medium" onClick={this.props.toggle}>
              Փակել
            </Button>
          </div>
        ) : (
          <>
            <Icon
              name="close"
              size="large"
              className="closeModal"
              color="red"
              onClick={this.props.toggle}
            />
            <form onSubmit={this.formSubmit} className="addFirendOverlay">
              <h2>Ներմուծեք տվյալները</h2>
              <img src={friendInfo.avatar.src} />
              <Select
                options={{ floating: true, scrolling: false }}
                fluid
                selection
                placeholder="Ընտրեք նկարը"
                options={avatars}
                onChange={this.changeAvatar}
                value={friendInfo.avatar.value}
              />
              <Input
                type="text"
                icon={{ name: "user square", circular: true, color: "black" }}
                placeholder="Անուն Ազգանուն"
                size="small"
                iconPosition="left"
                onChange={this.handleInputChange}
                name="fullName"
                value={friendInfo.fullName}
                required
              />
              <Input
                type="text"
                icon={{
                  name: "numbered list",
                  circular: true,
                  color: "black",
                  bordered: true
                }}
                iconPosition="left"
                placeholder="Հաշվեհամարը"
                size="small"
                onChange={this.handleInputChange}
                name="uid"
                value={friendInfo.uid}
                required
              />
              <Button secondary size="medium">
                Ավելացնել
              </Button>
            </form>
          </>
        )}
      </div>
    );
  }
}
