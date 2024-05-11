import React, { useState, useRef, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import logout from "utils/logout-utils";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fileSingleUpload, getSingleFile } from "store/uploadSlice";

const SETTINGS = ["Edit Profile picture", "Logout"];

function Header() {
  const dispatch = useDispatch();
  const fileUploadRef = useRef(null);
  const navigate = useNavigate();

  const [anchorElUser, setAnchorElUser] = useState(null);
  const [file, setFile] = useState();
  const [profileImg, setProfileImg] = useState();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const onHandleOperation = (operation) => {
    switch (operation) {
      case SETTINGS[0]:
        fileUploadRef.current.click();
        break;
      case SETTINGS[1]:
        logout(() => navigate("/"));
        break;
      default:
        break;
    }
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  useEffect(() => {
    const identifier = localStorage.getItem("identifier");
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

  return (
    <AppBar position="static" sx={styles.appBar}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={styles.toolbar}>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={styles.appHeadingText}
          >
            React chat application
          </Typography>

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
};

export default Header;
