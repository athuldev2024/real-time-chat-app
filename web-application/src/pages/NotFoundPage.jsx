import React from "react";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  const navigateFromHere = () => {
    navigate("/");
  };

  return (
    <div style={styles.errorPage}>
      <h2 style={styles.h2} data-text="404">
        404
      </h2>
      <h4 style={styles.h4} data-text="Opps! Page not found">
        Opps! Page not found
      </h4>
      <p style={styles.para} onClick={navigateFromHere}>
        Go back to login screen
      </p>
    </div>
  );
};

const styles = {
  errorPage: {
    position: "absolute",
    top: "10%",
    left: "15%",
    right: "15%",
    bottom: "10%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background: "#fff",
    boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.1)",
  },
  h2: {
    fontSize: "10vw",
    lineHeight: "1em",
    position: "relative",
  },
  h4: {
    fontSize: "1.5em",
    marginBottom: "20px",
    textTransform: "uppercase",
    color: "#000",
    maxWidth: "600px",
    position: "relative",
  },
  para: {
    fontSize: "1.2em",
    color: "#0000cc",
    textDecoration: "underline",
  },
};

export default NotFoundPage;
