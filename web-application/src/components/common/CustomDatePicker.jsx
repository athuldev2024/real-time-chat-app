import * as React from "react";
import { getMaxDateAsToday } from "utils/date-utils";

const CustomDatePicker = (props) => {
  const { placeholder, value, onChange } = props;

  return (
    <div style={styles.container}>
      <label className="paraText" style={{ color: "grey" }} htmlFor="input">
        {"Date of birth" ?? placeholder?.toUpperCase()}
      </label>
      <input
        type={"date"}
        placeholder={`Enter ${placeholder}`}
        value={value}
        onChange={onChange}
        min="1990-01-01"
        max={getMaxDateAsToday()}
      />
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
};

export default CustomDatePicker;
