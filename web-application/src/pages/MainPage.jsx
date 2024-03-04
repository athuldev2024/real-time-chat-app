/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // if (Object.keys(userDetails).length > 0) {
    //   console.log("already have data");
    //   navigate("/main");
    // }
  }, []);

  return (
    <div>
      <p onClick={() => navigate("/profile")}>Navigate to profile page</p>
    </div>
  );
};

export default Main;
