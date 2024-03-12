/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ReactLoading from "react-loading";
import { useDispatch } from "react-redux";
import { getUser } from "store/userSlice";

import Sidebar from "components/sidebar/SideBar";
import WorkingArea from "components/workingarea/WorkingArea";

const Main = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoading } = useSelector((state) => state.user);

  const id = localStorage.getItem("id");

  useEffect(() => {
    dispatch(
      getUser({
        params: { id },
        callback: () => navigate("/main"),
      })
    );
  }, []);

  if (isLoading === true) {
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
