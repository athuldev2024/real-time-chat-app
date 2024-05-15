import React, { useEffect } from "react";
import _ from "lodash";
import { useSelector } from "react-redux";
import "./styles.css";

const ChatApplication = () => {
  const { allUsers } = useSelector((state) => state.user);

  useEffect(() => {
    if (!_.isEmpty(allUsers)) {
      console.log("allUsers: ", allUsers);
    }
  }, [allUsers]);

  return (
    <div style={styles.container}>
      <div className="main-cell"></div>
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
