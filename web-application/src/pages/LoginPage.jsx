import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import ReactLoading from "react-loading";
import { useSelector } from "react-redux";

const Login = () => {
  const location = useLocation();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    mobile: "",
    email: "",
  });
  const [disabled, setDisabled] = useState(true);

  const { isLoading } = useSelector((state) => state.user);

  useEffect(() => {
    if (location.pathname === "/") {
      setDisabled(credentials.username && credentials.password ? false : true);
    } else if (location.pathname === "/register") {
      setDisabled(
        credentials.username &&
          credentials.password &&
          credentials.mobile &&
          credentials.email
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
    <div style={styles.container}>
      <form style={styles.form} name="login_register">
        {isLoading === true ? (
          <ReactLoading
            type="bubbles"
            color="#0000FF"
            height={100}
            width={50}
          />
        ) : (
          <Outlet context={[credentials, changeInCredentials, disabled]} />
        )}
      </form>
    </div>
  );
};

const styles = {
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    width: "50%",
    border: "1px solid #000",
    paddingTop: "30px",
    paddingBottom: "30px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
};

export default Login;
