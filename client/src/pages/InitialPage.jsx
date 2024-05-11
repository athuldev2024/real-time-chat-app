import React, { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import ReactLoading from "react-loading";
import { useSelector } from "react-redux";
import COLORS from "constants/color";
import MESSAGES from "constants/message";
import image from "assets/login-image.avif";

const InitialPage = () => {
  const location = useLocation();
  const { isLoading } = useSelector((state) => state.user);

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    mobile: "",
    email: "",
  });
  const [disabled, setDisabled] = useState(true);

  const header = useMemo(() => {
    if (location.pathname === "/") {
      return MESSAGES.login_user;
    } else {
      return MESSAGES.register_user;
    }
  }, [location]);

  useEffect(() => {
    if (location.pathname === "/") {
      setDisabled(credentials.mobile && credentials.password ? false : true);
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
    <form name="login_register">
      {isLoading === true ? (
        <ReactLoading
          type="bubbles"
          color={COLORS.PRIMARY}
          height={100}
          width={50}
        />
      ) : (
        <div style={styles.container}>
          <div style={styles.leftSide}>
            <img src={image} alt="login page" width={400} height={300} />
          </div>

          <div style={styles.rightSide}>
            <p
              className="headingText"
              style={{ fontSize: "2rem", color: COLORS.SECONDARY }}
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
  leftSide: {
    flex: 0.5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  rightSide: {
    flex: 0.5,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
};

export default InitialPage;
