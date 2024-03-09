import React, { useState } from "react";
import StandardButton from "components/common/StandardButton";
import { useDispatch } from "react-redux";
import { fileUpload } from "store/userSlice";
import { IconButton } from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import LogoutIcon from "@mui/icons-material/Logout";
import COLORS from "constants/color";
import { useNavigate } from "react-router-dom";
import logout from "utils/logout-utils";

const ProfileImage = () => {
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);

  const handleChange = (event) => {
    const file = event.target.files[0];
    const ext = event.target.files[0].name.split(".")[1].toLowerCase();
    if (["png", "jpeg", "jpg"].includes(ext)) {
      setFile(file);
    } else {
      alert("Invalid file type"); // change later
    }
  };

  const uploadImage = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", "profile");
    const headers = {
      "content-type": "multipart/form-data",
    };

    dispatch(
      fileUpload({
        body: formData,
        headers,
      })
    );
  };

  return (
    <>
      <input
        class="custom-file-input"
        type="file"
        placeholder={`upload file`}
        onChange={handleChange}
      />
      <StandardButton
        style={{
          opacity: !file ? 0.7 : 1,
        }}
        onClick={uploadImage}
        buttonText={"Upload image"}
        disabled={file === null}
      />
    </>
  );
};

const ProfilePopoverContainer = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <div style={styles.leftSide}></div>
      <div style={styles.rightSide}>
        <IconButton>
          <ModeEditIcon
            fontSize="large"
            color="secondary"
            onClick={() => navigate("/profile")}
          />
        </IconButton>
        <IconButton>
          <LogoutIcon
            fontSize="large"
            color="secondary"
            onClick={() => logout()}
          />
        </IconButton>
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: 500,
    height: 200,
    backgroundColor: COLORS.WHITE,
    zIndex: 1,
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
    display: "flex",
    flexDirection: "row",
  },
  leftSide: {
    flex: 0.5,
    backgroundColor: "yellow",
  },
  rightSide: {
    flex: 0.5,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
};
export default ProfilePopoverContainer;
