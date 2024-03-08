import React from "react";
import WorkingAreaHeader from "./WorkingAreaHeader";
import WorkingAreaBody from "./WorkingAreaBody";

const WorkingArea = () => {
  const deleteChat = () => {
    console.log("Delete button clicked");
  };

  return (
    <div style={styles.container}>
      <WorkingAreaHeader username={"Test user"} deleteChat={deleteChat} />
      <WorkingAreaBody />
    </div>
  );
};

const styles = {
  container: {
    flex: "0.7",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    gap: 20,
  },
};

export default WorkingArea;
