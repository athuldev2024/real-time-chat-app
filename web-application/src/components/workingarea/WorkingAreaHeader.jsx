import React from "react";
import { IconButton } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import COLORS from "constants/color";

const WorkingAreaHeader = ({ username, deleteChat }) => {
  return (
    <div style={styles.container}>
      <div style={{ display: "flex", flexDirection: "row", gap: 20 }}>
        <AccountCircleIcon fontSize="large" color="secondary" />
        <p className="headingText" style={{ color: COLORS.SECONDARY }}>
          {username}
        </p>
      </div>
      <IconButton onClick={deleteChat}>
        <DeleteIcon color="secondary" />
      </IconButton>
    </div>
  );
};

const styles = {
  container: {
    flex: "0.1",
    backgroundColor: COLORS.WHITE,
    boxShadow: "2px 2px 5px 1px rgba(0, 0, 0, 0.5)",
    borderRadius: 10,
    display: "flex",
    justifyContent: "space-between",
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: "center",
  },
};

export default WorkingAreaHeader;
