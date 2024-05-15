/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import ReactLoading from "react-loading";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getAllUserExceptMe } from "store/userSlice";
import _ from "lodash";
import COLORS from "constants/color";
import Header from "components/Header";

const Main = () => {
  const dispatch = useDispatch();
  const { isLoading, userDetails } = useSelector((state) => state.user);
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    const identifier = localStorage.getItem("identifier");
    dispatch(
      getAllUserExceptMe({
        params: { identifier },
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!_.isEmpty(userDetails)) {
      setCredentials({
        username: userDetails?.username,
        email: userDetails?.email,
        password: userDetails?.password,
        confirm: userDetails?.password,
      });
    }
  }, [userDetails]);

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
          <Outlet
            context={[
              credentials,
              changeInCredentials,
              setCredentials,
              disabled,
            ]}
          />
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
