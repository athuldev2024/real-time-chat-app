import React from "react";
import Button from "@mui/material/Button";

const StandardButton = (props) => {
  const { buttonText, onClick, disabled } = props;

  return (
    <Button
      style={{ width: 200 }}
      variant="contained"
      onClick={onClick}
      disabled={disabled}
    >
      {buttonText}
    </Button>
  );
};

export default StandardButton;
