import React from "react";
import COLORS from "constants/color";
import { useNavigate } from "react-router-dom";
import StandardButton from "components/common/StandardButton";
import image from "assets/no-page-image.png";

const NotFoundPage = () => {
  const navigate = useNavigate();

  const navigateFromHere = () => {
    navigate("/main");
  };

  return (
    <div style={styles.container}>
      <img src={image} alt="404 page" width={400} height={300} />
      <StandardButton
        buttonText={"Go back to main page"}
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
