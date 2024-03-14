/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import SidebarHeader from "./SidebarHeader";
import { useSelector } from "react-redux";
import SidebarChats from "./SidebarChats";
import CustomTextInput from "components/common/CustomTextInput";
import COLORS from "constants/color";
import { userSelected } from "store/chatSlice";
import { useDispatch } from "react-redux";

const Sidebar = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [localUsers, setLocalUsers] = useState([]);

  const { users } = useSelector((state) => state.chat);

  useEffect(() => {
    if (users.length > 0) {
      let tempUsers = [];
      // eslint-disable-next-line array-callback-return
      users.map((item) => {
        tempUsers.push({
          key: item.id,
          username: item.username,
        });
      });

      setLocalUsers([...tempUsers]);
    }
  }, [users]);

  const changeSearch = (event) => {
    setSearch(event.target.value);
  };

  const darkMode = () => {
    console.log("Dark mode clicked");
  };

  const clickUser = (user) => {
    dispatch(userSelected({ ...user }));
  };

  return (
    <div style={styles.container}>
      <SidebarHeader
        {...{
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

      <SidebarChats
        search={search}
        chatHistory={localUsers.filter((item) =>
          item.username.match(new RegExp(search, "g"))
        )}
        clickUser={clickUser}
      />
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
