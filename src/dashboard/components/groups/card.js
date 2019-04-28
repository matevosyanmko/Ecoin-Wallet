import { Card, Icon, Image, Button } from "semantic-ui-react";

import React from "react";
export const UserCard = (username, userUid, img, deleteCard, transfer, balance) => {
  return (
    <>

      <Card
        className="userCard rel"
        centered={true}
        image={img}
        header={username}
        description={userUid}
        meta={<Icon name="close" size="large" className="deleteCard" color="red" onClick={deleteCard} />}
        extra={balance ? `${balance} e` :" "}


      />
    </>
    
  );
};
