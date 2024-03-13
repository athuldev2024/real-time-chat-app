/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ReactLoading from "react-loading";
import { useDispatch } from "react-redux";
import { getUser } from "store/userSlice";
import { getAllUsers } from "store/chatSlice";
import Sidebar from "components/sidebar/SideBar";
import WorkingArea from "components/workingarea/WorkingArea";

const Main = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userDetails } = useSelector((state) => state.user);
  const { isLoading } = useSelector((state) => state.user);
  const isLoadingChat = useSelector((state) => state.chat.isLoading);

  const id = localStorage.getItem("id");

  useEffect(() => {
    if (!id) {
      navigate("/");
      return;
    }

    dispatch(
      getUser({
        params: { id },
        callback: () => {},
      })
    );
  }, []);

  useEffect(() => {
    if (Object.keys(userDetails).length > 0) {
      console.log("I hav been called: ", userDetails.username);
      dispatch(
        getAllUsers({
          params: { username: userDetails.username },
          callback: () => {},
        })
      );
    }
  }, [userDetails]);

  if (isLoading === true || isLoadingChat === true) {
    return (
      <ReactLoading type="bubbles" color="#0000FF" height={100} width={50} />
    );
  }

  return (
    <div style={styles.container}>
      <Sidebar />
      <WorkingArea />
    </div>
  );
};

const styles = {
  container: {
    height: "95vh",
    width: "95vw",
    display: "flex",
    gap: 10,
  },
};

export default Main;
