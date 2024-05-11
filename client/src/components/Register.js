import React from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import CustomTextInput from "components/common/CustomTextInput";
import StandardButton from "components/common/StandardButton";
import Box from "@mui/material/Box";
import { useDispatch } from "react-redux";
import { registerUser } from "store/userSlice";
import COLORS from "constants/color";
import MESSAGES from "constants/message";
import { showToastMessage } from "utils/toast-utils";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [credentials, changeInCredentials, disabled] = useOutletContext();

  const registerNewUser = (event) => {
    event.preventDefault();
    if (credentials.confirm === credentials.password) {
      dispatch(
        registerUser({
          body: { ...credentials },
          callback: (data) => {
            localStorage.setItem("id", data.id);
            navigate("/main");
          },
        })
      );
    } else {
      showToastMessage(MESSAGES?.password_not_match);
    }
  };

  return (
    <>
      <CustomTextInput
        type={"text"}
        autoComplete={"off"}
        value={credentials.username}
        onChange={(event) => changeInCredentials(event, "username")}
        placeholder={"username"}
      />
      <CustomTextInput
        type={"password"}
        autoComplete={"off"}
        value={credentials.password}
        onChange={(event) => changeInCredentials(event, "password")}
        placeholder={"password"}
      />
      <CustomTextInput
        type={"password"}
        autoComplete={"off"}
        value={credentials.confirm}
        onChange={(event) => changeInCredentials(event, "confirm")}
        placeholder={"confirm password"}
      />
      <CustomTextInput
        type={"number"}
        autoComplete={"off"}
        value={credentials.mobile}
        onChange={(event) => changeInCredentials(event, "mobile")}
        placeholder={"mobile"}
      />
      <CustomTextInput
        type={"text"}
        autoComplete={"off"}
        value={credentials.email}
        onChange={(event) => changeInCredentials(event, "email")}
        placeholder={"email"}
      />

      <Box component="section" sx={{ p: 2, border: "1px dashed grey" }}>
        <p className="infoBoxText">
          {MESSAGES?.register_instruction.split(".")[0]}
          <br />
          {MESSAGES?.register_instruction.split(".")[1]}
        </p>
      </Box>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          gap: 10,
        }}
      >
        <StandardButton
          style={{
            opacity: disabled ? 0.7 : 1,
          }}
          onClick={registerNewUser}
          buttonText={"Register New User"}
          disabled={disabled}
        />

        <div style={styles.verticalLine}></div>
        <p
          onClick={() => {
            navigate("/");
          }}
          style={{
            color: COLORS.PRIMARY,
            textDecoration: "underline",
          }}
        >
          Login User
        </p>
      </div>
    </>
  );
};

const styles = {
  verticalLine: {
    borderLeft: `2px solid ${COLORS.PRIMARY}`,
    height: "30px",
  },
};

export default Register;
