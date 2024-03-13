import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { IconButton } from "@mui/material";
import Popover from "@mui/material/Popover";
import ProfilePopoverContainer from "components/ProfilePopoverContainer";
import COLORS from "constants/color";
import logout from "utils/logout-utils";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

const SidebarHeader = ({ darkMode }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div style={styles.container}>
      <div>
        <IconButton onClick={handleClick}>
          <AccountCircleIcon color="secondary" />
        </IconButton>
        <Popover
          id={"simple-popover"}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <ProfilePopoverContainer />
        </Popover>
      </div>

      <div style={styles.rightSide}>
        <IconButton onClick={() => navigate("/profile")}>
          <ModeEditIcon fontSize="large" color="secondary" />
        </IconButton>
        <IconButton onClick={() => logout()}>
          <LogoutIcon fontSize="large" color="secondary" />
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
