import React, { useState, useRef, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Menu from "@mui/material/Menu";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import logout from "utils/logout-utils";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fileSingleUpload, getSingleFile } from "store/uploadSlice";
import { deleteUser } from "store/userSlice";
import MESSAGES from "constants/message";
import image from "assets/login-image.avif";
import placeholder from "assets/placeholder.png";

const SETTINGS = [
  "Edit Profile picture",
  "Delete",
  "Edit user details",
  "Logout",
];

function Header() {
  const dispatch = useDispatch();
  const fileUploadRef = useRef(null);
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [file, setFile] = useState();
  const [profileImg, setProfileImg] = useState(placeholder);
  const [openModel, setOpenModal] = React.useState(false);

  useEffect(() => {
    const identifier = localStorage.getItem("identifier");
    identifier &&
      dispatch(
        getSingleFile({
          identifier,
          callback: (res) => {
            setProfileImg(res.request.responseURL);
          },
        })
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (file) {
      const formData = new FormData();
      const ext = file.name.split(".")[1].toLowerCase();

      if (!["png", "jpeg", "jpg"].includes(ext)) {
        alert("Upload image file only!!!!");
        return;
      }

      const identifier = localStorage.getItem("identifier");
      formData.append("file", file, file.name.toLowerCase());
      const headers = {
        "content-type": "multipart/form-data",
      };

      dispatch(
        fileSingleUpload({
          body: formData,
          headers,
          identifier,
          callback: () => {
            setProfileImg(URL.createObjectURL(file));
          },
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  // Profile menu functions
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // Delete modal
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const onHandleOperation = (operation) => {
    switch (operation) {
      case SETTINGS[0]:
        fileUploadRef.current.click();
        break;
      case SETTINGS[1]:
        handleOpenModal();
        break;
      case SETTINGS[2]:
        navigate("/main/update");
        break;
      case SETTINGS[3]:
        logout(() => navigate("/"));
        break;
      default:
        break;
    }
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const deleteCurrentUser = () => {
    const identifier = localStorage.getItem("identifier");
    dispatch(
      deleteUser({
        params: { identifier },
        callback: (res) => {
          res.status === 200 && logout(() => navigate("/"));
        },
      })
    );
  };

  return (
    <AppBar position="static" sx={styles.appBar}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={styles.toolbar}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: 40,
            }}
          >
            <img src={image} alt="Nothing" width={80} height={80} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={styles.appHeadingText}
            >
              React chat application
            </Typography>
          </div>

          <Box sx={{ flexGrow: 0 }}>
            <input
              id="fileUpload"
              ref={fileUploadRef}
              type="file"
              style={{ visibility: "hidden" }}
              onChange={handleFileChange}
            />
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <img
                  alt="Profile not visible"
                  src={profileImg}
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 40,
                  }}
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {SETTINGS.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={() => onHandleOperation(setting)}
                >
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>

      <Modal
        open={openModel}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styles.modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {MESSAGES.delete_user_confirm}
          </Typography>

          <Stack direction="row" spacing={5}>
            <Button variant="contained" onClick={deleteCurrentUser}>
              Yes
            </Button>
            <Button
              variant="outlined"
              href="#outlined-buttons"
              onClick={handleCloseModal}
            >
              No
            </Button>
          </Stack>
        </Box>
      </Modal>
    </AppBar>
  );
}

const styles = {
  appBar: {
    maxHeight: 100,
    display: "flex",
    justifyContent: "center",
  },
  toolbar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  appHeadingText: {
    mr: 2,
    display: { xs: "none", md: "flex" },
    fontFamily: "monospace",
    fontWeight: 700,
    letterSpacing: ".3rem",
    color: "inherit",
    textDecoration: "none",
  },
  modalStyle: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
};

export default Header;
