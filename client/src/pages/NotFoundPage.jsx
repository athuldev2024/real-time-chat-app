import React from "react";
import COLORS from "constants/color";
import MESSAGES from "constants/message";
import { useNavigate } from "react-router-dom";
import StandardButton from "components/common/StandardButton";
import image from "assets/no-page-image.png";

const NotFoundPage = () => {
  const navigate = useNavigate();

  const navigateFromHere = () => {
    const identifier = localStorage.getItem("identifier");
    navigate(identifier ? "/main" : "/");
  };

  return (
    <div style={styles.container}>
      <img src={image} alt="404 page" width={400} height={300} />
      <StandardButton
        buttonText={MESSAGES.go_back}
        onClick={navigateFromHere}
        disabled={false}
      />
    </div>
  );
};

const styles = {
  container: {
    height: "80vh",
    width: "50vw",
    backgroundColor: COLORS.WHITE,
    boxShadow: "2px 2px 5px 1px rgba(0, 0, 0, 0.5)",
    borderRadius: 20,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
};

export default NotFoundPage;
