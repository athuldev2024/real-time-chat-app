import React, { useState } from "react";
import StandardButton from "components/common/StandardButton";
import { useDispatch } from "react-redux";
import { fileUpload } from "store/userSlice";

const FileUpload = () => {
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
    <div>
      <input
        type={"file"}
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
    </div>
  );
};

export default FileUpload;
