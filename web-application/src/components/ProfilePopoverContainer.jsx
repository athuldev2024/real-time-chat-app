import React, { useState, useEffect } from "react";
import StandardButton from "components/common/StandardButton";
import { useDispatch, useSelector } from "react-redux";
import { fileUpload } from "store/uploadSlice";
import COLORS from "constants/color";
import { useNavigate } from "react-router-dom";

import { showToastMessage } from "utils/toast-utils";

const ProfileImage = () => {
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const username = localStorage.getItem("username");
  const { profile } = useSelector((state) => state.upload);

  const handleChange = (event) => {
    const ext = event.target.files[0].name.split(".")[1].toLowerCase();
    if (["jpg"].includes(ext)) {
      setFile(event.target.files[0]);
    } else {
      showToastMessage("Invalid file type");
    }
  };

  const uploadImage = (event) => {
    event.preventDefault();
    const formData = new FormData();
    const ext = file.name.split(".")[1].toLowerCase();
    formData.append("file", file, `profile_${username}.${ext}`);
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

  useEffect(() => {
    if (useEffect) {
      console.log("PROFILE: ", typeof profile);
    }
  }, [profile]);

  return (
    <>
      <>
        {profile ? (
          <>
            <img
              src={`http://localhost:5000/profile_${username}.jpg`}
              alt="profile pic"
              width={100}
              height={100}
              style={{ borderRadius: 90 }}
            />
          </>
        ) : (
          <></>
        )}
      </>
      <input
        className="custom-file-input"
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
      <div style={styles.leftSide}>
        <ProfileImage />
      </div>
      <div style={styles.rightSide}></div>
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
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
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
