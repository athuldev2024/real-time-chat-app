/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ReactLoading from "react-loading";
import { useDispatch } from "react-redux";
import { getUser } from "store/userSlice";

const Main = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoading } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(
      getUser({
        params: { username: "athul" },
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
    <div>
      <p style={{ color: "#fff" }} onClick={() => navigate("/profile")}>
        Navigate to profile page
      </p>
    </div>
  );
};

export default Main;
