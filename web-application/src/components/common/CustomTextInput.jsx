import React from "react";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import COLORS from "constants/color";

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
        id="standard-basic"
        label={placeholder}
        variant="standard"
        type={type}
        placeholder={`Enter ${placeholder}`}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
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
