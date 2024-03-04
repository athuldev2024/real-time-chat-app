/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import ReactLoading from "react-loading";
import { useSelector } from "react-redux";

const Profile = () => {
  const isUpdate = true;
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    mobile: "",
    email: "",
  });
  const [disabled, setDisabled] = useState(true);
  const { isLoading, userDetails } = useSelector((state) => state.user);

  useEffect(() => {
    if (Object.keys(userDetails).length > 0) {
      setCredentials({ ...userDetails });
    }
  }, [userDetails]);

  useEffect(() => {
    setDisabled(
      credentials.username &&
        credentials.password &&
        credentials.mobile &&
        credentials.email
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
      <form style={styles.form} name="update">
        {isLoading === true ? (
          <ReactLoading
            type="bubbles"
            color="#0000FF"
            height={100}
            width={50}
          />
        ) : (
          <Outlet
            context={[credentials, changeInCredentials, disabled, isUpdate]}
          />
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

export default Profile;
