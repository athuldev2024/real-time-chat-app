import React, { useState, useEffect } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import COLORS from "constants/color";

const SidebarChat = ({ item, clickUser }) => {
  const { username, id } = item;
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    if (clicked) {
      setTimeout(() => {
        setClicked(false);
      }, 200);
    }
  }, [clicked]);

  return (
    <div
      style={{ ...styles.chatItem, opacity: clicked ? 0.5 : 1 }}
      onClick={() => {
        setClicked(true);
        clickUser({ id, username });
      }}
    >
      <AccountCircleIcon fontSize="large" color="secondary" />
      <div style={styles.sideBarChat}>
        <div>
          <p className="headingText" style={{ color: COLORS.SECONDARY }}>
            {username}
          </p>
        </div>
      </div>
    </div>
  );
};

const SidebarChats = ({ chatHistory, clickUser }) => {
  return (
    <div style={styles.container}>
      {chatHistory.map((item) => {
        return (
          <SidebarChat
            key={item.key}
            item={{ ...item, id: item.key }}
            clickUser={clickUser}
          />
        );
      })}
    </div>
  );
};

const styles = {
  container: {
    height: 400,
    paddingTop: "5%",
    paddingBottom: "5%",
    backgroundColor: COLORS.WHITE,
    boxShadow: "2px 2px 5px 1px rgba(0, 0, 0, 0.5)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 20,
    borderRadius: 10,
    overflowY: "scroll",
    scrollbarColor: `${COLORS.SECONDARY} ${COLORS.WHITE}`,
    scrollbarWidth: "thin",
  },
  chatItem: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 50,
    width: "90%",
    borderRadius: 10,
    border: `1px solid ${COLORS.SECONDARY}`,
    padding: 10,
    opacity: 1,
  },
  sideBarChat: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    gap: 20,
  },
};

export default SidebarChats;
