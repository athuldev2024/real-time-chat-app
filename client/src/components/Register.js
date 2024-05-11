import React from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import CustomTextInput from "components/common/CustomTextInput";
import StandardButton from "components/common/StandardButton";
import { useDispatch } from "react-redux";
import { registerUser, updateUser } from "store/userSlice";
import COLORS from "constants/color";

import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [credentials, changeInCredentials, disabled, isUpdate] =
    useOutletContext();

  const registerFunc = (event) => {
    event.preventDefault();

    dispatch(
      registerUser({
        body: { ...credentials },
        callback: (data) => {
          localStorage.setItem("id", data.id);
          navigate("/main");
        },
      })
    );
  };

  const updateFunc = (event) => {
    event.preventDefault();
    dispatch(
      updateUser({
        body: { ...credentials },
        callback: () => navigate("/main"),
      })
    );
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
        type={"text"}
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
          onClick={(event) => {
            isUpdate ? updateFunc(event) : registerFunc(event);
          }}
          buttonText={!isUpdate ? "Register" : "Update"}
          disabled={disabled}
        />

        {!isUpdate && (
          <>
            <div style={styles.verticalLine}></div>
            <p
              onClick={() => {
                navigate("/");
              }}
              style={{
                color: "#0000cc",
                textDecoration: "underline",
              }}
            >
              Login User
            </p>
          </>
        )}
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
