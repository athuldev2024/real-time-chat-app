/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import ReactLoading from "react-loading";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import StandardButton from "components/common/StandardButton";
import COLORS from "constants/color";
import logout from "utils/logout-utils";
import { deleteUser } from "store/userSlice";
import { useContext } from "react";
import { MyContext } from "store";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isUpdate = true;
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    mobile: "",
    email: "",
  });
  const [disabled, setDisabled] = useState(true);
  const { isLoading, userDetails } = useSelector((state) => state.user);
  const { modalIsOpen, setIsOpen } = useContext(MyContext);

  useEffect(() => {
    if (Object.keys(userDetails).length > 0) {
      setCredentials({
        ...userDetails,
      });
    } else {
      navigate("/main");
    }
  }, [userDetails]);

  useEffect(() => {
    setDisabled(
      credentials.username ||
        credentials.password ||
        credentials.mobile ||
        credentials.email
        ? false
        : true
    );
  }, [credentials]);

  useEffect(() => {
    if (modalIsOpen === "DELTEDGO") {
      setIsOpen("");
      dispatch(
        deleteUser({
          params: { id: credentials.id },
          callback: () => {
            logout();
            navigate("/");
          },
        })
      );
    }
  }, [modalIsOpen]);

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

        <div style={styles.bottomButton}>
          <StandardButton
            onClick={() => setIsOpen("DELTED")}
            buttonText={"Delete User"}
            disabled={false}
          />
          <StandardButton
            onClick={() => navigate("/main")}
            buttonText={"Go back to profile"}
            disabled={false}
          />
        </div>
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
    backgroundColor: COLORS.WHITE,
    border: "1px solid #000",
    paddingTop: "30px",
    paddingBottom: "30px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  bottomButton: {
    display: "flex",
    flexDirection: "row",
    gap: 50,
    borderTop: `2px dotted #000`,
    paddingTop: 20,
  },
};

export default Profile;
