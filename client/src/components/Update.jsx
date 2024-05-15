import React from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import CustomTextInput from "components/common/CustomTextInput";
import StandardButton from "components/common/StandardButton";
import Box from "@mui/material/Box";
import { useDispatch } from "react-redux";
import { updateUser } from "store/userSlice";
import COLORS from "constants/color";
import MESSAGES from "constants/message";
import { showToastMessage } from "utils/toast-utils";
import { updateUserDetails } from "store/userSlice";
import "react-toastify/dist/ReactToastify.css";

const Update = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [credentials, changeInCredentials, , disabled] = useOutletContext();

  const registerNewUser = (event) => {
    event.preventDefault();
    if (credentials.confirm === credentials.password) {
      const identifier = localStorage.getItem("identifier");
      dispatch(
        updateUser({
          body: { ...credentials },
          params: { identifier },
          callback: () => {
            dispatch(
              updateUserDetails({
                username: credentials?.username,
                email: credentials?.email,
                password: credentials?.password,
                confirm: credentials?.confirm,
              })
            );
            navigate("/main");
          },
        })
      );
    } else {
      showToastMessage(MESSAGES?.password_not_match);
    }
  };

  return (
    <form name="update" style={styles.container}>
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
          buttonText={"Update User"}
          disabled={disabled}
        />
      </div>
    </form>
  );
};

const styles = {
  container: {
    display: "flex",
    backgroundColor: COLORS.WHITE,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
};

export default Update;
