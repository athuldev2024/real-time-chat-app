/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ReactLoading from "react-loading";
import { useDispatch } from "react-redux";
import { getUser, getFile } from "store/userSlice";
import FileUpload from "components/FileUpload";

const Main = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [profile, setProfile] = useState(null);

  const { isLoading } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(
      getUser({
        params: { username: "athul" },
        callback: () => navigate("/main"),
      })
    );

    dispatch(
      getFile({
        callback: (data) => {
          console.log("FILE: ", data.data);
          console.log("FILE: ", data.image);
          setProfile(data);
        },
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
      <FileUpload />
      <img
        src={"http://localhost:5000/api/uploads/retrieve"}
        alt="No image found"
        width="500"
        height="600"
      />
    </div>
  );
};

export default Main;
