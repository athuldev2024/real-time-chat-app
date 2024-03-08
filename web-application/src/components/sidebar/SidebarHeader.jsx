import React from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { IconButton } from "@mui/material";
import COLORS from "constants/color";

const SidebarHeader = ({
  profileClick,
  plusClick,
  singleAdd,
  grpAdd,
  darkMode,
}) => {
  return (
    <div style={styles.container}>
      <div>
        <IconButton onClick={profileClick}>
          <AccountCircleIcon color="secondary" />
        </IconButton>
      </div>
      <div style={styles.rightSide}>
        <IconButton onClick={plusClick}>
          <AddCircleIcon color="secondary" />
        </IconButton>
        <IconButton onClick={singleAdd}>
          <PersonAddIcon color="secondary" />
        </IconButton>
        <IconButton onClick={grpAdd}>
          <GroupAddIcon color="secondary" />
        </IconButton>
        <IconButton onClick={darkMode}>
          <DarkModeIcon color="secondary" />
        </IconButton>
      </div>
    </div>
  );
};

const styles = {
  container: {
    height: 50,
    padding: 10,
    backgroundColor: COLORS.WHITE,
    boxShadow: "2px 2px 5px 1px rgba(0, 0, 0, 0.5)",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rightSide: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
};

export default SidebarHeader;
