/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "components/Header";

const Main = () => {
  return (
    <div style={styles.container}>
      <Header />
      <Outlet context={[]} />
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
