import React, { useState, useEffect } from "react";
import _ from "lodash";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ChatScreen from "./ChatScreen";
import COLORS from "constants/color";

const UserTab = ({ item, gotoTheChat }) => {
  const profilePIc = `${process.env.REACT_APP_API_URL}uploads/previewsingle/${item.identifier}`;

  return (
    <div className={"usertab"} onClick={gotoTheChat}>
      <img
        src={profilePIc}
        alt="Nothing"
        style={{
          width: 40,
          height: 40,
          borderRadius: 40,
        }}
      />
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
  const [selectedId, setSelectedId] = useState();
  const navigate = useNavigate();
  const { allUsers } = useSelector((state) => state.user);

  useEffect(() => {
    const identifier = localStorage.getItem("identifier");

    !identifier && navigate("/");

    if (!_.isEmpty(allUsers)) {
      console.log("allUsers: ", allUsers);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allUsers]);

  const gotoTheChat = (identifier) => {
    setSelectedId(identifier);
  };

  return (
    <div style={styles.container}>
      <div className="main-cell">
        {allUsers.map((item) => {
          return (
            <UserTab
              key={item.identifier}
              item={item}
              gotoTheChat={() => gotoTheChat(item.identifier)}
            />
          );
        })}
      </div>
      <div className="main-cell">
        <ChatScreen identifier={selectedId} />
      </div>
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
