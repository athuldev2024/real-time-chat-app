import React from "react";
import { getMaxDateAsToday } from "utils/date-utils";
import "./styles.scss";

const CustomDatePicker = (props) => {
  const { placeholder, value, onChange } = props;

  return (
    <div className="custom-date-picker">
      <label htmlFor="input">{placeholder?.toUpperCase()}</label>
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

export default CustomDatePicker;
