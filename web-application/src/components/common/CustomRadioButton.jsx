import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

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

  const clickOption = (item) => {
    onChange(
      {
        target: {
          value: item,
        },
      },
      "gender"
    );
  };

  return (
    <div style={styles.container}>
      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">{`Choose ${placeholder}`}</FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="female"
          name="radio-buttons-group"
        >
          {arr.map((item) => {
            return (
              <FormControlLabel
                key={item}
                value={item}
                control={<Radio />}
                label={labelCheck(item)}
                onChange={() => clickOption(item)}
              />
            );
          })}
        </RadioGroup>
      </FormControl>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
};

export default CustomRadioButton;
