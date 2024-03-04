import React from "react";
import "./styles.scss";

const StandardButton = (props) => {
  const { buttonText, onClick, disabled, style } = props;

  return (
    <button
      {...{ style }}
      className="std-button"
      onClick={onClick}
      disabled={disabled}
    >
      {buttonText}
    </button>
  );
};

export default StandardButton;
