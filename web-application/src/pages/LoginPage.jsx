import React, { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import ReactLoading from "react-loading";
import { useSelector } from "react-redux";
import COLORS from "constants/color";
import image from "assets/login-image.avif";

const Login = () => {
  const location = useLocation();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    mobile: "",
    email: "",
    dob: {},
    gender: "",
  });
  const [disabled, setDisabled] = useState(true);

  const header = useMemo(() => {
    if (location.pathname === "/") {
      return "Login user";
    } else {
      return "Register new user";
    }
  }, [location]);

  const { isLoading } = useSelector((state) => state.user);

  useEffect(() => {
    if (location.pathname === "/") {
      setDisabled(credentials.username && credentials.password ? false : true);
    } else if (location.pathname === "/register") {
      setDisabled(
        credentials.username &&
          credentials.password &&
          credentials.mobile &&
          credentials.email &&
          Object.keys(credentials.dob).length > 0 &&
          ["M", "F", "O"].includes(credentials.gender)
          ? false
          : true
      );
    }
  }, [credentials, location.pathname]);

  const changeInCredentials = (event, type) => {
    setCredentials((prev) => {
      return { ...prev, [type]: event.target.value };
    });
  };

  return (
    <form name="login_register">
      {isLoading === true ? (
        <ReactLoading type="bubbles" color="#0000FF" height={100} width={50} />
      ) : (
        <div style={styles.container}>
          <div style={styles.leftImage}>
            <img src={image} alt="login page" width={400} height={300} />
          </div>

          <div style={styles.form}>
            <p
              className="headingText"
              style={{ fontSize: "2rem", color: "#59981A" }}
            >
              {header}
            </p>
            <Outlet context={[credentials, changeInCredentials, disabled]} />
          </div>
        </div>
      )}
    </form>
  );
};

const styles = {
  container: {
    height: "90vh",
    width: "90vw",
    backgroundColor: COLORS.WHITE,
    boxShadow: "2px 2px 5px 1px rgba(0, 0, 0, 0.5)",
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
  },
  leftImage: {
    flex: 0.5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    flex: 0.5,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
};

export default Login;
