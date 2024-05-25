import React, { useEffect } from "react";
import _ from "lodash";
import { useSelector } from "react-redux";
import COLORS from "constants/color";

const UserTab = ({ item }) => {
  const gotoTheChat = () => {
    console.log("GOTO the chat application");
  };
  return (
    <div className={"usertab"} onClick={gotoTheChat}>
      <p
        className={"paraText"}
        style={{ fontSize: "1.3rem", color: COLORS.PRIMARY }}
      >
        {item?.username}
      </p>
    </div>
  );
};

const ChatApplication = () => {
  const { allUsers } = useSelector((state) => state.user);

  useEffect(() => {
    if (!_.isEmpty(allUsers)) {
      console.log("allUsers: ", allUsers);
    }
  }, [allUsers]);

  return (
    <div style={styles.container}>
      <div className="main-cell">
        {allUsers.map((item) => {
          return <UserTab key={item.identifier} item={item} />;
        })}
      </div>
      <div className="main-cell"></div>
    </div>
  );
};

const styles = {
  container: {
    width: "100%",
    height: "80%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 30,
  },
};

export default ChatApplication;
