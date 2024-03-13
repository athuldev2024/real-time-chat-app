import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "pages/LoginPage";
import ProfilePage from "pages/ProfilePage";
import MainPage from "pages/MainPage";
import NotFoundPage from "pages/NotFoundPage";
import { Login, Register } from "components/LoginRegister";
import { Provider } from "react-redux";
import store from "store";
import { ToastContainer } from "react-toastify";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Modal from "react-modal";
import { IconButton } from "@mui/material";
import StandardButton from "components/common/StandardButton";
import { MyContext } from "store";

const App = () => {
  const [modalIsOpen, setIsOpen] = React.useState("");

  return (
    <div className="App">
      <Provider store={store}>
        <MyContext.Provider value={{ modalIsOpen, setIsOpen }}>
          <Router>
            <Routes>
              <Route path="/" Component={LoginPage}>
                <Route index Component={Login} />
                <Route path="/register" Component={Register} />
              </Route>

              <Route path="/profile" Component={ProfilePage}>
                <Route index Component={Register} />
              </Route>

              <Route path="/main" Component={MainPage}>
                <Route index Component={MainPage} />
                <Route path="/main/:id" Component={MainPage} />
              </Route>

              <Route path="*" Component={NotFoundPage} />
            </Routes>
          </Router>

          <Modal
            isOpen={modalIsOpen !== ""}
            onRequestClose={() => setIsOpen("")}
            style={styles.modal}
            ariaHideApp={false}
          >
            <IconButton style={styles.close} onClick={() => setIsOpen("")}>
              <HighlightOffIcon />
            </IconButton>

            <h2 className="headingText">Do you want to process?</h2>

            <form style={styles.form}>
              <StandardButton
                onClick={() => {
                  setIsOpen((prev) => prev + "GO");
                }}
                buttonText={"Yes"}
              />
              <StandardButton onClick={() => setIsOpen("")} buttonText={"No"} />
            </form>
          </Modal>
        </MyContext.Provider>
      </Provider>
      <ToastContainer />
    </div>
  );
};

const styles = {
  modal: {
    content: {
      width: 300,
      height: 200,
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    },
  },
  close: {
    alignSelf: "flex-end",
    justifySelf: "flex-start",
  },
  form: {
    display: "flex",
    flexDirection: "row",
    gap: 50,
  },
};

export default App;
