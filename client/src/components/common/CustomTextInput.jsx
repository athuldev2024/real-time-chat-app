import React from "react";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import COLORS from "constants/color";
import "./common.css";

const CustomTextInput = (props) => {
  const {
    type,
    placeholder,
    value,
    onChange,
    autoComplete,
    isSearch = false,
  } = props;

  return (
    <div style={styles.textField}>
      {isSearch && <SearchIcon color="secondary" />}
      <TextField
        label={placeholder}
        variant="standard"
        type={type}
        placeholder={`Enter ${placeholder}`}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete ?? "off"}
        onKeyDown={(event) => {
          type === "number" &&
            event.key === "e" &&
            event.key === "E" &&
            event.preventDefault();
        }}
      />
    </div>
  );
};

const styles = {
  textField: {
    backgroundColor: COLORS.WHITE,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
};

export default CustomTextInput;
