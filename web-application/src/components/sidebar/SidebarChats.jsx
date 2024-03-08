import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import COLORS from "constants/color";

const SidebarChat = ({ item }) => {
  const { username, timestamp, message } = item;

  return (
    <div style={styles.chatItem}>
      <AccountCircleIcon fontSize="large" color="secondary" />
      <div style={styles.sideBarChat}>
        <div>
          <p className="headingText" style={{ color: COLORS.SECONDARY }}>
            {username}
          </p>
        </div>
        <div
          style={{
            display: "flex",
            width: 270,
            flexDirection: "row",
            justifyContent: "space-between",
            paddingRight: 10,
          }}
        >
          <p className="paraText" style={{ color: COLORS.SECONDARY }}>
            {message}
          </p>
          <p className="paraText" style={{ color: COLORS.SECONDARY }}>
            {timestamp}
          </p>
        </div>
      </div>
    </div>
  );
};

const SidebarChats = ({ chatHistory }) => {
  return (
    <div style={styles.container}>
      {chatHistory.map((item) => {
        return <SidebarChat key={item.key} item={item} />;
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
