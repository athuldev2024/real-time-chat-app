import React from "react";
import COLORS from "constants/color";

const WorkingAreaBody = () => {
  return <div style={styles.container}></div>;
};

const styles = {
  container: {
    flex: "0.8",
    backgroundColor: COLORS.WHITE,
    boxShadow: "2px 2px 5px 1px rgba(0, 0, 0, 0.5)",
    borderRadius: 10,
  },
};

export default WorkingAreaBody;
