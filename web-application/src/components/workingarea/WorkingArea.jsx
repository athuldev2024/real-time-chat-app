import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import COLORS from "constants/color";
import WorkingAreaBody from "./WorkingAreaBody";
import { useSelector } from "react-redux";

const WorkingArea = () => {
  const { selected } = useSelector((state) => state.chat);

  return (
    <div style={styles.container}>
      <div style={styles.workingAreaHeader}>
        <AccountCircleIcon fontSize="large" color="secondary" />
        <p className="headingText" style={{ color: COLORS.SECONDARY }}>
          {selected?.username ?? ""}
        </p>
      </div>

      {selected?.username && <WorkingAreaBody />}
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
  workingAreaHeader: {
    flex: "0.1",
    backgroundColor: COLORS.WHITE,
    boxShadow: "2px 2px 5px 1px rgba(0, 0, 0, 0.5)",
    borderRadius: 10,
    display: "flex",
    justifyContent: "flex-start",
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: "center",
  },
};

export default WorkingArea;
