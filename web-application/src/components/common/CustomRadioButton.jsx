import React from "react";
import "./styles.scss";

const CustomRadioButton = (props) => {
  const { arr, value, onChange, placeholder } = props;

  const labelCheck = (gender) => {
    switch (gender) {
      case "M":
        return "Male";
      case "F":
        return "Female";
      case "O":
        return "Other";
      default:
        return "Other";
    }
  };

  return (
    <div className="custom-radio-button-container">
      <p className="label-for-radios">{`Choose ${placeholder}`}</p>
      <div className="custom-radio-button">
        {arr.map((item) => {
          return (
            <div key={item}>
              <label htmlFor={`#${item}`}>{labelCheck(item)}</label>
              <input
                type="radio"
                id={item}
                value={item}
                checked={value === item}
                onChange={() =>
                  onChange(
                    {
                      target: {
                        value: item,
                      },
                    },
                    "gender"
                  )
                }
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CustomRadioButton;
