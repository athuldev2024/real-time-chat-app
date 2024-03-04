import React from "react";
import "./styles.scss";

const CustomTextInput = (props) => {
  const { type, placeholder, value, onChange, autoComplete } = props;

  return (
    <div className="custom-text-input">
      <label htmlFor="input">{placeholder?.toUpperCase()}</label>
      <input
        type={type}
        placeholder={`Enter ${placeholder}`}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
      />
    </div>
  );
};

export default CustomTextInput;
