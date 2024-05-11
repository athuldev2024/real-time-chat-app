import React from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import CustomTextInput from "components/common/CustomTextInput";
import StandardButton from "components/common/StandardButton";
import { useDispatch } from "react-redux";
import { loginUser } from "store/userSlice";
import COLORS from "constants/color";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Get the attributes from props
  const [credentials, changeInCredentials, disabled] = useOutletContext();

  const loginUserCredentials = (event) => {
    // Disable the form submit reload
    event.preventDefault();
    dispatch(
      loginUser({
        params: {
          mobile: credentials.mobile,
          password: credentials.password,
        },
        callback: (data) => {
          localStorage.setItem("identifier", data.identifier);
          navigate("/main");
        },
      })
    );
  };

  return (
    <>
      <CustomTextInput
        type={"number"}
        autoComplete={"off"}
        value={credentials.mobile}
        onChange={(event) => changeInCredentials(event, "mobile")}
        placeholder={"mobile"}
      />

      <CustomTextInput
        type={"password"}
        autoComplete={"off"}
        value={credentials.password}
        onChange={(event) => changeInCredentials(event, "password")}
        placeholder={"password"}
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
          onClick={loginUserCredentials}
          buttonText={"Login"}
          disabled={disabled}
        />
        <div style={styles.verticalLine}></div>
        <p
          onClick={() => {
            navigate("/register");
          }}
          style={{
            color: COLORS.PRIMARY,
            textDecoration: "underline",
          }}
        >
          Register User
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

export default Login;
