import React, { useState, useEffect } from "react";
import SidebarHeader from "./SidebarHeader";
import SidebarChats from "./SidebarChats";
import CustomTextInput from "components/common/CustomTextInput";
import COLORS from "constants/color";

const MOCK_CHATS = [
  {
    key: 1,
    username: "User1",
    message: "stupid boy",
    timestamp: "19/04/2024",
  },
  {
    key: 2,
    username: "User1",
    message: "stupid boy",
    timestamp: "19/04/2024",
  },
  {
    key: 3,
    username: "User1",
    message: "stupid boy",
    timestamp: "19/04/2024",
  },
  {
    key: 4,
    username: "User1",
    message: "stupid boy",
    timestamp: "19/04/2024",
  },
];

const Sidebar = () => {
  const [search, setSearch] = useState("");

  const changeSearch = (event) => {
    setSearch(event.target.value);
  };

  const profileClick = () => {
    console.log("Profile icon clicked");
  };

  const plusClick = () => {
    console.log("Plus clicked");
  };

  const singleAdd = () => {
    console.log("Single clicked");
  };

  const grpAdd = () => {
    console.log("Group add clicked");
  };

  const darkMode = () => {
    console.log("Dark mode clicked");
  };

  return (
    <div style={styles.container}>
      <SidebarHeader
        {...{
          profileClick,
          plusClick,
          singleAdd,
          grpAdd,
          darkMode,
        }}
      />

      <div style={styles.textField}>
        <CustomTextInput
          type={"text"}
          placeholder={"search"}
          value={search}
          onChange={changeSearch}
          autoComplete={"off"}
          isSearch={true}
        />
      </div>

      <SidebarChats chatHistory={MOCK_CHATS} />
    </div>
  );
};

const styles = {
  container: {
    flex: "0.3",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    gap: 20,
  },
  textField: {
    backgroundColor: COLORS.WHITE,
    boxShadow: "2px 2px 5px 1px rgba(0, 0, 0, 0.5)",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
  },
};

export default Sidebar;
