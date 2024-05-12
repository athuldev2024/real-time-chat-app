/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import ReactLoading from "react-loading";
import { useSelector } from "react-redux";
import COLORS from "constants/color";
import Header from "components/Header";

const Main = () => {
  const { isLoading } = useSelector((state) => state.user);
  const [credentials, setCredentials] = useState({
    username: "",

    password: "",
    email: "",
    confirm: "",
  });
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    setDisabled(
      credentials.username &&
        credentials.password &&
        credentials.email &&
        credentials.confirm
        ? false
        : true
    );
  }, [credentials]);

  const changeInCredentials = (event, type) => {
    setCredentials((prev) => {
      return { ...prev, [type]: event.target.value };
    });
  };

  return (
    <div style={styles.container}>
      {isLoading === true ? (
        <ReactLoading
          type="bubbles"
          color={COLORS.PRIMARY}
          height={100}
          width={50}
        />
      ) : (
        <>
          <Header />
          <Outlet context={[credentials, changeInCredentials, disabled]} />
        </>
      )}
    </div>
  );
};

const styles = {
  container: {
    height: "95vh",
    width: "95vw",
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
};

export default Main;
